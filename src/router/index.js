import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Niveles from '../views/catalogos/Niveles.vue'
import AdivinarPalabras from '../views/catalogos/AdivinarPalabras.vue'
import CompletarOraciones from '../views/catalogos/CompletarOraciones.vue'
import FormarOraciones from '../views/catalogos/FormarOraciones.vue'
import OrdenarPalabras from '../views/catalogos/OrdenarPalabras.vue'

import TipoEjercicios from '../views/alumnos/TipoEjercicios.vue'
import Habilidades from '../views/alumnos/Habilidades.vue'
import EjercicioNiveles from '../views/alumnos/Niveles.vue'
import Ejercicios from '../views/alumnos/Ejercicios.vue'
import Avatar from '../views/alumnos/Avatar.vue'
import Login from '../views/alumnos/Login.vue'
import Logros from '../views/alumnos/Logros.vue'
import Diccionario from '../views/alumnos/Diccionario.vue'

import store from '@/store'


Vue.use(VueRouter)

const router = new VueRouter({
    mode: '',
    base: process.env.BASE_URL,
    routes: [{
            path: '/',
            name: 'Home',
            component: Home,
            meta: { ADMIN: true, USUARIO: true, NORMAL: true }
        },

        {
            path: '/login/:id',
            name: 'Login',
            component: Login,
            meta: { ADMIN: true, USUARIO: true, NORMAL: true, libre: true }
        },

        {
            path: '/niveles',
            name: 'Niveles',
            component: Niveles,
            meta: { ADMIN: true, USUARIO: true, NORMAL: true }
        },

        {
            path: '/adivinar',
            name: 'AdivinarPalabras',
            component: AdivinarPalabras,
            meta: { ADMIN: true, USUARIO: true, NORMAL: true }
        },

        {
            path: '/completar',
            name: 'CompletarOraciones',
            component: CompletarOraciones,
            meta: { ADMIN: true, USUARIO: true, NORMAL: true }
        },

        {
            path: '/formar',
            name: 'FormarOraciones',
            component: FormarOraciones,
            meta: { ADMIN: true, USUARIO: true, NORMAL: true }
        },

        {
            path: '/ordenar',
            name: 'OrdenarPalabras',
            component: OrdenarPalabras,
            meta: { ADMIN: true, USUARIO: true, NORMAL: true }
        },

        {
            path: '/tipo_ejercicios',
            name: 'TipoEjercicios',
            component: TipoEjercicios,
            meta: { ADMIN: true, USUARIO: true, NORMAL: true }
        },

        {
            path: '/ejercicios_niveles',
            name: 'EjercicioNiveles',
            component: EjercicioNiveles,
            meta: { ADMIN: true, USUARIO: true, NORMAL: true }
        },

        {
            path: '/ejercicios',
            name: 'Ejercicios',
            component: Ejercicios,
            meta: { ADMIN: true, USUARIO: true, NORMAL: true }
        },

        {
            path: '/avatar/:id',
            name: 'Avatar',
            component: Avatar,
            meta: { ADMIN: true, USUARIO: true, NORMAL: true }
        },
        {
            path: '/habilidades',
            name: 'Habilidades',
            component: Habilidades,
            meta: { ADMIN: true, USUARIO: true, NORMAL: true }
        },
        {
            path: '/logros',
            name: 'Logros',
            component: Logros,
            meta: { ADMIN: true, USUARIO: true, NORMAL: true }
        },
        {
            path: '/diccionario',
            name: 'Diccionario',
            component: Diccionario,
            meta: { ADMIN: true, USUARIO: true, NORMAL: true }
        },
    ]
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.libre)) {
        next()
    } else if (store.state.login.datosUsuario) {
        if (to.matched.some(record => record.meta.ADMIN)) {
            next()
        }
    } else {
        next({
            name: 'Login'
        })
    }
})

export default router