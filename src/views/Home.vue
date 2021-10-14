<template>
  <v-container>
    <v-row v-if="getLogeado" align="center" justify="center">
      <v-col cols="12" md="8" lg="5"> 
        <v-card class="elevation-0">
          <avataaars/>
          <v-card-title primary-title>
            <v-spacer></v-spacer>
            <span class="display-2">Bienvenido</span>
            <v-spacer></v-spacer>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import Avataaars from "vuejs-avataaars";

  // Instalamos la libbrería de base64
  var base64 = require('base-64');

  import router from '@/router'
  import {mapActions , mapGetters} from 'vuex'
  export default {
    components:{
      Avataaars
    },
    data(){
      return{
        acceso: false,
        nombre_completo: "",
        cargo: "",
        datos_usuario: {},

        snackbar: false,
        y: 'top',
        x: null,
        mode: '',
        timeout: 8000,
        text: '',

        show1: false,
        error: '',

        alumno:'',

      }
    },

    created(){
      console.log(this.getdatosUsuario)
    },

    computed: {
      ...mapGetters('login',['getdatosUsuario','getLogeado'])
    }
  }
</script>

<style scoped>
  .bienvenido{
    font-size: 35px;
  }
</style>