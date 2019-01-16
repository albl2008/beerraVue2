<template>
<div>
     <div id="payment">
          <center><h1>PAGO A PROVEEDORES</h1></center>
          <center><img :src="require('@/assets/sections/compras.png')" alt=""></center>
         
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
        <div v-if="errorMessage" class="alert alert-danger" role="alert">
            {{ errorMessage }}
          </div>
          <div class="card bg-dark">
            <div class="card-header"><h3>Pagar Barril</h3></div>
            <div class="card-body">
              <form v-on:submit.prevent="addPay">

                <div class="input-group-pretend mb-3">
                  <input type="text" class="form-control mb-1" v-model="displayPay.brewery"  placeholder="Cerveceria" disabled>
                  <input type="text" class="form-control mb-1" v-model="displayPay.beer" placeholder="Estilo" disabled>
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
                  <td>{{payment.keg.brewery.name}}</td>
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
import Joi from 'joi'
const axios = require('axios')

const schema = Joi.object().keys({
    id: Joi.string(),
    date : Joi.date().required(),
    keg : Joi.required(),
    ammount : Joi.number().positive().required()
})


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
      displayPay:{},
      errorMessage:'',
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
   watch:{
    newPay:{
      handler(){
        this.errorMessage = ''
      },
      deep : true
    }
  },
  methods: {
    getKegs() {
      axios({
        url:'http://localhost:3000/keg',
        headers: {authorization: `Bearer ${localStorage.token}`}
        })
        .then(response => {
          console.log(response)
          this.kegs = response.data.Kegs

        }).catch(e => {
          console.log(e)

        })
    },
    getPayments() {
      axios({
        url:'http://localhost:3000/payment',
        headers: {authorization: `Bearer ${localStorage.token}`}
        })
        .then(response => {
          console.log(response)
          this.Payments = response.data.pays
        }).catch(e => {
          console.log(e)

        })

    },
    getPayment(idPayment) {
        
       
        axios({
          url:`http://localhost:3000/payment/${idPayment}`,
          headers: {authorization: `Bearer ${localStorage.token}`}
          })
        .then(res => {
          
          this.payment = new newPay(res.data.payment._id,brewery.name, res.data.payment.date,
            res.data.payment.ammount
          )
          console.log(this.newKeg.brewery)
          this.edit = true;
        })
    },
    getKeg(keg) {
      this.newPay={}
      this.newPay.keg = keg._id
      this.displayPay.brewery = keg.brewery.name
      this.displayPay.beer = keg.beer
    },
    getBreweries() {
      axios({
        url:'http://localhost:3000/brewery',
        headers: {authorization: `Bearer ${localStorage.token}`}
        })
        .then(response => {
          this.breweries = response.data.Breweries
          console.log(response);
        })
    },
    addPay(){
      if(this.validPay()){
      axios({
        method:'put',
        url:`http://localhost:3000/keg/pay/${this.newPay.keg}`,
        headers: {authorization: `Bearer ${localStorage.token}`},
        
        })
          .then(res => {
          console.log(res)
          this.getKegs();
          
        })
     axios({
       method:'post',
       url:'http://localhost:3000/payment',
       data:this.newPay,
       headers: {authorization: `Bearer ${localStorage.token}`},
        }).then(res => {
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
  validPay(){
            const result = Joi.validate(this.newPay,schema)
                 if(result.error === null){
                return true
                }else{
                  console.log(result.error.message)
                if(result.error.message.includes('ammount')){
                    this.errorMessage = 'Ingrese un monto correcto'
                    return false
                }
                if(result.error.message.includes('date')){
                    this.errorMessage = 'Ingrese una fecha correcta'
                    return false
                }
                if(result.error.message.includes('keg')){
                    this.errorMessage = 'Es necesario seleccionar un barril.'
                    return false
                }
                
               
                }
           
        }
  },

}
</script>
<style>

</style>
