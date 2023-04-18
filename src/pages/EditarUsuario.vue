<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<template>
  <q-page padding>
    <div class="q-pa-lg row justify-center content-center">
      <span class="q-pa-md text-h3" style="text-align: center"
        >Informacion Personal</span
      >
      <div class="q-pa-sm col-12 col-md-8">
        <q-input
          filled
          v-model="cedula"
          label="Numero de Cedula"
          hint="Este campo es obligatorio"
        />
      </div>
      <div class="q-pa-sm col-12 col-md-6">
        <q-input
          filled
          v-model="nombre"
          label="Nombres"
          hint="Este campo es obligatorio"
        />
      </div>
      <div class="q-pa-sm col-12 col-md-6">
        <q-input
          filled
          type="text"
          v-model="apellido"
          label="Apellidos"
          hint="Este campo es obligatorio"
        />
      </div>
      <q-input
        class="q-pa-sm col-12 col-md-12"
        filled
        type="text"
        layout
        and
        grid
        v-model="direccion"
        label="Direccion"
        hint="Este campo es obligatorio"
      />
      <div class="q-pa-sm col-12 col-md-6">
        <q-input
          filled
          type="text"
          v-model="telefono"
          label="Numero de teléfono"
          hint="Este campo es obligatorio"
        />
      </div>
      <div class="q-pa-sm col-12 col-md-6">
        <q-input
          filled
          type="email"
          v-model="correo"
          label="E-mail"
          hint="Este campo es obligatorio"
        />
      </div>
    </div>
    <!--Datos de la familia del Usuario-->
    <div class="q-pa-lg">
      <div class="row justify-start">
        <div class="q-pa-sm col-12 col-md-7">
          <text-h1>Es jefe de hogar</text-h1>
          <q-btn-toggle
            v-model="jefeHogar"
            spread
            no-caps
            toggle-color="secondary"
            color="white"
            text-color="black"
            :options="[
              { label: 'Si', value: 'Si' },
              { label: 'No', value: 'No' },
            ]"
          />
        </div>
      </div>
      <div class="row justify-center">
        <div class="q-pa-sm col-12 col-md-6">
          <q-select
            filled
            v-model="numeroMiembros"
            use-input
            input-debounce="0"
            label="Miembros de la familia"
            :options="optionsMiembrosFamilia"
            @filter="filterFn"
            style="width: auto"
            behavior="menu"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey"> No results </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
        <div class="q-pa-sm col-12 col-md-6">
          <q-select
            filled
            v-model="numeroHijos"
            use-input
            input-debounce="0"
            label="Numero de hijos"
            :options="optionsNumeroHijos"
            @filter="filterFn"
            style="width: auto"
            behavior="menu"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey"> No results </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
      </div>
    </div>
    <!--Datos de la vivienda del usuario-->
    <div class="q-pa-lg row justify-center">
      <div class="q-pa-sm col-12 col-md-12">
        <text-h1>Vivienda</text-h1>
      </div>
      <div class="q-pa-sm col-12 col-md-4">
        <q-select
          filled
          v-model="propiedadVivienda"
          use-input
          input-debounce="0"
          label="Propiedad de la Vivienda"
          :options="optionsPropiedadVivienda"
          @filter="filterFn"
          style="width: auto"
          behavior="menu"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey"> No results </q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>
      <div class="q-pa-sm col-12 col-md-4">
        <q-select
          filled
          v-model="aguaPotable"
          use-input
          input-debounce="0"
          label="AguaPotable"
          :options="optionsAguaPotable"
          @filter="filterFn"
          style="width: auto"
          behavior="menu"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey"> No results </q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>
      <div class="q-pa-sm col-12 col-md-4">
        <q-select
          filled
          v-model="luzElectrica"
          use-input
          input-debounce="0"
          label="Luz Eléctrica"
          :options="optionsElectricidad"
          @filter="filterFn"
          style="width: auto"
          behavior="menu"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey"> No results </q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>
      <div class="q-pa-sm col-12 col-md-4">
        <q-select
          filled
          v-model="servicioTelefono"
          use-input
          input-debounce="0"
          label="Servicio de telefono"
          :options="optionsServicioTelefono"
          @filter="filterFn"
          style="width: auto"
          behavior="menu"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey"> No results </q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>
      <div class="q-pa-sm col-12 col-md-4">
        <q-select
          filled
          v-model="servicioInternet"
          use-input
          input-debounce="0"
          label="Servicio de Internet"
          :options="optionsServicioInternet"
          @filter="filterFn"
          style="width: auto"
          behavior="menu"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey"> No results </q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>
      <div class="q-pa-sm col-12 col-md-4">
        <q-select
          filled
          v-model="numeroDormitorios"
          use-input
          input-debounce="0"
          label="Numero de doritorios"
          :options="optionsNumeroDormitorios"
          @filter="filterFn"
          style="width: auto"
          behavior="menu"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey"> No results </q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>
    </div>
    <!--Datos que discapacidad sino del usuario-->
    eqfasfa
    <div class="row justify-start">
      <div class="q-pa-sm col-12 col-md-7">
        <text-h1>Tiene alguna discapacidad</text-h1>
        <q-btn-toggle
          v-model="discapacidad"
          spread
          no-caps
          toggle-color="secondary"
          color="white"
          text-color="black"
          :options="[
            { label: 'Si', value: 'Si' },
            { label: 'No', value: 'No' },
          ]"
        />
      </div>
    </div>
    <div class="q-pa-lg row justify-center">
      <div class="q-pa-sm col-12 col-md-4">
        <q-input
          filled
          v-model="tipoDiscapacidad"
          label="Tipo de discapacidad"
          hint="Este campo es obligatorio"
        />
      </div>
      <div class="q-pa-sm col-12 col-md-4">
        <q-input
          filled
          v-model="gradoDiscapacidad"
          label="Grado de diacapacidad"
          hint="Este campo es obligatorios"
        />
      </div>
      <div class="q-pa-sm col-12 col-md-4">
        <q-input
          filled
          v-model="idCarnetDiscapacidad"
          label="Numero carnet de discapacidad"
          hint="Este campo es obligatorio"
        />
        <!--Asociacion a la que pertenece el usuario-->
      </div>
    </div>

    <div class="q-pa-sm row justify-center">
      <div class="q-pa-sm col-12 col-md-12">
        <tabla-asociaciones @idAsociacion="obIdAsociacion" />
        Idvalue{{ idAsociacion }}
      </div>
    </div>

    <!--Datos de si el usuario pertenece a la directiva-->
    <div class="row justify-start">
      <div class="q-pa-sm col-12 col-md-7">
        <text-h1>Pertenece a la Directiva</text-h1>
        <q-btn-toggle
          v-model="esDirectiva"
          spread
          no-caps
          toggle-color="secondary"
          color="white"
          text-color="black"
          :options="[
            { label: 'Si', value: 'Si' },
            { label: 'No', value: 'No' },
          ]"
        />
      </div>
    </div>
    <div class="q-pa-lg row justify-center">
      <div class="q-pa-sm col-12 col-md-6">
        <q-select
          filled
          v-model="cargo"
          use-input
          input-debounce="0"
          label="Cargo"
          :options="optionsCargo"
          @filter="filterFn"
          style="width: auto"
          behavior="menu"
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
          v-model="fechaInicio"
          label="Fecha de inicio"
          hint="Este campo es obligatorio"
        />
      </div>
    </div>
    <!--Datos especificos del usuario-->
    <div class="q-pa-lg row justify-center">
      <div class="q-pa-sm col-12 col-md-4">
        <q-select
          filled
          v-model="categoria"
          input-debounce="0"
          label="Categoría"
          :options="options"
          @filter="filterFn"
          style="width: auto"
          behavior="menu"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey"> No results </q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>
      <div class="q-pa-sm col-12 col-md-4">
        <q-select
          filled
          v-model="carnetizado"
          input-debounce="0"
          label="Carnetizado"
          :options="options1"
          style="width: auto"
          @filter="filterFn"
          behavior="menu"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey"> No results </q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>
      <div class="q-pa-sm col-12 col-md-4">
        <q-select
          filled
          v-model="estado"
          use-input
          input-debounce="0"
          label="Estado"
          :options="options2"
          @filter="filterFn"
          style="width: auto"
          behavior="menu"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey"> No results </q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>
      <div class="q-pa-sm col-12 col-md-4">
        <q-input
          filled
          type="number"
          v-model="idCarnet"
          label="Carnet"
          hint="Este campo es obligatorio"
        />
      </div>
      <div class="q-pa-sm col-12 col-md-4">
        <q-select
          filled
          v-model="registrado"
          use-input
          input-debounce="0"
          label="Registrado"
          :options="options1"
          @filter="filterFn"
          style="width: auto"
          behavior="menu"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey"> No results </q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>
      <div class="q-pa-sm col-12 col-md-4">
        <q-select
          filled
          v-model="estadoCivil"
          use-input
          input-debounce="0"
          label="Estado civil"
          :options="optionsEstadoCivil"
          @filter="filterFn"
          style="width: auto"
          behavior="menu"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey"> No results </q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>
      <div class="q-pa-sm col-12 col-md-5">
        <q-input
          filled
          v-model="fechaRegistro"
          label="Fecha de registro"
          hint="Este campo es obligatorio"
        />
      </div>
      <div class="q-pa-sm col-12 col-md-5">
        <q-input
          filled
          v-model="fechaNacimiento"
          label="Fecha de nacimiento"
          hint="Este campo es obligatorio"
        />
      </div>
    </div>
    <!--Datos del giro del usuario-->
    <div class="q-pa-lg row justify-center content-center">
      <span class="q-pa-md text-h3" style="text-align: center"
        >Informacion Personal del Giro</span
      >
      <div class="q-pa-sm col-12 col-md-6">
        <q-select
          filled
          v-model="giro"
          use-input
          input-debounce="0"
          label="Tipo de giro"
          :options="optionsTipoGiro"
          @filter="filterFn"
          style="width: auto"
          behavior="menu"
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
          v-model="lugarAutorizado"
          label="Lugar Autorizado"
          hint="Este campo es obligatorio"
        />
      </div>
      <div class="q-pa-sm col-12 col-md-12">
        <q-input
          filled
          v-model="direccionLugarAutorizado"
          label="Direccion Lugar Autorizado"
          hint="Este campo es obligatorio"
        />
      </div>
      <div class="q-pa-sm col-12 col-md-12">
        <span class="q-pa-sm text-h3" style="text-align: start"
          >Dias de la semana</span
        >
      </div>
      <div class="q-pa-sm col-12 col-md-6">
        <q-select
          filled
          v-model="diasHorario"
          use-input
          input-debounce="0"
          label="Dias de atencion"
          :options="optionsDiasHorario"
          @filter="filterFn"
          style="width: auto"
          behavior="menu"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey"> No results </q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>
      <div class="q-pa-sm col-12 col-md-12">
        <span class="q-pa-sm text-h3" style="text-align: start">Horarios</span>
      </div>
      <div class="q-pa-sm col-12 col-md-5">
        <q-input
          v-model="horarioAbierto"
          filled
          type="time"
          hint="Native time"
        />
      </div>
      <div class="q-pa-sm col-12 col-md-5">
        <q-input
          v-model="horarioCerrado"
          filled
          type="time"
          hint="Native time"
        />
      </div>
    </div>
    <div class="q-pa-md q-gutter-md">
      <q-btn color="teal" @click="editarUsuario">
        <q-icon left size="3em" name="save" />
        <div>Guardar cambios usuario</div>
      </q-btn>
    </div>
    <div class="q-pa-md q-gutter-md">
      <q-btn color="teal" @click="mostrarDatos(this.dataUsers)">
        <q-icon left size="3em" name="save" />
        <div>sdfghadfhasdfhrad</div>
      </q-btn>
    </div>
  </q-page>
</template>
<script>
import TablaAsociaciones from 'src/components/Tabla.Asociaciones.vue';
import { defineComponent, ref } from 'vue';
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
  components: { TablaAsociaciones },
  //otra forma de declarar data
  data() {
    return {
      idUsuario: this.$route.params.idusuario,
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
      //datos del giro del usuario
      lugarAutorizado: '',
      direccionLugarAutorizado: '',
      //idAscociacion
      idAsociacion: '',
      //Obtener id Usuario a editar
      idUsuarioEditar: '',
      dataUsers: [],
      xx: '',
      x: '',
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
  mounted() {
    this.showData();
    this.mostrarDatos(this.dataUsers);
  },
  methods: {
    async guardarUsuario() {
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
        console.log(response.data);
      } catch (error) {
        console.log(error.message);
      }
    },
    obIdAsociacion(value) {
      this.idAsociacion = value;
    },
    async showData() {
      await this.listarDatos();
      await this.mostrarDatos(this.dataUsers);
    },
    async listarDatos() {
      fetch('http://localhost:3000/usuarios/selectUser/1')
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
        this.esDirectiva = datos.esDirectiva;
        this.fechaInicio = datos.fechaInicio;
      };
    },
    async mostrarDatos(users) {
      this.nombre = users.nombre;
    },
  },
});
</script>
