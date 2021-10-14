import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'

export default {
    namespaced: true,
    state: {
        tipo: 0,
    },

    mutations: {
        TIPO(state, tipo) {
            state.tipo = tipo
        },
    },

    actions: {
        guardarTipo({ commit, dispatch }, tipo) {
            commit('TIPO', tipo)
            console.log("tipo:  " + tipo)
        },
    },

    getters: {
        getTipo(state) {
            return state.tipo
        },
    }
}