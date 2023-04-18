<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="toolbar">
        <div class="btn2"></div>
        <!-- <q-btn flat dense round icon="menu"  /> -->

        <q-toolbar-title>
          <q-span class="title">
            GADIP MUNICIPIO DE CAYAMBE - SISTEMA DE MERCADOS Y COMERCIO
            ALTERNATIVO
          </q-span>
        </q-toolbar-title>
        <div class="btn"></div>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref, toRef } from 'vue';
import toolbar from 'components/Toolbar.vue';
import EssentialLink from 'components/EssentialLink.vue';

export default defineComponent({
  name: 'SecondLayout',
  components: {},
  //methods: {
  //myFunction() {
  //Agrega la funcion que deseas ejecutar
  //console.log('¡Haz echo click en el boton ');
  //this.$router.go(-1);
  // to: 'Login';
  //},
  //},
});
</script>
<style scoped>
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
.btn {
  background-image: url('../assets/logoblanco.png');
  height: 70px;
  width: 70px;
  margin-top: -4px;
  margin-bottom: -2px;
  margin-right: 10px;
  margin-left: 13.1px;
  background-size: cover;
}

.btn2 {
  background-image: url('../assets/int.png');
  height: 70px;
  width: 70px;
  margin-top: 5px;
  margin-bottom: -10px;
  background-size: 100%;
  background-repeat: no-repeat;
}
.title {
  text-align: center;
  width: 100%;
  /* background: #ff3333; */
  display: flex;
  justify-content: center;
  text-transform: uppercase;
}
</style>
