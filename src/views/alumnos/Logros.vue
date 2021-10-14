<template>
  <v-container>
    <!--- with some props -->

    <v-card width="200" flat class="mb-2 mx-auto">
      <v-avatar size="200">
        <avataaars
          :circleColor="select.circleColor"
          :accessoriesType="select.accessoriesType"
          :clotheType="select.clotheType"
          :clotheColor="select.clotheColor"
          :eyebrowType="select.eyebrowType"
          :eyeType="select.eyeType"
          :facialHairColor="select.facialHairColor"
          :facialHairType="select.facialHairType"
          :graphicType="select.graphicType"
          :hairColor="select.hairColor"
          :mouthType="select.mouthType"
          :topType="select.topType"
          :skinColor="select.skinColor"
        >
        </avataaars>
      </v-avatar>
      <v-card-title class="blue--text mt-8 text-center justify-center">
        <p>
          {{ getdatosUsuario.nombre }}
        </p>
        <p class="blue--text text--darken-4">
          Tus logros
        </p>
      </v-card-title>
    </v-card>
    <v-row>
      <v-col cols="4"
        ><v-card
          ><v-card-title primary-title>
            <v-icon x-large color="pink ">mdi-trophy-outline</v-icon>
            Resuelve 1 ejercicio
          </v-card-title>
          <div class="pa-1">
            <v-progress-linear
              v-model="v1"
              rounded
              color="pink"
              height="12"
              value="100"
            ></v-progress-linear>
          </div>
        </v-card>
      </v-col>
      <v-col cols="4"
        ><v-card :disabled="v2 == 0"
          ><v-card-title primary-title>
            <v-icon x-large color="blue ">mdi-trophy-outline</v-icon>
            Resuelve 10 ejercicios
          </v-card-title>
          <div class="pa-1">
            <v-progress-linear
              v-model="v2"
              rounded
              color="blue"
              height="12"
              value="100"
            ></v-progress-linear>
          </div>
        </v-card>
      </v-col>
      <v-col cols="4"
        ><v-card :disabled="v3 == 0"
          ><v-card-title primary-title>
            <v-icon x-large color="yellow darken-1 ">mdi-trophy-outline</v-icon>
            Resuelve 25 ejercicios
          </v-card-title>
          <div class="pa-1">
            <v-progress-linear
              v-model="v3"
              rounded
              color="yellow darken-1"
              height="12"
              value="100"
            ></v-progress-linear>
          </div>
        </v-card>
      </v-col>
      <v-col cols="4"
        ><v-card :disabled="v4 == 0"
          ><v-card-title primary-title>
            <v-icon x-large color="light-green ">mdi-crown-outline</v-icon>
            Obten 100 de puntos
          </v-card-title>
          <div class="pa-1">
            <v-progress-linear
              v-model="v4"
              rounded
              color="light-green"
              height="12"
              value="100"
            ></v-progress-linear>
          </div>
        </v-card>
      </v-col>
      <v-col cols="4"
        ><v-card :disabled="v5 == 0"
          ><v-card-title primary-title>
            <v-icon x-large color="orange ">mdi-crown-outline</v-icon>
            Obten 200 de puntos
          </v-card-title>
          <div class="pa-1">
            <v-progress-linear
              v-model="v5"
              rounded
              color="orange"
              height="12"
              value="100"
            ></v-progress-linear>
          </div>
        </v-card>
      </v-col>
      <v-col cols="4"
        ><v-card :disabled="v6 == 0"
          ><v-card-title primary-title>
            <v-icon x-large color="purple ">mdi-crown-outline</v-icon>
            Obten 500 de puntos
          </v-card-title>
          <div class="pa-1">
            <v-progress-linear
              v-model="v6"
              rounded
              color="purple"
              height="12"
              value="100"
            ></v-progress-linear>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
var moment = require("moment");
moment.locale();

import Avataaars from "vuejs-avataaars";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    Avataaars,
  },
  data: () => ({
    select: {
      circleColor: "#6fb8e0",
      accessoriesType: null,
      clotheType: null,
      clotheColor: null,
      eyebrowType: null,
      eyeType: null,
      facialHairType: null,
      facialHairColor: null,
      graphicType: null,
      hairColor: null,
      mouthType: null,
      topType: null,
      topColor: null,
      skinColor: null,
    },
    alumnos: [],
    snackbar: false,
    url: "",
    power: 50,
    porcentaje: 0,
    total_ejercicios: 0,
    total_adivinar: 0,
    ejercicios_completos: 0,
    v1: 0,
    v2: 0,
    v3: 0,
    v4: 0,
    v5: 0,
    v6: 0,
  }),

  watch: {},

  created() {
    console.log(this.getdatosUsuario.id);
    this.initialize();
    // Generando la fecha de hoy
    const fecha = new Date().toLocaleDateString("en-Es", {
      timeZone: "America/Mexico_City",
    });
    this.fecha = moment(fecha).format("YYYY-MM-DD HH:mm:ss");
  },
  computed: {
    ...mapGetters("login", ["getdatosUsuario"]), //cambios
  },

  methods: {
    initialize() {
      this.$http
        .get("alumnos.id/" + this.getdatosUsuario.id)
        .then((response) => {
          this.alumnos = response.body;
          if (this.alumnos.length > 0) {
            this.select.circleColor =
              this.alumnos[0].circle_color == null
                ? "#000"
                : this.alumnos[0].circle_color;
            this.select.accessoriesType = this.alumnos[0].accessories_type;
            this.select.clotheType = this.alumnos[0].clothe_type;
            this.select.clotheColor = this.alumnos[0].clothe_color;
            this.select.eyebrowType = this.alumnos[0].eyebrow_type;
            this.select.eyeType = this.alumnos[0].eye_type;
            this.select.facialHairType = this.alumnos[0].facial_hair_type;
            this.select.facialHairColor = this.alumnos[0].facial_hair_color;
            this.select.graphicType = this.alumnos[0].graphic_type;
            this.select.hairColor = this.alumnos[0].hair_color;
            this.select.mouthType = this.alumnos[0].mouth_type;
            this.select.topType = this.alumnos[0].top_type;
            this.select.topColor = this.alumnos[0].top_color;
            this.select.skinColor = this.alumnos[0].skin_color;
            console.log(this.alumnos);
          }
        })
        .catch((error) => console.log(error));

      this.$http
        .get("alumno_adivinar.alumno/" + this.getdatosUsuario.id)
        .then((response) => {
          for (const j in response.body) {
            var sum =
              response.body[j].puntos_obtenidos +
              response.body[j].puntos_obtenidos_ordenar;
            this.power = this.power + sum;
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

          if (this.total_ejercicios >= 1) {
            this.v1 = 100;
            if (this.total_ejercicios >= 10) {
              this.v2 = 100;
              if (this.total_ejercicios >= 25) {
                this.v3 = 100;
              }
            }
          }

          if (this.power >= 100) {
            this.v4 == 100;
            if (this.power >= 200) {
              this.v5 == 100;
              if (this.power >= 500) {
                this.v6 == 100;
              }
            }
          }
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>
