<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<template>
  <q-page padding @click="listarNombreAsociacion">
    <div class="q-pa-lg row justify-center content-center">
      <span class="q-pa-md text-h3" style="text-align: center"
        >Nueva Directiva</span
      >Recibiendo IdAsociacion{{ idAsociacion }}

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
          :readonly="true"
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
          filled
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

    <!--Datos especificos del usuario-->
    <!--Datos del giro del usuario-->
    <div class="q-pa-md q-gutter-md">
      <q-btn color="teal" @click="guardarUsuario">
        <q-icon left size="3em" name="save" />
        <div>Guardar</div>
      </q-btn>
    </div>
    <div class="q-pa-md q-gutter-md">
      <q-btn color="teal" @click="listarNombreAsociacion">
        <q-icon left size="3em" name="save" />
        <div>listar</div>
      </q-btn>
    </div>
  </q-page>
</template>
<script>
import TablaAsociaciones from 'src/components/Tabla.Asociaciones.vue';
import { defineComponent, ref } from 'vue';
import { Notify, useQuasar } from 'quasar';
const stringOptions = ['Fijo', 'No fijo'];
const stringOptions1 = ['Si', 'No'];
const stringOptions2 = ['Activo', 'Innactivo'];
const stringOptionsEstadoCivil = [
  'Soltero',
  'Casado',
  'Divorciado',
  'Viudo',
  'Union Libre',
];
// datos del la familia del usuario
const stringOptionsMiembrosFamilia = ['1', '2', '3', '4', '5', '+5'];
const stringOptionsNumeroHijos = ['1', '2', '3', '4', '5', '+5'];
//datos de la vivienda del usuario
const stringOptionsPropiedadVivienda = ['Propia', 'Arrendada'];
const stringOptionsSiNo = ['Si', 'No'];
const stringOptionsNumeroDormitorios = ['1', '2', '3', '4', '5', '+5'];
//datos de la directiva del usuario
const stringOptionsCargo = ['Administrador', 'Usuario'];
//datos del giro del usuario
const stringOptionsTipoGiro = ['Frutas', 'Verduras'];
const stringOptionsDiasHorario = [
  'Lunes-Viernes',
  'Lunes-Domingo',
  'Sabado-Domingo',
  'Lunes-Sabado',
];

export default defineComponent({
  //components: { TablaAsociaciones },
  //otra forma de declarar data
  props: {
    idasociacion: String,
    idusuario: String,
  },
  data: function () {
    return {
      nombre: '',
      apellido: '',
      cedula: '',
      direccion: '',
      telefono: '',
      correo: '',
      tipoGiro: '',
      //data datos especificos del usuario
      fechaNacimiento: '',
      fechaRegistro: '',
      idCarnet: '',
      //datos discapacidad sino del usuario
      tipoDiscapacidad: '',
      gradoDiscapacidad: '',
      idCarnetDiscapacidad: '',
      //datos directiva del usuario
      fechaInicio: '',
      fechaFin: '',
      //datos del giro del usuario
      lugarAutorizado: '',
      direccionLugarAutorizado: '',
      //idAscociacion
      idAsociacion: '',
      nombreAsociacion: '',
    };
  },

  setup() {
    const options = ref(stringOptions);
    const options1 = ref(stringOptions1);
    const options2 = ref(stringOptions2);
    const optionsEstadoCivil = ref(stringOptionsEstadoCivil);
    //Datos de la familia del usuario
    const optionsMiembrosFamilia = ref(stringOptionsMiembrosFamilia);
    const optionsNumeroHijos = ref(stringOptionsNumeroHijos);
    //Datos de la vivienda del usuario
    const optionsPropiedadVivienda = ref(stringOptionsPropiedadVivienda);
    const optionsAguaPotable = ref(stringOptionsSiNo);
    const optionsServicioTelefono = ref(stringOptionsSiNo);
    const optionsServicioInternet = ref(stringOptionsSiNo);
    const optionsElectricidad = ref(stringOptionsSiNo);
    const optionsNumeroDormitorios = ref(stringOptionsNumeroDormitorios);
    //datos de la dirctiva del usuario
    const optionsCargo = ref(stringOptionsCargo);
    //datos tipo giro del usuario
    const optionsTipoGiro = ref(stringOptionsTipoGiro);
    const optionsDiasHorario = ref(stringOptionsDiasHorario);
    const $q = useQuasar();

    return {
      //Retorno de datos especificos del usuario
      //modeltoggle: ref('one'),
      categoria: ref(null),
      carnetizado: ref(null),
      estado: ref(null),
      registrado: ref(null),
      estadoCivil: ref(null),
      stringOptions,
      stringOptions1,
      stringOptions2,
      stringOptionsEstadoCivil,
      options,
      options1,
      options2,
      optionsEstadoCivil,
      //retorno de datos del la familia del  usuario
      numeroHijos: ref(null),
      numeroMiembros: ref(null),
      stringOptionsMiembrosFamilia,
      stringOptionsNumeroHijos,
      optionsMiembrosFamilia,
      optionsNumeroHijos,
      //Retorno de datos de la vivienda del usuario
      propiedadVivienda: ref(null),
      aguaPotable: ref(null),
      luzElectrica: ref(null),
      servicioTelefono: ref(null),
      modeServicioElectricidad: ref(null),
      servicioInternet: ref(null),
      numeroDormitorios: ref(null),
      stringOptionsPropiedadVivienda,
      stringOptionsNumeroDormitorios,
      stringOptionsSiNo,
      stringOptionsDiasHorario,
      optionsPropiedadVivienda,
      optionsNumeroDormitorios,
      optionsAguaPotable,
      optionsServicioTelefono,
      optionsElectricidad,
      optionsServicioInternet,
      //datos directiva del usuario
      cargo: ref(null),
      stringOptionsCargo,
      optionsCargo,
      //datos del giro del usuario
      discapacidad: ref('null'),
      jefeHogar: ref('null'),
      esDirectiva: ref('null'),
      giro: ref(null),
      lunes: ref(false),
      martes: ref(false),
      miercoles: ref(false),
      jueves: ref(false),
      viernes: ref(false),
      sabado: ref(false),
      domingo: ref(false),
      horarioAbierto: ref(''),
      horarioCerrado: ref(''),
      stringOptionsTipoGiro,
      optionsTipoGiro,
      optionsDiasHorario,
      diasHorario: ref(null),
      modelDirectiva: ref('null'),
      modelDiscapacidad: ref('null'),

      //Filtro de los qselect datos especificos del usario
      filterFn(val, update) {
        if (val === '') {
          update(() => {
            options.value = stringOptions;
            options1.value = stringOptions1;
            options2.value = stringOptions2;
            optionsEstadoCivil.value = stringOptionsEstadoCivil;
            //datos de la familia del usuario
            optionsMiembrosFamilia.value = stringOptionsMiembrosFamilia;
            optionsNumeroHijos.value = stringOptionsNumeroHijos;
            //datos de la vivienda del usuario
            optionsPropiedadVivienda.value = stringOptionsPropiedadVivienda;
            optionsAguaPotable.value = stringOptionsSiNo;
            optionsElectricidad.value = stringOptionsSiNo;
            optionsServicioTelefono.value = stringOptionsSiNo;
            optionsServicioInternet.value = stringOptionsSiNo;
            optionsNumeroDormitorios.value = stringOptionsNumeroDormitorios;
            //datos directiva del usuario
            optionsCargo.value = stringOptionsCargo;
            //datos del giro del usuario
            optionsTipoGiro.value = stringOptionsTipoGiro;
            optionsDiasHorario.value = stringOptionsDiasHorario;
          });
          return;
        }
      },
    };
  },
  methods: {
    async guardarUsuario() {
      if (this.esDirectiva === 'Si') {
        try {
          const response = await this.$axios.post(
            'http://localhost:3000/usuarios/usersDataDirectiva/' +
              this.idAsociacion,
            {
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
              //Datos si es directiva
              esDirectiva: this.esDirectiva,
              cargo: this.cargo,
              fechaInicio: this.fechaInicio,
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
              fechaNacimiento: this.fechaNacimiento,
              fechaRegistro: this.fechaRegistro,
              //datos directiva del usuario
              esDirectiva: this.esDirectiva,
              fechaInicio: this.fechaInicio,
              fechaFin: this.fechaFin,
            }
          );
          //---Notificar que se guardaron los datos
          alert('Acepta los  terminos del formulario');
          console.log(response.data);
        } catch (error) {
          console.log(error.message);
          alert('Acepta los  terminos del formulario');
        }
      } else {
        try {
          const response = await this.$axios.post(
            'http://localhost:3000/usuarios/usersData/' + this.idAsociacion,
            {
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
              fechaNacimiento: this.fechaNacimiento,
              fechaRegistro: this.fechaRegistro,

              //datos directiva del usuario
              esDirectiva: this.esDirectiva,
              fechaInicio: this.fechaInicio,
            }
          );
          //---Notificar que se guardaron los datos
          alert('Acepta los  terminos del formulario');
          console.log(response.data);
        } catch (error) {
          console.log(error.message);
          alert('Acepta los  terminos del formulario');
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
      await fetch('http://localhost:3000/asociaciones/find/' + id)
        .then((response) => response.json())
        .then((data) => {
          this.nombreAsociacion = data.nombre;
        })
        .catch((error) => console.log(error));
    },
    async listarDatos() {
      console.log('ejecutandose', this.idUsuario);
      fetch(
        'http://localhost:3000/usuarios/usuarioDirectivaAsociacion/' +
          this.idasociacion +
          '/' +
          this.idusuario
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
        //Datos de la familia del usuario
        this.jefeHogar = datos.jefeHogar;
        this.numeroHijos = datos.numeroHijos;
        this.numeroMiembros = datos.numeroMiembros;
        //Datos de la vivienda del usuario
        this.propiedadVivienda = datos.propiedadVivienda;
        this.aguaPotable = datos.aguaPotable;
        this.luzElectrica = datos.luzElectrica;
        this.servicioTelefono = datos.telefono;
        // modeServicioElectricidad: ref(null);
        this.servicioInternet = datos.servicioInternet;
        this.numeroDormitorios = datos.numeroDormitorios;
        //datos del giro del usuario
        this.giro = datos.giro;
        this.horarioAbierto = datos.horarioAbierto;
        this.horarioCerrado = datos.horarioCerrado;
        this.lugarAutorizado = datos.lugarAutorizado;
        this.diasHorario = datos.diasHorario;
        this.direccionLugarAutorizado = datos.direccionLugarAutorizado;
        //data datos especificos del usuario
        this.carnetizado = datos.carnetizado;
        this.categoria = datos.categoria;
        this.registrado = datos.registrado;
        this.estado = datos.estado;
        //datos discapacidad sino del usuario
        this.discapacidad = datos.discapacidad;
        this.idCarnetDiscapacidad = datos.idCarnetDiscapacidad;
        this.idCarnet = datos.idCarnet;
        this.tipoDiscapacidad = datos.tipoDiscapacidad;
        this.gradoDiscapacidad = datos.gradoDiscapacidad;
        //Datos especificos del usuario
        this.estadoCivil = datos.estadoCivil;
        this.fechaNacimiento = datos.fechaNacimiento;
        this.fechaRegistro = datos.fechaRegistro;
        //datos directiva del usuario
        this.cargo = datos.cargo;
        this.esDirectiva = datos.esDirectiva;
        this.fechaInicio = datos.fechaInicio;
        this.fechaFin = datos.fechaFin;
      };
    },
  },
  mounted() {
    console.log('is Mounted');
  },
  created() {
    this.idAsociacion = this.idasociacion;
  },
});
</script>
