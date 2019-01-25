<template>
  <div>
    <div id="sales">
      <div class="row" style="width: 50%; margin: 0 auto; ">
        <div class="centerhead">
          <h1 class="h1head">Ventas</h1>
        </div>
        <img :src="require('@/assets/beerra/moneyy2x.png')" alt class="underh1">
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-4 sticky-top" style="height: 30%;">
          <!-- GROWLERS-->
          <div class="card bg-dark limitProduct " style="width: 359px;">
            <div class="card-header bg-dark">
              <h3 class="tablaHead" >Productos</h3>
            </div>
            <div class="card-body" style="background: #272727;">
              <template v-if="isGrowlers === true">
                <table class="table">
                  <thead>
                    <th>Cerveza</th>
                    <th>Cantidad
                      <small>Litros</small>
                    </th>
                    <th>Precio</th>
                  </thead>
                  <tbody>
                    <tr class="trHigh" v-for="growler in growlers" :key="growler._id">
                      <td class="nowrap" style="max-width: 120px;">{{growler.keg.beer}}</td>
                      <td>
                        {{growler.quantity}}
                        <span class="litros">l</span>
                      </td>
                      <td>$ {{growler.price}}</td>
                    </tr>
                  </tbody>
                </table>
              </template>
              <template v-else-if="isPints === true">
                <table class="table">
                  <thead>
                    <th>Cerveza</th>
                    <th>Cantidad
                      <small>Litros</small>
                    </th>
                    <th>Precio</th>
                  </thead>
                  <tbody>
                    <tr class="trHigh" v-for="pint in pints" :key="pint._id">
                      <td class="nowrap" style="max-width: 120px;">{{pint.keg.beer}}</td>
                      <td>
                        {{pint.quantity}}
                        <span class="litros">l</span>
                      </td>
                      <td>$ {{pint.price}}</td>
                    </tr>
                  </tbody>
                </table>
              </template>
              <template v-else-if="isOther===true">
                <table class="table">
                  <thead>
                    <th>Cerveza</th>
                    <th>Cantidad
                      <small>Litros</small>
                    </th>
                    <th>Precio</th>
                  </thead>
                  <tbody>
                    <tr class="trHigh" v-for="other in others" :key="other._id">
                      <td class="nowrap" style="max-width: 100px;">{{other.keg.beer}}</td>
                      <td>
                        {{other.quantity}}
                        <span class="litros">l</span>
                      </td>
                      <td>$ {{other.price}}</td>
                    </tr>
                  </tbody>
                </table>
              </template>
              <template v-else-if="isBottles===true">
                <table class="table">
                  <thead>
                    <th>Cerveza</th>
                    <th>Cant.</th>
                    <th>Tamaño</th>
                    <th>Precio</th>
                    <th>Total</th>
                  </thead>
                  <tbody>
                    <tr class="trHigh" v-for="bottle in bottles" :key="bottle._id">
                      <td class="nowrap" style="max-width: 50px;">{{bottle.bottle.beer}}</td>
                      <td>{{bottle.quantitySaled}}</td>
                      <td>
                        {{bottle.bottle.size}}
                        <span class="litros">l</span>
                      </td>
                      <td>$ {{bottle.unitPrice}}</td>
                      <td>$ {{bottle.totalPrice}}</td>
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
                    <tr
                      class="trHigh"
                      v-for="containerSaled in containers"
                      :key="containerSaled._id"
                    >
                      <td>
                        {{containerSaled.container.size}}
                        <span class="litros">l</span>
                      </td>
                      <td>{{containerSaled.quantitySaled}}</td>
                      <td>$ {{containerSaled.totalPrice}}</td>
                    </tr>
                  </tbody>
                </table>
              </template>
              <template v-else>
                <p class="seleccione">Seleccione articulos de la venta para ver su información</p>
              </template>
            </div>
          </div>

<div class="card  overload col-md-12" style="background: #272727; margin-top: 1em;">
  <div class=" " >
    <h3 class="tablaHead" style="margin-top: 0.45em;">Cierre de caja <small> </small></h3> 
    
  </div>
  
  <div class="" style=" width: 100% !important; padding: 0 !important; margin-bottom: 0.45em;">
    <input style="margin-bottom: 0.45em;" type="date" class="form-control fecha" v-model="day" required aria-label="Small" aria-describedby="inputGroup-sizing-sm">
    <h3 class="text-center badge badge-dark precios" style="background: #2b2b2b; border: 1px solid #444444;">{{'Total: '+ totalDay }}</h3>
  </div>
</div>


        </div>

        <div class="col-md-8">
          <div class="card" style="background: #272727; margin-bottom: 3em;">
            <div class="card-header bg-dark">
              <h3 class="tablaHead">Ventas</h3>
            </div>
            <div class="card-body">
              <table class="table">
                <thead class>
                  <!-- should be sticky-->
                  <th>Cliente</th>
                  <th>Fecha</th>
                  <th>Total</th>
                  <th>Formatos
                    <small>growler /pinta /botella /cantidad /envase</small>
                  </th>

                  <th>Elim.</th>
                </thead>
                <tbody>
                  <tr class="trHigh" v-for="sale in sales" :key="sale._id">
                    <td class="nowrap" style="max-width: 100px;">{{sale.client.name}}</td>

                    <td>{{format(sale.date)}}</td>

                    <td style="width: 100px;">$ {{sale.totalSale}}</td>
                    <div style="width: 290px;">
                      <template v-if="Object.keys(sale.growlers).length === 0">
                        <td>
                          <button class="btn btn-outline-dark disabled disableBorder btn-sm">
                            <img
                              class="fix"
                              :src="require('@/assets/growlerlleno.png')"
                              alt="carga"
                            >
                          </button>
                        </td>
                      </template>
                      <template v-else>
                        <td>
                          <button
                            class="btn btn-light add disableBorder"
                            v-on:click="getGrowler(sale._id)"
                          >
                            <img :src="require('@/assets/growlerlleno.png')" alt="carga">
                          </button>
                        </td>
                      </template>
                      <template v-if="Object.keys(sale.pints).length === 0">
                        <td>
                          <button class="btn btn-outline-dark disabled disableBorder">
                            <img :src="require('@/assets/pinta.png')" alt>
                          </button>
                        </td>
                      </template>
                      <template v-else>
                        <td>
                          <button
                            class="btn add btn-light disableBorder"
                            v-on:click="getPints(sale._id)"
                          >
                            <img :src="require('@/assets/pinta.png')" alt>
                          </button>
                        </td>
                      </template>
                      <template v-if="Object.keys(sale.bottles).length === 0">
                        <td>
                          <button class="btn btn-outline-dark disabled disableBorder">
                            <img :src="require('@/assets/bottle.png')" alt>
                          </button>
                        </td>
                      </template>
                      <template v-else>
                        <td>
                          <button
                            class="btn add btn-light disableBorder"
                            v-on:click="getBottles(sale._id)"
                          >
                            <img :src="require('@/assets/bottle.png')" alt>
                          </button>
                        </td>
                      </template>
                      <template v-if="Object.keys(sale.others).length === 0">
                        <td>
                          <button class="btn btn-outline-dark disabled disableBorder">
                            <img :src="require('@/assets/other.png')" alt>
                          </button>
                        </td>
                      </template>
                      <template v-else>
                        <td>
                          <button
                            class="btn add btn-light disableBorder"
                            v-on:click="getOther(sale._id)"
                          >
                            <img :src="require('@/assets/other.png')" alt>
                          </button>
                        </td>
                      </template>
                      <template v-if="Object.keys(sale.containers).length === 0">
                        <td>
                          <button class="btn btn-outline-dark disabled disableBorder">
                            <img :src="require('@/assets/carga2.png')" alt>
                          </button>
                        </td>
                      </template>
                      <template v-else>
                        <td>
                          <button
                            class="btn add btn-light disableBorder"
                            v-on:click="getContainers(sale._id)"
                          >
                            <img :src="require('@/assets/carga2.png')" alt>
                          </button>
                        </td>
                      </template>
                    </div>
                    <td>
                      <button
                        class="btn btn-outline-danger btn-sm fix disableBorder"
                        v-on:click="showModal(sale._id)"
                      >
                        <i class="material-icons resize">clear</i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <modal name="delete" height="auto">
      <div class="container card bg-dark" style="background: #222 !important;">
        <div class>
          <center>
            <h5
              class="tablaHead"
              style="margin-bottom: 0.7em;"
            >¿Esta seguro que desea eliminar la venta?</h5>
          </center>
        </div>

        <div class="input-group-pretend mb-3">
          <center>
            <button class="btn btn-outline-success" v-on:click="deleteSale()">Aceptar</button>
            <button class="btn btn-outline-danger" v-on:click="hideModal()">Cancelar</button>
          </center>
        </div>
      </div>
    </modal>
  </div>
</template>
<script>
import Vue from "vue";
const moment = require('moment-timezone')
const axios = require("axios");
export default {
  data() {
    return {
      idSale: "",
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
      search: "",
      day:'',
      totalDay:''
    };
  },
  created() {
    this.getSales();
  },
  watch:{
    day(){
      this.calculateTotal()
    }
  },
  methods: {
    calculateTotal(){
      console.log('day',this.day)
      axios({
        method:'POST',
        url: process.env.ROOT_API + `sale/totalDay`,
        data:{day:this.day},
        headers: { authorization: `Bearer ${localStorage.token}` }
      }).then(res => {
        this.totalDay = res.data.total
      }).catch(err => {
        console.log(res.response.data)
      })
    },
    getSales() {
      axios({
        url: process.env.ROOT_API + "sale",
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
        url: process.env.ROOT_API + `sale/growlers/${idSale}`,
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
        url: process.env.ROOT_API + `sale/pints/${idSale}`,
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
        url: process.env.ROOT_API + `sale/other/${idSale}`,
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
        url: process.env.ROOT_API + `sale/bottles/${idSale}`,
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
        url: process.env.ROOT_API + `sale/containers/${idSale}`,
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
        url: process.env.ROOT_API + `sale/${this.idSale}`,
        headers: { authorization: `Bearer ${localStorage.token}` }
      })
        .then(response => {
          console.log(response);
          this.getSales();
          this.notifySucces("Venta", response.data.message);
          this.hideModal();
        })
        .catch(err => {
          console.log(err.response);
          this.notifyError("Venta", err.response.data);
        });
    },
    showModal(idSale) {
      this.idSale = idSale;
      this.$modal.show("delete");
    },
    hideModal() {
      this.$modal.hide("delete");
    },
    format(date) {
      if (date) return moment(date).tz('UTC').format("DD/MM/YYYY");
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
<style scoped>
.card-body {
  border-radius: 0.6em;
}

.add {
  background: #4b4b4b !important;
  border: 1px solid #616161 !important;
}

.add:hover {
  background: #fff !important;
  color: #242424 !important;
}

.disabled {
  width: 47px;
}

.overload{
display: block;
position: relative !important;
width: 358px;

}

.limitProduct{
max-height: 290px;
overflow: scroll;
}

.precios{
  font-size: 28px;
  font-family: 'Squada One', cursive;
  color:#FD9326;
}
</style>
