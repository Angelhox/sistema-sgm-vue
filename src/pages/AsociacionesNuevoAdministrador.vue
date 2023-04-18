<template>
  <q-page>
    <!--Datos de la personaAdministrador-->
    <div class="q-pa-lg row justify-center content-center">
      <span class="q-pa-md text-h3" style="text-align: center"
        >Informacion Personal del Usuario</span
      >
      <div class="q-pa-sm col-12 col-md-8">
        <q-input
          filled
          type="number"
          v-model="cedula"
          @update:model-value="buscarDatosPersona"
          label="Numero de Cedula"
          hint="Busca un usuario registrado"
        />
      </div>
      {{ usuarioEncontrado }}
      id{{ idPersona }}
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

      <!--Datos del administrador-->
      <div class="q-pa-sm col-12 col-md-8">
        <q-input
          type="text"
          filled
          v-model="username"
          label="Nombre de usuario"
          hint="myemail@domain.com"
        />
      </div>
      <div class="q-pa-sm col-12 col-md-6">
        <q-input
          type="password"
          filled
          v-model="password"
          label="Ingrese su contraseña"
          hint="Este campo es obligatorio"
        />
      </div>
      <div class="q-pa-sm col-12 col-md-6">
        <q-input
          type="password"
          filled
          v-model="passwordconfirmation"
          label="Confirme la contraseña"
          hint="Este campo es obligatorio"
        />
      </div>
    </div>
    <div class="q-pa-md q-gutter-md">
      <q-btn color="teal" @click="guardarAdministrador">
        <q-icon left size="3em" name="save" />
        <div>Guardar nueva asociación</div>
      </q-btn>
    </div>
  </q-page>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
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
    };
  },
  setup() {
    return {};
  },
  methods: {
    async guardarAdministrador() {
      try {
        if (this.usuarioEncontrado === false) {
          const response = await this.$axios.post(
            'http://localhost:3000/administradores/adminPersonaData',
            {
              //Datos basicos del usuario
              nombre: this.nombre,
              apellido: this.apellido,
              cedula: this.cedula,
              direccion: this.direccion,
              telefono: this.telefono,
              correo: this.correo,
              username: this.username,
              password: this.password,
              token: '',
              authStrategy: 'password and username',
            }
          );
          //---Notificar que se guardaron los datos
          console.log(response.data);
        }
        const response = await this.$axios.post(
          'http://localhost:3000/administradores/adminData/' + this.idPersona,
          {
            //Datos basicos del usuario
            nombre: this.nombre,
            apellido: this.apellido,
            cedula: this.cedula,
            direccion: this.direccion,
            telefono: this.telefono,
            correo: this.correo,
            username: this.username,
            password: this.password,
            token: '',
            role: 'admin',
            authStrategy: 'password and username',
          }
        );
        //---Notificar que se guardaron los datos
        console.log(response.data);
      } catch (error) {
        console.log(error.message);
      }
    },
    buscarDatosPersona() {
      if (this.cedula.length > 9) {
        fetch('http://localhost:3000/persona/' + this.cedula)
          .then((response) => response.json())
          .then((data) => {
            this.idPersona = data.id;
            this.nombre = data.nombre;
            this.apellido = data.apellido;
            this.telefono = data.telefono;
            this.correo = data.correo;
            this.direccion = data.direccion;
            this.usuarioEncontrado = true;
          })
          .catch((error) => console.log(error));
      } else if (this.cedula.length < 10 || this.cedula.length > 13) {
        this.nombre = '';
        this.apellido = '';
        this.telefono = '';
        this.correo = '';
        this.direccion = '';
        this.usuarioEncontrado = false;
        this.idPersona = '';
      }
    },
  },
});
</script>
