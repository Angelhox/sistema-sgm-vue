/* eslint-disable @typescript-eslint/no-unused-vars */
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { AdminGuard, userAdminGuard } from './middlewares';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('layouts/Inicio.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Inicio.vue'),
      },
    ],
  },
  {
    path: '/',
    component: () => import('layouts/Login.vue'),
    children: [
      {
        path: 'Login',
        name: 'Login',
        component: () => import('pages/Login.vue'),
      },
    ],
  },

  {
    path: '/',
    component: () => import('layouts/Principal.vue'),
    children: [
      {
        path: 'Asociaciones',
        name: 'Asociaciones',
        component: () => import('pages/Asociaciones.vue'),
        meta: { requireAuth: true, requiresRole: 'superAdmin' },
        beforeEnter: AdminGuard,
      },
      {
        path: 'AsociacionesTest',
        name: 'AsociacionesTest',
        component: () => import('pages/AsociacionesTest.vue'),
        meta: { requireAuth: true, requiresRole: ['superAdmin', 'admin'] },
      },
      {
        path: 'Usuarios',
        name: 'Usuarios',
        component: () => import('pages/Usuarios.vue'),
        meta: { requireAuth: true, requiresRole: ['superAdmin', 'admin'] },
      },
      {
        path: 'NuevoUsuario',
        name: 'NuevoUsuario',
        component: () => import('pages/NuevoUsuario.vue'),
        meta: { requireAuth: true, requiresRole: ['superAdmin', 'admin'] },
      },
      {
        path: 'Administradores',
        name: 'Administradores',
        component: () => import('pages/Administradores.vue'),
        meta: { requireAuth: true, requiresRole: ['superAdmin', 'admin'] },
      },
      {
        path: 'NuevoAdministrador',
        name: 'NuevoAdministrador',
        component: () => import('pages/NuevoAdministrador.vue'),
        meta: { requireAuth: true, requiresRole: ['superAdmin', 'admin'] },
      },
      {
        path: 'NuevaAsociacion',
        name: 'NuevaAsociacion',
        component: () => import('pages/NuevaAsociacion.vue'),
        meta: { requireAuth: true, requiresRole: ['superAdmin', 'admin'] },
      },
      {
        path: 'EditarAsociacion/:idasoc',
        name: 'EditarAsociacion',
        component: () => import('pages/EditarAsociacion.vue'),
        meta: { requireAuth: true, requiresRole: ['superAdmin', 'admin'] },
      },
      {
        path: 'EditarUsuario/:idusuario',
        name: 'EditarUsuario',
        component: () => import('pages/EditarUsuario.vue'),
        meta: { requireAuth: true, requiresRole: ['superAdmin', 'admin'] },
      },
      {
        path: 'EditarAdministrador/:idasoc/:idadmin',
        name: 'EditarAdministrador',
        component: () => import('pages/EditarAdministrador.vue'),
        meta: { requireAuth: true, requiresRole: ['superAdmin', 'admin'] },
      },
      {
        path: 'AsociacionUsuarios/:idasoc/:show',
        name: 'AsociacionUsuarios',
        component: () => import('pages/AsociacionUsuarios.vue'),
        meta: { requireAuth: true, requiresRole: ['superAdmin', 'admin'] },
        beforeEnter: userAdminGuard,
      },
      {
        path: 'AsociacionesNuevoUsuarios/:idasoc',
        name: 'AsociacionesNuevoUsuarios',
        component: () => import('pages/AsociacionesNuevoUsuarios.vue'),
        meta: { requireAuth: true, requiresRole: ['superAdmin', 'admin'] },
      },
      {
        path: 'AsociacionesNuevoAdministrador/:idasoc',
        name: 'AsociacionesNuevoAdministrador',
        component: () => import('pages/AsociacionesNuevoAdministrador.vue'),
        meta: { requireAuth: true, requiresRole: ['superAdmin', 'admin'] },
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
