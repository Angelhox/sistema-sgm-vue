<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <q-page padding>
    <div class="q-pa-lg row justify-center content-center">
      <span class="q-pa-md text-h3" style="text-align: center"
        >Nueva Asoiciacion</span
      >
      {{ idAsoc }}
      <div class="q-pa-sm col-12 col-md-8">
        <q-input
          filled
          v-model="ruc"
          label="Ruc"
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
        <q-input
          filled
          v-model="fechaCreacion"
          label="Fecha de fundación"
          hint="Este campo es obligatorio"
        />
      </div>
      <div class="q-pa-sm col-12 col-md-6">
        <q-input
          filled
          v-model="telefono"
          label="Telefono"
          hint="Este campo es obligatorio"
        />
      </div>
      <div class="q-pa-sm col-12 col-md-6">
        <q-input
          filled
          v-model="correo"
          label="Correo"
          hint="Este campo es obligatorio"
        />
      </div>
      <div class="q-pa-sm col-12 col-md-6">
        <q-select
          filled
          v-model="legalizada"
          use-input
          input-debounce="0"
          label="Es Legalizada"
          :options="optionsLegalizada"
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
          type="number"
          filled
          v-model="documentoLegalizacion"
          label="Codigo del documento legalizacion"
          hint="Este campo es obligatorio"
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
          label="Direccion del lugar autorizado"
          hint="Este campo es obligatorio"
        />
      </div>
      <div class="q-pa-sm col-12 col-md-6">
        <q-select
          filled
          v-model="cede"
          use-input
          input-debounce="0"
          label="Cuenta con una cede"
          :options="optionsCede"
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
          v-model="direccionCede"
          label="Direccion de la sede"
          hint="Este campo es obligatorio"
        />
      </div>
    </div>
    <div class="q-pa-sm q-gutter-md">
      <q-btn color="teal" @click="guardarAsociacion">
        <q-icon left size="3em" name="save" />
        <div>Guardar nueva Asociación</div>
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
  {{ idAsoc }}
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
</template>
<script>
import { defineComponent, ref } from 'vue';
const stringOptionsSiNo = ['Si', 'No'];
const stringOptionsTipoContribuyente = ['Natural', 'Jurídico'];

export default defineComponent({
  data() {
    return {
      nombre: '',
      ruc: '',
      direccionCede: '',
      telefono: '',
      correo: '',
      lugarAutorizado: '',
      direccionLugarAutorizado: '',
      documentoLegalizacion: '',
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
      } catch (error) {
        console.log(error.message);
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
        })
        .catch((error) => console.log(error));
    },
  },
});
</script>
