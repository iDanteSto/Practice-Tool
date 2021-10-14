<template>
  <v-container>
    <v-data-table :headers="headers" :items="formar" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Formar oraciones</v-toolbar-title>
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
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field
                          v-model="editedItem.frase"
                          label="Frase"
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
      { text: "ID", align: "start", value: "idformar" },
      { text: "Frase completa", value: "frase" },
      { text: "Nivel", value: "idnivel" },
      { text: "Puntos", value: "puntos" },
      { text: "Opciones", value: "actions", sortable: false },
    ],
    formar: [],
    editedIndex: -1,
    editedItem: {
      frase: "",
      puntos: 0,
      idnivel: 0,
      usuario_registro: 0,
      fecha_creacion: null,
      fecha_actualizo: null,
      deleted: 0,
    },
    defaultItem: {
      frase: "",
      puntos: 0,
      idnivel: 0,
      usuario_registro: 0,
      fecha_creacion: null,
      fecha_actualizo: null,
      deleted: 0,
    },
    nivel: null,
    niveles: [],
    opciones: [],
    nueva: "",
    id: 0,
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
    opciones() {
      console.log(this.opciones);
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
        .get("formar_oraciones.all")
        .then((response) => {
          // al arreglo que declare previamente le asigno response.body que son todos los registros
          this.formar = response.body;
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
      this.editedIndex = this.formar.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
      this.nivel = item.idnivel;
    },

    deleteItem(item) {
      this.editedIndex = this.formar.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.formar.splice(this.editedIndex, 1);
      var datos = {
        frase: this.editedItem.frase,
        puntos: this.editedItem.puntos,
        idnivel: this.editedItem.idnivel,
        usuario_registro: 1,
        fecha_actualizo: this.fecha,
        deleted: 1,
      };
      this.$http
        .put("formar_oraciones.update/" + this.editedItem.idformar, datos)
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
        frase: this.editedItem.frase,
        puntos: this.editedItem.puntos,
        idnivel: this.nivel,
        usuario_registro: 1,
        fecha_creacion: this.fecha,
        fecha_actualizo: this.fecha,
        deleted: 0,
      };

      if (this.editedIndex > -1) {
        this.$http
          .put("formar_oraciones.update/" + this.editedItem.idformar, datos)
          .then((response) => {
            this.initialize();
          })
          .catch((error) => console.log(error));

        Object.assign(this.formar[this.editedIndex], this.editedItem);
      } else {
        // guardamos
        this.$http
          .post("formar_oraciones.add", datos)
          .then((response) => {
            console.log(response.body.id);
          })
          .catch((error) => console.log(error));
        this.formar.push(this.editedItem);
      }
      this.close();
    },

    reset() {
      this.$refs.form.reset();
      //this.formdata = "";
      this.editedItem.idnivel = 0;
      this.opciones = [];
    },

  },
};
</script>

 