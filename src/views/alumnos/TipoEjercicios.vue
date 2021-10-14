<template>
  <v-container>
    <v-btn icon color="indigo" @click="goBack()">
      <v-icon>mdi-arrow-left-thick</v-icon>
    </v-btn>
    <!--
    <v-card flat class="mb-2 mt-2 text-center justify-center">
      <v-avatar class=" mb-2 mt-2 " size="100" color="yellow darken-1">
        <v-icon x-large dark>
          mdi-crown-outline
        </v-icon>
      </v-avatar>
      <v-card-title primary-title>
        title
      </v-card-title>
      <v-card-actions> </v-card-actions>
    </v-card>-->

    <v-row class=" mt-2 text-center justify-center">
      <v-col
        cols="12"
        sm="6"
        md="6"
        lg="4"
        xl="4"
        v-for="(tipo, i) in tipos"
        :key="i"
        class="text-center"
      >
        <v-card hover @click="openTipo(tipo)" class="rounded-xl">
          <v-container>
            <v-avatar size="110">
              <img contain max-height="105" :src="url + tipo.imagen" />
            </v-avatar>
          </v-container>

          <v-card-title class="blue--text text-center justify-center">
            {{ tipo.nombre }}
          </v-card-title>
          <v-card-actions dense class=" mx-auto text-center justify-center">
            <v-progress-linear
              class="ma-2"
              color="yellow darken-2"
              rounded
              height="15"
              :value="100"
              v-model="porcentaje"
              ><template v-slot:default="{ value }">
                <strong>{{ Math.ceil(value) }}%</strong>
              </template></v-progress-linear
            >
            <!--<v-btn dense class="ma-2" color="success" outlined>
              <v-icon left> mdi-trophy-award </v-icon
              ><strong>{{ puntos }} </strong>&nbsp; puntos obtenidos
            </v-btn>-->
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
    tipos: [
      {
        id: 1,
        nombre: "Verbos",
        imagen: "icons8-impreso-100.png",
      },
      // {
      //   id: 2,
      //   nombre: "Descripciones",
      //   imagen: "icons8-impreso-100.png",
      // },
    ],
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
        .get("adivinar_palabras.all")
        .then((response) => {
          console.log(response.body);
          this.total_adivinar = response.body.length;
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

          this.porcentaje = (this.total_ejercicios * 100) / this.total_adivinar;
        })
        .catch((error) => console.log(error));
    },

    ...mapActions("Tipo", ["guardarTipo"]),

    openTipo(tipo) {
      if (tipo.id == 1) {
        // this.guardarTipo(tipo.id);
        this.$router.push({ name: "EjercicioNiveles" });
      } else {
        window.alert("Espera estos ejercicios !");
      }
    },

    goBack() {
      window.history.back();
    },
  },
};
</script>
