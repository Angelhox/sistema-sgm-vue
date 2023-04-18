<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<template>
  <q-page padding>
    <div class="q-pa-sm row justify-center content-center">
      <h3 class="text-h3" style="text-align: center">Actualizar asociación</h3>
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
          @input="buscarDatosPersona"
          @change="buscarDatosPersona"
          @update:model-value="buscarDatosPersona"
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
            (val) =>
              (val && val.length > 0) || 'Ingresa los nombres del usuario',
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
          (val) =>
            (val && val.length > 0) || 'Ingresa los direccion del usuario',
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
              (val && val.length > 0 && val.length < 10) ||
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

    <!--Datos especificos del usuario-->
    <div class="q-pa-lg row justify-center">
      <div class="q-pa-sm col-12 col-md-4">
        <q-select
          filled
          :disable="habilitarCampos"
          v-model="categoria"
          input-debounce="0"
          label="Categoría"
          :options="options"
          @filter="filterFn"
          style="width: auto"
          behavior="menu"
          :rules="[
            (val) => (val && val.length > 0) || 'Elija una de las opciones',
          ]"
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
          :disable="habilitarCampos"
          v-model="carnetizado"
          input-debounce="0"
          label="Carnetizado"
          :options="options1"
          style="width: auto"
          @filter="filterFn"
          behavior="menu"
          :rules="[
            (val) => (val && val.length > 0) || 'Elija una de las opciones',
          ]"
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
          :disable="habilitarCampos"
          v-model="estado"
          use-input
          input-debounce="0"
          label="Estado"
          :options="options2"
          @filter="filterFn"
          style="width: auto"
          behavior="menu"
          :rules="[
            (val) => (val && val.length > 0) || 'Elija una de las opciones',
          ]"
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
          :disable="habilitarCampos"
          type="number"
          v-model="idCarnet"
          label="Carnet"
          :rules="[
            (val) =>
              (val && val.length > 0 && val.length < 13) ||
              'Ingresa un numero de carnet válido',
          ]"
        />
      </div>
      <div class="q-pa-sm col-12 col-md-4">
        <q-select
          filled
          :disable="habilitarCampos"
          v-model="registrado"
          input-debounce="0"
          label="Registrado"
          :options="options1"
          @filter="filterFn"
          style="width: auto"
          behavior="menu"
          :rules="[
            (val) => (val && val.length > 0) || 'Elija una de las opciones',
          ]"
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
          :disable="habilitarCampos"
          v-model="estadoCivil"
          input-debounce="0"
          label="Estado civil"
          :options="optionsEstadoCivil"
          @filter="filterFn"
          style="width: auto"
          behavior="menu"
          :rules="[
            (val) => (val && val.length > 0) || 'Elija una de las opciones',
          ]"
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
          label="Fecha de nacimiento"
          filled
          v-model="fechaNacimiento"
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
                <q-date v-model="fechaNacimiento">
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
          label="Fecha de registro"
          filled
          v-model="fechaRegistro"
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
                <q-date v-model="fechaRegistro">
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
    <div class="q-pa-sm col-12 col-12">
      <q-toolbar class="bg-orange shadow-2 rounded-borders">
        <q-btn flat round dense icon="info" class="q-mr-sm" />

        <q-separator vertical inset />

        <q-btn stretch flat label="Datos familiares del nuevo usuario" />

        <q-space />
      </q-toolbar>
    </div>
    <!--Datos de la familia del Usuario-->
    <div class="q-pa-lg">
      <div class="row justify-start"></div>
      <div class="row justify-center">
        <div class="q-pa-sm col-12 col-md-6">
          <q-select
            filled
            :disable="habilitarCampos"
            v-model="jefeHogar"
            input-debounce="0"
            label="Es jefe de hogar"
            :options="optionsJefeHogar"
            @filter="filterFn"
            style="width: auto"
            behavior="menu"
            :rules="[
              (val) => (val && val.length > 0) || 'Elija una de las opciones',
            ]"
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
            :disable="habilitarCampos"
            v-model="numeroMiembros"
            input-debounce="0"
            label="Miembros de la familia"
            :options="optionsMiembrosFamilia"
            @filter="filterFn"
            style="width: auto"
            behavior="menu"
            :rules="[
              (val) => (val && val.length > 0) || 'Elija una de las opciones',
            ]"
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
            :disable="habilitarCampos"
            v-model="numeroHijos"
            input-debounce="0"
            label="Numero de hijos"
            :options="optionsNumeroHijos"
            @filter="filterFn"
            style="width: auto"
            behavior="menu"
            :rules="[
              (val) => (val && val.length > 0) || 'Elija una de las opciones',
            ]"
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
    <div class="q-pa-sm col-12 col-12">
      <q-toolbar class="bg-orange shadow-2 rounded-borders">
        <q-btn flat round dense icon="info" class="q-mr-sm" />

        <q-separator vertical inset />

        <q-btn stretch flat label="Datos vivienda del nuevo usuario" />

        <q-space />
      </q-toolbar>
    </div>
    <!--Datos de la vivienda del usuario-->
    <div class="q-pa-lg row justify-center">
      <div class="q-pa-sm col-12 col-md-4">
        <q-select
          filled
          :disable="habilitarCampos"
          v-model="propiedadVivienda"
          input-debounce="0"
          label="Propiedad de la Vivienda"
          :options="optionsPropiedadVivienda"
          @filter="filterFn"
          style="width: auto"
          behavior="menu"
          :rules="[
            (val) => (val && val.length > 0) || 'Elija una de las opciones',
          ]"
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
          :disable="habilitarCampos"
          v-model="aguaPotable"
          input-debounce="0"
          label="AguaPotable"
          :options="optionsAguaPotable"
          @filter="filterFn"
          style="width: auto"
          behavior="menu"
          :rules="[
            (val) => (val && val.length > 0) || 'Elija una de las opciones',
          ]"
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
          :disable="habilitarCampos"
          v-model="luzElectrica"
          input-debounce="0"
          label="Luz Eléctrica"
          :options="optionsElectricidad"
          @filter="filterFn"
          style="width: auto"
          behavior="menu"
          :rules="[
            (val) => (val && val.length > 0) || 'Elija una de las opciones',
          ]"
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
          :disable="habilitarCampos"
          v-model="servicioTelefono"
          input-debounce="0"
          label="Servicio de telefono"
          :options="optionsServicioTelefono"
          @filter="filterFn"
          style="width: auto"
          behavior="menu"
          :rules="[
            (val) => (val && val.length > 0) || 'Elija una de las opciones',
          ]"
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
          :disable="habilitarCampos"
          v-model="servicioInternet"
          input-debounce="0"
          label="Servicio de Internet"
          :options="optionsServicioInternet"
          @filter="filterFn"
          style="width: auto"
          behavior="menu"
          :rules="[
            (val) => (val && val.length > 0) || 'Elija una de las opciones',
          ]"
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
          :disable="habilitarCampos"
          v-model="numeroDormitorios"
          input-debounce="0"
          label="Numero de doritorios"
          :options="optionsNumeroDormitorios"
          @filter="filterFn"
          style="width: auto"
          behavior="menu"
          :rules="[
            (val) => (val && val.length > 0) || 'Elija una de las opciones',
          ]"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey"> No results </q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>
    </div>
    <div class="q-pa-sm col-12 col-12">
      <q-toolbar class="bg-orange shadow-2 rounded-borders">
        <q-btn flat round dense icon="info" class="q-mr-sm" />

        <q-separator vertical inset />

        <q-btn stretch flat label="Datos discapacidades" />

        <q-space />
      </q-toolbar>
    </div>
    <!--Datos que discapacidad sino del usuario-->

    <div class="q-pa-lg row justify-center">
      <div class="q-pa-sm col-12 col-md-6">
        <q-select
          filled
          :disable="habilitarCampos"
          v-model="discapacidad"
          @update:model-value="discapacidadSiNo"
          input-debounce="0"
          label="Tiene alguna discapacidad"
          :options="optionsDiscapacidad"
          @filter="filterFn"
          style="width: auto"
          behavior="menu"
          :rules="[
            (val) => (val && val.length > 0) || 'Elija una de las opciones',
          ]"
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
          :disable="habilitarCamposDiscapacidad"
          v-model="tipoDiscapacidad"
          label="Tipo de discapacidad"
          :rules="[
            (val) =>
              (val && val.length > 0) ||
              'Describa el tipo de discapacidad del usuario',
          ]"
        />
      </div>
      <div class="q-pa-sm col-12 col-md-4">
        <q-input
          filled
          :disable="habilitarCamposDiscapacidad"
          v-model="gradoDiscapacidad"
          label="Grado de diacapacidad"
          :rules="[
            (val) =>
              (val && val.length > 0) ||
              'Indique el grado de discapacidad del usuario',
          ]"
        />
      </div>
      <div class="q-pa-sm col-12 col-md-4">
        <q-input
          filled
          :disable="habilitarCamposDiscapacidad"
          v-model="idCarnetDiscapacidad"
          label="Numero carnet de discapacidad"
          :rules="[
            (val) =>
              (val && val.length > 0 && val.length < 13) ||
              'Ingrese un numero de carnet válido',
          ]"
        />
        <!--Asociacion a la que pertenece el usuario-->
      </div>
    </div>

    <div class="q-pa-sm col-12 col-12">
      <q-toolbar class="bg-orange shadow-2 rounded-borders">
        <q-btn flat round dense icon="info" class="q-mr-sm" />

        <q-separator vertical inset />

        <q-btn stretch flat label="Datos Directiva del nuevo usuario" />

        <q-space />
      </q-toolbar>
    </div>

    <!--Datos de si el usuario pertenece a la directiva-->

    <!--Datos del giro del usuario-->
    <div class="q-pa-lg row justify-center content-center">
      <div class="q-pa-sm col-12 col-md-6">
        <q-select
          filled
          :disable="usuarioEncontrado"
          v-model="giro"
          input-debounce="0"
          label="Tipo de giro"
          :options="optionsTipoGiro"
          @filter="filterFn"
          style="width: auto"
          behavior="menu"
          :rules="[
            (val) => (val && val.length > 0) || 'Elija una de las opciones',
          ]"
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
          :disable="usuarioEncontrado"
          v-model="lugarAutorizado"
          label="Lugar Autorizado"
          :rules="[
            (val) =>
              (val && val.length > 0) ||
              'Ingrese el lugar donde el usuario realiza sus actividades',
          ]"
        />
      </div>
      <div class="q-pa-sm col-6 col-md-6">
        <q-input
          filled
          :disable="usuarioEncontrado"
          v-model="direccionLugarAutorizado"
          label="Direccion Lugar Autorizado"
          :rules="[
            (val) =>
              (val && val.length > 0) ||
              'Ingrese la direcion del lugar autorizado del usuario',
          ]"
        />
      </div>

      <div class="q-pa-sm col-6 col-md-3">
        <q-input
          :disable="usuarioEncontrado"
          v-model="horarioAbierto"
          filled
          type="time"
          hint="Hora de apertura"
          :rules="[
            (val) =>
              (val && val.length > 0) || 'Ingrese un horario de apertura',
          ]"
        />
      </div>
      <div class="q-pa-sm col-12 col-md-3">
        <q-input
          :disable="usuarioEncontrado"
          v-model="horarioCerrado"
          filled
          type="time"
          hint="Hora de cierre"
          :rules="[
            (val) => (val && val.length > 0) || 'Ingrese un horario de cierre',
          ]"
        />
      </div>

      <div class="q-pa-sm col-12 col-md-6">
        <q-select
          filled
          :disable="usuarioEncontrado"
          v-model="diasHorario"
          input-debounce="0"
          label="Dias de atencion"
          :options="optionsDiasHorario"
          @filter="filterFn"
          style="width: auto"
          behavior="menu"
          :rules="[
            (val) => (val && val.length > 0) || ' Elija una de las opciones',
          ]"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey"> No results </q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>
    </div>
    <div class="q-pa-md q-gutter-md">
      <q-btn color="teal" @click="guardarSiNO">
        <q-icon left size="3em" name="save" />
        <div>Guardar cambios usuario</div>
      </q-btn>
      <q-btn color="brown-5" @click="cancelarSiNO">
        <q-icon left size="3em" name="cancel" />
        <div>Cancelar</div>
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
  components: {},
  //otra forma de declarar data
  props: {
    idusuario: String,
    idasociacion: String,
  },
  data() {
    return {
      //idUsuario: this.$route.params.idusuario,
      idUsuario: this.idusuario,
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
      idAsociacion: this.idasociacion,
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
    const optionsJefeHogar = ref(stringOptionsSiNo);
    const optionsDirectiva = ref(stringOptionsSiNo);
    const optionsDiscapacidad = ref(stringOptionsSiNo);
    return {
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
      discapacidad: ref(null),
      jefeHogar: ref(null),
      esDirectiva: ref(null),
      giro: ref(null),

      horarioAbierto: ref(''),
      horarioCerrado: ref(''),
      stringOptionsTipoGiro,
      optionsTipoGiro,
      optionsDiasHorario,
      diasHorario: ref(null),
      modelDirectiva: ref('null'),
      modelDiscapacidad: ref('null'),
      optionsJefeHogar,
      optionsDirectiva,
      optionsDiscapacidad,
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
            optionsJefeHogar.value = stringOptionsSiNo;
            optionsDirectiva.value = stringOptionsSiNo;
            optionsDiscapacidad.value = stringOptionsSiNo;
          });
          return;
        }
      },
    };
  },
  mounted() {
    this.discapacidadSiNo();
    this.idUsuario = this.idusuario;
    console.log('idUSuario recibido desde mounted');
    //this.showData();
    //this.mostrarDatos(this.dataUsers);
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
      } else if (this.categoria == null || this.categoria == '') {
        camposIncorrectos.push('categoria');
      } else if (this.carnetizado == null || this.carnetizado == '') {
        camposIncorrectos.push('carnetizado');
      } else if (this.estado == null || this.estado == '') {
        camposIncorrectos.push('estado');
      } else if (this.idCarnet == null || this.idCarnet == '') {
        camposIncorrectos.push('idCarnet');
      } else if (this.registrado == null || this.registrado == '') {
        camposIncorrectos.push('registrado');
      } else if (this.estadoCivil == null || this.estadoCivil == '') {
        camposIncorrectos.push('estadoCivil');
      } else if (this.fechaNacimiento == null || this.fechaNacimiento == '') {
        camposIncorrectos.push('fechaNacimiento');
      } else if (this.fechaRegistro == null || this.fechaRegistro == '') {
        camposIncorrectos.push('fechaRegistro');
      } else if (this.jefeHogar == null || this.jefeHogar == '') {
        camposIncorrectos.push('jefeHogar');
      } else if (this.numeroMiembros == null || this.numeroMiembros == '') {
        camposIncorrectos.push('numeroMiembros');
      } else if (this.numeroHijos == null || this.numeroHijos == '') {
        camposIncorrectos.push('numeroHijos');
      } else if (
        this.propiedadVivienda == null ||
        this.propiedadVivienda == ''
      ) {
        camposIncorrectos.push('propiedadVivienda');
      } else if (this.aguaPotable == null || this.aguaPotable == '') {
        camposIncorrectos.push('aguaPotable');
      } else if (this.luzElectrica == null || this.luzElectrica == '') {
        camposIncorrectos.push('luzElectrica');
      } else if (this.servicioTelefono == null || this.servicioTelefono == '') {
        camposIncorrectos.push('servicioTelefono');
      } else if (this.servicioInternet == null || this.servicioInternet == '') {
        camposIncorrectos.push('servicioInternet');
      } else if (
        this.numeroDormitorios == null ||
        this.numeroDormitorios == ''
      ) {
        camposIncorrectos.push('numeroDormitorios');
      } else if (this.tipoDiscapacidad == null || this.tipoDiscapacidad == '') {
        camposIncorrectos.push('discapacidad');
      } else if (this.discapacidad == null || this.discapacidad == '') {
        camposIncorrectos.push('tipo discapacidad');
      } else if (
        this.gradoDiscapacidad == null ||
        this.gradoDiscapacidad == ''
      ) {
        camposIncorrectos.push('grado discapacidad');
      } else if (
        this.idCarnetDiscapacidad == null ||
        this.idCarnetDiscapacidad == ''
      ) {
        camposIncorrectos.push('carnet discapacidad');
      } else if (this.giro == null || this.giro == '') {
        camposIncorrectos.push('tipo giro');
      } else if (this.lugarAutorizado == null || this.lugarAutorizado == '') {
        camposIncorrectos.push('lugar autorizado');
      } else if (
        this.direccionLugarAutorizado == null ||
        this.direccionLugarAutorizado == ''
      ) {
        camposIncorrectos.push('direccion lugar autorizado');
      } else if (this.horarioAbierto == null || this.horarioAbierto == '') {
        camposIncorrectos.push('horario abierto');
      } else if (this.horarioCerrado == null || this.horarioCerrado == '') {
        camposIncorrectos.push('horario cerrado');
      }
      if (camposIncorrectos.length > 0) {
        for (let i = 0; i < camposIncorrectos.length; i++) {}
        this.$q.notify({
          message:
            'Completa los campos ' + camposIncorrectos + ' correctamente',
          icon: 'warning',
        });
        obtenerFechaDesdeString(this.fechaNacimiento);
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
                this.guardarUsuario();
              },
            },
            {
              label: 'cancelar',
              color: 'negative',
              handler: () => {
                // Acciones a realizar cuando se selecciona "No"
                console.log('Se seleccionó "No"');
                this.$refs.inputNombre.color;
                console.log(' Cancelando...', camposIncorrectos);
              },
            },
          ],
        });
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
      try {
        const response = await this.$axios.post(
          'http://localhost:3000/usuarios/usersData/' + this.idasociacion,
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
    // obIdAsociacion(value) {
    //   this.idAsociacion = value;
    // },
    async showData() {
      await this.listarDatos();
      await this.mostrarDatos(this.dataUsers);
    },
    async listarDatos() {
      console.log('ejecutandose', this.idUsuario);
      fetch('http://localhost:3000/usuarios/selectUser/' + this.idusuario)
        .then((response) => response.json())
        .then((data) => mostrarData(data))
        .then((dataUsers) => shows(dataUsers))
        .catch((error) => console.log(error));
      const mostrarData = (data) => {
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
      this.listarDatos();
      this.nombre = users.nombre;
    },
  },
});
</script>
<style scoped>
.input ::-webkit-inner-spin-button,
.input ::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.input {
  -moz-appearance: textfield;
}
</style>
