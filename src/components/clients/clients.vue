<template>
  <div>
    <div id="brewery">
      <div class="row" style="width: 50%; margin: 0 auto;  "><div class="centerhead">
        <h1 class="h1head">Clientes</h1>
        </div>
        <img :src="require('@/assets/beerra/people2x.png')" alt class="underh1">
        
      </div>
    </div>
    <div class="container" style="margin-bottom: 3em;">
      <div class="row mb-3">
        <div class="col-12 col-sm-3">
          <div v-if="errorMessage" class="alert alert-danger" role="alert">{{ errorMessage }}</div>
          <form v-on:submit.prevent="addClient">
            <div class="card mb-2 bg-dark">
              <div class="card-header bg-dark">
               
                  <h3 class="tablaHead">Agregar Cliente</h3>
               
              </div>
              <div class="card-body" style="background: #272727; border-radius: 0.6em;">
                
                <label>Nombre</label>
                <input
                  type="text"
                  class="form-control mb-1"
                  placeholder=""
                  v-model="newClient.name"
                  required
                >
                 <label>DNI</label>
                <input
                  type="text"
                  class="form-control mb-3"
                  placeholder=""
                  v-model="newClient.dni"
                  required
                >
                 <label>Teléfono</label>
                <input
                  type="text"
                  class="form-control mb-3"
                  placeholder=" "
                  v-model="newClient.tel"
                  required
                >
                <template v-if="edit === false">
                  <div class="mb-3">
                    <button style="width: 75px; " class="btn btn-outline-success btn-block">Agregar</button>
                  </div>
                </template>
                <template v-else>
                  <div class=" mb-3">
                    <button style="width: 85px" class="btn btn-outline-primary btn-block">Actualizar</button>
                  </div>
                </template>
              </div>
            </div>
          </form>
         
        </div>

        <div class="col-12 col-md-9">
          <div class="card bg-dark">
            <div class="card-header bg-dark">
               <template v-if="contador>0">
            <div class="sticky-top">
              <div class="bg-dark">
                
                  <h3 class="tablaHead">Litros comprados:
                    <span class="">{{contador}}<span class="litros"> l</span></span>
                  </h3>
                
              </div>
            </div>
          </template>
          <template v-else-if="contador==0">
            <div class="sticky-top">
              <div class="bg-dark">
            
                  <h3 class="tablaHead">Presione el contador del cliente   <small style="
                  margin-left: 1.6em;
                  color: gray;">(botón amarillo)</small>
                  </h3>
                <i class="material-icons" style="position: absolute;
                 color: white;
                  z-index: 999;
                  margin-left: 13.6em;
                  top: -0.1em;">shutter_speed</i>
              </div>
            </div>
          </template>
                
              
            </div>
            <div class="card-body" style="background: #272727; border-radius: 0.6em;">
              <table class="tabla table">
                <thead class="">
                  <th scope="col">Avatar</th>
                  <th class="" scope="col">Nombre</th>
                  <th scope="col">DNI</th>
                  <th scope="col">Teléfono</th>
                  <th style="width: 190px;" scope="col">Opciones</th>
          
                </thead>
                <tbody>
                  <tr v-for="client in clients" class="trHigh">
                    <th>
                      <canvas
                        id="identicon"
                        width="40"
                        height="40"
                        v-bind:data-jdenticon-value="client.dni"
                        class="img-responsive img-circle"
                      ></canvas>
                    </th>
                    <td class="nowrap" style="max-width: 200px; width: 200px !important; font-family: 'Roboto', sans-serif;">{{client.name}}</td>
                    <th class="nowrap" style="max-width: 150px; width: 150px !important; 
                    font-family: 'Roboto', sans-serif !important;
                    font-weight: normal;">{{client.dni}}</th>
                    <th style="font-family: 'Roboto', sans-serif !important;
                    ">{{client.tel}}</th>
                    <div class="" style="width: 10%;">
                    <td style="width: 2%;">
                      <button
                        class="btn btn-outline-warning btn-sm fix disableBorder"
                        v-on:click="counterLitres(client._id)"
                      >
                        <i class="material-icons resize">shutter_speed</i>
                      </button>
                    </td>
                    <td>
                      <button
                        class="btn btn-outline-danger btn-sm fix disableBorder"
                        v-on:click="showModal(client._id)"
                      >
                        <i class="material-icons resize">clear</i>
                      </button>
                    </td>
                    <td>
                      <button
                        class="btn btn-outline-primary btn-sm fix disableBorder"
                        v-on:click="updateClient(client._id)"
                      >
                        <i class="material-icons resize">edit</i>
                      </button>
                    </td></div>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <modal name="delete" height="auto">
        <div class="container bg-dark card tabla  " style="background: rgb(34, 34, 34) !important;">
          <div class="">
            <center>
            <h5 class="tablaHead" style="margin-bottom: 0.7em;">¿Esta seguro que desea eliminar el cliente?</h5></center>
          </div>

          <div class="input-group-pretend mb-3">
            <center>
            <button class="btn btn-outline-success" v-on:click="deleteClient(idClient)">Aceptar</button>
            <button class="btn btn-outline-danger" v-on:click="hideModal()">Cancelar</button></center>
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

const schema = Joi.object().keys({
    id: Joi.string(),
    name : Joi.string().required(),
    dni : Joi.number().positive().required(),
    tel : Joi.number().positive().required()
})


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
   watch:{
    newKeg:{
      handler(){
        this.errorMessage = ''
      },
      deep : true
    }
  },
  created() {
    this.getClients();
  },
  methods: {
    addClient() {
      if(this.validClient()){
      if (this.edit === false) {
        axios({
          method: "POST",
          url: process.env.ROOT_API + "clients",
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
          url: process.env.ROOT_API + `clients/${this.newClient.id}`,
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
      }
    },
    getClients() {
      axios({
        url: process.env.ROOT_API + "clients",
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
        url: process.env.ROOT_API + `clients/${idClient}`,
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
        url: process.env.ROOT_API + `sale/counter/${idClient}`,
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
        url: process.env.ROOT_API + `clients/${idClient}`,
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
    },
      validClient(){
    const result = Joi.validate(this.newClient,schema)
    console.log(result.error)
    if(result.error === null){
      return true
    }else{
      if(result.error.message.includes('name'))
        this.errorMessage = 'El nombre ingresado es incorrecto'
      if(result.error.message.includes('dni'))
        this.errorMessage = 'El dni ingresado es incorrecto'
      if(result.error.message.includes('tel'))
        this.errorMessage = 'El telefono ingresado es incorrecto'
    }
  }
  }
};
</script>
<style scoped>
.down {
  margin-top: 10px;
}

.btn-outline-warning{
  background: #1f1f1f;
}

.btn-outline-warning:hover{
  color: #1f1f1f;
  background: #ffc107;
}
</style>
