<template>
  <v-container>
    <!--
    <v-card width="300" class=" mx-auto text-center  justify-center " outlined>
      <v-avatar class="mx-auto mb-2 mt-2 " size="100" color="yellow darken-1">
        <v-icon x-large dark>
          mdi-crown-outline
        </v-icon>
      </v-avatar>
      <v-card-title primary-title> </v-card-title>
      <v-card-actions> </v-card-actions>
    </v-card>-->
    <v-row class=" mt-2 text-center justify-center">
      <v-col
        cols="12"
        sm="6"
        md="6"
        lg="5"
        xl="5"
        v-for="(tipo, i) in tipos"
        :key="i"
        class="text-center"
      >
        <v-card hover @click="openTipo(tipo)" class="rounded-xl">
          <v-container>
            <v-avatar size="120">
              <img contain max-height="100" :src="url + tipo.imagen" />
            </v-avatar>
          </v-container>

          <v-card-title class="blue--text text-center justify-center">
            {{ tipo.tipo_ejercicio }}
          </v-card-title>

          <v-card-actions dense class=" mx-auto text-center justify-center"
            ><v-progress-linear
              v-if="tipo.idtipo_ejercicio == 1"
              class="ma-2"
              color="yellow darken-2"
              rounded
              height="15"
              value="100"
              v-model="porcentaje"
              ><template v-slot:default="{ value }">
                <strong>{{ Math.ceil(value) }}%</strong>
              </template></v-progress-linear
            ><v-progress-linear
              v-else
              class="ma-2"
              color="yellow darken-2"
              rounded
              height="15"
              value="0"
              ><template v-slot:default="{ value }">
                <strong>{{ Math.ceil(value) }}%</strong>
              </template></v-progress-linear
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
var moment = require("moment");
moment.locale();

import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    tipos: [],
    puntos: 0,
    total_ejercicios: 0,
    total_adivinar: 0,
    porcentaje: 0,
    ejercicios_completos: 0,
  }),

  computed: {
    ...mapGetters("login", ["getdatosUsuario"]),
  },

  watch: {},

  created() {
    this.initialize();
    // Generando la fecha de hoy
    const fecha = new Date().toLocaleDateString("en-Es", {
      timeZone: "America/Mexico_City",
    });
    this.fecha = moment(fecha)
      .format()
      .substr(0, 10);

    this.url = this.$http.options.root + "imagen/";
  },

  methods: {
    initialize() {
      this.$http
        .get("tipo_ejercicios.all")
        .then((response) => {
          this.tipos = response.body;
        })
        .catch((error) => console.log(error));

      this.$http
        .get("alumno_adivinar.alumno/" + this.getdatosUsuario.id)
        .then((response) => {
          for (const j in response.body) {
            var sum =
              response.body[j].puntos_obtenidos +
              response.body[j].puntos_obtenidos_ordenar;
            this.puntos = this.puntos + sum;
          }

          for (const k in response.body) {
            if (
              response.body[k].puntos_obtenidos > 0 &&
              response.body[k].puntos_obtenidos_ordenar > 0
            ) {
              this.ejercicios_completos.push(response.body[k]);
            }
          }
          if (this.ejercicios_completos == 0) {
            this.total_ejercicios = 0;
          } else {
            this.total_ejercicios = this.ejercicios_completos.length;
          }
          // this.tipos[0].total_ejercicios = this.total_ejercicios;
        })
        .catch((error) => console.log(error));

      //todos los ejercicios
      this.$http
        .get("adivinar_palabras.all")
        .then((response) => {
          this.total_adivinar = response.body.length;
          this.porcentaje = (this.total_ejercicios * 100) / this.total_adivinar;
        })
        .catch((error) => console.log(error));
    },

    ...mapActions("Tipo", ["guardarTipo"]),

    openTipo(tipo) {
      if (tipo.idtipo_ejercicio == 1) {
        // this.guardarTipo(tipo.idtipo_ejercicio);
        this.$router.push({ name: "TipoEjercicios" });
      } else {
        window.alert("Ejercicios no disponibles");
      }
    },
  },
};
</script>
