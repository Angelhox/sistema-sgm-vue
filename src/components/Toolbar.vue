<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <q-toolbar class="toolbar">
    <div class="logo"></div>
    <q-toolbar-title>
      <span class="title"
        >GADIP MUNICIPIO DE CAYAMBE - SISTEMA DE MERCADOS Y COMERCIO
        ALTERNATIVO</span
      >
    </q-toolbar-title>
    <q-btn outline @click="myFunction" class="{hidden:!showButton}">{{
      botonTexto
    }}</q-btn>
  </q-toolbar>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const showButton = ref(false);
export default defineComponent({
  data() {
    return {
      botonTexto: 'Acceder',
      showButton: false,
    };
  },
  methods: {
    myFunction() {
      //Agrega la funcion que deseas ejecutar
      this.$router.push('Login');
      console.log('¡Haz echo clickThirdLayout en el boton ');
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setup() {
    return {};
  },
});
</script>
<style scoped>
.hidden {
  display: none;
}
.toolbar {
  background-image: linear-gradient(
    to right,
    #ffcc33,
    #ff6633,
    #ff3333,
    #ff6666,
    #990099,
    #330066,
    #009933,
    #336600
  );
}
.title {
  text-align: center;
  width: 100%;
  /* background: #ff3333; */
  display: flex;
  justify-content: center;
  text-transform: uppercase;
}
.logo {
  background-image: url('../assets/int.png');
  height: 70px;
  width: 70px;
  margin-top: 5px;
  margin-bottom: -10px;
  background-size: 100%;
  background-repeat: no-repeat;
}
</style>
