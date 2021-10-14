<template>
  <v-container>
    <v-data-table :headers="headers" :items="niveles" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Niveles</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="700px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                Nuevo nivel
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col class="mx-auto" cols="12" m="12" md="12" lg="12s">
                      <v-img
                        :src="foto"
                        contain
                        width="100%"
                        max-height="350"
                        v-if="
                          editedItem.imagen == '' || editedItem.imagen == null
                        "
                      />
                      <v-img
                        :src="url + editedItem.imagen"
                        contain
                        width="100%"
                        max-height="350"
                        v-else
                      />
                    </v-col>
                    <v-col cols="12" sm="12" md="8">
                      <v-file-input
                        @change="cargar()"
                        v-model="fileimagen"
                        accept="image/* "
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
                        type="number"
                        v-model="editedItem.nivel"
                        label="Nivel"
                        outlined
                        dense
                      ></v-text-field>
                    </v-col>
                  </v-row>
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
    headers: [
      { text: "Nivel", align: "start", value: "nivel" },
      { text: "Imagen", value: "imagen" },
      { text: "Opciones", value: "actions", sortable: false },
    ],
    niveles: [],
    editedIndex: -1,
    editedItem: {
      idnivel: 0,
      nivel: 0,
      imagen: "",
      usuario_registro: 0,
      fecha_creacion: null,
      fecha_actualizo: null,
      deleted: 0,
    },
    defaultItem: {
      idnivel: 0,
      nivel: 0,
      imagen: "",
      usuario_registro: 0,
      fecha_creacion: null,
      fecha_actualizo: null,
      deleted: 0,
    },
    fileimagen: [],
    formdata: "",
    foto:
      "https://carlofarucci.com/wp-content/uploads/2018/09/seo-para-imagenes-2019.jpg",
    url: "",
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo nivel" : "Editar nivel";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
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
    this.fecha = moment(fecha).format("YYYY-MM-DD HH:mm:ss");

    //
    this.url = this.$http.options.root + "imagen/";
  },

  methods: {
    initialize() {
      this.$http
        .get("niveles.all")
        .then((response) => {
          // al arreglo que declare previamente le asigno response.body que son todos los registros
          for (const j in response.body) {
            response.body[j].fecha_creacion = response.body[
              j
            ].fecha_creacion.substr(0, 10);
            response.body[j].fecha_actualizo = response.body[
              j
            ].fecha_actualizo.substr(0, 10);
          }
          this.niveles = response.body;
        })
        .catch((error) => console.log(error));
    },

    editItem(item) {
      this.editedIndex = this.niveles.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.niveles.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.niveles.splice(this.editedIndex, 1);
      var datos = {
        nivel: this.editedItem.nivel,
        imagen: this.editedItem.imagen,
        usuario_registro: 1,
        fecha_actualizo: this.fecha,
        deleted: 1,
      };

      this.$http
        .put("niveles.update/" + this.editedItem.idnivel, datos)
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

    save() {
      var datos = {
        nivel: this.editedItem.nivel,
        imagen: this.editedItem.imagen,
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
          .put("niveles.update/" + this.editedItem.idnivel, datos)
          .then((response) => {
            //imagen

            if (this.foto != "") {
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
          .catch((error) => console.log(error));

        Object.assign(this.niveles[this.editedIndex], this.editedItem);
      } else {
        // guardamos el nivel
        this.$http
          .post("niveles.add", datos)
          .then((response) => {
            // imagen

            if (this.formdata == "") {
              this.reset();
            } else {
              //esta api es para subir el archivo al server
              this.$http
                .post("imagenes", this.formdata)
                .then((response) => {
                  console.log("insert imagen");
                  this.reset();
                })
                .catch((error) => {
                  console.log(error);
                });
            }

            this.initialize();
          })
          .catch((error) => console.log(error));
        this.niveles.push(this.editedItem);
      }
      this.close();
    },

    reset() {
      // this.$refs.form.reset();
      //this.formdata = "";
      this.fileimagen = [];
      this.editedItem.imagen = "";
      this.editedItem.nivel = 0;
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
