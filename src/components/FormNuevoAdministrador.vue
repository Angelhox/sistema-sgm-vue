<template>
  <q-page>
    <!--Datos de la personaAdministrador-->
    <div class="row justify-center content-center">
      <span class="q-pa-md text-h3" style="text-align: center"
        >Nuevo administrador</span
      >
      aki{{ idasociacion }}
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

      <!--Datos del administrador-->
      <div class="q-pa-sm col-12 col-md-8">
        <q-input
          type="text"
          filled
          :disable="habilitarCampos"
          v-model="username"
          label="myemail@domain.com"
          :rules="[
            (val) => (val && val.length > 0) || 'Ingresa el correo del usuario',
          ]"
        />
      </div>
      <div class="q-pa-sm col-12 col-md-6">
        <q-input
          type="password"
          filled
          :disable="habilitarCampos"
          v-model="password"
          label="Ingrese su contraseña"
          :rules="[
            (val) =>
              (val && val.length > 8) ||
              'Ingresa una contraseña con almenos 8 digitos',
          ]"
        />
      </div>
      <div class="q-pa-sm col-12 col-md-6">
        <q-input
          type="password"
          filled
          :disable="habilitarCampos"
          v-model="passwordconfirmation"
          label="Confirme la contraseña"
          :rules="[
            (val) =>
              (val && val.length > 8 && val == password) ||
              'las contraseñasno coinciden',
          ]"
        />
      </div>
    </div>
    <div class="q-pa-md q-gutter-md">
      <q-btn color="teal" @click="guardarAdministrador">
        <q-icon left size="3em" name="save" />
        <div>Guardar nuevo administrador</div>
      </q-btn>
      <q-btn color="teal" @click="recargarTablaAdministradores">
        <q-icon left size="3em" name="save" />
        <div>Cancelar</div>
      </q-btn>
    </div>
  </q-page>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    idasociacion: String,
  },
  data() {
    return {
      //Datos de la personaAdministrador
      idPersona: '',
      nombre: '',
      apellido: '',
      cedula: '',
      direccion: '',
      telefono: '',
      correo: '',
      numeroInsertadoHijo: null,
      //Datos del administrador
      username: '',
      password: '',
      passwordconfirmation: '',
      usuarioEncontrado: false,
      habilitarCampos: true,
    };
  },
  setup() {
    return {};
  },
  methods: {
    recargarTablaAdministradores() {
      this.$emit('getPostsAdministradores');
    },
    async guardarAdministrador() {
      try {
        if (this.usuarioEncontrado === false) {
          this.$q.notify({
            message:
              'No puedes asignar como administrador a un usuario no registrado ',

            icon: 'warning',
          });
          // const response = await this.$axios.post(
          // 'http://localhost:3000/administradores/adminPersonaData',
          // {
          //   //Datos basicos del usuario
          //   nombre: this.nombre,
          //   apellido: this.apellido,
          //   cedula: this.cedula,
          //   direccion: this.direccion,
          //   telefono: this.telefono,
          //   correo: this.correo,
          //   username: this.username,
          //   password: this.password,
          //   token: '',
          //   authStrategy: 'password and username',
          // }
          // );
          //---Notificar que se guardaron los datos
          console.log(response.data);
        }
        const response = await this.$axios.post(
          'http://localhost:3000/administradores/adminData/' + this.idPersona,
          {
            username: this.username,
            password: this.password,
            token: '',
            role: 'admin',
            authStrategy: 'password and username',
          }
        );
        this.recargarTablaAdministradores();
        //---Notificar que se guardaron los datos
        console.log(response.data);
      } catch (error) {
        console.log(error.message);
      }
    },
    buscarDatosPersona() {
      if (
        (this.cedula.length > 9 && this.cedula.length < 11) ||
        (this.cedula.length > 12 && this.cedula.length < 14)
      ) {
        fetch(
          'http://localhost:3000/usuarios/selectUserDataCedula/' +
            this.cedula +
            '/' +
            this.idasociacion
        )
          .then((response) => response.json())
          .then((data) => mostrarData(data))
          .then((dataUsers) => shows(dataUsers))
          .catch((error) => {
            console.log(error);
            this.usuarioEncontradoSiNo();
          });
        const mostrarData = (data) => {
          console.log(data);
          return (this.dataUsers = data[0]);
        };
        const shows = (datos) => {
          //this.idUsuarioEditar = datos.id;
          this.idPersona = datos.personaId;
          this.nombre = datos.nombre;
          this.apellido = datos.apellido;
          this.telefono = datos.telefono;
          this.correo = datos.correo;
          this.direccion = datos.direccion;
          this.username = datos.username;
          this.password = datos.password;
          this.usuarioEncontradoSiNo();
        };
      } else if (this.cedula.length < 10) {
        this.nombre = '';
        this.apellido = '';
        this.telefono = '';
        this.correo = '';
        this.direccion = '';
        this.usuarioEncontrado = false;
        this.habilitarCampos = true;
        this.idPersona = '';
        this.username = '';
        this.password = '';
        this.passwordconfirmation = '';
      } else if (
        (this.cedula.length > 11 && this.cedula.length < 13) ||
        this.cedula.length > 13
      ) {
        this.nombre = '';
        this.apellido = '';
        this.telefono = '';
        this.correo = '';
        this.direccion = '';
        this.usuarioEncontrado = false;
        this.habilitarCampos = true;
        this.idPersona = '';
        this.username = '';
        this.password = '';
        this.passwordconfirmation = '';
      }
    },
    usuarioEncontradoSiNo() {
      if (this.nombre.length > 1) {
        if (this.username !== undefined && this.password !== undefined) {
          console.log('ahora', this.username);
          this.$q.notify({
            message: 'Ya existe un registro para ' + this.cedula,

            icon: 'warning',
          });
        } else {
          this.usuarioEncontrado = true;
          this.$q.notify({
            message: 'Registra al nuevo administrador ',

            icon: 'warning',
          });
          this.habilitarCampos = false;
        }
      } else {
        console.log('ahora');
        this.$q.notify({
          message: 'Ningun usuario de esta asociacion para' + this.cedula,

          icon: 'warning',
        });
      }

      console.log('contenido nombre', this.nombre);
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
