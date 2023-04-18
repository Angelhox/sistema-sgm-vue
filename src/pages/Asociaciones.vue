<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <q-header>
    <q-toolbar style="height: 65px"> </q-toolbar>
    <q-toolbar style="justify-items: end; height: 15px">
      <!--<q-btn flat round dense icon="menu" class="q-mr-sm" />
        <q-separator dark vertical inset />-->

      <h4 style="">Asociaciones</h4>
      <q-space />

      <q-btn-dropdown stretch flat label="Asociaciones">
        <q-list>
          <q-item-label header>More actions</q-item-label>
          <q-item
            clickable
            v-close-popup
            tabindex="0"
            @click="showForms('formNuevaAsociacion')"
          >
            <q-item-section avatar>
              <q-avatar
                icon="person_add"
                color="secondary"
                text-color="white"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label>Agregar asociación</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            clickable
            v-close-popup
            tabindex="0"
            @click="showForms('listaAsociaciones')"
          >
            <q-item-section avatar>
              <q-avatar
                icon="people_outline"
                color="secondary"
                text-color="white"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label>Asociaciones</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>

      <q-separator dark vertical />
    </q-toolbar>
  </q-header>
  <q-page padding v-show="showListaAsociaciones">
    <div>
      <!-- Utiliza q-card para renderizar las tarjetas -->
      <div class="qcard-grid">
        <q-card v-for="card in cards" :key="card.id" style="width: 100%">
          <q-card-section>
            <div style="text-align: center; color: coral">
              <h2>{{ card.nombre }}</h2>
            </div>
            <div style="text-align: center">
              Ruc:
              <p>{{ card.ruc }}</p>
            </div>
            Correo:
            <p>{{ card.correo }}</p>
            Telefono:
            <p>{{ card.telefono }}</p>
            Lugar Autorizado:
            <p>{{ card.lugarAutorizado }}</p>
            Fecha de Creacion:
            <p>{{ card.fechaCreacion }}</p>

            <!-- Renderiza otros datos de la tarjeta según su estructura de datos -->
            <div class="q-pa-sm q-gutter-md">
              <q-btn color="brown-5" @click="editarAsociacion(card.id)">
                <q-icon left size="3em" name="ti-pencil-alt" />
                <div>Datos</div>
              </q-btn>

              <q-btn color="brown-5" @click="verUsuariosAsociacion(card.id)">
                <q-icon left size="3em" name="person" />
                <div>Usuarios</div>
              </q-btn>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
  <q-page v-show="showFormNuevaAsociacion">
    <form-nueva-asociacion></form-nueva-asociacion>
  </q-page>
</template>

<script>
import FormNuevaAsociacion from 'src/components/FormNuevaAsociacion.vue';
import { defineComponent } from 'vue';
import { fetchWithBaseUrl } from 'src/router/api';
export default defineComponent({
  components: { FormNuevaAsociacion },
  data() {
    return {
      cards: [],
      filter: '',
      idasoc: 'xxx',
      showFormNuevaAsociacion: false,
      showListaAsociaciones: true,
    };
  },
  mounted() {
    this.getPosts();
  },
  methods: {
    async editarAsociacion(id) {
      this.idasoc = id;
      console.log(this.idasoc);
      return await this.$router.push(
        'AsociacionUsuarios/' + this.idasoc + '/editar'
      );
    },
    async verUsuariosAsociacion(id) {
      this.idasoc = id;
      console.log(this.idasoc);
      return await this.$router.push(
        'AsociacionUsuarios/' + this.idasoc + '/usuarios'
      );
    },
    async nuevoUsuariosAsociacion(id) {
      this.idasoc = id;
      console.log(this.idasoc);
      return await this.$router.push(
        'AsociacionesNuevoUsuarios/' + this.idasoc
      );
    },
    async getPosts() {
      await this.$axios
        .get('/asociaciones/all', {
          headers: {
            // Configura los encabezados necesarios para CORS
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
            'Access-Control-Allow-Headers': 'Content-Type,Authorization',
          },
        })
        // .then((res) => {
        //   console.log(res.data);
        //   this.posts = res.data;
        // })
        // .catch((err) => {
        //   console.log(err);
        // });*/
        // let url = 'http://localhost:3000/asociaciones/all';
        // fetchWithBaseUrl('/asociaciones/all', {
        //   method: 'GET',
        //   headers: {
        //     // Configura los encabezados necesarios para CORS
        //     'Access-Control-Allow-Origin': '*',
        //     'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
        //     'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        //   },
        // })
        //   .then((response) => response.json())
        //   .then((data) => mostrarData(data))
        //   .catch((error) => console.log(error));
        // const mostrarData = (data) => {
        //   console.log(data);
        //   this.cards = data;
        // };
        .then((response) => {
          this.cards = response.data;
        })
        .catch((error) => {
          console.log(error.response);
          this.procesarFormulario;
          this.password = '';
        });
    },
    rowClicked(id) {
      console.log('tarjeta ', this.id);
    },
    showForms(mostrar) {
      if (mostrar == 'formNuevaAsociacion') {
        this.showListaAsociaciones = false;
        this.showFormNuevaAsociacion = true;
      } else if (mostrar == 'listaAsociaciones') {
        this.showListaAsociaciones = true;
        this.showFormNuevaAsociacion = false;
      } else if (mostrar == 'directiva') {
      }
    },
  },
  setup() {
    return {};
  },
});
</script>
<style scoped>
.qcard-grid {
  display: grid;
  /* Puedes ajustar el número de columnas según tus necesidades */
  gap: 5px; /* Puedes ajustar el espacio entre los QCards según tus necesidades */
}

.q-card {
  /* Estilos para el QCard, como margen, relleno, borde, etc. */
}
/* Estilos para pantallas grandes (mayor a 768px) */
@media screen and (min-width: 768px) {
  .qcard-grid {
    grid-template-columns: repeat(
      3,
      1fr
    ); /* Mostrar tres columnas en pantallas grandes */
    gap: 5px;
  }
}

/* Estilos para pantallas pequeñas (hasta 767px) */
@media screen and (max-width: 800px) {
  .qcard-grid {
    grid-template-columns: 1fr; /* Mostrar una columna en pantallas pequeñas */
    gap: 5px;
  }
}
.q-toolbar {
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
  background: #ffe2b7;
  box-shadow: none;
  color: #000000;
  box-shadow: #000000;
}
h2 {
  text-transform: uppercase;
  font-weight: bold;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
</style>
