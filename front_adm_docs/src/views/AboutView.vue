<template>
  <div class="about">
    <h1 v-if="document.titulo">{{document.titulo}}</h1>
    <Card heightCard="100px">
      <div class="btn-group">
        <input id="fileUpload" type="file" ref="doc" hidden="true" @change="readFile">
        <Button type="btn-secondary" iconName="bx bx-cloud-upload" textButton="Cargar archivo" @click="chooseFile"
          :isAvailable="true" />
        <Button type="btn-warning" iconName="bx bxs-edit-alt" textButton="Editar" @click="changeStatusEditing"
          :isAvailable="!this.isEditing" />
        <Button type="btn-primary" iconName="bx bxs-save" textButton="Guardar" @click="sendForm"
          :isAvailable="this.isEditing" />
        <Button type="btn-danger" iconName="bx bx-undo" textButton="Cancelar" @click="this.isEditing = false"
          :isAvailable="this.isEditing" />
      </div>
      <div v-if="errorInFile" class="notify error">
        <h4>{{ errorMessage }}</h4>
      </div>
    </Card>
    <Card heightCard="400px">
      <VueShowdown v-if="isEditing == false" :markdown="contentFile" />
      <div class="row" v-else>
        <div class="input-container ic1">
          <input id="titulo" class="input" name="titulo" type="text" placeholder=" " v-model="document.titulo" />
          <div class="cut"></div>
          <label for="titulo" class="placeholder">Titulo</label>
        </div>
        <div class="input-container ic2">
          <textarea id="documento" rows="10" class="input" name="documento" type="text" placeholder=" "
            v-model="document.documento"></textarea>
          <div class="cut"></div>
          <label for="documento" class="placeholder">Documento</label>
        </div>
      </div>
    </Card>
    <Card heightCard="150px">
      <div class="container">
        <h4 class="detail">Autor: {{ document.autor.nombre }}</h4>
        <h4 class="detail">Creado: {{ document.fecha_creacion }}</h4>
        <h4 class="detail">Ultima modificación: {{ document.historial_cambios[document.historial_cambios.length
          - 1].fecha }} por {{ document.historial_cambios[document.historial_cambios.length - 1].autor_cambio.nombre }}</h4>
      </div>
    </Card>
  </div>
</template>

<script>
import Card from "../components/Card.vue"
import Button from "../components/Button.vue"
import { VueShowdown } from "vue-showdown";
import { useRoute } from 'vue-router'
export default {
  components: {
    Card,
    Button,
    VueShowdown
  },
  data() {
    return {
      isEditing: false,
      file: null,
      contentFile: null,
      errorInFile: false,
      errorMessage: null,
      document: {
        _id: null,
        titulo: null,
        documento: null,
        autor: {
          usuario: null,
          nombre: null
        },
        modificado_por: {
          usuario: null,
          nombre: null
        },
        fecha_creacion: null,
        fecha_modificacion: null,
        historial_cambios: [
          {
            documento: null,
            fecha: null,
            fecha_server: null,
            autor_cambio: {
              usuario: null,
              nombre: null
            }
          }
        ],
      }
    }
  },
  beforeMount() {
    const route = useRoute();
    if (route.params.id) {
      this.document._id = route.params.id;
      this.getDoc();
    } else {
      this.document = {
        _id: null,
        titulo: null,
        documento: null,
        autor: {
          usuario: null,
          nombre: null
        },
        modificado_por: {
          usuario: null,
          nombre: null
        },
        fecha_creacion: null,
        fecha_modificacion: null,
        historial_cambios: [
          {
            documento: null,
            fecha: null,
            fecha_server: null,
            autor_cambio: {
              usuario: null,
              nombre: null
            }
          }
        ],
      }
    }
  },
  methods: {
    changeStatusEditing() {
      this.isEditing = !this.isEditing;
    },
    chooseFile() {
      this.errorInFile = false;
      document.getElementById('fileUpload').click();
      if (!this.errorInFile) this.changeStatusEditing();
    },
    readFile() {
      this.file = this.$refs.doc.files[0];
      const reader = new FileReader();
      if (this.file.name.includes(".md")) {
        reader.onload = (data) => { this.contentFile = data.target.result; this.document.documento = data.target.result; };
        reader.onerror = (err) => {
          console.log(err);
          this.errorMessage = "An error occurred while processing the file content";
          this.errorInFile = true;
        }
        reader.readAsText(this.file);
      } else {
        this.errorMessage = "This file extension is not supported!";
        this.errorInFile = true;
        setTimeout(() => this.errorInFile = false, 3000);
      }
    },
    async sendForm() {
      let url, body, method;
      if (this.document._id != null) {
        url = `${import.meta.env.VITE_URL_EDIT_DOCS}/api/docs/${this.document._id}/edit`;
        method = 'PATCH';
        this.document.historial_cambios.push({
          documento: this.document.documento,
          fecha: new Date(),
          fecha_server: new Date(),
          autor_cambio: {
            usuario: 'root_admin',
            nombre: 'Admin'
          },
        })
        body = JSON.stringify({
          titulo: this.document.titulo,
          documento: this.document.documento,
          modificado_por: {
            usuario: 'root_admin',
            nombre: 'Admin'
          },
          fecha_modificacion: new Date(),
          historial_cambios: this.document.historial_cambios
        })
      } else {
        url = `${import.meta.env.VITE_URL_UPLOAD_DOCS}/api/docs`;
        method = 'POST';
        body = JSON.stringify({
          titulo: this.document.titulo,
          documento: this.document.documento,
          autor: {
            usuario: 'john_dode',
            nombre: 'John Doe'
          }
        })
      }
      const res = await fetch(url, { method: method, headers: { "Content-type": "application/json" }, body: body });
      const response = await res.json();
      if (response.status == 'OK') {
        this.contentFile = this.document.documento;
        this.document._id = response.id;
        this.getDoc();
        this.changeStatusEditing();
        alert(response.message);
      } else {
        console.log(response)
        this.errorMessage = response.message;
        this.errorInFile = true;
        setTimeout(() => this.errorInFile = false, 3000);
      }
    },
    async getDoc() {
      const res = await fetch(`${import.meta.env.VITE_URL_READ_DOCS}/api/docs/${this.document._id}`, {
        method: 'GET',
        headers: { "Content-type": "application/json" }
      })
      const response = await res.json();
      if (response.status == 'OK') { this.document = response.data; this.contentFile = this.document.documento }
      else console.log(response);
    }
  }
}
</script>

<style>
.btn-group {
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
}

.container {
  display: flex;
  gap: 30%;
  align-items: center;
  padding: 0.5rem 1rem;
}

.detail {
  width: 100%;
}

.notify {
  width: 350px;
  margin: 5px auto 10px auto;
  padding: 10px 20px;
  color: white;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
}

.error {
  background-color: rgb(204, 41, 13);
}

#fileUpload {
  display: none;
}

.row {
  width: 100%;
  display: flex;
  gap: 30px;
}

.form {
  background-color: #15172b;
  border-radius: 20px;
  box-sizing: border-box;
  height: 500px;
  padding: 20px;
  width: 320px;
}

.title {
  color: #eee;
  font-family: sans-serif;
  font-size: 36px;
  font-weight: 600;
  margin-top: 30px;
}

.subtitle {
  color: #eee;
  font-family: sans-serif;
  font-size: 16px;
  font-weight: 600;
  margin-top: 10px;
}

.input-container {
  height: 50px;
  position: relative;
  width: 100%;
}

.ic1 {
  margin-top: 40px;
}

.ic2 {
  margin-top: 30px;
}

.input {
  background-color: #d3d3d3;
  border-radius: 12px;
  border: 0;
  box-sizing: border-box;
  color: #eee;
  font-size: 18px;
  height: 100%;
  outline: 0;
  padding: 4px 20px 0;
  width: 100%;
}

.cut {
  background-color: #a19b9b;
  border-radius: 10px;
  height: 20px;
  left: 20px;
  position: absolute;
  top: -20px;
  transform: translateY(0);
  transition: transform 200ms;
  width: 76px;
}

.cut-short {
  width: 70px;
}

.input:focus~.cut,
.input:not(:placeholder-shown)~.cut {
  transform: translateY(8px);
}

.placeholder {
  color: #65657b;
  font-family: sans-serif;
  left: 20px;
  line-height: 14px;
  pointer-events: none;
  position: absolute;
  transform-origin: 0 50%;
  transition: transform 200ms, color 200ms;
  top: 20px;
}

.input:focus~.placeholder,
.input:not(:placeholder-shown)~.placeholder {
  transform: translateY(-30px) translateX(10px) scale(0.75);
}

.input:not(:placeholder-shown)~.placeholder {
  color: #808097;
}

.input:focus~.placeholder {
  color: #000000;
}

.submit {
  background-color: #08d;
  border-radius: 12px;
  border: 0;
  box-sizing: border-box;
  color: #eee;
  cursor: pointer;
  font-size: 18px;
  height: 50px;
  margin-top: 38px;
  text-align: center;
  width: 100%;
}

.submit:active {
  background-color: #06b;
}</style>