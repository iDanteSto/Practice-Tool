import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'

export default {
    namespaced: true,
    state: {
        nivel: 0,
    },

    mutations: {
        NIVEL(state, nivel) {
            state.nivel = nivel
        },
    },

    actions: {
        guardarNivel({ commit, dispatch }, nivel) {
            commit('NIVEL', nivel)
            console.log("nivel:  " + nivel)
        },
    },

    getters: {
        getNivel(state) {
            return state.nivel
        },
    }
}