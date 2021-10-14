<template>
  <v-app>
  <div v-if="route != 'Avatar'">
    <v-app-bar app color="primary" dark height="56px" v-if="getLogeado">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      Herramienta de práctica
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      :mini-variant.sync="mini"
      app
      v-if="getLogeado"
    >
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <img
            v-if="alumnos[0]"
            :src="
              `https://avataaars.io/?avatarStyle=Circle&accessoriesType=${alumnos[0].accessories_type}&topType=${alumnos[0].top_type}&hairColor=${alumnos[0].hair_color}&facialHairType=${alumnos[0].facial_hair_type}&facialHairColor=${alumnos[0].facial_hair_color}&clotheType=${alumnos[0].clothe_type}&clotheColor=${alumnos[0].clothe_color}&graphicType=${alumnos[0].graphic_type}&eyeType=${alumnos[0].eye_type}&eyebrowType=${alumnos[0].eyebrow_type}&mouthType=${alumnos[0].mouth_type}&skinColor=${alumnos[0].skin_color}`
            "
          />
          <Avataaars v-else />
          <!---->
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>
            <span class="text-title">{{ getdatosUsuario.nombre }}</span>
          </v-list-item-title>
          <v-list-item-subtitle
            ><span class="text-caption">{{
              getdatosUsuario.apellidos
            }}</span></v-list-item-subtitle
          >
        </v-list-item-content>

        <v-btn icon @click.stop="mini = !mini">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>
      <!-- || getdatosUsuario.id == 6-->
      <v-list dense v-if="getdatosUsuario.id == 6">
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :to="{ name: item.path }"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-list dense v-else>
        <v-list-item
          v-for="item in items2"
          :key="item.title"
          link
          :to="{ name: item.path }"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-list dense>
        <v-list-item @click="salir()">
          <v-list-item-icon>
            <v-icon>mdi-exit-to-app</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Salir</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
</div>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Avataaars from "vuejs-avataaars";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "App",
  components: {
    Avataaars,
  },
  data: () => ({
    random: false,
    c: "LongHairBob",
    drawer: true,
    items: [
      { title: "Home", icon: "mdi-home-city", path: "Home" },
      { title: "Niveles", icon: "mdi-label-variant-outline", path: "Niveles" },
      {
        title: "Verbos",
        icon: "mdi-thought-bubble-outline",
        path: "AdivinarPalabras",
      },
      {
        title: "Ejercicios",
        icon: "mdi-format-list-bulleted-type",
        path: "Habilidades",
      },
      {
        title: "Logros",
        icon: "mdi-trophy-variant-outline",
        path: "Logros",
      },
      // {
      //   title: "Diseña tu avatar",
      //   icon: "mdi-account-edit-outline",
      //   path: "Avatar",
      // },
      {
        title: "Diccionario",
        icon: "mdi-magnify",
        path: "Diccionario",
      },
    ],
    items2: [
      { title: "Home", icon: "mdi-home-city", path: "Home" },
      {
        title: "Ejercicios",
        icon: "mdi-format-list-bulleted-type",
        path: "Habilidades",
      },
      {
        title: "Logros",
        icon: "mdi-trophy-variant-outline",
        path: "Logros",
      },
      // {
      //   title: "Diseña tu avatar",
      //   icon: "mdi-account-edit-outline",
      //   path: "Avatar",
      // },
      {
        title: "Diccionario",
        icon: "mdi-magnify",
        path: "Diccionario",
      },
    ],
    mini: true,
    avatar: "",
    alumnos: "",
    route: null,
  }),

  created() {
    this.initialize();
    this.avatar =
      "https://avataaars.io/?avatarStyle=Circle&topType=" +
      "LongHairBob" +
      "&accessoriesType=Prescription02&hairColor=PastelPink&facialHairType=Blank&clotheType=ShirtScoopNeck&clotheColor=Gray02&eyeType=Happy&eyebrowType=UpDown&mouthType=Smile&skinColor=Pale";
  },

  computed: {
    ...mapGetters("login", ["getLogeado", "getdatosUsuario"]),
  },

  methods: {
    ...mapActions("login", ["salirLogin"]),

    initialize() {
      this.route = this.$route.name;
      this.$http
        .get("alumnos.id/" + this.getdatosUsuario.id)
        .then((response) => {
          this.alumnos = response.body;
          if (!this.alumnos) {
            this.random = true;
          }
          console.log(this.alumnos);
        })
        .catch((error) => console.log(error));
    },

    salir() {
      this.salirLogin();
      this.$router.push({ name: "Login" });
    },
  },
};
</script>
