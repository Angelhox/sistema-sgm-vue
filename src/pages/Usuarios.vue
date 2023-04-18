<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <q-page>
    <div class="q-pa-md">
      <q-table
        :data="posts"
        title="Treats"
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
      <q-btn color="teal" @click="editarUsuario">
        <q-icon left size="3em" name="save" />
        <div>Editar Usuario</div>
        valor{{ idusuario }}
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
          name: 'apellido',
          label: 'Apellido',
          required: true,
          field: 'apellido',
          sortable: true,
        },
        {
          name: 'direccion',
          required: true,
          label: 'Dirección',
          field: 'direccion',
        },
        {
          name: 'telefono',
          required: true,
          label: 'Telefono',
          field: 'telefono',
        },
        { name: 'cedula', required: true, label: 'Cedula', field: 'cedula' },
        { name: 'correo', required: true, label: 'Correo', field: 'correo' },
        {
          name: 'carnetizado',
          required: true,
          label: 'Carnetizado',
          field: 'carnetizado',
        },
        {
          name: 'categoria',
          required: true,
          label: 'Categoria',
          field: 'categoria',
        },
        {
          name: 'registrado',
          required: true,
          label: 'Registrado',
          field: 'registrado',
        },
        { name: 'estado', required: true, label: 'Estado', field: 'estado' },
        {
          name: 'discapacidad',
          required: true,
          label: 'Discapacidad',
          field: 'discapacidad',
        },
        {
          name: 'idCarnetDiscapacidad',
          label: 'Discapacidad',
          field: 'idCarnetDiscapacidad',
        },
        { name: 'idCarnet', label: 'Discapacidad', field: 'idCarnet' },
        {
          name: 'tipoDiscapacidad',
          label: 'Discapacidad',
          field: 'tipoDiscapacidad',
        },
        {
          name: 'gradoDiscapacidad',
          label: 'Discapacidad',
          field: 'gradoDiscapacidad',
        },
        { name: 'esDirectiva', label: 'Directiva', field: 'esDirectiva' },
        { name: 'estadoCivil', label: 'Estado Civil', field: 'estadoCivil' },
        {
          name: 'fechaRegistro',
          label: 'Fecha de Registro',
          field: 'fechaRegistro',
        },
        {
          name: 'fechaNacimiento',
          label: 'Fecha de Registro',
          field: 'fechaNacimiento',
        },
      ],
      posts: [],
      idusuario: '',
    };
  },
  mounted() {
    this.getPosts();
  },
  methods: {
    async editarUsuario() {
      return await this.$router.push('EditarUsuario/' + this.idusuario);
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
      let url = 'http://localhost:3000/usuarios/selectUsers';
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
      this.idusuario = row.id;
      console.log('ID de la fila clickeada:', this.idusuario);
    },
  },
  setup() {
    return {};
  },
});
</script>
