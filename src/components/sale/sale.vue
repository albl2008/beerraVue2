<template>
  <div>
    <div id="sales">
      <center>
        <h1>VENTAS</h1>
      </center>
      <center>
        <img :src="require('@/assets/sections/sell.png')" alt class="position">
      </center>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-8">
          <div class="card">
            <div class="card-header bg-dark">
              <h3>LISTADO DE VENTAS</h3>
            </div>
            <div class="card-body">
              <table class="table">
                <thead>
                  <th>Cliente</th>
                  <th>Fecha</th>
                  <th>Total venta</th>
                  <th>Growlers</th>
                  <th>Pintas</th>
                  <th>Botellas</th>
                  <th>Cantidad</th>
                  <th>Envases</th>
                  <th>Elim.</th>
                </thead>
                <tbody>
                  <tr v-for="sale in sales">
                    <td>{{sale.client.name}}</td>

                    <td>{{format(sale.date)}}</td>

                    <td>{{sale.totalSale}}</td>
                    <template v-if="Object.keys(sale.growlers).length === 0">
                      <td>
                        <button class="btn btn-outline-dark disabled">
                          <img :src="require('@/assets/growlerlleno.png')" alt="carga">
                        </button>
                      </td>
                    </template>
                    <template v-else>
                      <td>
                        <button class="btn btn-light" v-on:click="getGrowler(sale._id)">
                          <img :src="require('@/assets/growlerlleno.png')" alt="carga">
                        </button>
                      </td>
                    </template>
                    <template v-if="Object.keys(sale.pints).length === 0">
                      <td>
                        <button class="btn btn-outline-dark disabled">
                          <img :src="require('@/assets/pinta.png')" alt>
                        </button>
                      </td>
                    </template>
                    <template v-else>
                      <td>
                        <button class="btn btn-light" v-on:click="getPints(sale._id)">
                          <img :src="require('@/assets/pinta.png')" alt>
                        </button>
                      </td>
                    </template>
                    <template v-if="Object.keys(sale.bottles).length === 0">
                      <td>
                        <button class="btn btn-outline-dark disabled">
                          <img :src="require('@/assets/bottle.png')" alt>
                        </button>
                      </td>
                    </template>
                    <template v-else>
                      <td>
                        <button class="btn btn-light" v-on:click="getBottles(sale._id)">
                          <img :src="require('@/assets/bottle.png')" alt>
                        </button>
                      </td>
                    </template>
                    <template v-if="Object.keys(sale.others).length === 0">
                      <td>
                        <button class="btn btn-outline-dark disabled">
                          <img :src="require('@/assets/other.png')" alt>
                        </button>
                      </td>
                    </template>
                    <template v-else>
                      <td>
                        <button class="btn btn-light" v-on:click="getOther(sale._id)">
                          <img :src="require('@/assets/other.png')" alt>
                        </button>
                      </td>
                    </template>
                    <template v-if="Object.keys(sale.containers).length === 0">
                      <td>
                        <button class="btn btn-outline-dark disabled">
                          <img :src="require('@/assets/carga2.png')" alt>
                        </button>
                      </td>
                    </template>
                    <template v-else>
                      <td>
                        <button class="btn btn-light" v-on:click="getContainers(sale._id)">
                          <img :src="require('@/assets/carga2.png')" alt>
                        </button>
                      </td>
                    </template>
                    <td>
                      <button
                        class="btn btn-outline-danger btn-sm"
                        v-on:click="showModal(sale._id)"
                      >
                        <i class="material-icons">delete</i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card bg-dark sticky-top">
            <div class="card-header">
              <h3>PRODUCTOS</h3>
            </div>
            <div class="card-body">
              <template v-if="isGrowlers === true">
                <table class="table">
                  <thead>
                    <th>Cerveza</th>
                    <th>Cantidad (Litros)</th>
                    <th>Precio</th>
                  </thead>
                  <tbody>
                    <tr v-for="growler in growlers">
                      <td>{{growler.keg.beer}}</td>
                      <td>{{growler.quantity}}</td>
                      <td>{{growler.price}}</td>
                    </tr>
                  </tbody>
                </table>
              </template>
              <template v-else-if="isPints === true">
                <table class="table">
                  <thead>
                    <th>Cerveza</th>
                    <th>Cantidad (Litros)</th>
                    <th>Precio</th>
                  </thead>
                  <tbody>
                    <tr v-for="pint in pints">
                      <td>{{pint.keg.beer}}</td>
                      <td>{{pint.quantity}}</td>
                      <td>{{pint.price}}</td>
                    </tr>
                  </tbody>
                </table>
              </template>
              <template v-else-if="isOther===true">
                <table class="table">
                  <thead>
                    <th>Cerveza</th>
                    <th>Cantidad (Litros)</th>
                    <th>Precio</th>
                  </thead>
                  <tbody>
                    <tr v-for="other in others">
                      <td>{{other.keg.beer}}</td>
                      <td>{{other.quantity}}</td>
                      <td>{{other.price}}</td>
                    </tr>
                  </tbody>
                </table>
              </template>
              <template v-else-if="isBottles===true">
                <table class="table">
                  <thead>
                    <th>Cerveza</th>
                    <th>Cantidad</th>
                    <th>tamaño botella</th>
                    <th>Precio</th>
                    <th>Total</th>
                  </thead>
                  <tbody>
                    <tr v-for="bottle in bottles">
                      <td>{{bottle.bottle.beer}}</td>
                      <td>{{bottle.quantitySaled}}</td>
                      <td>{{bottle.bottle.size}}</td>
                      <td>{{bottle.unitPrice}}</td>
                      <td>{{bottle.totalPrice}}</td>
                    </tr>
                  </tbody>
                </table>
              </template>
              <template v-else-if="isContainers===true">
                <table class="table">
                  <thead>
                    <th>Tamaño</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                  </thead>
                  <tbody>
                    <tr v-for="containerSaled in containers">
                      <td>{{containerSaled.container.size}}</td>
                      <td>{{containerSaled.quantitySaled}}</td>
                      <td>{{containerSaled.totalPrice}}</td>
                    </tr>
                  </tbody>
                </table>
              </template>
              <template v-else>
                <p class="seleccione">Seleccione articulos de la venta para ver su información</p>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
          <modal name="delete" height="auto">
        <div class="container bg-dark ">
          <div class="breadcrumb bg-warning">
              <h5 class="">¿Esta seguro que desea eliminar la venta?</h5>
          </div>
          
            <div class="input-group-pretend mb-3">
                  <button class="btn btn-success"  v-on:click="deleteSale()" >Aceptar</button>
                  <button class="btn btn-danger" v-on:click="hideModal()">Cancelar</button>
            </div>
            
        </div>
      </modal>
  </div>
</template>
<script>
import Vue from "vue";
const moment = require("moment");
const axios = require("axios");
export default {
  data() {
    return {
      idSale:'',
      sales: [],
      growlers: [],
      bottles: [],
      pints: [],
      others: [],
      containers: [],
      isGrowlers: false,
      isBottles: false,
      isPints: false,
      isOther: false,
      isContainers: false,
      search: ""
    };
  },
  created() {
    this.getSales();
  },

  methods: {
    getSales() {
      axios({
        url: "http://157.230.157.236/sale",
        headers: { authorization: `Bearer ${localStorage.token}` }
      })
        .then(response => {
          console.log(response);
          this.sales = response.data.sales;
        })
        .catch(e => {
          console.log(e);
        });
    },
    getGrowler(idSale) {
      axios({
        url: `http://157.230.157.236/sale/growlers/${idSale}`,
        headers: { authorization: `Bearer ${localStorage.token}` }
      })
        .then(response => {
          console.log(response);
          this.growlers = response.data.growlers;
          this.isPints = false;
          this.isGrowlers = true;
          this.isContainers = false;
          this.isBottles = false;
          this.isOther = false;
        })
        .catch(e => {
          console.log(e);
        });
    },
    getPints(idSale) {
      axios({
        url: `http://157.230.157.236/sale/pints/${idSale}`,
        headers: { authorization: `Bearer ${localStorage.token}` }
      })
        .then(response => {
          console.log(response);
          this.pints = response.data.pints;
          this.isPints = true;
          this.isGrowlers = false;
          this.isContainers = false;
          this.isBottles = false;
          this.isOther = false;
        })
        .catch(e => {
          console.log(e);
        });
    },
    getOther(idSale) {
      axios({
        url: `http://157.230.157.236/sale/other/${idSale}`,
        headers: { authorization: `Bearer ${localStorage.token}` }
      })
        .then(response => {
          console.log(response);
          this.others = response.data.others;
          this.isPints = false;
          this.isGrowlers = false;
          this.isBottles = false;
          this.isContainers = false;
          this.isOther = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    getBottles(idSale) {
      axios({
        url: `http://157.230.157.236/sale/bottles/${idSale}`,
        headers: { authorization: `Bearer ${localStorage.token}` }
      })
        .then(response => {
          console.log(response);
          this.bottles = response.data.bottles;
          this.isPints = false;
          this.isGrowlers = false;
          this.isBottles = true;
          this.isContainers = false;
          this.isOther = false;
        })
        .catch(e => {
          console.log(e);
        });
    },
    getContainers(idSale) {
      axios({
        url: `http://157.230.157.236/sale/containers/${idSale}`,
        headers: { authorization: `Bearer ${localStorage.token}` }
      })
        .then(response => {
          console.log(response);
          this.containers = response.data.containers;
          this.isPints = false;
          this.isGrowlers = false;
          this.isBottles = false;
          this.isContainers = true;
          this.isOther = false;
        })
        .catch(e => {
          console.log(e);
        });
    },
    deleteSale() {
      axios({
        method: "DELETE",
        url: `http://157.230.157.236/sale/${this.idSale}`,
        headers: { authorization: `Bearer ${localStorage.token}` }
      })
        .then(response => {
          console.log(response);
          this.getSales();
          this.notifySucces("Venta", response.data.message);
          this.hideModal()
        })
        .catch(err => {
          console.log(err.response);
          this.notifyError("Venta", err.response.data);
        });
    },
    showModal(idSale){
      
      this.idSale = idSale
        this.$modal.show('delete');
     
    },
    hideModal(){
      this.$modal.hide('delete');
    },
    format(date) {
      if (date) return moment(date).format("DD/MM/YYYY");
      else return "";
    },
    notifyWarning(title, text) {
      Vue.notify({
        group: "foo",
        type: "warn",
        title: title,
        text: text
      });
    },
    notifySucces(title, text) {
      Vue.notify({
        group: "foo",
        type: "success",
        title: title,
        text: text
      });
    },
    notifyError(title, text) {
      Vue.notify({
        group: "foo",
        type: "error",
        title: title,
        text: text
      });
    }
  }
};
</script>
<style>
</style>
