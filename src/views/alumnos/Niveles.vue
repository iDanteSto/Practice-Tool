<template>
  <v-container>
    <v-btn icon color="indigo" @click="goBack()">
      <v-icon>mdi-arrow-left-thick</v-icon>
    </v-btn>
    <div class=" text-h4 text-center mb-2 blue--text">Niveles</div>

    <v-row class="justify-center text-center">
      <v-col
        cols="6"
        sm="6"
        md="4"
        lg="2"
        xl="2"
        v-for="(nivel, i) in niveles"
        :key="i"
        dense
      >
        <a @click="openNivel(nivel)">
          <v-badge avatar overlap class="mt-2 " offset-x="40" offset-y="20">
            <template v-slot:badge>
              <v-avatar size="30">
                {{ nivel.nivel }}
              </v-avatar> </template
            ><v-avatar size="130">
              <v-hover v-slot="{ hover }"
                ><v-img :aspect-ratio="16 / 9" :src="url + nivel.imagen">
                  <v-expand-transition>
                    <div
                      v-if="hover"
                      class="d-flex transition-fast-in-fast-out blue darken-4 v-card--reveal text-h5 white--text"
                      style="height: 100%;"
                    >
                      {{ nivel.puntos }}
                    </div>
                  </v-expand-transition>
                </v-img>
              </v-hover>
            </v-avatar>
          </v-badge>
        </a>

        <!--  <a @click="openNivel(nivel)">
          <v-badge avatar overlap class="mt-2 " offset-x="40" offset-y="20">
            <template v-slot:badge>
              <v-avatar size="30">
                {{ nivel.nivel }}
              </v-avatar>
            </template>
            <v-avatar size="130">
              <v-img :aspect-ratio="16 / 9" :src="url + nivel.imagen"> </v-img>
            </v-avatar>
          </v-badge>
        </a>-->
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
    niveles: [],
  }),

  computed: {
     ...mapGetters("login", ["getdatosUsuario"]),  //cambios
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
        .get("niveles.adivinar.alumno/" + this.getdatosUsuario.id) //cambiar
        .then((response) => {
          this.niveles = response.body;
        })
        .catch((error) => console.log(error));
    },

    ...mapActions("Nivel", ["guardarNivel"]), ///cambios

    openNivel(nivel) {
      this.guardarNivel(nivel.idnivel); //cambios
      this.$router.push({ name: "Ejercicios" });
    },
    goBack() {
      window.history.back();
    },
  },
};
</script>
<style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.6;
  position: absolute;
  width: 100%;
}
</style>
