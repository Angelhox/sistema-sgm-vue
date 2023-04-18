<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated style="z-index: 9999">
      <q-toolbar class="toolbar">
        <q-btn flat dense round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <span>SISTEMA DE MERCADOS Y COMERCIO ALTERNATIVO</span>
        </q-toolbar-title>
        <div class="btn"></div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header>MENU</q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EssentialLink from 'components/EssentialLink.vue';

const essentialLinks = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev',
  },
  {
    title: 'Usuarios',
    caption: 'Usuarios',
    icon: 'Message',
    link: 'Usuarios',
  },
  {
    title: 'Nuevo Usuario',
    caption: 'Nuevo Usuario',
    icon: 'Message',
    link: 'NuevoUsuario',
  },
  {
    title: 'Administradores',
    caption: 'Administradores',
    icon: 'User',
    link: 'Administradores',
  },
  {
    title: 'Nuevo Administrador',
    caption: 'Nuevo Administrador',
    icon: 'e-mail',
    link: 'NuevoAdministrador',
  },
  {
    title: 'Nueva Asociacion',
    caption: 'Nueva Asociacion',
    icon: 'message',
    link: 'NuevaAsociacion',
  },
  {
    title: 'Asociaciones',
    caption: 'Asociaciones',
    icon: 'company',
    link: 'Asociaciones',
  },
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
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
  box-shadow: none;
}
.btn {
  background-image: url('../assets/logoblanco.png');
  height: 70px;
  width: 70px;
  margin-top: -5px;
  margin-bottom: -2px;
  background-size: cover;
}
</style>
