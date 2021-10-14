<template>
  <v-container>
    <v-card max-width="700" flat class="mx-auto pa-2 mb-2">
      <!--BUSCADOR  -->
      <v-text-field
        v-model="select"
        placeholder="Search..."
        label=" Search... "
        required
        solo
        dense
        append-outer-icon="mdi-magnify"
      ></v-text-field>
    </v-card>
    <v-row v-if="word.length > 0 || select != null">
      <v-col cols="12" v-for="(w, i) in word" :key="i" dense>
        <!--CARD   -->
        <v-card class="mx-auto" max-width="700" dense>
          <v-container>
            <v-card-text class="text-center">
              <!--PALABRA-->
              <p class="text-h4 text--primary font-weight-bold">
                {{ w.word }}
              </p>
              <!--PRONUNCIACIÓN-->
              <div>phonetic</div>
              <v-card-actions
                ><v-spacer></v-spacer>
                <div v-for="(wp, j) in w.phonetics" :key="j" dense>
                  <div dense class="text-h5 text--primary ml-4">
                    {{ wp.text }}

                    <v-tooltip top>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          dense
                          icon
                          v-if="wp.audio"
                          color="primary"
                          @click="play(wp.audio)"
                          v-bind="attrs"
                          v-on="on"
                        >
                          <v-icon>mdi-volume-high</v-icon>
                        </v-btn>
                      </template>
                      <span>Click me!</span>
                    </v-tooltip>
                  </div>
                </div>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card-text>
            <v-card-text>
              <!--SIGNIFICADO(S)-->
              <p class="text-h6 black--text ">Meanings</p>
              <div v-for="(wm, k) in w.meanings" :key="k" dense>
                <!--DEFINICIONES-->
                <div v-for="(wmd, l) in wm.definitions" :key="l" dense>
                  <!--PART OF SPEECH/DEFINITION-->

                  <div class="text--primary">
                    <strong v-if="wm.partOfSpeech">
                      {{ capitalize(wm.partOfSpeech) + ". " }}
                    </strong>
                    {{ wmd.definition }}
                  </div>
                  <!--EJEMPLO-->

                  <div class="text--primary" v-if="wmd.example">
                    <strong>Example.</strong>{{ " " + wmd.example }}
                  </div>
                  <!--SINONIMOS-->
                  <div v-if="wmd.synonyms.length > 0">
                    <div class="text--primary mt-2">
                      <strong>Synonyms.</strong>
                    </div>
                    <div class="text--primary" dense>
                      {{ wmd.synonyms.join(", ") }}
                    </div>
                  </div>
                  <!--ANTONIMOS-->
                  <div v-if="wmd.antonyms.length > 0">
                    <div class="text--primary mt-2 ">
                      <strong>Antonyms.</strong>
                    </div>
                    <div class="text--primary" dense>
                      {{ wmd.antonyms.join(", ") }}
                    </div>
                  </div>
                  <v-divider
                    v-if="l + 1 != wm.definitions.length"
                    class="mt-4 mb-4"
                  ></v-divider>
                </div>
              </div>
            </v-card-text>
          </v-container> </v-card
      ></v-col>
    </v-row>

    <v-row v-if="fail && fail == err">
      <v-col cols="12" dense>
        <!--CARD   -->
        <v-card class="mx-auto" max-width="700" dense>
          <v-container>
            <v-card-text class="text-center">
              <!--PALABRA-->
              <p class="text-h4 text--primary font-weight-bold">
                No Definitions Found
              </p>
              <!--PRONUNCIACIÓN-->
              <div>
                Sorry pal, we couldn't find definitions for the word you were
                looking for.
              </div>
              <div>
                You can try the search again at later time.
              </div>
            </v-card-text>
          </v-container>
        </v-card></v-col
      >
    </v-row>
  </v-container>
</template>
<script>
const axios = require("axios");
import { Howl, Howler } from "howler";

export default {
  data() {
    return {
      loading: false,
      items: [],
      search: null,
      select: null,
      words: [],
      word: [],
      audio: null,
      f: false,
      fail: null,

      err: "Error: Request failed with status code 404",
    };
  },
  watch: {
    select() {
      axios
        .get("https://api.dictionaryapi.dev/api/v2/entries/en/" + this.select)
        .then((response) => {
          this.word = response.data;
          this.fail = null;
        })
        .catch((error) => {
          console.log(error);
          this.word = [];
          this.fail = error;
        });
    },
  },
  created() {
    this.initialize();
  },

  methods: {
    initialize() {
    },
    capitalize(word) {
      return word
        .split("")
        .map((letter, index) =>
          index ? letter.toLowerCase() : letter.toUpperCase()
        )
        .join("");
    },
    play(link) {
      var sound = "http:" + link;
      var audio = new Howl({
        src: [sound],
      });
      audio.play();
    },
  },
};
</script>
