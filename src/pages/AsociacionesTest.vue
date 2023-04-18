<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <q-header style="position: fixed; top: 7.7%">
    <q-toolbar class="text-white shadow-2 toolbar">
      <!--<q-btn flat round dense icon="menu" class="q-mr-sm" />
        <q-separator dark vertical inset />-->
      <div class="text-h3" style="text-align: center">
        <span class="text-h3" style="text-align: center">
          <h2>{{ nombreAsociacion }}</h2></span
        >
      </div>
      <div class="text-h3" style="text-align: center">
        <h4>Asociaciones</h4>
      </div>

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
                icon="person-add"
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

          <!-- <q-separator inset spaced />
          <q-item-label header>Files</q-item-label>
          <q-item
            v-for="n in 3"
            :key="`y.${n}`"
            clickable
            v-close-popup
            tabindex="0"
          >
            <q-item-section avatar>
              <q-avatar icon="assignment" color="primary" text-color="white" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Vacation</q-item-label>
              <q-item-label caption>February 22, 2016</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-icon name="info" />
            </q-item-section>
          </q-item>-->
        </q-list>
      </q-btn-dropdown>
      <q-separator dark vertical />
      <q-btn stretch flat label="Link" />
      <q-separator dark vertical />
      <q-btn stretch flat label="Link" />
    </q-toolbar>
  </q-header>
  <q-page padding v-show="showListaAsociaciones">
    <div class="q-pa-lg row justify-self">
      <span class="q-pa-md col-sm-12 text-h3" style="text-align: center"
        >Asociaciones</span
      >
    </div>
    <div>
      <!-- Utiliza q-card para renderizar las tarjetas -->
      <div class="qcard-grid">
        <q-card v-for="card in cards" :key="card.id" style="width: 100%">
          <q-card-section>
            <div style="text-align: center; color: hotpink">
              <h2>{{ card.nombre }}</h2>
            </div>
            <div style="text-align: center">
              Ruc:
              <p>{{ card.ruc }}</p>
            </div>
            Correo:
            <p>{{ card.correo }}</p>
            Correo:
            <p>{{ card.telefono }}</p>
            Lugar Autorizado:
            <p>{{ card.lugarAutorizado }}</p>
            Fecha de Creacion:
            <p>{{ card.fechaCreacion }}</p>
            id:
            <p>{{ card.id }}</p>
            <!-- Renderiza otros datos de la tarjeta según su estructura de datos -->
            <div class="q-pa-sm q-gutter-md">
              <q-btn color="teal" @click="editarAsociacion(card.id)">
                <q-icon left size="3em" name="ti-pencil-alt" />
                <div>Datos</div>
              </q-btn>

              <q-btn color="teal" @click="verUsuariosAsociacion(card.id)">
                <q-icon left size="3em" name="person" />
                <div>Usuarios</div>
              </q-btn>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
  <q-page>
    <form-nueva-asociacion
      v-show="showFormNuevaAsociacion"
    ></form-nueva-asociacion>
  </q-page>
</template>

<script>
import { exportFile, useQuasar } from 'quasar';
import FormNuevaAsociacion from 'src/components/FormNuevaAsociacion.vue';
import { defineComponent } from 'vue';
import { render } from 'vue';

function wrapCsvValue(val, formatFn, row) {
  let formatted = formatFn !== void 0 ? formatFn(val, row) : val;

  formatted =
    formatted === void 0 || formatted === null ? '' : String(formatted);

  formatted = formatted.split('"').join('""');
  /**
   * Excel accepts \n and \r in strings, but some other CSV parsers do not
   * Uncomment the next two lines to escape new lines
   */
  // .split('\n').join('\\n')
  // .split('\r').join('\\r')

  return `"${formatted}"`;
}

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
    getPosts() {
      /*this.$axios
        .get('http://localhost:3000/usuarios/getDataUsers')
        .then((res) => {
          console.log(res.data);
          this.posts = res.data;
        })
        .catch((err) => {
          console.log(err);
        });*/
      let url = 'http://localhost:3000/asociaciones/all';
      fetch(url)
        .then((response) => response.json())
        .then((data) => mostrarData(data))
        .catch((error) => console.log(error));
      const mostrarData = (data) => {
        console.log(data);
        this.cards = data;
      };
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
