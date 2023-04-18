import { route } from 'quasar/wrappers';
import { jwtVerify } from 'jose';
import routes from './routes';
import { Meta } from 'quasar';
import { ROLES } from './roles';
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
const secret = new TextEncoder().encode('ilovemypets32122');
const token = localStorage.getItem('token');
export function userAdminGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  let auth = false;
  const token = localStorage.getItem('token');
  const needAuth = to.meta.requireAuth;
  const needRole = [to.meta.requiresRole];

  if (token !== null) {
    jwtVerify(token, secret)
      .then((response) => {
        console.log('xxx', response.payload);
        const role = response.payload.role;
        auth = true;
        if (needAuth && !auth) {
          next('Login');
        } else {
          console.log('Aki', role);
          if (to.meta.requiresRole) {
            console.log('estamos aqui', to.meta.requiresRole);
            //Codigo que no se esta ejecutando
            if (role === ROLES.ADMIN || role === ROLES.USER) {
              next();
            } else {
              console.log('here');
              next('Login');
            }
          }
          console.log('xxx1');
          return false;
        }
      })
      .catch((error) => {
        console.log(error);
        auth = false;
        if (needAuth && !auth) {
          next('Login');
        } else {
          console.log('here is the bug 2');
          next();
        }
      });
  } else {
    next('Login');
  }
}
export function AdminGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  let auth = false;

  const needAuth = to.meta.requireAuth;
  const token = localStorage.getItem('token');
  if (token !== null) {
    jwtVerify(token, secret)
      .then((response) => {
        console.log('xxx', response.payload);
        const role = response.payload.role;
        auth = true;
        if (needAuth && !auth) {
          next('Login');
        } else {
          console.log('Aki', role);
          if (to.meta.requiresRole) {
            console.log('estamos aqui', to.meta.requiresRole);
            console.log('here AdminGuard', role, ROLES.ADMIN);
            if (role === ROLES.ADMIN) {
              console.log('estamos bien');
              next();
            } else {
              console.log('here');
              next('../ErrorNotFound');
            }
          }
          console.log('xxx1');
          return false;
        }
      })
      .catch((error) => {
        console.log(error);
        auth = false;
        if (needAuth && !auth) {
          next('Login');
        } else {
          console.log('here is the bug 2');
          next();
        }
      });
  } else {
    next('Login');
  }
}
export async function obtenerDatosGuard() {
  let role: any;
  let userId: any;
  const token = localStorage.getItem('token');
  if (token !== null) {
    await jwtVerify(token, secret)
      .then((response) => {
        console.log('xxx', response.payload);
        role = response.payload.role;
        userId = response.payload.userId;
        localStorage.setItem('role', role);
        localStorage.setItem('userId', userId);
        console.log('fucks', role, userId);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
