<template>
  <v-container>
    <v-data-table :headers="headers" :items="adivinar" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Verbos</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="700px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                Nuevo ejercicio
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-form ref="form" lazy-validation>
                    <v-row>
                      <v-col class="mx-auto" cols="12" m="12" md="12" lg="12">
                        <v-img
                          :src="foto"
                          contain
                          width="100%"
                          max-height="330"
                          v-if="
                            editedItem.imagen == '' || editedItem.imagen == null
                          "
                        />
                        <v-img
                          :src="url + editedItem.imagen"
                          contain
                          width="100%"
                          max-height="330"
                          v-else
                        />
                      </v-col>
                      <v-col cols="12" sm="12" md="12">
                        <v-file-input
                          @change="cargar()"
                          v-model="fileimagen"
                          accept="image/webp "
                          label="Imagen"
                          prepend-icon="mdi-image"
                          dense
                          outlined
                          persistent-hint
                          :hint="editedItem.imagen"
                        ></v-file-input>
                      </v-col>
                      <v-col cols="12" sm="12" md="4">
                        <v-text-field
                          v-model="editedItem.presente"
                          label="Presente"
                          outlined
                          dense
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" md="4">
                        <v-text-field
                          v-model="editedItem.pasado"
                          label="Pasado"
                          outlined
                          dense
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" md="4">
                        <v-text-field
                          v-model="editedItem.participio"
                          label="Participio"
                          outlined
                          dense
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" md="4">
                        <v-select
                          :items="niveles"
                          v-model="nivel"
                          label="Nivel"
                          item-text="nivel"
                          item-value="idnivel"
                          outlined
                          dense
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="12" md="4">
                        <v-text-field
                          type="number"
                          v-model="editedItem.puntos"
                          label="Puntos"
                          outlined
                          dense
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field
                          v-model="editedItem.frase"
                          label="Oración"
                          outlined
                          dense
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-btn color="blue darken-1" text @click="reset">
                  Limpiar
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancelar
                </v-btn>
                <v-btn color="blue darken-1" text @click="save">
                  Guardar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >¿Estás seguro de eliminar este elemento?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancelar</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog v-model="dialogPreview" max-width="700px">
            <v-card>
              <v-container>
                <v-card-title
                  class="text-h6 font-weight-regular justify-space-between"
                >
                  <v-avatar
                    color="primary"
                    class="text-overline white--text"
                    size="30"
                    v-text="1"
                  ></v-avatar>
                </v-card-title>

                <v-window>
                  <v-window-item value="1">
                    <v-container>
                      <v-img
                        contain
                        max-height="200"
                        :src="url + editedItem.imagen"
                      />
                    </v-container>
                    <v-card-text>
                      <v-row dense>
                        <v-col cols="12" sm="4">
                          <v-text-field
                            v-model="editedItem.respuesta1"
                            label="Base form"
                            outlined
                            readonly
                            dense
                          ></v-text-field
                        ></v-col>
                        <v-col cols="12" sm="4">
                          <v-text-field
                            v-model="editedItem.respuesta2"
                            label="Past"
                            outlined
                            readonly
                            dense
                          ></v-text-field
                        ></v-col>
                        <v-col cols="12" sm="4">
                          <v-text-field
                            v-model="editedItem.respuesta3"
                            label="Past Participle"
                            outlined
                            readonly
                            dense
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-card-text>

                    <v-card-actions dense>
                      <v-spacer></v-spacer>
                      <v-tooltip top>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn v-bind="attrs" v-on="on" outlined plain
                            >Saltar</v-btn
                          >
                        </template>
                        <span>Da click para omitir este ejercicio.</span>
                      </v-tooltip>

                      <v-btn outlined dense color="primary" depressed>
                        Revisar
                      </v-btn>
                    </v-card-actions>

                    <div>
                      <v-card-title
                        class="text-h6 text-center text-no-wrap justify-center"
                      >
                        Ordena la siguiente oración
                      </v-card-title>
                      <v-textarea
                        auto-grow
                        rows="1"
                        outlined
                        dense
                        readonly
                        class="ml-4 mr-4"
                      ></v-textarea>
                      <v-row justify="center">
                        <v-btn-toggle
                          multiple
                          dense
                          v-for="(palabra, j) in editedItem.palabras_random"
                          :key="j"
                        >
                          <v-btn
                            class="ma-2"
                            outlined
                            color="primary"
                            dark
                            dense
                            >{{ palabra }}</v-btn
                          >
                        </v-btn-toggle>
                      </v-row>
                      <v-card-actions class="mt-3">
                        <v-spacer></v-spacer>
                        <v-tooltip top>
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn
                              v-bind="attrs"
                              class="mb-2"
                              v-on="on"
                              outlined
                              plain
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
                        >
                          Limpiar respuesta
                        </v-btn>
                        <v-btn
                          outlined
                          class="mb-2"
                          dense
                          color="primary"
                          depressed
                        >
                          Revisar
                        </v-btn>
                      </v-card-actions>
                    </div>
                  </v-window-item>
                </v-window>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closePreview"
                    >Cerrar</v-btn
                  >
                  <v-spacer></v-spacer> </v-card-actions
              ></v-container>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              v-bind="attrs"
              v-on="on"
              icon
              @click="previewItem(item)"
            >
              <v-icon small>
                mdi-eye
              </v-icon>
            </v-btn>
          </template>
          <span>Vista previa</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              v-bind="attrs"
              v-on="on"
              icon
              @click="editItem(item)"
            >
              <v-icon small>
                mdi-pencil
              </v-icon>
            </v-btn>
          </template>
          <span>Editar ejercicio</span>
        </v-tooltip>

        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              v-bind="attrs"
              v-on="on"
              icon
              @click="deleteItem(item)"
            >
              <v-icon small>
                mdi-delete
              </v-icon>
            </v-btn>
          </template>
          <span>Eliminar ejercicio</span>
        </v-tooltip>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">
          Actualizar
        </v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
var moment = require("moment");
moment.locale();

import { mapActions, mapGetters } from "vuex";
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    dialogPreview: false,
    headers: [
      { text: "Presente", value: "presente" },
      { text: "Pasado", value: "pasado" },
      { text: "Participio", value: "participio" },
      { text: "Oración", value: "frase" },
      { text: "Nivel", value: "idnivel" },
      { text: "Puntos", value: "puntos" },
      { text: "Opciones", value: "actions", sortable: false },
    ],
    adivinar: [],
    editedIndex: -1,
    editedItem: {
      presente: "",
      pasado: "",
      participio: "",
      imagen: "",
      puntos: 0,
      idnivel: 0,
      usuario_registro: 0,
      fecha_creacion: null,
      fecha_actualizo: null,
      deleted: 0,
      idordenar: 0,
      frase: "",
      puntos_ordenar: 0,
      fecha_creacion_ordenar: null,
      fecha_actualizo_ordenar: null,
      usuario_registro_ordenar: 0,
      deleted_ordenar: 0,
    },
    defaultItem: {
      presente: "",
      pasado: "",
      participio: "",
      imagen: "",
      puntos: 0,
      idnivel: 0,
      usuario_registro: 0,
      fecha_creacion: null,
      fecha_actualizo: null,
      deleted: 0,
      idordenar: 0,
      frase: "",
      puntos_ordenar: 0,
      fecha_creacion_ordenar: null,
      fecha_actualizo_ordenar: null,
      usuario_registro_ordenar: 0,
      deleted_ordenar: 0,
    },
    fileimagen: [],
    formdata: "",
    foto:
      "https://carlofarucci.com/wp-content/uploads/2018/09/seo-para-imagenes-2019.jpg",
    url: "",
    nivel: null,
    niveles: [],
    palabras_random: [],
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo ejercicio" : "Editar ejercicio";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
    dialogPreview(val) {
      val || this.closePreview();
    },
    fileimagen() {
      this.editedItem.imagen;
      console.log(this.fileimagen);
    },
    foto() {
      this.foto;
    },
  },

  created() {
    this.initialize();
    const fecha = new Date().toLocaleDateString("en-Es", {
      timeZone: "America/Mexico_City",
    });
    this.fecha = moment().format("YYYY-MM-DD HH:mm:ss");

    //
    this.url = this.$http.options.root + "imagen/";
  },

  methods: {
    initialize() {
      this.$http
        .get("adivinar_palabras.all")
        .then((response) => {
          // al arreglo que declare previamente le asigno response.body que son todos los registros
          this.adivinar = response.body;
        })
        .catch((error) => console.log(error));
      this.$http
        .get("niveles.all")
        .then((response) => {
          // al arreglo que declare previamente le asigno response.body que son todos los registros
          this.niveles = response.body;
        })
        .catch((error) => console.log(error));
    },

    editItem(item) {
      this.editedIndex = this.adivinar.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
      this.nivel = item.idnivel;
    },

    previewItem(item) {
      this.editedIndex = this.adivinar.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogPreview = true;
    },

    deleteItem(item) {
      this.editedIndex = this.adivinar.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.adivinar.splice(this.editedIndex, 1);
      var datos = {
        presente: this.editedItem.presente,
        pasado: this.editedItem.pasado,
        participio: this.editedItem.participio,
        imagen: this.editedItem.imagen,
        idnivel: this.editedItem.idnivel,
        puntos: this.editedItem.puntos,
        fecha_actualizo: this.fecha,
        deleted: 1,
        usuario_registro: this.usuario_registro,
      };

      this.$http
        .put("adivinar_palabras.update/" + this.editedItem.idadivinar, datos)
        .then((response) => {
          this.initialize();
        })
        .catch((error) => console.log(error));

      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
      this.reset();
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closePreview() {
      this.dialogPreview = false;
      this.palabras_random = [];
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    save() {
      console.log("sav " + this.editedItem.idordenar);
      var datos = {
        presente: this.editedItem.presente.trim().toLowerCase(),
        pasado: this.editedItem.pasado.trim().toLowerCase(),
        participio: this.editedItem.participio.trim().toLowerCase(),
        imagen: this.editedItem.imagen,
        puntos: this.editedItem.puntos,
        idnivel: this.nivel,
        usuario_registro: 1,
        fecha_creacion: this.fecha,
        fecha_actualizo: this.fecha,
        deleted: 0,
      };

      var datos_ordenar = {
        idadivinar: 0,
        frase: this.editedItem.frase.trim(),
        puntos: this.editedItem.puntos,
        idnivel: this.editedItem.idnivel,
        usuario_registro: 1,
        fecha_creacion: this.fecha,
        fecha_actualizo: this.fecha,
        deleted: 0,
      };

      if (this.fileimagen.name != undefined) {
        datos.imagen = this.fileimagen.name;
      }

      if (this.editedIndex > -1) {
        this.$http
          .put("adivinar_palabras.update/" + this.editedItem.idadivinar, datos)
          .then((response) => {
            //ordenar
            datos_ordenar.idnivel = response.body.idnivel;
            datos_ordenar.puntos = response.body.puntos;

            //imagen
            if (this.formdata != "") {
              //esta api es para subir el archivo al server
              this.$http
                .post("imagenes", this.formdata)
                .then((response) => {
                  this.reset();
                })
                .catch((error) => {
                  console.log(error);
                });
            }
          })
          .catch((error) => console.log(error));

        //update ordenar
        this.$http
          .put(
            "ordenar_palabras.update/" + this.editedItem.idordenar,
            datos_ordenar
          )
          .then((response) => {
            this.initialize();
          })
          .catch((error) => console.log(error));

        Object.assign(this.adivinar[this.editedIndex], this.editedItem);
      } else {
        // guardamos
        this.$http
          .post("adivinar_palabras.add", datos)
          .then((response) => {
            //ordenar
            datos_ordenar.idadivinar = response.body.id;
            this.$http
              .post("ordenar_palabras.add", datos_ordenar)
              .then((response) => {
                // imagen

                if (this.formdata == "") {
                  this.reset();
                } else {
                  //esta api es para subir el archivo al server
                  this.$http
                    .post("imagenes", this.formdata)
                    .then((response) => {
                      this.reset();
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                }

                this.initialize();
              })
              .catch((error) => {
                console.log(error);
              });

            this.initialize();
          })
          .catch((error) => console.log(error));
        this.adivinar.push(this.editedItem);
      }
      this.close();
    },

    reset() {
      this.$refs.form.reset();
      //this.formdata = "";
      this.fileimagen = [];
      this.editedItem.imagen = "";
      this.foto =
        "https://carlofarucci.com/wp-content/uploads/2018/09/seo-para-imagenes-2019.jpg";
      this.editedItem.idnivel = 0;
    },

    cargar() {
      if (this.fileimagen.name != undefined) {
        // creamos una variable tipo FormData
        let formData = new FormData();
        //se crea el objeto y se le agrega como un apendice el archivo
        formData.append("file", this.fileimagen);
        //mandamos a ocvertir la imagen a base64 pero mandamos el docuemnto, el formdata, el nombre
        this.getBase64(this.fileimagen, formData);
      }
    },

    getBase64(file, formData) {
      var me = this;
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function() {
        me.foto = reader.result; //base64
        me.formdata = formData; //archivo
      };
    },

    
  },
};
</script>
