<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <toolbar />
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
  components: {
    toolbar,
  },
  methods: {
    myFunction() {
      //Agrega la funcion que deseas ejecutar
      this.$router.push('Login');
      console.log('¡Haz echo clickThirdLayout en el boton ');
    },
  },
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
</style>
