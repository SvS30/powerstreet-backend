<template>
  <div class="about">
    <h1>This is an about page</h1>
    <Card heightCard="100px">
      <div class="btn-group">
        <input id="fileUpload" type="file" ref="doc" hidden="true" @change="readFile">
        <Button type="btn-secondary" iconName="bx bx-cloud-upload" textButton="Cargar archivo"
          @click="chooseFile"/>
        <Button type="btn-warning" iconName="bx bxs-edit-alt" textButton="Editar"
          @click="changeStatusEditing" />
        <Button type="btn-primary" iconName="bx bxs-save" textButton="Guardar" />
        <Button type="btn-danger" iconName="bx bx-undo" textButton="Cancelar" />
      </div>
      <div v-if="errorInFile" class="item error">
        <h4>{{ errorMessage }}</h4>
      </div>
    </Card>
    <Card heightCard="400px">
      <VueShowdown v-if="isEditing == false" :markdown="contentFile" />
      <textarea v-else></textarea>
    </Card>
    <Card heightCard="150px">
      <div class="wrapper">
        <h4 class="detail">Autor: John Doe</h4>
        <h4 class="detail">Creado: 2023-02-23</h4>
        <h4 class="detail">Ultima modificación: 2023-02-23 por Steven Hank</h4>
      </div>
    </Card>
  </div>
</template>

<script>
import Card from "../components/Card.vue"
import Button from "../components/Button.vue"
import { VueShowdown } from "vue-showdown";
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
      errorMessage: null
    }
  },
  methods: {
    changeStatusEditing() {
      this.isEditing = !this.isEditing;
    },
    chooseFile() {
      this.errorInFile = false;
      document.getElementById('fileUpload').click();
    },
    readFile() {
      this.file = this.$refs.doc.files[0];
      const reader = new FileReader();
      if (this.file.name.includes(".md")) {
        reader.onload = (data) => this.contentFile = data.target.result;
        reader.onerror = (err) => {
          console.log(err);
          this.errorMessage = "An error occurred while processing the file content";
          this.errorInFile = true;
        }
        reader.readAsText(this.file);
      } else {
        this.errorMessage = "This file extension is not supported!";
        this.errorInFile = true;
      }
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

.wrapper {
  display: flex;
  gap: 30%;
  align-items: center;
  padding: 0.5rem 1rem;
}

.detail {
  width: 100%;
}

.item {
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
</style>