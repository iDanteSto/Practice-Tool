<template>
  <v-container >
    <v-row justify="space-around">
      <v-snackbar v-model="snackbar" :timeout="8000" top color="orange" dark  > {{text}}
        <v-btn color="white" text @click="snackbar = false"> Cerrar </v-btn>
      </v-snackbar>
      <v-col cols="12" v-if="acceso">
        <h2>Bienvenido </br>{{ nombre_completo }}!</h2>
      </v-col>
    </v-row>

    <v-row algin="center" justify="center">
      <v-col cols="12" md="12" lg="10" xl="8" algin="center">
        <v-card class="elevation-0" max-width="700" algin="center">
        </v-card>
      </v-col>
    </v-row>

    <v-row v-if="getLogeado" align="center" justify="center">
    	<v-col cols="12" md="8" lg="5"> 
    		<v-card class="elevation-0">
    		  <avataaars/>
          <v-card-title primary-title>
            <v-spacer></v-spacer>
            <span class="text-title">{{ getdatosUsuario.nombre + getdatosUsuario.apellidos}}</span>
            <v-spacer></v-spacer>
          </v-card-title>
    		</v-card>
    	</v-col>
    </v-row>

    <v-row v-if="!getLogeado">
    	<v-col cols="12">
    		<v-card class="elevation-0" :style="`height: ${height}px`">
    		  <v-img src="@/assets/hastaPronto.webp" :style="`height: ${height}px`" contain></v-img>
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
    data: () => ({
     
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
    }),

    computed:{
      ...mapGetters('login',['getdatosUsuario','getLogeado']),

      height () {
    		return this.$vuetify.breakpoint.height - 80
    	},
    },

    created(){
      this.initialize()
    },

    
    methods:{
      ...mapActions('login',['validarUser','guardarInfo','GetInfoUser','salirLogin']),
      ...mapActions('login',['GetInfoUser']),

      initialize() {

        if(this.$route.params.id){ 
          
          var decodedData     = base64.decode(this.$route.params.id);
          this.matricula      = decodedData.substr(0,10)
          this.unidad_negocio = decodedData.substr(10,1)

          var payload = {
            matricula:this.matricula,
            unidad_negocio:this.unidad_negocio
          }

	        // Aquí se envían los datos del usuario para saber que perfil tiene
          this.$http.post('alumnos.acceso', payload).then((response1) => {
            this.alumno = response1.body
            // Ahora hay que validad que exista esa misma matricula en el panel de herramientas
            var matricula = {
              matricula: this.matricula
            }
            this.$http.post('alumnos.existe', matricula).then((response2) => {
              if(response2.body){
                var datos = {
                  nombre:         this.alumno.nombre,
                  apellidos:      this.alumno.apellidos,
                  matricula:      this.matricula,
                  unidad_negocio: this.unidad_negocio,
                  id:             response2.body.idalumno,
                }
                this.guardarInfo(datos)
                this.$router.push({name: 'Home'})
              }else{
                // Agregar alumnos
                  this.$http.post('alumnos.add', matricula).then((response3) => {
                  if(response3.body){
                    var datos = {
                      nombre:         this.alumno.nombre,
                      apellidos:      this.alumno.apellidos,
                      matricula:      this.matricula,
                      unidad_negocio: this.unidad_negocio,
                      id:             response3.body.id,
                  
                    }
                    this.guardarInfo(datos)
                    this.$router.push({name: 'Home'})
                  }else{
                    this.salirLogin()
                  }
                  // Ahora hay que validad que exista esa misma matricula en el panel de herramientas
                }).catch((error) => {
                  this.salirLogin()
                  console.log(error);
                });
              }
              // Ahora hay que validad que exista esa misma matricula en el panel de herramientas
            }).catch((error) => {
              this.salirLogin()
              console.log(error);
            });
	        }).catch((error) => {
	        	this.salirLogin()
	          console.log(error);
	        });
      	}


      },
 
    },
  }
</script>

<style scoped>
  
  .logo{
    align-content: "center";
    text-align: center;
  }
</style>


  