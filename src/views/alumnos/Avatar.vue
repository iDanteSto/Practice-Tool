<template>
  <v-container>
    <!--- with some props -->
    <v-card width="200" flat class="mb-2 mx-auto">
      <avataaars
        dense
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
    </v-card>
    <v-color-picker
      class="mt-5 mx-auto"
      v-model="select.circleColor"
      hide-inputs
      dense
    ></v-color-picker>
    <v-card> </v-card>
    <v-row class="mt-5" dense>
      <v-col cols="6" sm="3">
        <v-select
          v-model="select.skinColor"
          :items="skinColor"
          label="Skin"
          dense
          outlined
        ></v-select>
      </v-col>
      <v-col cols="6" sm="3">
        <v-select
          v-model="select.eyeType"
          :items="eyeType"
          label="Eyes"
          dense
          outlined
        ></v-select>
      </v-col>
      <v-col cols="6" sm="3">
        <v-select
          v-model="select.eyebrowType"
          :items="eyebrowType"
          label="Eyebrow"
          dense
          outlined
        ></v-select>
      </v-col>
      <v-col cols="6" sm="3">
        <v-select
          v-model="select.mouthType"
          :items="mouthType"
          label="Mouth"
          dense
          outlined
        ></v-select>
      </v-col>
      <v-col cols="6" sm="3">
        <v-select
          v-model="select.topType"
          :items="topType"
          label="Top"
          dense
          outlined
        ></v-select>
      </v-col>
      <v-col cols="6" sm="3">
        <v-select
          v-model="select.hairColor"
          :items="hairColor"
          label="Hair Color"
          dense
          outlined
        ></v-select>
      </v-col>
      <v-col cols="6" sm="3">
        <v-select
          v-model="select.accessoriesType"
          :items="accessoriesType"
          label="Accessories"
          dense
          outlined
        ></v-select>
      </v-col>
      <v-col cols="6" sm="3">
        <v-select
          v-model="select.clotheType"
          :items="clotheType"
          label="Clothes"
          dense
          outlined
        ></v-select>
      </v-col>
      <v-col cols="6" sm="3">
        <v-select
          v-model="select.clotheColor"
          :items="clotheColor"
          label="Clothe Color"
          dense
          outlined
        ></v-select>
      </v-col>
      <v-col cols="6" sm="3">
        <v-select
          v-model="select.graphicType"
          :items="graphicType"
          label="Graphic"
          dense
          outlined
        ></v-select>
      </v-col>
      <v-col cols="6" sm="3">
        <v-select
          v-model="select.facialHairType"
          :items="facialHairType"
          label="Facial Hair"
          dense
          outlined
        ></v-select>
      </v-col>
      <v-col cols="6" sm="3">
        <v-select
          v-model="select.facialHairColor"
          :items="facialHairColor"
          label="Facial Hair Color"
          dense
          outlined
        ></v-select>
      </v-col>
    </v-row>

    <div class="text-center">
      <v-btn outlined dark dense color="primary" @click="save()">
        Guardar cambios
      </v-btn>
    </div>

    <div class="text-center ma-2">
      <v-snackbar v-model="snackbar">
        Tus cambios se han guardado

        <template v-slot:action="{ attrs }">
          <v-btn icon v-bind="attrs" @click="snackbar = false">
            <v-icon color="blue">mdi-close</v-icon>
          </v-btn>
        </template>
      </v-snackbar>
    </div>
  </v-container>
</template>

<script>
var moment = require("moment");
moment.locale();
// Instalamos la libbrería de base64
var base64 = require("base-64");
import Avataaars from "vuejs-avataaars";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    Avataaars,
  },
  data: () => ({
    accessoriesType: [
      "Blank",
      "Kurt",
      "Prescription01",
      "Prescription02",
      "Round",
      "Sunglasses",
      "Wayfarers",
    ],
    clotheType: [
      "BlazerShirt",
      "BlazerSweater",
      "CollarSweater",
      "GraphicShirt",
      "Hoodie",
      "Overall",
      "ShirtCrewNeck",
      "ShirtScoopNeck",
      "ShirtVNeck",
    ],
    clotheColor: [
      "Black",
      "Blue01",
      "Blue02",
      "Blue03",
      "Gray01",
      "Gray02",
      "Heather",
      "PastelBlue",
      "PastelGreen",
      "PastelOrange",
      "PastelRed",
      "PastelYellow",
      "Pink",
      "Red",
      "White",
    ],
    eyebrowType: [
      "Angry",
      "AngryNatural",
      "Default",
      "DefaultNatural",
      "FlatNatural",
      "RaisedExcited",
      "RaisedExcitedNatural",
      "SadConcerned",
      "SadConcernedNatural",
      "UnibrowNatural",
      "UpDown",
      "UpDownNatural",
    ],
    eyeType: [
      "Close",
      "Cry",
      "Default",
      "Dizzy",
      "EyeRoll",
      "Happy",
      "Hearts",
      "Side",
      "Squint",
      "Surprised",
      "Wink",
      "WinkWacky",
    ],
    facialHairColor: [
      "Auburn",
      "Black",
      "Blonde",
      "BlondeGolden",
      "Brown",
      "BrownDark",
      "PastelPink",
      "Platinum",
      "Red",
      "SilverGray",
    ],

    facialHairType: [
      "Blank",
      "BeardMedium",
      "BeardLight",
      "BeardMagestic",
      "MoustacheFancy",
      "MoustacheMagnum",
    ],

    graphicType: [
      "Bat",
      "Cumbia",
      "Deer",
      "Diamond",
      "Hola",
      "Pizza",
      "Resist",
      "Selena",
      "Bear",
      "SkullOutline",
      "Skull",
    ],

    hairColor: [
      "Auburn",
      "Black",
      "Blonde",
      "BlondeGolden",
      "Brown",
      "BrownDark",
      "PastelPink",
      "Platinum",
      "Red",
      "SilverGray",
    ],
    mouthType: [
      "Concerned",
      "Default",
      "Disbelief",
      "Eating",
      "Grimace",
      "Sad",
      "ScreamOpen",
      "Serious",
      "Smile",
      "Tongue",
      "Twinkle",
      "Vomit",
    ],

    skinColor: [
      "Tanned",
      "Yellow",
      "Pale",
      "Light",
      "Brown",
      "DarkBrown",
      "Black",
    ],

    topType: [
      "NoHair",
      "Eyepatch",
      "Hat",
      "Hijab",
      "Turban",
      "WinterHat1",
      "WinterHat2",
      "WinterHat3",
      "WinterHat4",
      "LongHairBigHair",
      "LongHairBob",
      "LongHairBun",
      "LongHairCurly",
      "LongHairCurvy",
      "LongHairDreads",
      "LongHairFrida",
      "LongHairFro",
      "LongHairFroBand",
      "LongHairNotTooLong",
      "LongHairShavedSides",
      "LongHairMiaWallace",
      "LongHairStraight",
      "LongHairStraight2",
      "LongHairStraightStrand",
      "ShortHairDreads01",
      "ShortHairDreads02",
      "ShortHairFrizzle",
      "ShortHairShaggyMullet",
      "ShortHairShortCurly",
      "ShortHairShortFlat",
      "ShortHairShortRound",
      "ShortHairShortWaved",
      "ShortHairSides",
      "ShortHairTheCaesar",
      "ShortHairTheCaesarSidePart",
    ],

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
  }),

  watch: {},

  created() {
    this.initialize();
    // Generando la fecha de hoy
    const fecha = new Date().toLocaleDateString("en-Es", {
      timeZone: "America/Mexico_City",
    });
    this.fecha = moment(fecha).format("YYYY-MM-DD HH:mm:ss");
  },
  computed: {
    showColor() {
      if (typeof this.select.circleColor === "string")
        return this.select.circleColor;

      return JSON.stringify(
        Object.keys(this.select.circleColor).reduce((color, key) => {
          color[key] = Number(this.select.circleColor[key].toFixed(2));
          return color;
        }, {}),
        null,
        2
      );
    },
    ...mapGetters("login", ["getdatosUsuario"]), //cambios
  },

  methods: {
    ...mapActions("login", [
      "validarUser",
      "guardarInfo",
      "GetInfoUser",
      "salirLogin",
    ]),
    ...mapActions("login", ["GetInfoUser"]),

    initialize() {
      if (this.$route.params.id) {
        var decodedData = base64.decode(this.$route.params.id);
        this.matricula = decodedData.substr(0, 10);
        this.unidad_negocio = decodedData.substr(10, 1);

        var payload = {
          matricula: this.matricula,
          unidad_negocio: this.unidad_negocio,
        };

        // Aquí se envían los datos del usuario para saber que perfil tiene
        this.$http
          .post("alumnos.acceso", payload)
          .then((response1) => {
            this.alumno = response1.body;
            // Ahora hay que validad que exista esa misma matricula en el panel de herramientas
            var matricula = {
              matricula: this.matricula,
            };
            this.$http
              .post("alumnos.existe", matricula)
              .then((response2) => {
                if (response2.body) {
                  var datos = {
                    nombre: this.alumno.nombre,
                    apellidos: this.alumno.apellidos,
                    matricula: this.matricula,
                    unidad_negocio: this.unidad_negocio,
                    id: response2.body.idalumno,
                  };
                  this.guardarInfo(datos);

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
                      }
                    })
                    .catch((error) => console.log(error));
                } else {
                  // Agregar alumnos
                  matricula.fecha_creacion = this.fecha;
                  matricula.fecha_actualizo = this.fecha;
                  this.$http
                    .post("alumnos.add", matricula)
                    .then((response3) => {
                      if (response3.body) {
                        var datos = {
                          nombre: this.alumno.nombre,
                          apellidos: this.alumno.apellidos,
                          matricula: this.matricula,
                          unidad_negocio: this.unidad_negocio,
                          id: response3.body.id,
                        };
                        this.guardarInfo(datos);

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
                            }
                          })
                          .catch((error) => console.log(error));
                      } else {
                        this.salirLogin();
                      }
                      // Ahora hay que validad que exista esa misma matricula en el panel de herramientas
                    })
                    .catch((error) => {
                      this.salirLogin();
                      console.log(error);
                    });
                }
                // Ahora hay que validad que exista esa misma matricula en el panel de herramientas
              })
              .catch((error) => {
                this.salirLogin();
                console.log(error);
              });
          })
          .catch((error) => {
            this.salirLogin();
            console.log(error);
          });
      }
    },

    save() {
      var datos = {
        circle_color: this.select.circleColor,
        accessories_type: this.select.accessoriesType,
        clothe_type: this.select.clotheType,
        clothe_color: this.select.clotheColor,
        eyebrow_type: this.select.eyebrowType,
        eye_type: this.select.eyeType,
        facial_hair_type: this.select.facialHairType,
        facial_hair_color: this.select.facialHairColor,
        graphic_type: this.select.graphicType,
        hair_color: this.select.hairColor,
        mouth_type: this.select.mouthType,
        top_type: this.select.topType,
        top_color: this.select.topColor,
        skin_color: this.select.skinColor,
        deleted: 0,
        usuario_registro: 1,
        fecha_creacion: this.fecha,
        fecha_actualizo: this.fecha,
        matricula: this.getdatosUsuario.matricula,
      };

      this.$http
        .put("alumnos.update/" + this.getdatosUsuario.id, datos) //cambiar
        .then((response) => {
          this.snackbar = true;
          this.initialize();
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>
<style>
::-webkit-scrollbar {
  -webkit-appearance: none !important;
}

::-webkit-scrollbar:vertical {
  width: 8px !important;
}

::-webkit-scrollbar-button:increment,
::-webkit-scrollbar-button {
  display: none;
}

::-webkit-scrollbar:horizontal {
  height: 8px !important;
}

::-webkit-scrollbar-thumb {
  background-color: #babcbf;
  border-radius: 20px;
  border: 1px solid #ededed;
}
</style>
