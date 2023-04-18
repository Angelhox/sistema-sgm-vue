<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<template>
  <q-page padding>
    <div class="q-pa-lg row justify-center content-center">
      <span class="q-pa-md text-h3" style="text-align: center"
        >Nueva Directiva</span
      >Recibiendo IdAsociacion{{ idAsociacion }}
      <div class="q-pa-sm col-12 col-12" v-show="seleccionarNuevoDirectiva">
        <q-card>
          <q-card-section>
            <q-table
              :data="posts"
              title="Directiva"
              :columns="columns"
              color="primary"
              row-key="name"
              @row-click="seleccionarNuevoUsuarioDirectiva(row)"
              :rows="posts"
              :rows-per-page-options="[5, 10, 20, 50]"
              :pagination="true"
            >
              <template v-slot:body="props">
                <q-tr :props="props">
                  <q-td
                    v-for="columna in columns"
                    :key="columna.name"
                    :props="props"
                  >
                    <!-- Contenido de la tarjeta (fila) aquí -->
                    <p class="q-mb-none">{{ props.row[columna.name] }}</p>
                  </q-td>
                  <q-td @row-dblclick="seleccionarNuevoUsuarioDirectiva(row)"
                    ><q-btn @click="seleccionarNuevoUsuarioDirectiva(props.row)"
                      >click Aki</q-btn
                    >
                  </q-td>
                </q-tr>
              </template>
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
          </q-card-section>
        </q-card>
      </div>
      <q-toolbar class="bg-orange shadow-2 rounded-borders">
        <q-btn flat round dense icon="info" class="q-mr-sm" />

        <q-separator vertical inset />

        <q-btn stretch flat label="Datos personales de la nueva directiva" />

        <q-space />
      </q-toolbar>

      <div class="q-pa-sm col-12 col-md-4">
        <q-input
          filled
          v-model="nombre"
          :autofocus="true"
          label="Seleccione un usuario"
          @click="mostrarSeleccionarUsuarioNuevaDirectiva"
          :rules="[
            (val) =>
              (val && val.length > 0) ||
              'Selecciona el usuario de la nueva directiva',
          ]"
        />
      </div>
      <div class="q-pa-sm col-12 col-md-4">
        <q-input
          filled
          type="text"
          :readonly="true"
          v-model="apellido"
          label="Apellidos"
        />
      </div>
      <div class="q-pa-sm col-12 col-md-4">
        <q-input
          :readonly="true"
          filled
          type="number"
          v-model="cedula"
          label="Numero de Cedula"
          @update:model-value="listarDatos"
        />
      </div>
      <q-input
        class="q-pa-sm col-12 col-md-12"
        filled
        :readonly="true"
        type="text"
        layout
        and
        grid
        v-model="direccion"
        label="Direccion"
      />
      <div class="q-pa-sm col-12 col-md-6">
        <q-input
          filledcambiarcontrase
          :readonly="true"
          type="text"
          v-model="telefono"
          label="Numero de teléfono"
        />
      </div>
      <div class="q-pa-sm col-12 col-md-6">
        <q-input
          filled
          type="email"
          :readonly="true"
          v-model="correo"
          label="E-mail"
        />
      </div>
    </div>
    <q-toolbar class="bg-orange shadow-2 rounded-borders">
      <q-btn flat round dense icon="info" class="q-mr-sm" />

      <q-separator vertical inset />

      <q-btn stretch flat label="Datos de la nueva directiva" />

      <q-space />
    </q-toolbar>
    <div class="row justify-start"></div>
    <div class="q-pa-lg row justify-center">
      <div class="q-pa-sm col-12 col-md-7">
        <q-select
          filled
          v-model="cargo"
          :disable="habilitarCamposDirectiva"
          input-debounce="0"
          label="Cargo"
          :options="optionsCargo"
          @filter="filterFn"
          style="width: auto"
          behavior="menu"
          :rules="[(val) => (val && val.length > 0) || 'Elija un cargo']"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey"> No results </q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>

      <div class="q-pa-sm col-12 col-md-6">
        <q-input
          filled
          :disable="habilitarCamposDirectiva"
          v-model="fechaInicio"
          label="Fecha de Inicio"
          mask="date"
          :rules="['date']"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date v-model="fechaInicio">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>

      <div class="q-pa-sm col-12 col-md-6">
        <q-input
          filled
          :disable="habilitarCamposDirectiva"
          v-model="fechaFin"
          label="Fecha de Fin"
          mask="date"
          :rules="['date']"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date v-model="fechaFin">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
    </div>

    <div class="q-pa-md q-gutter-md">
      <q-btn color="teal" @click="guardarSiNo">
        <q-icon left size="3em" name="save" />
        <div>Guardar</div>
      </q-btn>
    </div>
    <div class="q-pa-md q-gutter-md">
      <q-btn color="teal" @click="cancelarSiNO">
        <q-icon left size="3em" name="save" />
        <div>Cancelar</div>
      </q-btn>
    </div>
  </q-page>
</template>
<script>
import { defineComponent, ref } from 'vue';
const stringOptionsCargo = ['Administrador', 'Usuario'];
import moment from 'moment';
import 'moment/locale/es';
export default defineComponent({
  props: {
    idasociacion: String,
  },
  data: function () {
    return {
      nombre: '',
      apellido: '',
      cedula: '',
      direccion: '',
      telefono: '',
      correo: '',
      //datos directiva del usuario
      fechaInicio: '',
      fechaFin: '',
      idAsociacion: '',
      nombreAsociacion: '',
      //Usuario neva directiva u.u
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
      ],
      posts: [],
      seleccionarNuevoDirectiva: false,
      habilitarCamposDirectiva: true,
    };
  },

  setup() {
    const optionsCargo = ref(stringOptionsCargo);
    //datos tipo giro del usuario

    return {
      modelUsuarioDirectiva: ref(null),
      cargo: ref(null),
      stringOptionsCargo,

      optionsCargo,
      esDirectiva: ref('null'),
      modelDirectiva: ref('null'),
      selectedOption: ref('null'),
      options: [],

      //Filtro de los qselect datos especificos del usario
      filterFn(val, update) {
        if (val === '') {
          update(() => {
            optionsCargo.value = stringOptionsCargo;
          });
          return;
        }
        update(() => {
          const needle = val.toLowerCase();
          optionsCargo.value = stringOptionsCargo.filter(
            (v) => v.toLowerCase().indexOf(needle) > -1
          );
        });
      },
    };
  },
  methods: {
    cancelarSiNO() {
      this.$q.notify({
        message: '¿Quieres abandonar el formulario? tus datos no se guardaran',
        icon: 'warning',
        actions: [
          {
            label: 'confirmar',
            color: 'positive',
            handler: () => {
              // Acciones a realizar cuando se selecciona "Sí"
              console.log('Se seleccionó "Sí"');
              console.log('Cancelando...');
            },
          },
          {
            label: 'cancelar',
            color: 'negative',
            handler: () => {
              // Acciones a realizar cuando se selecciona "No"
              console.log('Se seleccionó "No"');
              this.$refs.inputNombre.color;
              console.log(' No Cancelando...', camposIncorrectos);
            },
          },
        ],
      });
    },
    async seleccionarNuevoUsuarioDirectiva(fila) {
      console.log('ejecutandose');
      this.iddirectiva = fila.id;
      console.log('id Directiva Obtenbido', this.iddirectiva);
      this.listarNuevoUsuarioDirectiva();
    },
    async listarNuevoUsuarioDirectiva() {
      console.log('ejecutandoselistardatos', this.idUsuario);
      fetch(
        'http://localhost:3000/usuarios/usuarioNoDirectivaAsociacion/' +
          this.idasociacion +
          '/' +
          this.iddirectiva
      )
        .then((response) => response.json())
        .then((data) => mostarData(data))
        .then((dataUsers) => shows(dataUsers))
        .catch((error) => console.log(error));
      const mostarData = (data) => {
        console.log(data);
        return (this.dataUsers = data[0]);
      };
      const shows = (datos) => {
        console.log(datos.nombre);
        this.idUsuarioEditar = datos.id;
        this.nombre = datos.nombre;
        this.apellido = datos.apellido;
        this.cedula = datos.cedula;
        this.direccion = datos.direccion;
        this.telefono = datos.telefono;
        this.correo = datos.correo;
        this.habilitarCamposDirectiva = false;
      };
    },

    rowClickedDirectiva(click, row) {
      this.iddirectiva = row.id;
      console.log('ID de la fila clickeada administrador:', this.iddirectiva);
    },
    guardarSiNo() {
      let camposIncorrectos = [];
      if (this.cargo == null || this.cargo == '') {
        camposIncorrectos.push('cargo');
      } else if (this.fechaInicio == null || this.fechaInicio == '') {
        camposIncorrectos.push('fecha de inicio');
      } else if (this.fechaFin == null || this.fechaFin == '') {
        camposIncorrectos.push('fecha de fin');
      }
      if (camposIncorrectos.length > 0) {
        for (let i = 0; i < camposIncorrectos.length; i++) {}
        this.$q.notify({
          message:
            'Completa los campos ' + camposIncorrectos + ' correctamente',
          icon: 'warning',
        });

        console.log('No Guardando...', camposIncorrectos);
      } else {
        // this.guardarAsociacion();

        this.$q.notify({
          message: '¿Quieres guardar estos datos?',
          icon: 'warning',
          actions: [
            {
              label: 'confirmar obtenerFechaDesdeString(this.fechaNacimiento);',
              color: 'positive',
              handler: () => {
                // Acciones a realizar cuando se selecciona "Sí"
                console.log('Se seleccionó "Sí"');
                console.log('Guardando...', camposIncorrectos);
                this.guardarNuevaDirectiva();
              },
            },
            {
              label: 'cancelar',
              color: 'negative',
              handler: () => {
                // Acciones a realizar cuando se selecciona "No"
                console.log('Se seleccionó "No"');

                console.log(' Cancelando...', camposIncorrectos);
              },
            },
          ],
        });
      }
    },
    async guardarNuevaDirectiva() {
      try {
        await this.$axios.post(
          'http://localhost:3000/directiva/crearUsuarioDirectiva/' +
            this.iddirectiva,
          {
            cargo: this.cargo,
            fechaInicio: this.obtenerFechaDesdeString(this.fechaInicio),
            fechaFin: this.obtenerFechaDesdeString(this.fechaFin),
          }
        );
        //---Notificar que se guardaron los datos
        this.$q.notify({
          message: 'Has asignado un nuevo miembro a la directiva ',
          icon: 'warning',
        });
      } catch (error) {
        console.log(error.message);
        this.$q.notify({
          message: 'Ha ocurrido un error',
          icon: 'warning',
        });
      }
    },
    obtenerFechaDesdeString(str) {
      const result = moment(str).format('YYYY-MM-DD');
      console.log('result', result);
      return result;
    },
    getPosts() {
      let url =
        'http://localhost:3000/usuarios/usuariosNoDirectivaAsociacion/' +
        this.idasociacion;
      fetch(url)
        .then((response) => response.json())
        .then((data) => mostrarData(data))
        .catch((error) => console.log(error));
      const mostrarData = (data) => {
        console.log(data);
        this.posts = data;
      };
    },
    async listarNombreAsociacion() {
      console.log(
        'listar-nombre-ejecutandose-datos',
        this.idasociacion,
        this.idAsociacion
      );
      await fetch(
        'http://localhost:3000/asociaciones/find/' + this.idasociacion
      )
        .then((response) => response.json())
        .then((data) => {
          this.nombreAsociacion = data.nombre;
        })
        .catch((error) => console.log(error));
    },
    mostrarSeleccionarUsuarioNuevaDirectiva() {
      this.seleccionarNuevoDirectiva = true;
      this.getPosts();
    },
  },
  mounted() {
    console.log('is Mounted');
  },
});
</script>
