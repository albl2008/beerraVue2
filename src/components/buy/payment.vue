<template>
<div>
     <div id="payment">
          <h1>PAGO A PROVEEDORES</h1>
          <img :src="require('@/assets/compras.png')" alt="">
          <img class="left" :src="require('@/assets/compras.png')" alt="">
      </div> 
    <div class="container">
     
      <div class="row">
        

          <div class="col-12 col-sm-12 col-md-8">
            <div class="card">
              <div class="card-header bg-dark">
                   <h3>Barriles Vacios</h3>
              </div>
              <div class="card-body">
                  <table class="table s">
              <thead>
              <th>Cerveza</th>
              <th>Cantidad</th>
              <th>Estado</th>
              <th>IBU</th>
              <th>alcohol</th>
              <th>brewery</th>
              <th>Pagar</th>
              </thead>
              <tbody>
                <tr v-for="keg in kegs" >
                   <template v-if="keg.sta === 3">
                  <td>{{keg.beer}}</td>
                  <td>{{keg.quantity}}</td>
                  <td>{{keg.sta}}</td>
                  <td>{{keg.ibu}}</td>
                  <td>{{keg.alcohol}}</td>
                  <td>{{keg.brewery.name}}</td>
                  <td><button class="btn btn-outline-primary btn-sm" v-on:click="getKeg(keg)"><i class="material-icons">attach_money</i></button></td>
                  </template>
                </tr>
              </tbody>
            </table>
              </div>
            </div>           
      </div>
      <div class="col-12 col-sm-12  col-md-4">
          <div class="card bg-dark">
            <div class="card-header"><h3>Pagar Barril</h3></div>
            <div class="card-body">
              <form v-on:submit.prevent="addPay()">

                <div class="input-group-pretend mb-3">
                  <input type="text" class="form-control mb-1" v-model="newPay.brewery"  placeholder="Cerveceria">
                  <input type="text" class="form-control mb-1" v-model="newPay.beer" placeholder="Estilo" required>
                    <input type="date" class="form-control mb-1 " v-model="newPay.date" required>
                  <input type="text" class="form-control mb-1" v-model="newPay.ammount" placeholder="Precio" required>
                </div>
                        <button class="btn btn-outline-danger btn-block">Confirmar Pago</button>
              
        </form>
            </div>
          </div>
      </div>
       

    </div>
    <div class="row">

          <div class="col-12 col-sm-12 col-md-12">
            <div class="card">
              <div class="card-header bg-dark">
                   <h3>Barriles Pagados</h3>
              </div>
              <div class="card-body">
                  <table class="table s">
              <thead>
              <th>Cerveza</th>
              <th>Cantidad</th>
              <th>Estado</th>
              <th>Cerveceria</th>
              <th>Monto</th>
              <th>Pagado</th>
              </thead>
              <tbody>
                <tr v-for="payment in Payments" >
                   <template v-if="payment.keg.sta === 5">
                  <td>{{payment.keg.beer}}</td>
                  <td>{{payment.keg.quantity}}</td>
                  <td>{{payment.keg.sta}}</td>
                  <td>{{payment.brewery}}</td>
                  <td>{{payment.ammount}}</td>
                  <td><button class="btn btn-outline-success btn-sm"><i class="material-icons">done</i></button></td>
                  </template>
                </tr>
                
              </tbody>
            </table>
              </div>
            </div>           
      </div>


      </div>
    </div>
</div>
</template>
<script>
import Vue from 'vue'
const axios = require('axios')

class Keg {
  constructor(id, beer, quantity, status, brewery) {
    this.id = id
    this.beer = beer
    this.quantity = quantity
    this.sta = status
    this.brewery = brewery
  }
}
class Brewery{
  constructor(id,name){
    this.id = id
    this.name = name
  }
}
class newPay {
  constructor(id, date, keg, ammount) {
    this.id = id
    this.date = date
    this.keg = keg
    this.ammount = ammount

  }
}

export default {
  data() {
    return {
      Keg:{},
      newPay:{},
      selectedKeg:{},
      kegs: [],
      keg:[],
      payment:{},
      Payments:[],
      Brewery: {},
      brewery:[],
      quantities: [{
          text: '20'
        },
        {
          text: '30'
        },
        {
          text: '50'
        }
      ],
      status: [{
          text: 'Lleno',
          value: 1
        },
        {
          text: 'Empesado',
          value: 2
        },
        
      ],
    
      kegToEdit: '',



    }
  },
  created() {
    this.getKegs();
    this.getBreweries();
    this.getPayments();
  },
  methods: {
    getKegs() {
      axios.get('http://localhost:3000/keg')
        .then(response => {
          console.log(response)
          this.kegs = response.data.Kegs

        }).catch(e => {
          console.log(e)

        })
    },
    getPayments() {
      axios.get('http://localhost:3000/payment')
        .then(response => {
          console.log(response)
          this.Payments = response.data.pays
        }).catch(e => {
          console.log(e)

        })

    },
    getPayment(idPayment) {
        
       
        axios.get(`http://localhost:3000/payment/${idPayment}`)
        .then(res => {
          
          this.payment = new newPay(res.data.payment._id,brewery.name, res.data.payment.date,
            res.data.payment.ammount
          )
          console.log(this.newKeg.brewery)
          this.edit = true;
        })
    },
    getKeg(keg) {
      this.newPay = {}
      this.newPay.keg = keg._id
      this.newPay.brewery = keg.brewery.name
      this.newPay.beer = keg.beer

    },
    getBreweries() {
      axios.get('http://localhost:3000/brewery')
        .then(response => {
          this.breweries = response.data.Breweries
          console.log(response);
        })
    },
    addPay(){
      axios.put(`http://localhost:3000/keg/pay/${this.newPay.keg}`)
          .then(res => {
          console.log(res)
          this.getKegs();
          
        })
     axios.post('http://localhost:3000/payment',
      this.newPay
        ).then(res => {
        console.log(res)
        if(res.status == 200){
           Vue.notify({
            group: 'foo',
            type:'success',
            title: 'Pago',
            text: res.data.mensaje
      })
      this.getPayments();
       this.newPay = {};
    }
      }).catch(e =>{
        console.log(e)
         Vue.notify({
            group: 'foo',
            type:'error',
            title: 'Pago',
            text: `Error al procesar el pago ${e}`
      })
      })
      
          
         
  }
  },

}
</script>
<style>
#payment img{
  position: relative;
  float: right;
}
#payment img .left{
  position: relative;
  float: left;
}
#payment h1 {
  font-size:40px;
  font-family: 'Black Ops One', cursive;
}
.card-header h3{
  color:white;
}
input[type="text"], textarea {

  background-color : #beb9b9; 

}
input[type="date"], textarea {

  background-color : #beb9b9; 

}
td{
  font-family: 'Courier New', Courier;
  color: black;
  font-size:13px;
}
th{
  font-family: 'Courier New', Courier;
  color: black;
  font-size:13px;
}
::-webkit-input-placeholder { /* Chrome/Opera/Safari */
  font-family:'Courier New', Courier;
  color: black;
}
::-moz-placeholder { /* Firefox 19+ */
  font-family:'Courier New', Courier;
  color: black;
}
</style>
