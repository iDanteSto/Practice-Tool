import Vue from 'vue'
import Vuex from 'vuex'

import router   from '@/router'

import login    from '@/modules/login'
import Nivel    from '@/modules/Nivel'
import Tipo     from '@/modules/Tipo'
import  createPersistedState  from  'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },

  actions: {
    
  },

  getters:{
        

    },

    modules:{
      login,
      Nivel,
      Tipo,
    },

  plugins: [createPersistedState()]

})
