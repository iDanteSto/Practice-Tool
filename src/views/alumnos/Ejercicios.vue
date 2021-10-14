<template>
  <v-container>
    <v-btn icon color="indigo" @click="goBack()">
      <v-icon>mdi-arrow-left-thick</v-icon>
    </v-btn>
    <!-- verifico que haya ejercicios por resolver-->
    <div
      v-if="total_ejercicios >= ejercicios.length && ejercicios.length > 0"
      class="text-center"
    >
      <div class=" text-h4 text-center mb-2 blue--text">
        Verbos
      </div>
      <div class=" text-h6 text-center mb-2 gray--text">
        Escribe el verbo que observas en la imagen.
      </div>

      <v-card class="mx-auto mt-3" max-width="850" v-if="show">
        <v-card-title class="text-h6 font-weight-regular justify-space-between">
          <v-avatar
            color="primary"
            class="text-overline white--text"
            size="55"
            v-text="step + '/' + ejercicios.length"
          ></v-avatar>
        </v-card-title>

        <v-window v-model="step">
          <v-window-item
            :value="i + 1"
            v-for="(ejercicio, i) in ejercicios"
            :key="ejercicio.idadivinar"
          >
            <v-row
              ><v-col align="center" cols="12">
                <v-img contain max-width="500" :src="url + ejercicio.imagen"
              /></v-col>
            </v-row>
            <v-card-text>
              <v-row dense>
                <v-col cols="12" sm="4">
                  <v-text-field
                    v-model="respuesta.respuesta1"
                    label="Base form"
                    outlined
                    dense
                    :clearable="!ordenar"
                    :readonly="ordenar"
                    :success-messages="success_v1"
                    :error-messages="error_v1"
                    :messages="ordenar ? ejercicio.presente : ''"
                  ></v-text-field
                ></v-col>
                <v-col cols="12" sm="4">
                  <v-text-field
                    v-model="respuesta.respuesta2"
                    label="Past"
                    outlined
                    dense
                    :clearable="!ordenar"
                    :readonly="ordenar"
                    :success-messages="success_v2"
                    :error-messages="error_v2"
                    :messages="ordenar ? ejercicio.pasado : ''"
                  ></v-text-field
                ></v-col>
                <v-col cols="12" sm="4">
                  <v-text-field
                    v-model="respuesta.respuesta3"
                    label="Past Participle"
                    outlined
                    dense
                    :clearable="!ordenar"
                    :readonly="ordenar"
                    :success-messages="success_v3"
                    :error-messages="error_v3"
                    :messages="ordenar ? ejercicio.participio : ''"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>

            <v-card-actions v-if="!ordenar" dense>
              <v-spacer></v-spacer>
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    v-on="on"
                    outlined
                    plain
                    @click="showOrdenar()"
                    >Saltar</v-btn
                  >
                </template>
                <span>Da click para omitir este ejercicio.</span>
              </v-tooltip>

              <v-btn
                outlined
                dense
                color="primary"
                depressed
                @click="revisar(ejercicio)"
                v-if="!adivinar"
              >
                Revisar
              </v-btn>
              <v-btn
                outlined
                dense
                color="primary"
                depressed
                @click="showOrdenar()"
                v-else
              >
                Siguiente
              </v-btn>
            </v-card-actions>
            <div v-else></div>
            <div v-if="ordenar">
              <v-card-title
                class="text-h6 text-center text-no-wrap justify-center"
              >
                Ordena la siguiente oración
              </v-card-title>
              <v-textarea
                auto-grow
                rows="1"
                v-model="frase"
                outlined
                dense
                readonly
                class="ml-4 mr-4"
                :success-messages="success"
                :error-messages="error"
              ></v-textarea>
              <v-row justify="center">
                <v-btn-toggle
                  multiple
                  dense
                  v-for="(palabra, j) in ejercicio.palabras_random"
                  :key="j"
                >
                  <v-btn
                    class="ma-2"
                    outlined
                    color="primary"
                    @click="add(palabra)"
                    dark
                    dense
                    >{{ palabra }}</v-btn
                  >
                </v-btn-toggle>
              </v-row>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-tooltip top v-if="success == ''">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      v-bind="attrs"
                      class="mb-2"
                      v-on="on"
                      outlined
                      plain
                      @click="guardar(ejercicio)"
                      >Saltar</v-btn
                    >
                  </template>
                  <span>Da click para omitir este ejercicio.</span>
                </v-tooltip>
                <v-btn
                  outlined
                  class="mb-2"
                  dense
                  color="primary"
                  depressed
                  @click="reset()"
                >
                  Limpiar respuesta
                </v-btn>
                <v-btn
                  outlined
                  class="mb-2"
                  dense
                  color="primary"
                  depressed
                  @click="comprobar(ejercicio.frase)"
                >
                  Revisar
                </v-btn>
                <v-btn
                  v-if="success != ''"
                  outlined
                  class="mb-2"
                  dense
                  color="primary"
                  depressed
                  @click="guardar(ejercicio)"
                >
                  Continuar
                </v-btn>
              </v-card-actions>
            </div>
          </v-window-item>
        </v-window>
      </v-card>

      <v-alert
        v-if="total === 0 && !show"
        class="mt-2 mx-auto"
        max-width="250px"
        dense
        outlined
        color="primary"
      >
        <v-row align="center">
          <v-col cols="12" class="grow">
            <strong class="indigo--text"> Oops! </strong> Intentalo de nuevo
          </v-col>
          <v-col cols="12" class="shrink">
            <v-btn
              class="mt-2 mb-2"
              outlined
              color="primary"
              dark
              @click="intentar()"
              >Intentar otra vez</v-btn
            >
          </v-col>
        </v-row>
      </v-alert>

      <v-alert
        dense
        outlined
        type="success"
        v-if="total > 0 && !show"
        class="mt-2 mx-auto"
        max-width="250px"
      >
        <strong> ¡Genial! </strong> has conseguido
        <strong> {{ total }}</strong> puntos.
      </v-alert>
    </div>

    <!--verifico que todos los ejercicios se encuentren resueltos-->
    <div
      v-if="ejercicios.length == 0 && this.total_ejercicios > 0"
      class="text-center "
    >
      <v-card class="mx-auto my-8" max-width="400">
        <v-avatar size="50" class="mt-2" color="yellow darken-2">
          <v-icon x-large dark>
            mdi-star-face
          </v-icon>
        </v-avatar>
        <v-card-title class="justify-center"
          ><strong> ¡Felicidades! </strong></v-card-title
        >

        <v-card-text class="text--primary">
          <div>Has contestado todos los ejercicios de este nivel.</div>
        </v-card-text>

        <v-card-actions class="justify-center">
          <!-- <v-btn class="mt-2 mb-2" outlined color="primary" dark
            >Siguiente nivel</v-btn
          >-->
        </v-card-actions>
      </v-card>
    </div>

    <!--Verifico si no hay ejercicios en ese nivel-->
    <div v-if="total_ejercicios === 0" class="text-center ">
      <v-card class="mx-auto my-8" max-width="400">
        <v-avatar size="50" class="mt-2" color="green">
          <v-icon x-large dark>
            mdi-cogs
          </v-icon>
        </v-avatar>
        <v-card-title class="justify-center"
          ><strong> Este nivel aún no tiene ejercicios.</strong></v-card-title
        >

        <v-card-text class="text--primary"> </v-card-text>

        <v-card-actions class="justify-center"> </v-card-actions>
      </v-card>
    </div>
  </v-container>
</template>
<script>
var moment = require("moment");
moment.locale();

import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    ejercicios: [],
    step: 1,
    respuesta: {
      respuesta1: "",
      respuesta2: "",
      respuesta3: "",

      idadivinar: 0,
      presente: "",
      pasado: "",
      participio: "",
      imagen: "",
      puntos: 0,
    },
    total_ejercicios: 0,
    show: true,
    puntos: 0,
    value: 0,
    total: 0,
    //ordenar
    success: "",
    error: "",
    frase: "",
    respuesta_ordenar: [],
    ordenar: false,
    puntos_ordenar: 0,
    //ADI
    success_v1: "",
    success_v2: "",
    success_v3: "",
    error_v1: "",
    error_v2: "",
    error_v3: "",
    adivinar: false,
  }),

  computed: {
    ...mapGetters("Nivel", ["getNivel"]), //cambios
    ...mapGetters("login", ["getdatosUsuario"]), //cambios
  },

  watch: {
    respuesta_ordenar() {
      this.error = "";
      this.success = "";
    },
  },

  created() {
    this.initialize();
    // Generando la fecha de hoy
    const fecha = new Date().toLocaleDateString("en-Es", {
      timeZone: "America/Mexico_City",
    });
    this.fecha = moment().format("YYYY-MM-DD HH:mm:ss");

    this.url = this.$http.options.root + "imagen/";
  },

  methods: {
    initialize() {
      this.puntos = 0;

      var datos = {
        idnivel: this.getNivel,
        idalumno: this.getdatosUsuario.id,
      };
      this.$http
        .post("alumno_adivinar.nivel", datos)
        .then((response) => {
          this.ejercicios = response.body;
        })
        .catch((error) => console.log(error));

      this.$http
        .get("adivinar_palabras.nivel/ " + this.getNivel)
        .then((response) => {
          this.total_ejercicios = response.body.length;
        })
        .catch((error) => console.log(error));
    },

    ...mapActions("Nivel", ["guardarNivel"]), ///cambios

    openNivel(nivel) {
      this.guardarNivel(nivel.idnivel); //cambios
      this.$router.push({ name: "Ejercicios" });
    },

    add(palabra) {
      // se agregan las palabras para formar la frase

      if (this.respuesta_ordenar.includes(palabra)) {
        //verifico si la palabra ya esta dentro de la frase

        var i = this.respuesta_ordenar.indexOf(palabra); // del array obtengo su posicion para cuando se modifique si coincida con la palabra que es
        this.respuesta_ordenar.splice(i, 1); //elimino la palabra del array
      } else {
        // si la palabra no esta, la añado a la frase
        this.respuesta_ordenar.push(palabra);
      }

      this.frase = this.respuesta_ordenar.join(" "); //de array a string
    },

    //revisar si el verbo esta escrito correctamente
    revisar(ejercicio) {
      var cont = 0; //contador para saber le num de aciertos
      this.success_v1 = ""; //limpio el mensaje antes de validar
      this.success_v2 = "";
      this.success_v3 = "";
      this.error_v1 = "";
      this.error_v2 = "";
      this.error_v3 = "";

      //mensajes a mostrar
      var success = "¡Correcto!";
      var error = "Whoops! Intenta de nuevo";

      if (
        ejercicio.presente === this.respuesta.respuesta1.trim().toLowerCase()
      ) {
        this.success_v1 = success;
        cont = cont + 1;
      } else {
        this.error_v1 = error;
      }

      if (ejercicio.pasado == this.respuesta.respuesta2.trim().toLowerCase()) {
        this.success_v2 = success;
        cont = cont + 1;
      } else {
        this.error_v2 = error;
      }

      if (
        ejercicio.participio == this.respuesta.respuesta3.trim().toLowerCase()
      ) {
        this.success_v3 = success;
        cont = cont + 1;
      } else {
        this.error_v3 = error;
      }

      //verifico que las 3 respuestas sean validas
      if (cont === 3) {
        this.adivinar = true;
      }
    },

    comprobar(frase) {
      this.success = "";
      this.error = "";
      //compruebo que la frase del alumno sea igual a la del ejercicio
      if (this.frase.trim() == frase) {
        this.success = "¡Correcto!";
      } else {
        this.error = "Whoops! Intenta de nuevo";
      }
    },

    showOrdenar() {
      this.ordenar = true;
      this.error_v1 = "";
      this.error_v2 = "";
      this.error_v3 = "";
    },

    guardar(ejercicio) {
      var obtenidos = 0;
      var obtenidos_ordenar = 0;
      if (
        ejercicio.presente === this.respuesta.respuesta1.trim().toLowerCase() &&
        ejercicio.pasado === this.respuesta.respuesta2.trim().toLowerCase() &&
        ejercicio.participio === this.respuesta.respuesta3.trim().toLowerCase()
      ) {
        obtenidos = ejercicio.puntos;
      }

      if (this.success != "") {
        obtenidos_ordenar = ejercicio.puntos_ordenar;
      }

      this.total = this.total + obtenidos + obtenidos_ordenar;

      var datos = {
        idalumno: this.getdatosUsuario.id,
        idadivinar: ejercicio.idadivinar,
        puntos: ejercicio.puntos,
        puntos_obtenidos: obtenidos,
        respuesta1: this.respuesta.respuesta1.trim().toLowerCase(),
        respuesta2: this.respuesta.respuesta2.trim().toLowerCase(),
        respuesta3: this.respuesta.respuesta3.trim().toLowerCase(),
        presente: ejercicio.presente,
        pasado: ejercicio.pasado,
        participio: ejercicio.participio,
        tiempo_respuesta: 0,
        imagen: ejercicio.imagen,
        idnivel: this.getNivel,
        usuario_registro: 1,
        fecha_creacion: this.fecha,
        fecha_actualizo: this.fecha,
        deleted: 0,
      };

      //
      var datos_ordenar = {
        idalumno: this.getdatosUsuario.id,
        idadivinar: ejercicio.idadivinar,
        idordenar: ejercicio.idordenar,
        idnivel: this.getNivel,
        frase: ejercicio.frase,
        respuesta: this.frase,
        puntos: ejercicio.puntos_ordenar,
        puntos_obtenidos: this.success != "" ? ejercicio.puntos_ordenar : 0,
        usuario_registro: 1,
        fecha_creacion: this.fecha,
        fecha_actualizo: this.fecha,
        deleted: 0,
      };

      this.$http
        .post("alumno_adivinar.id", datos)
        .then((response) => {
          //verificamos si ya existe un registro
          if (response.body[0]) {
            var id = response.body[0].idalumno_adivinar;
            this.$http
              .put("alumno_adivinar.update/" + id, datos)
              .then((response) => {
              })
              .catch((error) => console.log(error));

            this.$http
              .post("alumno_ordenar.id", datos)
              .then((response1) => {
                if (response1.body[0]) {
                  //verificamos si ya existe un registro
                  var idordenar = response1.body[0].idalumno_ordenar;
                  this.$http
                    .put("alumno_ordenar.update/" + idordenar, datos_ordenar)
                    .then((response) => {
                    })
                    .catch((error) => console.log(error));
                }
                this.initialize();
              })
              .catch((error) => console.log(error));
          } else {
            this.$http
              .post("alumno_adivinar.add/", datos)
              .then((response) => {
                // console.log("add");
              })
              .catch((error) => console.log(error));

            this.$http
              .post("alumno_ordenar.add/", datos_ordenar)
              .then((response) => {
                //console.log("add");
                // this.initialize();
              })
              .catch((error) => console.log(error));
          }

          // this.initialize();
        })
        .catch((error) => console.log(error));

      //limpio las respuestas
      this.respuesta = {
        respuesta1: "",
        respuesta2: "",
        respuesta3: "",

        idadivinar: 0,
        presente: "",
        pasado: "",
        participio: "",
        imagen: "",
        puntos: 0,
      };
      this.respuesta_ordenar = "";
      this.success = "";
      this.success_v1 = "";
      this.success_v2 = "";
      this.success_v3 = "";

      this.continuar();
    },

    intentar() {
      this.show = true;
    },

    continuar() {
      this.step++;
      if (this.ejercicios.length + 1 === this.step) {
        this.show = false;
      }

      this.ordenar = false;
    },

    reset() {
      this.respuesta_ordenar = [];
      this.frase = "";
    },

    goBack() {
      window.history.back();
    },
  },
};

// checar porque el avatar se desaparece en tamaño celular
</script>
