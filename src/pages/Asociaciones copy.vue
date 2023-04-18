<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <q-page>
    <div class="q-pa-md">
      <q-table
        :data="posts"
        title="Asociaciones"
        :columns="columns"
        color="primary"
        row-key="name"
        :rows="posts"
        @row-click="rowClicked"
      >
        <template v-slot:top-right>
          <q-input
            borderless
            dense
            debounce="300"
            v-model="filter"
            placeholder="Search"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
      </q-table>
    </div>
    <div class="q-pa-md q-gutter-md">
      <q-btn color="teal" @click="editarAsociacion">
        <q-icon left size="3em" name="save" />
        <div>Datos asociación</div>
      </q-btn>
      <q-btn color="teal" @click="verUsuariosAsociacion">
        <q-icon left size="3em" name="save" />
        <div>Ver Usuarios</div>
      </q-btn>
    </div>
  </q-page>
</template>

<script>
import { exportFile, useQuasar } from 'quasar';
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
  data() {
    return {
      columns: [
        {
          name: 'id',
          required: true,
          label: 'Id',
          align: 'left',
          field: 'id',
          field: (row) => row.id,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: 'nombre',
          align: 'center',
          label: 'Nombre',
          required: true,
          field: 'nombre',
          sortable: true,
        },
        {
          name: 'ruc',
          label: 'Ruc',
          required: true,
          field: 'ruc',
          sortable: true,
        },
        {
          name: 'lugarAutorizado',
          required: true,
          label: 'Lugar Autorizado',
          field: 'lugarAutorizado',
        },
        {
          name: 'direccionLugarAutorizado',
          required: true,
          label: 'Direccion Lugar Autorizado',
          field: 'direccionLugarAutorizado',
        },
        {
          name: 'telefono',
          required: true,
          label: 'Telefono',
          field: 'telefono',
        },
        { name: 'correo', required: true, label: 'Correo', field: 'correo' },
        {
          name: 'legalizada',
          required: true,
          label: 'Legalizada',
          field: 'legalizada',
        },
        {
          name: 'documentoLegalizacion',
          required: true,
          label: 'Documento de Legalizacion',
          field: 'documentoLegalizacion',
        },
        {
          name: 'fechaCreacion',
          required: true,
          label: 'Fecha de Creación',
          field: 'fechaCreacion',
        },
        {
          name: 'tipoContribuyente',
          required: true,
          label: 'Tipo de Contribuyente',
          field: 'tipoContribuyente',
        },
      ],
      posts: [],
      filter: '',
      idasoc: '',
    };
  },
  mounted() {
    this.getPosts();
  },
  methods: {
    async editarAsociacion() {
      return await this.$router.push('EditarAsociacion/' + this.idasoc);
    },
    async verUsuariosAsociacion() {
      return await this.$router.push('AsociacionUsuarios/' + this.idasoc);
    },
    async nuevoUsuariosAsociacion() {
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
        this.posts = data;
      };
    },
    rowClicked(click, row) {
      this.idasoc = row.id;
      console.log('ID de la fila clickeada:', this.idasoc);
    },
  },
  setup() {
    return {};
  },
});
</script>
