<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<!-- eslint-disable vue/no-unused-components -->
<template>
  <q-page padding class="flex flex-center">
    <div class="container">
      <q-form
        class="col-6 col-sm-8"
        @submit.prevent="procesarFormulario"
        @reset="reset"
        @validation-success="login"
        ref="myForm"
      >
        <span class="text-h1">Iniciar Sesion</span>
        <div class="col-6 col-sm-8">
          <q-input
            v-model="username"
            label="Usuario"
            type="email"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) || 'Digite el nombre del usuario',
            ]"
          />
          <q-input
            v-model="password"
            label="Contraseña"
            type="password"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 8) || 'Digite la contraseña del usuario',
            ]"
          />
        </div>
        <div class="col-6"></div>
        <div class="col-6">
          <q-btn
            type="submit"
            label="Iniciar Sesion"
            color="secondary"
            class="buttonLogin"
          />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { Notify, useQuasar } from 'quasar';
import { useRoute } from 'vue-router';
import { jwtVerify } from 'jose';

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Login',
  setup() {
    const myForm = ref(null);
    const $q = useQuasar();
    const username = ref(null);
    const password = ref(null);
    const terminos = ref(true);
    const logged = ref(true);
    const opciones = ['maxima', 'moderada', 'minima'];
    const procesarFormulario = () => {
      console.log('notify');
      if (logged.value === false) {
        $q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: 'El usuario ocontraseña son correctos',
        });
      } else {
        $q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'done',
          message: 'Bienvenido',
        });
      }
    };

    return {
      username,
      password,
      opciones,
      terminos,
      myForm,
      procesarFormulario,
      logged,
      role: 'admin',
    };
  },

  methods: {
    async login() {
      const secret = new TextEncoder().encode('ilovemypets32122');
      console.log('¡Haz echo click en el boton Login');
      var payload = {
        username: this.username,
        password: this.password,
      };
      await this.$axios
        .post('http://localhost:3000/auth', payload)
        .then((response) => {
          this.$axios.defaults.headers.common['Authorization'] =
            'Bearer' + response.data.acces_token;
          localStorage.setItem('token', response.data.access_token);
          console.log(response.data.access_token);
          this.obtenerDatos(response.data.access_token, secret);

          //this.$router.go(+1);
        })
        .catch((error) => {
          console.log(error.response);
          this.procesarFormulario;
          this.password = '';
        });
    },
    async obtenerDatos(token, secret) {
      let asociacionIdDefinido = 1;
      await jwtVerify(token, secret)
        .then((response) => {
          console.log('xxx', response.payload);
          localStorage.setItem('role', response.payload.role);
          this.role = response.payload.role;
          console.log('mensaje', this.role);
          localStorage.setItem('userId', response.payload.userId);
          console.log('userId', response.payload.userId);
          if (this.role == 'superAdmin') {
            console.log('estamos aqui');
            this.$router.push('Asociaciones');
            this.logged = true;
            this.procesarFormulario;
          } else if (this.role == 'admin') {
            this.obtenerIdAsociacion(response.payload.userId);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async obtenerIdAsociacion(userId) {
      let asociacionIdDefinido;
      await this.$axios
        .get(
          'http://localhost:3000/administradores/asociacionDelAdministrador/' +
            userId
        )
        .then((res) => {
          console.log('hey', res.data[0].asociacionId);
          console.log(res.data.asociacionId);
          console.log('logradosh men');
          asociacionIdDefinido = res.data[0].asociacionId;
          this.$router.push(
            'AsociacionUsuarios/' + asociacionIdDefinido + '/usuarios'
          );
          this.logged = true;
          this.procesarFormulario;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
});
</script>
<style scoped>
.q-page {
  background: url('../assets/frutas.jpg');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  filter: brightness(1.2);
}

.text-h1 {
  font-size: 55px;
  font-weight: bold;
  margin-top: 0px;
  color: rgb(0, 0, 0);
  text-align: center;
  margin-left: -15px;
}

.container {
  background: #fff;
  height: 420px;
  width: 380px;
  padding: 10px;
  border-radius: 15px;
  position: absolute;
}

.q-form {
  background-image: linear-gradient(to left, #ffcc33, #b1ffa3, #ffcc33);
  width: 97.5%;
  height: 407px;
  padding: 1px;
  gap: 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding-left: 15px;
  inset: 4px;
  position: absolute;
  border-radius: 8px;
  border-radius: 10px;
}

.buttonLogin {
  margin-top: 15px;
  left: 55%;
}

.q-input {
  width: 96%;
}
</style>
