<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <q-page>
    <div class="q-pa-md">
      <q-table
        :data="posts"
        title="Administradores"
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
      <q-btn color="teal" @click="verUsuariosAsociacion">
        <q-icon left size="3em" name="save" />
        <div>Datos del administrador</div>
      </q-btn>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
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
          name: 'cedula',
          required: true,
          label: 'Cedula',
          field: 'cedula',
        },
        {
          name: 'telefono',
          required: true,
          label: 'Telefono',
          field: 'telefono',
        },
        { name: 'correo', required: true, label: 'Correo', field: 'correo' },
        {
          name: 'direccion',
          required: true,
          label: 'Direccion',
          field: 'direccion',
        },
        {
          name: 'username',
          required: true,
          label: 'Nombre de Usuario',
          field: 'username',
        },
        {
          name: 'password',
          required: true,
          label: 'Contraseñia',
          field: 'password',
        },
        {
          name: 'nombreAsociacion',
          required: true,
          label: 'Asociacion ',
          field: 'nombreAsociacion',
        },
        {
          name: 'role',
          required: true,
          label: 'Rol',
          field: 'role',
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
      let url = 'http://localhost:3000/administradores/Administradores';
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
