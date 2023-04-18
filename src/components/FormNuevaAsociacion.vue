<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <q-page padding>
    <div class="q-pa-sm row justify-center">
      <div class="col-12 col-md-8">
        <h3 class="text-h3" style="text-align: center">Nueva Asociación</h3>
      </div>
      <div class="q-pa-sm col-12 col-md-8">
        <q-input
          filled
          v-model="ruc"
          ref="inputNombre"
          label="Ruc"
          hint="Este campo es obligatorio"
        />
        <div>
          <q-btn
            color="black"
            class="full-width"
            label="Generar Codigo"
            @click="generarCodigoAsociacion"
          />
        </div>
      </div>
      <div class="q-pa-sm col-12 col-md-6">
        <q-input
          filled
          v-model="nombre"
          label="Nombre de la Asociacion"
          hint="Este campo es obligatorio"
        />
      </div>
      <div class="q-pa-sm col-12 col-md-6">
        <q-input filled v-model="fechaCreacion" mask="date" :rules="['date']">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date v-model="fechaCreacion">
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
          v-model="telefono"
          label="Telefono"
          :rules="[
            (val) =>
              (val && val.length > 0) ||
              'Ingresa un numero de telefono o celular',
            (val) =>
              (val && val.length < 11) ||
              'Numero de telefono o celular invalido',
          ]"
        />
      </div>
      <div class="q-pa-sm col-12 col-md-6">
        <q-input
          filled
          v-model="correo"
          label="mi-correo@dominio.com"
          :rules="['email']"
        />
      </div>
      <div class="q-pa-sm col-12 col-md-6">
        <q-select
          filled
          v-model="legalizada"
          input-debounce="0"
          label="Es Legalizada"
          :options="optionsLegalizada"
          @filter="filterFn"
          @update:model-value="legalizadaSiNo"
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
          type="text"
          filled
          :disable="habilitarDocumentoLegalizacion"
          v-model="documentoLegalizacion"
          label="Codigo del documento legalizacion"
          :rules="[
            (val) => (val && val.length > 0) || 'Elija una de las opciones',
          ]"
        />
      </div>

      <div class="q-pa-sm col-12 col-md-6">
        <q-select
          filled
          v-model="tipoContribuyente"
          use-input
          input-debounce="0"
          label="Tipo de contribuyente"
          :options="optionsTipoContribuyente"
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
          v-model="lugarAutorizado"
          label="Lugar Autorizado"
          :rules="[
            (val) => (val && val.length > 0) || 'Digite el lugar autorizado',
          ]"
        />
      </div>
      <div class="q-pa-sm col-12 col-md-12">
        <q-input
          filled
          v-model="direccionLugarAutorizado"
          label="Direccion del lugar autorizado"
          :rules="[
            (val) =>
              (val && val.length > 0) ||
              'Digite la direccion del lugar autorizado',
          ]"
        />
      </div>
      <div class="q-pa-sm col-12 col-md-6">
        <q-select
          filled
          v-model="cede"
          input-debounce="0"
          label="Cuenta con una cede"
          :options="optionsCede"
          @update:model-value="cedeSiNo"
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
          v-model="direccionCede"
          :disable="habilitarDireccionCede"
          label="Direccion de la cede"
          :rules="[
            (val) =>
              (val && val.length > 0) || 'Digite una direccion de la cede',
          ]"
        />
      </div>
    </div>
    <div class="q-pa-sm q-gutter-md">
      <q-btn color="brown-5" @click="guardarSiNO">
        <q-icon left size="3em" name="save" />
        <div>Guardar nueva asociación</div>
      </q-btn>
      <q-btn color="brown-5" @click="cancelarSiNO">
        <q-icon left size="3em" name="cancel" />
        <div>Cancelar</div>
      </q-btn>
    </div>
    {{ nombre }}
    {{ ruc }}
    {{ direccionCede }}
    {{ telefono }}
    {{ correo }}
    {{ lugarAutorizado }}
    {{ direccionLugarAutorizado }}
    {{ documentoLegalizacion }}
    {{ fechaCreacion }}
    {{ cede }}
    {{ legalizada }}
    {{ tipoContribuyente }}
  </q-page>
</template>
<script>
import { defineComponent, ref } from 'vue';
const stringOptionsSiNo = ['Si', 'No'];
const stringOptionsTipoContribuyente = [
  'Régimen impositivo simplificado',
  'Régimen general',
  'Régimen general',
  'Obligados a llevar contabilidad',
];
const fechaActual = new Date();
// Obtener el año actual
const anio = fechaActual.getFullYear();

// Obtener el mes actual (0-11, donde 0 es enero y 11 es diciembre)
const mes = fechaActual.getMonth() + 1;

// Obtener el día del mes actual (1-31)
const dia = fechaActual.getDate();
let mfechaActual = anio + '-' + mes + '-' + dia;

export default defineComponent({
  data() {
    return {
      nombre: '',
      ruc: '',
      direccionCede: 'NA',
      telefono: '',
      correo: '',
      lugarAutorizado: '',
      direccionLugarAutorizado: '',
      documentoLegalizacion: 'NA',
      fechaCreacion: '',
    };
  },
  setup() {
    const optionsLegalizada = ref(stringOptionsSiNo);
    const optionsTipoContribuyente = ref(stringOptionsTipoContribuyente);
    const optionsCede = ref(stringOptionsSiNo);
    return {
      legalizada: ref(null),
      tipoContribuyente: ref(null),
      cede: ref(null),
      modeltoggle: ref('null'),
      stringOptionsTipoContribuyente,
      stringOptionsSiNo,
      optionsTipoContribuyente,
      optionsLegalizada,
      optionsCede,
      habilitarDireccionCede: true,
      habilitarDocumentoLegalizacion: true,

      filterFn(val, update) {
        if (val === '') {
          update(() => {
            optionsLegalizada.value = stringOptionsSiNo;
            optionsTipoContribuyente.value = stringOptionsTipoContribuyente;
            optionsCede.value = stringOptionsSiNo;
          });
          return;
        }
      },
    };
    return {};
  },
  mounted() {
    this.fechaPorDefecto();
  },
  methods: {
    fechaPorDefecto() {
      let mMes;
      if (mes < 10) {
        mMes = '0' + mes;
        this.fechaCreacion = anio + '/' + '/' + mMes + '/' + dia;
      } else {
        this.fechaCreacion = anio + '/' + '/' + mes + '/' + dia;
      }
    },
    guardarSiNO() {
      let camposIncorrectos = [];
      if (this.ruc == '' || this.ruc == null) {
        camposIncorrectos.push('ruc');
      } else if (this.nombre == '' || this.nombre == null) {
        camposIncorrectos.push('nombre');
      } else if (this.lugarAutorizado == '' || this.lugarAutorizado == null) {
        camposIncorrectos.push('lugarAutorizado');
      } else if (this.correo == '' || this.correo == null) {
        camposIncorrectos.push('correo');
      } else if (this.telefono == '' || this.telefono == null) {
        camposIncorrectos.push('telefono');
      } else if (
        this.direccionLugarAutorizado == '' ||
        this.direccionLugarAutorizado == null
      ) {
        camposIncorrectos.push('direccionLugarAutorizado');
      } else if (this.legalizada == '' || this.legalizada == null) {
        camposIncorrectos.push('legalizada');
      } else if (
        this.documentoLegalizacion == '' ||
        this.documentoLegalizacion == null
      ) {
        camposIncorrectos.push('documentoLegalizacion');
      } else if (this.fechaCreacion == '' || this.fechaCreacion == null) {
        camposIncorrectos.push('fechaCreacion');
      } else if (this.cede == '' || this.cede == null) {
        camposIncorrectos.push('cede');
      } else if (this.direccionCede == '' || this.direccionCede == null) {
        camposIncorrectos.push('direccionCede');
      } else if (
        this.tipoContribuyente == '' ||
        this.tipoContribuyente == null
      ) {
        camposIncorrectos.push('tipoContribuyente');
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
              label: 'confirmar',
              color: 'positive',
              handler: () => {
                // Acciones a realizar cuando se selecciona "Sí"
                console.log('Se seleccionó "Sí"');
                console.log('Guardando...', camposIncorrectos);
                this.guardarAsociacion();
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
    legalizadaSiNo() {
      if (this.legalizada !== 'Si') {
        this.documentoLegalizacion = 'NA';
        this.habilitarDocumentoLegalizacion = true;
      } else {
        this.documentoLegalizacion = '';
        this.habilitarDocumentoLegalizacion = false;
      }
    },
    cedeSiNo() {
      if (this.cede !== 'Si') {
        this.direccionCede = 'NA';
        this.habilitarDireccionCede = true;
      } else {
        this.direccionCede = '';
        this.habilitarDireccionCede = false;
      }
    },
    generarCodigoAsociacion() {
      let pulls = 0;
      if (pulls == 0) {
        this.$q.notify({
          message:
            'Elije esta opcion unicamente para asociaciones no registradas que no cuentan con un Ruc.',
          icon: 'warning',
          actions: [
            {
              label: 'entendido',
              color: 'positive',
              handler: () => {
                console.log('Se seleccionó "Entendido"');
                if (this.nombre == '' || this.nombre == null) {
                  this.$q.notify({
                    message: 'Debes proporcionar el nombre de la asociacion.',
                    icon: 'warning',
                  });
                } else {
                  const fechaActual = new Date();
                  // Obtener el año actual
                  const anio = fechaActual.getFullYear();

                  // Obtener el mes actual (0-11, donde 0 es enero y 11 es diciembre)
                  const mes = fechaActual.getMonth();

                  // Obtener el día del mes actual (1-31)
                  const dia = fechaActual.getDate();
                  let codigo = anio + '-' + mes + '-' + dia;

                  // Dividir la oración en palabras
                  const palabras = this.nombre.split(' ');
                  // Obtener las primeras letras de cada palabra
                  const letras = palabras.map((palabra) => {
                    return palabra.charAt(0).toUpperCase();
                  });
                  // Unir las iniciales en una sola cadena de texto
                  let iniciales = letras.join('');

                  this.ruc = codigo + '-A' + iniciales;
                }
              },
            },
            {
              label: 'cancelar',
              color: 'negative',
              handler: () => {
                console.log('Se seleccionó "Cancelar"');
                this.$q.notify({
                  message: 'Ingresa el ruc de la asociacion.',
                  icon: 'warning',
                });
              },
            },
          ],
        });
      }
    },
    mostrarNotificacion() {
      this.$q.notify({
        message: '¿Quieres continuar?',
        icon: 'warning',
        actions: [
          {
            label: 'Sí',
            color: 'positive',
            handler: () => {
              // Acciones a realizar cuando se selecciona "Sí"
              console.log('Se seleccionó "Sí"');
            },
          },
          {
            label: 'No',
            color: 'negative',
            handler: () => {
              // Acciones a realizar cuando se selecciona "No"
              console.log('Se seleccionó "No"');
              this.$refs.inputNombre.color;
            },
          },
        ],
      });
    },
    async guardarAsociacion() {
      try {
        const response = await this.$axios.post(
          'http://localhost:3000/asociaciones/save',
          {
            nombre: this.nombre,
            ruc: this.ruc,
            lugarAutorizado: this.lugarAutorizado,
            direccionLugarAutorizado: this.direccionLugarAutorizado,
            cede: this.cede,
            direccionCede: this.direccionCede,
            telefono: this.telefono,
            correo: this.correo,
            legalizada: this.legalizada,
            documentoLegalizacion: this.documentoLegalizacion,
            fechaCreacion: this.fechaCreacion,
            tipoContribuyente: this.tipoContribuyente,
          }
        );
        //Notificar que se guardaron los datos
        console.log(response.data);
        this.$q.notify({
          message: 'Has guardado una nueva Asociacion',
          icon: 'warning',
        });
      } catch (error) {
        console.log(error.message);
        this.$q.notify({
          message: 'Error al guardar los datos',
          icon: 'warning',
        });
      }
    },
  },
});
</script>
