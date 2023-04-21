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

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="toolbar">
      <q-scroll-area
        style="
          height: calc(100% - 150px);
          margin-top: 150px;
          border-right: 1px solid #ddd;
        "
      >
        <q-list padding>
          <q-item @click="$router.push('/Asociaciones')" clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="inbox" />
            </q-item-section>

            <q-item-section> Asociaciones </q-item-section>
          </q-item>

          <q-item clickable v-ripple @click="cerrarSesion">
            <q-item-section avatar>
              <q-icon name="logout" />
            </q-item-section>

            <q-item-section> Cerrar Sesion </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

      <q-img class="absolute-top toolbar" style="height: 150px">
        <div class="absolute-bottom bg-transparent toolbar">
          <q-avatar size="56px" class="q-mb-sm toolbar">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
          <div class="text-weight-bold">{{ user }}</div>
          <div>@rstoenescu</div>
        </div>
      </q-img>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import EssentialLink from 'components/EssentialLink.vue';
const user = localStorage.getItem('role');

export default defineComponent({
  name: 'MainLayout',

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      user: localStorage.getItem('role'),
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
  methods: {
    cerrarSesion() {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('role');
      this.$router.push('/Login');
    },
  },
});
</script>

<style scoped>
.toolbar {
  /* background-image: linear-gradient(
    to right,
    #ffcc33,
    #ff6633,
    #ff3333,
    #ff6666,
    #990099,
    #330066,
    #009933,
    #336600
  ); */
  background: #00aaed;
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
