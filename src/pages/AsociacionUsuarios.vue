<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <q-header style="position: fixed">
    <q-toolbar class="toolbar" style="height: 63px"></q-toolbar>
    <q-toolbar class="text-white shadow-2 toolbar" style="height: 15px">
      <!--<q-btn flat round dense icon="menu" class="q-mr-sm" />
        <q-separator dark vertical inset />-->

      <div class="title">
        <span>
          <h4>{{ nombreAsociacion }}</h4></span
        >
      </div>

      <q-space />

      <q-btn-dropdown stretch flat label="Usuarios">
        <q-list>
          <q-item-label header>Miembros</q-item-label>
          <q-item
            clickable
            v-close-popup
            tabindex="0"
            @click="showAdministradores('socios')"
          >
            <q-item-section avatar>
              <q-avatar
                icon="people_outline"
                color="secondary"
                text-color="white"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label>Socios</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            clickable
            v-close-popup
            tabindex="0"
            @click="showAdministradores('administradores')"
          >
            <q-item-section avatar>
              <q-avatar icon="lock" color="secondary" text-color="white" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Administradores</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            clickable
            v-close-popup
            tabindex="0"
            @click="showAdministradores('directiva')"
          >
            <q-item-section avatar>
              <q-avatar
                icon="smiling_face_outline"
                color="secondary"
                text-color="white"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label>Directiva</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            clickable
            v-close-popup
            tabindex="0"
            @click="showAdministradores('editar')"
          >
            <q-item-section avatar>
              <q-avatar
                icon="ti-pencil-alt"
                color="secondary"
                text-color="white"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label>Editar asociación</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
    </q-toolbar>
  </q-header>

  <q-page padding v-show="showSociosTable">
    <br />
    <br />
    <br />

    <div>
      <q-card>
        <q-card-section>
          <q-table
            :data="posts"
            title="Socios"
            :columns="columns"
            color="primary"
            row-key="name"
            :rows="posts"
            @row-click="rowClicked"
            @row-dblclick="seleccionarNuevoDirectiva(row)"
            :rows-per-page-options="[5, 10, 20, 50]"
            :pagination="true"
            ref="tablaQuasar"
            export-csv
            export-excel
          >
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td
                  v-for="columna in columns"
                  :key="columna.name"
                  :props="props"
                  @click="seleccionarNuevoDirectiva(props.row)"
                  @dblclick="seleccionarNuevoDirectiva2(props.row)"
                >
                  <!-- Contenido de la tarjeta (fila) aquí -->
                  <p class="q-mb-none">{{ props.row[columna.name] }}</p>
                </q-td>
                <q-td>
                  <div class="q-pa q-gutter-none">
                    <q-btn
                      color="none"
                      @click="editarUsuario(props.row)"
                      @dblclick="editarUsuario2(props.row)"
                    >
                      <q-icon
                        left
                        size="2em"
                        name="ti-pencil-alt"
                        color="black"
                      />
                      <div></div>
                    </q-btn>
                  </div>
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

            <div>
              <q-btn @click="exportarAExcel">Exportar a Excel</q-btn>
            </div>

            <template v-slot:top-left>
              <q-btn
                color="primary"
                icon-right="archive"
                label="Export to csv"
                no-caps
                @click="exportarsAExcel"
              />
            </template>
          </q-table>
          <div class="q-pa-md q-gutter-md">
            <q-btn color="teal" @click="showAdministradores('nuevoUsuario')">
              <q-icon left size="3em" name="person_add" />
              <div>Agregar usuario</div>
            </q-btn>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
  <q-page v-show="showAdministradoresTable">
    <br />
    <br />
    <br />
    <div class="q-pa-md">
      <q-card>
        <q-card-section>
          <q-table
            :data="postsAdministradores"
            title="Administradores"
            :columns="columnsAdministradores"
            color="primary"
            row-key="name"
            :rows="postsAdministradores"
            @row-click="rowClickedAdministrador"
            :rows-per-page-options="[5, 10, 20, 50]"
            :pagination="true"
          >
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td
                  v-for="columna in columnsAdministradores"
                  :key="columna.name"
                  :props="props"
                >
                  <!-- Contenido de la tarjeta (fila) aquí -->
                  <p class="q-mb-none">{{ props.row[columna.name] }}</p>
                </q-td>
                <q-td>
                  <div class="q-pa q-gutter-none">
                    <q-btn
                      color="none"
                      @click="editarAdministrador(props.row)"
                      @dblclick="editarAdministrador2(props.row)"
                    >
                      <q-icon
                        left
                        size="2em"
                        name="ti-pencil-alt"
                        color="black"
                      />
                      <div></div>
                    </q-btn>
                  </div>
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
          <div class="q-pa-md q-gutter-md">
            <q-btn color="teal" @click="nuevoAdministradorAsociacion">
              <q-icon left size="3em" name="person_add" />
              <div>Agregar administrador</div>
            </q-btn>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
  <q-page v-show="showDirectivaTable">
    <div class="q-pa-md">
      nidfbwbfinstablas
      <q-card>
        <q-card-section>
          <q-table
            :data="postsDirectiva"
            title="Directiva"
            :columns="columnsDirectiva"
            color="primary"
            row-key="name"
            :rows="postsDirectiva"
            @row-click="rowClickedAdministrador"
            :rows-per-page-options="[5, 10, 20, 50]"
            :pagination="true"
          >
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td
                  v-for="columna in columnsDirectiva"
                  :key="columna.name"
                  :props="props"
                >
                  <!-- Contenido de la tarjeta (fila) aquí -->
                  <p class="q-mb-none">{{ props.row[columna.name] }}</p>
                </q-td>
                <q-td>
                  <div class="q-pa q-gutter-none">
                    <q-btn
                      color="none"
                      @click="editarDirectiva(props.row)"
                      @dblclick="editarDirectiva2(props.row)"
                    >
                      <q-icon
                        left
                        size="2em"
                        name="ti-pencil-alt"
                        color="black"
                      />
                      <div></div>
                    </q-btn>
                  </div>
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
          <div class="q-pa-md q-gutter-md">
            <q-btn color="teal" @click="nuevoDirectivaAsociacion">
              <q-icon left size="3em" name="person_add" />
              <div>Agregar Directiva</div>
            </q-btn>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>

  <q-page v-show="showFormEditarAsociacion">
    <form-editar-asociacion></form-editar-asociacion>
  </q-page>
  <q-page v-show="showFormNuevoUsuario">
    enviando Idasociacion{{ idasociacion }}
    <form-nuevo-usuario :idasociacion="idasociacion"> </form-nuevo-usuario>
  </q-page>
  <q-page v-show="showFormEditarUsuario">
    este es el id de usuario{{ this.idusuario }}
    <form-editar-usuario
      :idusuario="idusuario"
      :idasociacion="idasociacion"
      ref="formeditarusuario"
    ></form-editar-usuario>
  </q-page>
  <q-page v-show="showFormNuevoAdministrador">
    <form-nuevo-administrador
      :idasociacion="idasociacion"
    ></form-nuevo-administrador>
  </q-page>
  <q-page v-show="showFormEditarAdministrador">
    <form-editar-administrador
      :idadministrador="idadministrador"
      :idasociacion="idasociacion"
      ref="formeditaradministrador"
    >
    </form-editar-administrador>
  </q-page>
  <q-page v-show="showFormEditarDirectiva">
    xtrading
    <!-- <form-nuevo-directiva></form-nuevo-directiva> -->
    <form-editar-directiva
      :idasociacion="idasociacion"
      :idusuario="idusuario"
      ref="formeditardirectiva"
    ></form-editar-directiva>
  </q-page>
  <q-page v-show="showFormNuevoDirectiva">
    <form-nuevo-directiva
      ref="formenuevodirectiva"
      :idasociacion="idasociacion"
      :idusuario="idusuario"
    ></form-nuevo-directiva>
  </q-page>
</template>
<script>
import FormEditarAdministrador from 'src/components/FormEditarAdministrador.vue';
import FormEditarAsociacion from 'src/components/FormEditarAsociacion.vue';
import FormEditarDirectiva from 'src/components/FormEditarDirectiva.vue';
import FormEditarUsuario from 'src/components/FormEditarUsuario.vue';
import FormNuevoAdministrador from 'src/components/FormNuevoAdministrador.vue';
import FormNuevoDirectiva from 'src/components/FormNuevoDirectiva.vue';
import FormNuevoUsuario from 'src/components/FormNuevoUsuario.vue';
import { obtenerDatosGuard } from 'src/router/middlewares';
import exportFile from 'quasar/src/utils/export-file.js';
import useQuasar from 'quasar/src/composables/use-quasar.js';
import * as XLSX from 'xlsx';
import { Workbook } from 'exceljs';

/** Utility Functions */

import { defineComponent } from 'vue';
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
  components: {
    FormEditarAsociacion,
    FormNuevoUsuario,
    FormEditarUsuario,
    FormNuevoAdministrador,
    FormEditarAdministrador,
    FormEditarDirectiva,
    FormNuevoDirectiva,
  },
  data() {
    return {
      tablaData: this.posts,
      tablaFields: this.columns,
      nombreArchivo: 'tabla', // Nombre del archivo Excel a generar

      idAsoc: '',
      idasociacion: '',
      show: this.$route.params.show,

      columnsAdministradores: [
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
          name: 'username',
          required: true,
          label: 'Nombre de Usuario',
          field: 'username',
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
      columnsDirectiva: [
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
          name: 'cargo',
          required: true,
          label: 'Cargo',
          field: 'cargo',
        },

        {
          name: 'fechaInicio',
          required: true,
          label: 'Fecha Inicio ',
          field: 'fechaInicio',
        },
        {
          name: 'fechaFin',
          required: true,
          label: 'Fecha Fin',
          field: 'fechaFin',
        },
      ],
      posts: [],
      postsAdministradores: [],
      postsDirectiva: [],
      idusuario: '',
      idadministrador: '',
      nombreAsociacion: '',
      showAdministradoresTable: false,
      showDirectivaTable: false,
      showSociosTable: false,
      showFormEditarAsociacion: false,
      showFormNuevoUsuario: false,
      showFormEditarUsuario: false,
      showFormNuevoAdministrador: false,
      showFormEditarAdministrador: false,
      showFormEditarDirectiva: false,
      showFormNuevoDirectiva: false,
      postses: {
        id: 1,
        nombre: '23 de Julio S.A',
        ruc: '    1724674823001',
        lugarAutorizado: 'Mercado Diarios',
        direccionLugarAutorizado: 'Cayambe centro',
        cede: 'Si',
        direccionCede: 'Juan Montalvo',
        telefono: '0998181524',
        correo: '23dejulio@gmail.com',
        legalizada: 'Si',
        documentoLegalizacion: '100200300400',
        fechaCreacion: '2022-12-11',
        tipoContribuyente: 'Natural',
      },
    };
  },
  setup() {
    const $q = useQuasar();

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
      ],
      exportTable() {
        // naive encoding to csv format
        const content = [
          this.columnsAdministradores.map((col) => wrapCsvValue(col.label)),
        ]
          .concat(
            this.posts.map((row) =>
              columns
                .map((col) =>
                  wrapCsvValue(
                    typeof col.field === 'function'
                      ? col.field(row)
                      : row[col.field === void 0 ? col.name : col.field],
                    col.format,
                    row
                  )
                )
                .join(',')
            )
          )
          .join('\r\n');

        const status = exportFile('table-export.csv', content, 'text/csv');

        if (status !== true) {
          $q.notify({
            message: 'Browser denied file download...',
            color: 'negative',
            icon: 'warning',
          });
        }
      },
    };
  },
  mounted() {
    this.definirIdAsoc();
    this.idasociacion = this.idAsoc;
    this.showInicio(this.show);
  },
  methods: {
    exportarsAExcel() {
      // Crear un nuevo libro de Excel
      const libro = XLSX.utils.book_new();

      // Crear una hoja de trabajo en el libro
      const hoja = XLSX.utils.json_to_sheet(this.posts);

      // Añadir la hoja de trabajo al libro
      XLSX.utils.book_append_sheet(libro, hoja, 'Tabla');

      // Guardar el libro en formato XLSX
      XLSX.writeFile(libro, 'tabla.xlsx');
    },
    exportarAExcel() {
      // Obtén los datos de tu tabla Quasar

      // Obtén los datos de la tabla Quasar en un formato que puedas procesar
      const datosTabla = this.$refs.tablaQuasar.body.map((fila) => {
        return {
          columna1: fila.columna1, // Cambiar 'columna1' por el nombre real de tus columnas
          columna2: fila.columna2,
          // Agrega más columnas según tus necesidades
        };
      });

      // Crea un nuevo archivo Excel
      const workbook = XLSX.utils.book_new();
      const sheet = XLSX.utils.json_to_sheet(datosTabla);
      XLSX.utils.book_append_sheet(workbook, sheet, 'Tabla Quasar');

      // Genera un archivo Blob con el contenido del archivo Excel
      const buffer = XLSX.write(workbook, { type: 'array', bookType: 'xlsx' });
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      // Descarga el archivo Excel
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'tabla_quasar.xlsx';
      link.click();
    },

    exportarExcel() {
      let url =
        'http://localhost:3000/usuarios/usuariosAsociacion/' + this.idAsoc;
      fetch(url)
        .then((response) => response.json())
        .then((data) => mostrarData(data))
        .catch((error) => console.log(error));
      const mostrarData = (data) => {
        console.log(data);
        this.posts = data;
        // Obtener datos de la tabla en formato JSON
        //jhuuuuuuuuuuuiiiiiiiiiiconst data = this.postses;

        // Crear un libro de trabajo de Excel
        const workbook = new Workbook();
        const hojaDatos = workbook.addWorksheet('Datos'); // Agregar una hoja de Excel

        // Añadir datos a la hoja de Excel
        hojaDatos.addRows(data);
        console.log('data to table', data);

        // Guardar el libro de trabajo como archivo Excel
        workbook.xlsx.writeBuffer().then((buffer) => {
          const blob = new Blob([buffer], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          });
          const fileName = 'tabla_data.xlsx';
          const downloadLink = document.createElement('a');

          downloadLink.href = URL.createObjectURL(blob);
          downloadLink.download = fileName;
          downloadLink.click();

          URL.revokeObjectURL(downloadLink.href);
        });
      };
    },
    prueba() {
      this.$refs.formeditarusuario.listarDatos();
    },
    prueba2() {
      this.$refs.formeditaradministrador.listarDatos();
    },
    prueba3() {
      this.$refs.formeditardirectiva.listarDatos();
    },
    async definirIdAsoc() {
      obtenerDatosGuard();
      const role = localStorage.getItem('role');
      const userId = localStorage.getItem('userId');
      let asociacionIdDefinido;
      if (role == 'admin') {
        await this.$axios
          .get(
            'http://localhost:3000/administradores/asociacionDelAdministrador/' +
              userId
          )
          .then((res) => {
            console.log('hey Asociaciones', res.data[0].asociacionId);
            console.log('logradosh men');
            asociacionIdDefinido = res.data[0].asociacionId;

            this.idAsoc = asociacionIdDefinido;
            this.getPosts();
            this.getPostsAdministradores();
            this.getPostsDirectiva();
            this.listarDatos();
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (role == 'superAdmin') {
        this.idAsoc = this.$route.params.idasoc;
        this.getPosts();
        this.getPostsAdministradores();
        this.getPostsDirectiva();
        this.listarDatos();
      }
    },
    obtenerId(fila) {
      // Acceder al ID de la fila seleccionada
      const id = fila.id;
      // Hacer algo con el ID obtenido
      console.log('ID obtenido:', id);
    },
    async nuevoUsuariosAsociacion() {
      return await this.$router.push(
        '../AsociacionesNuevoUsuarios/' + this.idAsoc
      );
    },
    async editarUsuario(fila) {
      this.idusuario = fila.id;
      console.log('ID obtenido:', this.idusuario);
      //this.showAdministradores('editarUsuario');
      //this.prueba();
      console.log('envindo idUsuario', this.idusuario);
      //Buscar con que remplazar replace
      //return await this.$router.replace('/EditarUsuario/' + this.idusuario);
    },
    async editarUsuario2(fila) {
      this.idusuario = fila.id;
      console.log('ID obtenido:', this.idusuario);
      this.showAdministradores('editarUsuario');
      this.prueba();
      console.log('envindo idUsuario', this.idusuario);
      //return await this.$router.replace('/EditarUsuario/' + this.idusuario);
    },
    async editarDirectiva(fila) {
      this.idusuario = fila.id;
      console.log('ID obtenido:', this.idusuario);
      //this.showAdministradores('editarUsuario');
      //this.prueba();
      console.log('envindo idDirectiva', this.idusuario);
      //Buscar con que remplazar replace

      //return await this.$router.replace('/EditarUsuario/' + this.idusuario);
    },
    async editarDirectiva2(fila) {
      this.idusuario = fila.id;
      console.log('ID obtenido:', this.idusuario);
      this.showAdministradores('editarDirectiva');
      this.prueba3();
      console.log('envindo idDirectiva', this.idusuario);
      //Buscar con que remplazar replace

      //return await this.$router.replace('/EditarUsuario/' + this.idusuario);
    },
    async nuevoDirectivaAsociacion() {
      this.idasociacion = this.idAsoc;
      console.log('enviando nueva asociacion', this.idasociacion);
      this.showAdministradores('nuevoDirectiva');
      // return await this.$router.push(
      //   '../AsociacionesNuevoAdministrador/' + this.idAsoc
      // );
    },
    async seleccionarNuevoDirectiva(fila) {
      this.idusuario = fila.id;
      console.log('ID obtenido:', this.idusuario);
      //this.showAdministradores('editarUsuario');
      //this.prueba();
      console.log('envindo idDirectiva', this.idusuario);
      //Buscar con que remplazar replace

      //return await this.$router.replace('/EditarUsuario/' + this.idusuario);
    },

    async seleccionarNuevoDirectiva2(fila) {
      this.idusuario = fila.id;
      console.log('Id obtenido', this.iusuario);
      console.log('envindo idparaDirectiva', this.idusuario);
      this.$refs.formenuevodirectiva.listarDatos();
    },
    async nuevoAdministradorAsociacion(fila) {
      this.idadministrador = fila.id;
      console.log('Id obtenido', this.idadministrador);
      console.log('envindo idadministrador', this.idusuario);
      this.showAdministradores('nuevoAdministrador');
      // return await this.$router.push(
      //   '../AsociacionesNuevoAdministrador/' + this.idAsoc
      // );
    },
    async editarAdministrador2(fila) {
      this.idadministrador = fila.id;
      this.idasociacion = this.idAsoc;
      console.log('Id administrador obtenido:', this.idadministrador);
      console.log('envindo idadministrador', this.idasociacion);

      this.showAdministradores('editarAdministrador');
      this.prueba2();

      // return await this.$router.replace(
      //   '/EditarAdministrador/' + this.idAsoc + '/' + this.idadministrador
    },

    async editarAdministrador(fila) {
      this.idadministrador = fila.id;
      this.idasociacion = this.idAsoc;
      console.log('Id administrador obtenido:', this.idadministrador);
      console.log('envindo idadministrador', this.idasociacion);

      // return await this.$router.replace(
      //   '/EditarAdministrador/' + this.idAsoc + '/' + this.idadministrador
    },

    async listarDatos() {
      this.$axios
        .get('http://localhost:3000/asociaciones/find/' + this.idAsoc)
        .then((res) => {
          console.log(res.data);
          console.log('logrado');
          this.nombreAsociacion = res.data.nombre;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getPosts() {
      let url =
        'http://localhost:3000/usuarios/usuariosAsociacion/' + this.idAsoc;
      fetch(url)
        .then((response) => response.json())
        .then((data) => mostrarData(data))
        .catch((error) => console.log(error));
      const mostrarData = (data) => {
        console.log(data);
        this.posts = data;
      };
    },
    getPostsAdministradores() {
      let url =
        'http://localhost:3000/administradores/administradoresAsociacion/' +
        this.idAsoc;
      fetch(url)
        .then((response) => response.json())
        .then((data) => mostrarData(data))
        .catch((error) => console.log(error));
      const mostrarData = (data) => {
        console.log(data);
        this.postsAdministradores = data;
      };
    },
    getPostsDirectiva() {
      let url =
        'http://localhost:3000/usuarios/usuariosDirectivaAsociacion/' +
        this.idAsoc;
      fetch(url)
        .then((response) => response.json())
        .then((data) => mostrarData(data))
        .catch((error) => console.log(error));
      const mostrarData = (data) => {
        console.log(data);
        this.postsDirectiva = data;
      };
    },
    rowClicked(click, row) {
      this.idusuario = row.id;
      console.log('ID de la fila clickeada:', this.idusuario);
    },
    rowClickedAdministrador(click, row) {
      this.idadministrador = row.id;
      console.log(
        'ID de la fila clickeada administrador:',
        this.idadministrador
      );
    },
    showAdministradores(mostrar) {
      console.log('llego');
      if (mostrar == 'administradores') {
        this.showAdministradoresTable = true;
        this.showFormEditarUsuario = false;
        this.showSociosTable = false;
        this.showFormEditarAsociacion = false;
        this.showFormNuevoUsuario = false;
        this.showDirectivaTable = false;
        this.showFormNuevoAdministrador = false;
        this.showFormEditarAdministrador = false;
        this.showFormEditarDirectiva = false;
        this.showFormNuevoDirectiva = false;
      } else if (mostrar == 'socios') {
        this.showFormNuevoAdministrador = false;
        this.showFormEditarAdministrador = false;
        this.showAdministradoresTable = false;
        this.showFormEditarUsuario = false;
        this.showDirectivaTable = false;
        this.showSociosTable = true;
        this.showFormEditarAsociacion = false;
        this.showFormNuevoUsuario = false;
        this.showFormEditarDirectiva = false;
        this.showFormNuevoDirectiva = false;
      } else if (mostrar == 'directiva') {
        this.showFormNuevoAdministrador = false;
        this.showFormEditarAdministrador = false;
        this.showAdministradoresTable = false;
        this.showDirectivaTable = true;
        this.showFormEditarUsuario = false;
        this.showSociosTable = false;
        this.showFormEditarAsociacion = false;
        this.showFormNuevoUsuario = false;
        this.showFormEditarDirectiva = false;
        this.showFormNuevoDirectiva = false;
      } else if (mostrar == 'editar') {
        this.showFormNuevoAdministrador = false;
        this.showFormEditarAdministrador = false;
        this.showAdministradoresTable = false;
        this.showDirectivaTable = false;
        this.showSociosTable = false;
        this.showFormEditarAsociacion = true;
        this.showFormEditarUsuario = false;
        this.showFormNuevoUsuario = false;
        this.showFormEditarDirectiva = false;
        this.showFormNuevoDirectiva = false;
      } else if (mostrar == 'nuevoUsuario') {
        this.showFormNuevoAdministrador = false;
        this.showFormEditarAdministrador = false;
        this.showDirectivaTable = false;
        this.showAdministradoresTable = false;
        this.showSociosTable = true;
        this.showFormEditarAsociacion = false;
        this.showFormEditarUsuario = false;
        this.showFormNuevoUsuario = true;
        this.showFormEditarUsuario = false;
        this.idasociacion = this.idAsoc;
        this.showFormEditarDirectiva = false;
        this.showFormNuevoDirectiva = false;
      } else if (mostrar == 'editarUsuario') {
        this.showFormNuevoAdministrador = false;
        this.showFormEditarAdministrador = false;
        this.showDirectivaTable = false;
        this.showAdministradoresTable = false;
        this.showSociosTable = true;
        this.showFormEditarAsociacion = false;
        this.showFormNuevoUsuario = false;
        this.showFormEditarUsuario = true;
        this.idasociacion = this.idAsoc;
        this.showFormEditarDirectiva = false;
        this.showFormNuevoDirectiva = false;
      } else if (mostrar == 'editarAdministrador') {
        this.showAdministradoresTable = true;
        this.showFormEditarAdministrador = true;
        this.showFormNuevoAdministrador = false;
        this.showSociosTable = false;
        this.showFormEditarAsociacion = false;
        this.showFormNuevoUsuario = false;
        this.showFormEditarUsuario = false;
        this.idasociacion = this.idAsoc;
        this.showFormEditarDirectiva = false;
        this.showFormNuevoDirectiva = false;
      } else if (mostrar == 'nuevoAdministrador') {
        this.showAdministradoresTable = true;
        this.showFormNuevoAdministrador = true;
        this.showDirectivaTable = false;
        this.showFormEditarAdministrador = false;
        this.showSociosTable = false;
        this.showFormEditarAsociacion = false;
        this.showFormNuevoUsuario = false;
        this.showFormEditarUsuario = false;
        this.showFormEditarDirectiva = false;
        this.showFormNuevoDirectiva = false;
        this.idasociacion = this.idAsoc;
        console.log(this.idasociacion);
      } else if (mostrar == 'editarDirectiva') {
        this.showAdministradoresTable = false;
        this.showFormNuevoAdministrador = false;
        this.showDirectivaTable = true;
        this.showFormEditarAdministrador = false;
        this.showSociosTable = false;
        this.showFormEditarAsociacion = false;
        this.showFormNuevoUsuario = false;
        this.showFormEditarUsuario = false;
        this.showFormEditarDirectiva = true;
        this.showFormNuevoDirectiva = false;
        this.idasociacion = this.idAsoc;
      } else if (mostrar == 'nuevoDirectiva') {
        this.showAdministradoresTable = false;
        this.showFormNuevoAdministrador = false;
        this.showFormEditarAdministrador = false;
        this.showSociosTable = false;
        this.showDirectivaTable = true;
        this.showFormEditarAsociacion = false;
        this.showFormNuevoUsuario = false;
        this.showFormEditarUsuario = false;
        this.showFormEditarDirectiva = false;
        this.showFormNuevoDirectiva = true;
        this.idasociacion = this.idAsoc;
      } else {
        this.showFormNuevoDirectiva = false;
        this.showFormEditarAdministrador = false;
        this.showDirectivaTable = false;
        this.showAdministradoresTable = false;
        this.showFormEditarUsuario = false;
        this.showSociosTable = true;
        this.showFormNuevoAdministrador = false;
        this.showFormEditarAsociacion = false;
        this.showFormEditarDirectiva = false;
        this.showFormNuevoUsuario = false;
      }
    },
    showInicio(mostrar) {
      if (mostrar == 'usuarios') {
        this.showFormEditarAsociacion = false;
        this.showAdministradoresTable = false;
        this.showSociosTable = true;
      } else if (mostrar == 'editar') {
        this.showFormEditarAsociacion = true;
        this.showAdministradoresTable = false;
        this.showSociosTable = false;
      } else {
        this.showFormEditarAsociacion = false;
        this.showAdministradoresTable = false;
        this.showSociosTable = true;
      }
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
