<template>
  <div class="q-pa-sm row justify-center content-center">
    <h3 class="text-h3" style="text-align: center">Proveedores</h3>
    <div class="col-12 col-12">
      <q-toolbar class="bg-orange shadow-2 rounded-borders">
        <q-btn flat round dense icon="info" class="q-mr-sm" />

        <q-separator vertical inset />

        <q-btn stretch flat label="Datos personales del nuevo usuario" />

        <q-space />
      </q-toolbar>
    </div>

    <div class="q-pa-sm col-12 col-md-8">
      <q-input
        class="input"
        @update:model-value="limpiarCamposCedulaRucIncorrectos"
        filled
        type="number"
        v-model="cedula"
        label="Numero de Cedula"
        hint="Este campo es obligatorio"
        :rules="[
          (val) =>
            (val && val.length > 0 && val.length < 14) ||
            'Ingresa un numero de cedula valido',
        ]"
      >
        <template v-slot:append>
          <q-icon name="send" @click="buscarDatosPersona" /> </template
      ></q-input>
    </div>
    <div class="q-pa-sm col-12 col-md-6">
      <q-input
        filled
        :disable="habilitarCampos"
        ref="myref"
        v-model="nombre"
        label="Nombres"
        :rules="[
          (val) => (val && val.length > 0) || 'Ingresa los nombres del usuario',
        ]"
        ><template v-slot:append>
          <q-icon name="close" @click="nombre = ''" class="cursor-pointer" />
        </template>
      </q-input>
    </div>
    <div class="q-pa-sm col-12 col-md-6">
      <q-input
        filled
        :disable="habilitarCampos"
        type="text"
        v-model="apellido"
        label="Apellidos"
        :rules="[
          (val) =>
            (val && val.length > 0) || 'Ingresa los apellidos del usuario',
        ]"
      >
        <template v-slot:append>
          <q-icon
            name="close"
            @click="apellido = ''"
            class="cursor-pointer"
          /> </template
      ></q-input>
    </div>
    <q-input
      class="q-pa-sm col-12 col-md-12"
      filled
      type="text"
      :disable="habilitarCampos"
      layout
      and
      grid
      v-model="direccion"
      label="Direccion"
      :rules="[
        (val) => (val && val.length > 0) || 'Ingresa los direccion del usuario',
      ]"
    />
    <div class="q-pa-sm col-12 col-md-6">
      <q-input
        filled
        :disable="habilitarCampos"
        type="text"
        v-model="telefono"
        label="Numero de teléfono"
        :rules="[
          (val) =>
            (val && val.length > 0 && val.length < 11) ||
            'Ingresa un numero de télefono válido',
        ]"
      />
    </div>
    <div class="q-pa-sm col-12 col-md-6">
      <q-input
        filled
        :disable="habilitarCampos"
        type="email"
        v-model="correo"
        label="E-mail"
        :rules="[
          (val) => (val && val.length > 0) || 'Ingresa el correo del usuario',
        ]"
      />
    </div>
  </div>
  <div class="col-12 col-12">
    <q-toolbar class="bg-orange shadow-2 rounded-borders">
      <q-btn flat round dense icon="info" class="q-mr-sm" />

      <q-separator vertical inset />

      <q-btn stretch flat label="Productos del proveedor" />

      <q-space />
    </q-toolbar>
  </div>

  <div class="q-pa-sm col-12 col-md-6">
    <q-input
      filled
      :disable="habilitarCampos"
      ref="myref"
      v-model="nombreProducto"
      label="Nombre del producto"
      :rules="[
        (val) => (val && val.length > 0) || 'Ingresa el nombre del producto',
      ]"
      ><template v-slot:append>
        <q-icon name="close" @click="nombre = ''" class="cursor-pointer" />
      </template>
    </q-input>
  </div>
  <div class="q-pa-sm col-12 col-md-6">
    <q-input
      filled
      :disable="habilitarCampos"
      ref="myref"
      v-model="origenProducto"
      label="Origen del producto"
      :rules="[
        (val) =>
          (val && val.length > 0) || 'Indica cual es el origen del producto',
      ]"
      ><template v-slot:append>
        <q-icon name="close" @click="nombre = ''" class="cursor-pointer" />
      </template>
    </q-input>
  </div>
  <div class="q-pa-sm col-12 col-md-6">
    <q-input
      filled
      :disable="habilitarCampos"
      ref="myref"
      v-model="detallesProducto"
      label="Detalles del producto"
      :rules="[(val) => (val && val.length > 0) || 'Describe el producto']"
      ><template v-slot:append>
        <q-icon name="close" @click="nombre = ''" class="cursor-pointer" />
      </template>
    </q-input>
  </div>
  <div class="q-pa-md q-gutter-md">
    <q-btn color="teal" @click="enviarFormulario">
      <q-icon left size="3em" name="save" />
      <div>Agregar nuevo proveedor</div>
    </q-btn>
    <q-btn color="brown-5" @click="guardarSiNO">
      <q-icon left size="3em" name="cancel" />
      <div>Cancelar</div>
    </q-btn>
  </div>
</template>
<script>
import moment from 'moment';
import 'moment/locale/es';
import { defineComponent, ref } from 'vue';
import { fetchWithBaseUrl } from 'src/router/api';
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
      detallesProducto: '',
      nombreProducto: '',
      origenProducto: '',

      dialogVisible: false,
    };
  },

  setup() {
    return {};
  },
  methods: {
    enviarFormulario() {
      // Aquí se emite el evento personalizado con los datos del formulario
      this.$emit('enviar-formulario', {
        cedula: this.cedula,
        nombre: this.nombre,
        correo: this.apellido,
        telefono: this.telefono,
        direccion: this.direccion,
        apellido: this.apellido,
      });
      this.dialogVisible = false;
    },

    showForm() {
      this.dialogVisible = true;
    },
    recargarTablaSocios() {
      this.$emit('getPosts');
    },
    obtenerFechaPorDefecto() {
      const fechaActual = new Date();
      const anio = fechaActual.getFullYear();
      const mes = fechaActual.getMonth() + 1;
      let mMes;
      if (mes < 10) {
        mMes = '0' + mes;
      }
      // Obtener el día del mes actual (1-31)
      const dia = fechaActual.getDate();
      let mfechaActual = anio + '-' + mMes + '-' + dia;
      console.log('fechas', mfechaActual);
      this.fechaRegistro = mfechaActual;
    },
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
    obtenerFechaDesdeString(str) {
      const result = moment(str).format('YYYY-MM-DD');
      console.log('result', result);
      return result;
    },
    guardarSiNO() {
      let camposIncorrectos = [];
      if (this.nombre == null || this.nombre == '') {
        camposIncorrectos.push('nombre');
      } else if (this.apellido == null || this.apellido == '') {
        camposIncorrectos.push('apellido');
      } else if (this.direccion == null || this.direccion == '') {
        camposIncorrectos.push('direccion');
      } else if (this.telefono == null || this.telefono == '') {
        camposIncorrectos.push('telefono');
      } else if (this.correo == null || this.correo == '') {
        camposIncorrectos.push('correo');
      } else if (this.nombreProducto == null || this.nombreProducto == '') {
        camposIncorrectos.push('nombre del producto');
      } else if (this.detallesProducto == null || this.detallesProducto == '') {
        camposIncorrectos.push('detalles del producto');
      } else if (this.origenProducto == null || this.origenProducto == '') {
        camposIncorrectos.push('origen del producto');
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
        this.guardarUsuario();
        //   // this.guardarAsociacion();

        //   this.$q.notify({
        //     message: '¿Quieres guardar estos datos?',
        //     icon: 'warning',
        //     actions: [
        //       {
        //         label: 'confirmar obtenerFechaDesdeString(this.fechaNacimiento);',
        //         color: 'positive',
        //         handler: () => {
        //           // Acciones a realizar cuando se selecciona "Sí"
        //           console.log('Se seleccionó "Sí"');
        //           console.log('Guardando...', camposIncorrectos);
        //           this.guardarUsuario();
        //         },
        //       },
        //       {
        //         label: 'cancelar',
        //         color: 'negative',
        //         handler: () => {
        //           // Acciones a realizar cuando se selecciona "No"
        //           console.log('Se seleccionó "No"');
        //           console.log(' Cancelando...', camposIncorrectos);
        //         },
        //       },
        //     ],
        //   });
      }
    },
    discapacidadSiNo() {
      if (this.discapacidad !== 'Si') {
        (this.tipoDiscapacidad = 'NA'),
          (this.gradoDiscapacidad = 'NA'),
          (this.idCarnetDiscapacidad = 'NA'),
          (this.habilitarCamposDiscapacidad = true);
      } else {
        (this.tipoDiscapacidad = ''),
          (this.gradoDiscapacidad = ''),
          (this.idCarnetDiscapacidad = ''),
          (this.habilitarCamposDiscapacidad = false);
      }
    },
    async guardarUsuario() {
      console.log('guardando1-3');
      if (this.usuarioEncontrado !== false) {
        console.log('guardando1-1');
        try {
          console.log('guardando1');
          const response = await this.$axios
            .post(
              '/usuarios/crearUsuario/' +
                this.idPersona +
                '/' +
                this.idasociacion,
              {
                //Datos de la familia del usuario
                jefeHogar: this.jefeHogar,
                numeroHijos: this.numeroHijos,
                numeroMiembros: this.numeroMiembros,
                //Datos de la vivienda del usuario
                propiedadVivienda: this.propiedadVivienda,
                aguaPotable: this.aguaPotable,
                luzElectrica: this.luzElectrica,
                servicioTelefono: this.servicioTelefono,
                // modeServicioElectricidad: ref(null),
                servicioInternet: this.servicioInternet,
                numeroDormitorios: this.numeroDormitorios,
                //datos del giro del usuario
                giro: this.giro,
                horarioAbierto: this.horarioAbierto,
                horarioCerrado: this.horarioCerrado,
                lugarAutorizado: this.lugarAutorizado,
                diasHorario: this.diasHorario,
                direccionLugarAutorizado: this.direccionLugarAutorizado,
                areaLocal: this.areaLocal,
                numeroLocal: this.numeroLocal,
                //data datos especificos del usuario
                carnetizado: this.carnetizado,
                categoria: this.categoria,
                registrado: this.registrado,
                estado: this.estado,
                //datos discapacidad sino del usuario
                discapacidad: this.discapacidad,
                idCarnetDiscapacidad: this.idCarnetDiscapacidad,
                idCarnet: this.idCarnet,
                tipoDiscapacidad: this.tipoDiscapacidad,
                gradoDiscapacidad: this.gradoDiscapacidad,
                //Datos especificos del usuario
                estadoCivil: this.estadoCivil,
                fechaNacimiento: this.obtenerFechaDesdeString(
                  this.fechaNacimiento
                ),
                fechaRegistro: this.obtenerFechaDesdeString(this.fechaRegistro),
                esDirectiva: 'No',
              },
              this.recargarTablaSocios()
            )
            .catch((error) => console.log('Error al guardar los datos', error));
          //   }catchError((err) => {
          //  this.$q.notify({
          //      message: 'Ha ocurrido un error' + err,
          // icon: 'warning',
          //   });
          //  });
          console.log(response.data);
          this.$q.notify({
            message: 'Has agregado un nuevo usuario',
            icon: 'warning',
          });
          this.recargarTablaSocios();
        } catch (error) {
          console.log(error.message);
          this.$q.notify({
            message: 'Ha ocurrido un error',
            icon: 'sad',
          });
        }
      }
      // if ((this.usuarioEncontrado = false))
      else {
        console.log('guardando-22');
        try {
          console.log('guardando2');
          const response = await this.$axios
            .post('/usuarios/guardarNuevoUsuario/' + this.idasociacion, {
              //Datos basicos del usuario
              nombre: this.nombre,
              apellido: this.apellido,
              cedula: this.cedula,
              direccion: this.direccion,
              telefono: this.telefono,
              correo: this.correo,
              //Datos de la familia del usuario
              jefeHogar: this.jefeHogar,
              numeroHijos: this.numeroHijos,
              numeroMiembros: this.numeroMiembros,
              //Datos de la vivienda del usuario
              propiedadVivienda: this.propiedadVivienda,
              aguaPotable: this.aguaPotable,
              luzElectrica: this.luzElectrica,
              servicioTelefono: this.servicioTelefono,
              // modeServicioElectricidad: ref(null),
              servicioInternet: this.servicioInternet,
              numeroDormitorios: this.numeroDormitorios,
              //datos del giro del usuario
              giro: this.giro,
              horarioAbierto: this.horarioAbierto,
              horarioCerrado: this.horarioCerrado,
              lugarAutorizado: this.lugarAutorizado,
              diasHorario: this.diasHorario,
              direccionLugarAutorizado: this.direccionLugarAutorizado,
              areaLocal: this.areaLocal,
              numeroLocal: this.numeroLocal,
              //data datos especificos del usuario
              carnetizado: this.carnetizado,
              categoria: this.categoria,
              registrado: this.registrado,
              estado: this.estado,
              //datos discapacidad sino del usuario
              discapacidad: this.discapacidad,
              idCarnetDiscapacidad: this.idCarnetDiscapacidad,
              idCarnet: this.idCarnet,
              tipoDiscapacidad: this.tipoDiscapacidad,
              gradoDiscapacidad: this.gradoDiscapacidad,
              //Datos especificos del usuario
              estadoCivil: this.estadoCivil,
              fechaNacimiento: this.obtenerFechaDesdeString(
                this.fechaNacimiento
              ),
              fechaRegistro: this.obtenerFechaDesdeString(this.fechaRegistro),
              esDirectiva: 'No',
            })
            .catch((error) => console.log('Error al guardar los datos', error));
          this.$q.notify({
            message: 'Has agregado un nuevo usuario',
            icon: 'warning',
          });
          this.recargarTablaSocios();
          console.log(response.data);
        } catch (error) {
          console.log(error.message);
          this.$q.notify({
            message: 'Ha ocurrido un error',
            icon: 'ups',
          });
        }
      }
    },

    async listarNombreAsociacion() {
      const id = (this.idAsociacion = this.idasociacion);
      console.log(
        'listar-nombre-ejecutandose-datos',
        this.idasociacion,
        this.idAsociacion
      );
      await fetchWithBaseUrl('/asociaciones/find/' + id)
        .then((response) => response.json())
        .then((data) => {
          this.nombreAsociacion = data.nombre;
        })
        .catch((error) => console.log(error));
    },
    async showData() {
      await this.listarDatos();
      await this.mostrarDatos(this.dataUsers);
    },
    buscarDatosPersona() {
      if (
        (this.cedula.length > 9 && this.cedula.length < 11) ||
        (this.cedula.length > 12 && this.cedula.length < 14)
      ) {
        // const cedula = this.cedula.split('a').join('');
        // fetchWithBaseUrl(
        //   '/usuarios/datosUsuarioPersonaPorCedula/' +
        //     cedula +
        //     '/' +
        //     this.idasociacion
        // )
        //   .then((response) => response.json())
        //   .then((data) => mostrarData(data))
        //   .then((dataUsers) => shows(dataUsers))
        //   .catch((error) => {
        //     console.log(error);
        //     this.usuarioEncontradoSiNo();
        //   });
        // const mostrarData = (data) => {
        //   console.log(data);
        //   if (data.nombre != undefined) {
        //     return (this.dataUsers = data);
        //   }
        //   return (this.dataUsers = data[0]);
        // };
        // const shows = (datos) => {
        //   //this.idUsuarioEditar = datos.id;
        //   this.idPersona = datos.id;
        //   this.nombre = datos.nombre;
        //   this.apellido = datos.apellido;
        //   this.telefono = datos.telefono;
        //   this.correo = datos.correo;
        //   this.direccion = datos.direccion;
        //   //Datos de la familia del usuario
        //   this.jefeHogar = datos.jefeHogar;
        //   this.numeroHijos = datos.numeroHijos;
        //   this.numeroMiembros = datos.numeroMiembros;
        //   //Datos de la vivienda del usuario
        //   this.propiedadVivienda = datos.propiedadVivienda;
        //   this.aguaPotable = datos.aguaPotable;
        //   this.luzElectrica = datos.luzElectrica;
        //   this.servicioTelefono = datos.telefono;
        //   // modeServicioElectricidad: ref(null);
        //   this.servicioInternet = datos.servicioInternet;
        //   this.numeroDormitorios = datos.numeroDormitorios;
        //   //datos del giro del usuario
        //   this.giro = datos.giro;
        //   this.horarioAbierto = datos.horarioAbierto;
        //   this.horarioCerrado = datos.horarioCerrado;
        //   this.lugarAutorizado = datos.lugarAutorizado;
        //   this.diasHorario = datos.diasHorario;
        //   this.direccionLugarAutorizado = datos.direccionLugarAutorizado;
        //   //data datos especificos del usuario
        //   this.carnetizado = datos.carnetizado;
        //   this.categoria = datos.categoria;
        //   this.registrado = datos.registrado;
        //   this.estado = datos.estado;
        //   //datos discapacidad sino del usuario
        //   this.discapacidad = datos.discapacidad;
        //   this.idCarnetDiscapacidad = datos.idCarnetDiscapacidad;
        //   this.idCarnet = datos.idCarnet;
        //   this.tipoDiscapacidad = datos.tipoDiscapacidad;
        //   this.gradoDiscapacidad = datos.gradoDiscapacidad;
        //   //Datos especificos del usuario
        //   this.estadoCivil = datos.estadoCivil;
        //   this.fechaNacimiento = datos.fechaNacimiento;
        //   this.fechaRegistro = datos.fechaRegistro;
        //   //datos directiva del usuario
        //   this.esDirectiva = datos.esDirectiva;

        //   this.usuarioEncontradoSiNo();
        this.habilitarCampos = false;
        // };
      } else if (this.cedula.length < 10 || this.cedula.length > 13) {
        this.limpiarCamposCedulaRucIncorrectos;
        this.$q.notify({
          message: 'Numero de cedula o ruc incorrecto' + this.cedula,
          icon: 'warning',
        });
      }
    },
    limpiarCamposCedulaRucIncorrectos() {
      if (this.cedula.length + 1 < 10 || this.cedula.length + 1 > 13) {
        this.nombre = '';
        this.apellido = '';
        this.telefono = '';
        this.correo = '';
        this.direccion = '';
        this.jefeHogar = '';
        this.numeroHijos = '';
        this.numeroMiembros = '';
        this.propiedadVivienda = '';
        this.aguaPotable = '';
        this.luzElectrica = '';
        this.servicioTelefono = '';
        this.servicioInternet = '';
        this.numeroDormitorios = '';
        this.giro = '';
        this.horarioAbierto = '';
        this.horarioCerrado = '';
        this.lugarAutorizado = '';
        this.diasHorario = '';
        this.direccionLugarAutorizado = '';
        this.carnetizado = '';
        this.categoria = '';
        this.registrado = '';
        this.estado = '';
        this.discapacidad = '';
        this.idCarnetDiscapacidad = '';
        this.idCarnet = '';
        this.tipoDiscapacidad = '';
        this.gradoDiscapacidad = '';
        this.estadoCivil = '';
        this.fechaNacimientothis = '';
        this.fechaRegistro = '';
      } else if (this.cedula.length == 1) {
        this.nombre = '';
        this.apellido = '';
        this.telefono = '';
        this.correo = '';
        this.direccion = '';
        this.jefeHogar = '';
        this.numeroHijos = '';
        this.numeroMiembros = '';
        this.propiedadVivienda = '';
        this.aguaPotable = '';
        this.luzElectrica = '';
        this.servicioTelefono = '';
        this.servicioInternet = '';
        this.numeroDormitorios = '';
        this.giro = '';
        this.horarioAbierto = '';
        this.horarioCerrado = '';
        this.lugarAutorizado = '';
        this.diasHorario = '';
        this.direccionLugarAutorizado = '';
        this.carnetizado = '';
        this.categoria = '';
        this.registrado = '';
        this.estado = '';
        this.discapacidad = '';
        this.idCarnetDiscapacidad = '';
        this.idCarnet = '';
        this.tipoDiscapacidad = '';
        this.gradoDiscapacidad = '';
        this.estadoCivil = '';
        this.fechaNacimientothis = '';
        this.fechaRegistro = '';
      }
    },
    async mostrarDatos(users) {
      this.listarDatos();
      this.nombre = users.nombre;
    },
    usuarioEncontradoSiNo() {
      if (this.nombre.length > 1) {
        if (this.estado != undefined) {
          this.$q.notify({
            message:
              'Este usuario ya ha sido registrado en esta asociacion ' +
              this.cedula,
            icon: 'warning',
          });
          this.habilitarCampos = true;
          this.usuarioEncontrado = null;
        } else {
          this.$q.notify({
            message: 'Datos encontrados' + this.cedula,
            icon: 'warning',
          });
          this.usuarioEncontrado = true;
          this.habilitarCampos = false;
        }
      } else {
        this.usuarioEncontrado = false;
        this.$q.notify({
          message: 'No existe un registro para ' + this.cedula,

          icon: 'warning',
        });
        this.usuarioEncontrado = false;
        this.habilitarCampos = false;
      }
      console.log('contenido nombre', this.nombre);
    },
  },
  mounted() {
    //   console.log('is Mounted');
    //   this.obtenerFechaPorDefecto();
  },
  created() {
    this.idAsociacion = this.idasociacion;
  },
  style: `
    .my-dialog-content {
      background-color: background: #00aaed;;
    }
  `,
  computed: {
    dialogContentClass() {
      return 'my-dialog-content';
    },
  },
});
</script>
