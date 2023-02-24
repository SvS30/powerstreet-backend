<template>
  <div class="about">
    <h1>This is an about page</h1>
    <Card heightCard="100px">
      <div class="btn-group">
        <Button type="btn-secondary" iconName="bx bx-cloud-upload" textButton="Cargar archivo" />
        <Button type="btn-warning" iconName="bx bxs-edit-alt" textButton="Editar" @click="changeStatusEditing"/>
        <Button type="btn-primary" iconName="bx bxs-save" textButton="Guardar" />
        <Button type="btn-danger" iconName="bx bx-undo" textButton="Cancelar" />
      </div>
    </Card>
    <Card heightCard="400px">
      <VueShowdown v-if="isEditing == false" markdown="# Hello, world!" />
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
      isEditing: false
    }
  },
  methods: {
    changeStatusEditing() {
      this.isEditing = !this.isEditing;
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
</style>