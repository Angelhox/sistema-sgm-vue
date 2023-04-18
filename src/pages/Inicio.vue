<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <q-page>
    <div class="fotos"></div>
  </q-page>
</template>
<script>
import { defineComponent } from 'vue';
import { ref } from 'vue';

export default defineComponent({
  data() {
    return {
      paragraphs: [
        { id: 1, text: 'Párrafo 1' },
        { id: 2, text: 'Párrafo 2' },
        { id: 3, text: 'Párrafo 3' },
        // Agrega más párrafos aquí
      ],
    };
  },
  setup() {
    return {
      slide: ref('first'),
    };
  },
});
</script>
<style scoped>
.q-page {
  background: url('../assets/frutas.jpg');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  filter: brightness(1.2);
  z-index: 1;
}

.fotos {
  background: url('../assets/logomunicipio.png');
  width: 50%;
  height: 600px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  /* overflow: hidden; */
  backdrop-filter: blur(5px);
  border-radius: 50%;
  z-index: 2;
}
</style>
