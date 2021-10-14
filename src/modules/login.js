import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'
import vuetify from '@/plugins/vuetify';

export default {
    namespaced: true,
    state: {
        login: false,
        datosUsuario: '',
    },

    mutations: {
        LOGEADO(state, value) {
            state.login = value
        },
        DATOS_USUARIO(state, datosUsuario) {
            state.datosUsuario = datosUsuario
        },

        SALIR(state) {
            state.login = false
            state.datosUsuario = ''
        }
    },

    actions: {
      // Valida si el usario existe en la BD
      validarUser({ commit }, usuario) {
        return new Promise((resolve, reject) => {
          // console.log (usuario)
          Vue.http.post('sessions', usuario).then(respuesta => {
            return respuesta.json()
          }).then(respuestaJson => {
            // console.log('respuestaJson',respuestaJson)
            if (respuestaJson == null) {
                resolve(false)
            } else {
                resolve(respuestaJson)
            }
          }, error => {
            reject(error)
          })
        })
      },

      guardarInfo({ commit, dispatch }, usuario) {
        commit('DATOS_USUARIO', usuario)
        commit('LOGEADO', true)
      },

      GetInfoUser({ commit, dispatch }, usuario) {
        return new Promise((resolve, reject) => {
          Vue.http.post('sessions', usuario).then(response => {
            console.log('response', response.body)
            if (!response.body.length) {
              resolve(false)
            } else {
              if (response.body[0].estatus == 0) {
                resolve('Tienes que validar tu correo')
              } else if (response.body[0].estatus == 1) {
                resolve('No tienes acceso lo sentimos')
              } else {
                commit('DATOS_USUARIO', response.body[0])
                commit('LOGEADO', true)
                resolve(true)
              }
            }
          }, error => {
            resolve(false)
          })
        })
      },



      salirLogin({ commit }) {
        localStorage.removeItem('vuex');
        commit('SALIR')
      },
    },

    getters: {
        getLogeado(state) {
            return state.login
        },
        getdatosUsuario(state) {
            return state.datosUsuario
        },

    }
}