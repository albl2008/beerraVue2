<template>
  <div>
    <div id="brewery">
      <center>
        <h1>CLIENTES</h1>
      </center>
      <center>
        <img :src="require('@/assets/beerra/clients.png')" alt class="position">
      </center>
    </div>
    <div class="container">
      <div class="row mb-3">
        <div class="col-12 col-sm-4">
          <div v-if="errorMessage" class="alert alert-danger" role="alert">{{ errorMessage }}</div>
          <form v-on:submit.prevent="addClient">
            <div class="card mb-2 bg-dark">
              <div class="card-header">
                <center>
                  <h3>Agregar Cliente</h3>
                </center>
              </div>
              <div class="card-body">
                <input
                  type="text"
                  class="form-control mb-1"
                  placeholder="Nombre"
                  v-model="newClient.name"
                  required
                >
                <input
                  type="text"
                  class="form-control mb-3"
                  placeholder="DNI"
                  v-model="newClient.dni"
                  required
                >
                <input
                  type="text"
                  class="form-control mb-3"
                  placeholder="Telefono"
                  v-model="newClient.tel"
                  required
                >
                <template v-if="edit === false">
                  <div class="col-12 mb-3">
                    <button class="btn btn-outline-success btn-block">AGREGAR</button>
                  </div>
                </template>
                <template v-else>
                  <div class="col-12 mb-3">
                    <button class="btn btn-outline-success btn-block">ACTUALIZAR</button>
                  </div>
                </template>
              </div>
            </div>
          </form>
          <template v-if="contador>0">
            <div class="sticky-top">
              <div class="breadcrumb bg-warning">
                <center>
                  <h3>Litros comprados:
                    <span class="badge-pill badge-dark">{{contador}}</span>
                  </h3>
                </center>
              </div>
            </div>
          </template>
          <template v-else-if="contador==0">
            <div class="sticky-top">
              <div class="breadcrumb bg-warning">
                <center>
                  <h3>Presione
                    <i class="material-icons badge-pill bg-dark down">shutter_speed</i> del cliente
                  </h3>
                </center>
              </div>
            </div>
          </template>
        </div>

        <div class="col-12 col-md-8">
          <div class="card">
            <div class="card-header bg-dark">
              <center>
                <h3>Clientes</h3>
              </center>
            </div>
            <div class="card-body">
              <table class="table">
                <thead class="thead-dark">
                  <th scope="col">Avatar</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">DNI</th>
                  <th scope="col">Telefono</th>
                  <th scope="col">Contador</th>
                  <th scope="col">Eliminar</th>
                  <th scope="col">Editar</th>
                </thead>
                <tbody>
                  <tr v-for="client in clients">
                    <th>
                      <canvas
                        id="identicon"
                        width="40"
                        height="40"
                        v-bind:data-jdenticon-value="client.dni"
                        class="img-responsive img-circle"
                      ></canvas>
                    </th>
                    <td>{{client.name}}</td>
                    <th>{{client.dni}}</th>
                    <th>{{client.tel}}</th>
                    <td>
                      <button
                        class="btn btn-outline-warning btn-xs"
                        v-on:click="counterLitres(client._id)"
                      >
                        <i class="material-icons">shutter_speed</i>
                      </button>
                    </td>
                    <td>
                      <button
                        class="btn btn-outline-danger btn-xs"
                        v-on:click="showModal(client._id)"
                      >
                        <i class="material-icons">delete</i>
                      </button>
                    </td>
                    <td>
                      <button
                        class="btn btn-outline-primary btn-xs"
                        v-on:click="updateClient(client._id)"
                      >
                        <i class="material-icons">edit</i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <modal name="delete" height="auto">
        <div class="container bg-dark">
          <div class="breadcrumb bg-warning">
            <h5 class>¿Esta seguro que desea eliminar el cliente?</h5>
          </div>

          <div class="input-group-pretend mb-3">
            <button class="btn btn-success" v-on:click="deleteClient(idClient)">Aceptar</button>
            <button class="btn btn-danger" v-on:click="hideModal()">Cancelar</button>
          </div>
        </div>
      </modal>
    </div>
  </div>
</template>
<script>
window.jdenticon_config = {
  replaceMode: "observe"
};

import Vue from "vue";
import Joi from "joi";

class newClient {
  constructor(id, name, dni, tel) {
    this.id = id;
    this.name = name;
    this.dni = dni;
    this.tel = tel;
  }
}
const axios = require("axios");

export default {
  data() {
    return {
      idClient: "",
      errorMessage: "",
      newClient: {},
      clients: [],
      dni: "",
      edit: false,
      whatsapp: "https://wa.me/54",
      contador: 0
    };
  },
  computed: {},
  created() {
    this.getClients();
  },
  methods: {
    addClient() {
      if (this.edit === false) {
        axios({
          method: "POST",
          url: "http://localhost:3000/clients",
          data: this.newClient,
          headers: { authorization: `Bearer ${localStorage.token}` }
        })
          .then(res => {
            console.log(res);
            if (res.status == 200) {
              this.getClients();
              this.newClient = {};
              Vue.notify({
                group: "foo",
                type: "success",
                title: "Cliente",
                text: res.data.mensaje
              });
            }
          })
          .catch(e => {
            console.log(e);
            Vue.notify({
              group: "foo",
              type: "error",
              title: "Cliente",
              text: `Error al guardar el Cliente ${e}`
            });
          });
      } else {
        axios({
          method: "PUT",
          url: `http://localhost:3000/clients/${this.newClient.id}`,
          data: this.newClient,
          headers: { authorization: `Bearer ${localStorage.token}` }
        })
          .then(res => {
            console.log(res);
            this.getClients();
            this.newClient = {};
            this.edit = false;
            if (res.status == 200) {
              Vue.notify({
                group: "foo",
                type: "success",
                title: "Ciente actualizado",
                text: res.data.mensaje
              });
            }
          })
          .catch(e => {
            Vue.notify({
              group: "foo",
              type: "error",
              title: "Cliente",
              text: `Error al actualizar el Cliente ${e}`
            });
          });
      }
    },
    getClients() {
      axios({
        url: "http://localhost:3000/clients",
        headers: { authorization: `Bearer ${localStorage.token}` }
      })
        .then(res => {
          console.log(res);
          this.clients = res.data.Clients;
        })
        .catch(e => {
          console.log(e);
        });
    },
    showModal(idClient) {
      this.idClient = idClient;
      this.$modal.show("delete");
    },
    hideModal() {
      this.$modal.hide("delete");
    },
    deleteClient(idClient) {
      const config  =
      this.hideModal();
      axios({
        method: "delete",
        url: `http://localhost:3000/clients/${idClient}`,
        headers: { authorization: `Bearer ${localStorage.token}` }
      })
      
        .then(res => {
          
          Vue.notify({
            group: "foo",
            type: "success",
            title: "Clientes",
            text: res.data.mensaje
          });
          this.getClients();
        })
        .catch(error => {
         
         
          Vue.notify({
            group: "foo",
            type: "error",
            title: "Clientes",
            text: "No se puede eliminar el cliente ha realizado compras anteriormente"
          });
        });
    },
    counterLitres(idClient) {
      axios({
        url: `http://localhost:3000/sale/counter/${idClient}`,
        headers: { authorization: `Bearer ${localStorage.token}` }
      })
        .then(res => {
          this.sales = res.data.Sales;
          this.Contador(this.sales);
        })
        .catch(e => {
          console.log(e);
        });
    },
    Contador(sales) {
      this.contador = 0;

      for (let index = 0; index < Object.keys(sales).length; index++) {
        for (let j = 0; j < Object.keys(sales[index].growlers).length; j++) {
          this.contador = this.contador + sales[index].growlers[j].quantity;
        }
      }
      for (let index = 0; index < Object.keys(sales).length; index++) {
        for (let j = 0; j < Object.keys(sales[index].pints).length; j++) {
          this.contador = this.contador + sales[index].pints[j].quantity;
        }
      }
      console.log(this.contador);
    },
    updateClient(idClient) {
      axios({
        url: `http://localhost:3000/clients/${idClient}`,
        headers: { authorization: `Bearer ${localStorage.token}` }
      }).then(res => {
        this.newClient = new newClient(
          res.data.client._id,
          res.data.client.name,
          res.data.client.dni,
          res.data.client.tel
        );
        this.edit = true;
      });
    }
  }
};
</script>
<style>
.down {
  margin-top: 10px;
}
</style>
