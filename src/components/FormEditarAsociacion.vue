<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <q-page>
    <div class="q-pa-lg row justify-center content-center">
      <div class="col-12 col-md-8">
        <h3 class="text-h3" style="text-align: center">
          Actualizar Asociación
        </h3>
      </div>
      <!-- {{ idAsoc }} -->
      <div class="q-pa-sm col-12 col-md-8">
        <q-input
          filled
          v-model="ruc"
          label="Ruc"
          :disable="true"
          hint="Este campo es obligatorio"
        />
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
          hint="Este campo es obligatorio"
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
        <div>Guardar cambios</div>
      </q-btn>
      <q-btn color="brown-5" @click="cancelarSiNO">
        <q-icon left size="3em" name="cancel" />
        <div>Cancelar</div>
      </q-btn>
    </div>
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
      idAsoc: this.$route.params.idasoc,
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
    this.listarDatos();
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
          message: '¿Quieres guardar los cambios?',
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
        this.habilitarDocumentoLegalizacion = false;
      }
    },
    cedeSiNo() {
      if (this.cede !== 'Si') {
        this.direccionCede = 'NA';
        this.habilitarDireccionCede = true;
      } else {
        this.habilitarDireccionCede = false;
      }
    },

    async guardarAsociacion() {
      try {
        const response = await this.$axios.post(
          'http://localhost:3000/asociaciones/actualizar/' + this.idAsoc,
          {
            nombre: this.nombre,
            ruc: this.ruc,
            lugarAutorizado: this.lugarAutorizado,
            direccionLugarAutorizado: this.direccionLugarAutorizado,
            correo: this.correo,
            legalizada: this.legalizada,
            cede: this.cede,
            direccionCede: this.direccionCede,
            telefono: this.telefono,
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
    async listarDatos() {
      fetch('http://localhost:3000/asociaciones/find/' + this.idAsoc)
        .then((response) => response.json())
        .then((data) => {
          this.idPersona = data.id;
          this.nombre = data.nombre;
          this.ruc = data.ruc;
          this.lugarAutorizado = data.lugarAutorizado;
          this.direccionLugarAutorizado = data.direccionLugarAutorizado;
          this.correo = data.correo;
          this.legalizada = data.legalizada;
          this.documentoLegalizacion = data.documentoLegalizacion;
          this.fechaCreacion = data.fechaCreacion;
          this.tipoContribuyente = data.tipoContribuyente;
          this.cede = data.cede;
          this.direccionCede = data.direccionCede;
          this.telefono = data.telefono;
          this.legalizadaSiNo();
          this.cedeSiNo();
        })
        .catch((error) => console.log(error));
    },
  },
});
</script>
