<template>
<div>
     <div id="payment">
          <div class="row" style="width: 50%; margin: 0 auto;"><div class="centerhead">
        <h1 class="h1head">Pagos</h1></div>
        <img :src="require('@/assets/beerra/ventass2x.png')" alt class="underh1">
      </div>
         
      </div> 
    <div class="container">
     
      <div class="row">
        <div class="col-12 col-sm-12  col-md-3" style="margin-bottom: 3em;">
        <div v-if="errorMessage" class="alert alert-danger" role="alert">
            {{ errorMessage }}
          </div>
          <div class="card bg-dark">
            <div class="card-header bg-dark">
              <h3 class="tablaHead">Pagar barril</h3></div>
            <div class="card-body" style="background: #272727;">
              <form v-on:submit.prevent="addPay">

                <div class="input-group-pretend mb-3">
                  <label>Cervecería</label>
                  <input type="text" class="form-control mb-1" v-model="newPay.brewery"  placeholder="" disabled>
                  <label>Estilo</label>
                  <input type="text" class="form-control mb-1" v-model="newPay.beer" placeholder="" disabled>
                  <label>Fecha</label>
                    <input type="date" class="form-control mb-1 " v-model="newPay.date" required>
                    <label>Precio</label>
                  <input type="text" class="form-control mb-1" v-model="newPay.ammount" placeholder="" required>
                </div>
                        <button class="btn btn-outline-danger btn-block" style="width: 85px;">Confirmar</button>
              
        </form>
            </div>
          </div>
      </div>

          <div class="col-12 col-sm-12 col-md-9">
            <div class="card bg-dark" style="background: #272727 !important;">
              <div class="card-header bg-dark">
                   <h3 class="tablaHead">Barriles vacíos</h3>
              </div>
              <div class="card-body">
                  <table class="table s">
              <thead>
              <th>Cerveza</th>
              <th>Cantidad</th>
              <th>Estado</th>
              <th>IBU</th>
              <th>Alcohol</th>
              <th>Cervecería</th>
              <th>Pagar</th>
              </thead>
              <tbody>
                <tr class="trHigh" v-for="keg in kegs" >
                   <template v-if="keg.sta === 3">
                  <td class="nowrap" style="width: 100px;">{{keg.beer}}</td>
                  <td>{{keg.quantity}}<span class="litros"> l</span></td>
                  <td>{{keg.sta}}</td>
                  <td>{{keg.ibu}}</td>
                  <td>{{keg.alcohol}} %</td>
                  <td class="nowrap" style="width: 200px;">{{keg.brewery.name}}</td>
                  <td><button class="btn btn-outline-primary btn-sm fix disableBorder" v-on:click="getKeg(keg)"><i class="material-icons resize">attach_money</i></button></td>
                  </template>
                </tr>
              </tbody>
            </table>
              </div>
            </div>           
      </div>
      
       

    </div>
    <div class="row">

          <div class="col-12 col-sm-12 col-md-12" style="margin-bottom: 3em;">
            <div class="card bg-dark" style="background: #272727 !important;">
              <div class="card-header bg-dark">
                   <h3 class="tablaHead">Barriles pagados</h3>
              </div>
              <div class="card-body">
                  <table class="table s">
              <thead>
              <th>Cerveza</th>
              <th>Cantidad</th>
              <th>Estado</th>
              <th>Cervecería</th>
              <th>Monto</th>
              <th>Pagado</th>
              </thead>
              <tbody>
                <tr class="trHigh" v-for="payment in Payments" >
                   <template v-if="payment.keg.sta === 5">
                  <td class="nowrap" style="width: 230px;">{{payment.keg.beer}}</td>
                  <td>{{payment.keg.quantity}}<span class="litros"> l</span></td>
                  <td>{{payment.keg.sta}}</td>
                  <td class="nowrap" style="width: 200px;">{{payment.brewery}}</td>
                  <td style="width: 100px;">$ {{payment.ammount}}</td>
                  <td style="width: 10%;"><button class="btn btn-outline-success btn-sm fix disableBorder"><i class="material-icons resize">done</i></button></td>
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
    ammount : Joi.number().positive().required(),
    brewery: Joi.string(),
    beer: Joi.string()
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
        url:process.env.ROOT_API + 'keg',
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
        url:process.env.ROOT_API + 'payment',
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
          url:process.env.ROOT_API + `payment/${idPayment}`,
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
      this.newPay.brewery = keg.brewery.name
      this.newPay.beer = keg.beer
    },
    getBreweries() {
      axios({
        url:process.env.ROOT_API + 'brewery',
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
        url:process.env.ROOT_API + `keg/pay/${this.newPay.keg}`,
        headers: {authorization: `Bearer ${localStorage.token}`},
        
        })
          .then(res => {
          console.log(res)
          this.getKegs();
          
        })
     axios({
       method:'post',
       url:process.env.ROOT_API + 'payment',
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
<style scoped>
.card-body{
  border-radius: 0.6em;
}
</style>
