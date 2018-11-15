<template>
  <div>
    <h1>Ventas</h1>
    <div class="container">
      <div class="row ">
        <div class=" offset-md-3 col-md-6 mb-5 ">
          <input type="text" class="form-control mb-1" v-model="client" placeholder="Cliente" required>
          <input type="date" class="form-control mb-1 " v-model="date" required>
        </div>
      </div>
      <div class="row mb-5">

        <template v-for="keg in kegs">
          <template v-if="keg.sta === 4">
            <div class="col-md-3 col-sm-12 mb-5">
              <div class="card">
                <div class="card-header">
                  <div class="row">                   
                    <h3 class="col-md-10">{{keg.brewery.name}}</h3>
                    <button class="btn btn-danger btn-sm text-center col-md-2" v-on:click="empty(keg._id)">T</button>
                  </div>
                  
                </div>
                <div class="card-body">
                  <radial-progress-bar :diameter="230" :completed-steps="keg.quantitySaled" :total-steps="keg.quantity">
                    <p class="">Cerveza: {{keg.beer}}</p>
                    <p>Litros: {{ keg.quantity }}</p>
                    <p>litros disponibles: {{keg.quantitySaled}}</p>
                  </radial-progress-bar>
                  <div class="">
                    <button class="btn btn-primary btn-sm" v-on:click="createGrowler(keg,2,200)"><i class="material-icons">exposure_plus_1</i></button>
                    <button class="btn btn-primary btn-sm" v-on:click="createGrowler(keg,1,100)"><i class="material-icons">exposure_plus_1</i></button>
                    <button class="btn btn-primary btn-sm" v-on:click="createPint(keg,0.5,70)"><i class="material-icons">exposure_plus_1</i></button>
                    <button class="btn btn-primary btn-sm" v-on:click="createPint(keg,0.25,50)"><i class="material-icons">exposure_plus_1</i></button>
                    <button class="btn btn-primary btn-sm" v-on:click="createOther(keg)"><i class="material-icons">exposure_plus_1</i></button>
                  </div>
                </div>
              </div>



            </div>
          </template>
        </template>
      </div>
      <div class="row mb-2">
        <div class="col-6 col-sm-12 col-md-6">
          <div class="card">
            <div class="card-header">
              <h3>Botellones</h3>
            </div>
            <div class="card-body">
              <table class="table s">
                <thead>
                  <th>Cerveza</th>
                  <th>Cerveceria</th>
                  <th>Cantidad</th>
                  <th>Precio</th>
                  <th>Eliminar</th>
                </thead>
                <tbody>
                  <tr v-for="growler in growlers">
                    <td>{{growler.beer}}</td>
                    <td>{{growler.brewery}}</td>
                    <td>{{growler.quantity}}</td>
                    <td>{{growler.price}}</td>
                    <td><button class="btn btn-danger btn-sm" v-on:click="deleteGrowler(growler.idDelete)"><i class="material-icons">delete</i></button></td>
                  </tr>
                </tbody>
              </table>
              <h3 class="text-left">Total: {{totalGrowlers}}</h3>
            </div>
          </div>
        </div>

        <div class="col-6 col-sm-12 col-md-6 mb-5">
          
            <div class="card">
              <div class="card-header">
                <div class="row">
                  <div class="col-md-10 text-center"> <h3>Botellas</h3></div>
                  <div class="col-md-2 "><button class="text-center btn-primary btn-sm btn " v-on:click="openModalBottles()"><i class="material-icons">exposure_plus_1</i></button></div>
                </div>                 
              </div>      
              <div class="card-body">
                  <table class="table s">
              <thead>
                <th>Cerveza</th>
                <th>Cerveceria</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Eliminar</th>
              </thead>
              <tbody>
                <tr v-for="bottle in bottles">
                  <td>{{bottle.beer}}</td>
                  <td>{{bottle.brewery}}</td>
                  <td>{{bottle.quantity}}</td>
                  <td>{{bottle.price}}</td>
                  <td><button class="btn btn-danger btn-sm" v-on:click="deleteBottle(bottle.idDelete)"><i class="material-icons">delete</i></button></td>
                </tr>
              </tbody>
            </table>

            <div class="row">
              <div class="col-md-12">
               <h3 class="text-left">Total: {{totalBottles}}</h3>
              
              </div>
            </div>
              </div>          
          
            </div>
          
        </div>
        </div>
        <div class="row mb-5">
          <div class="col-6 col-sm-12 col-md-6">
            <div class="card">
              <div class="card-header"><h3>Pintas</h3></div>
              <div class="card-body">
                   <table class="table s">
              <thead>
                <th>Cerveza</th>
                <th>Cerveceria</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Eliminar</th>

              </thead>
              <tbody>
                <tr v-for="pint in pints">
                  <td>{{pint.beer}}</td>
                  <td>{{pint.brewery}}</td>
                  <td>{{pint.quantity}}</td>
                  <td>{{pint.price}}</td>
                  <td><button class="btn btn-danger btn-sm" v-on:click="deletePint(pint.idDelete)"><i class="material-icons">delete</i></button></td>
                </tr>
              </tbody>
            </table>
            <h3 class="text-left">Total: {{totalPints}}</h3>
              </div>
             
            </div>                 
          
          </div>
          <div class="col-6 col-sm-12 col-md-6">
            <div class="card">
              <div class="card-header">
                <h3>Otros</h3>
              </div>
              <div class="card-body">
                   <table class="table s">
              <thead>
                <th>Cerveza</th>
                <th>Cerveceria</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Eliminar</th>

              </thead>
              <tbody>
                <tr v-for="other in others">
                  <td>{{other.beer}}</td>
                  <td>{{other.brewery}}</td>
                  <td>{{other.quantity}}</td>
                  <td>{{other.price}}</td>
                  <td><button class="btn btn-danger btn-sm" v-on:click="deleteOther(other.idDelete)"><i class="material-icons">delete</i></button></td>
                </tr>
              </tbody>
            </table>
            <h3 class="text-left">Total: {{totalOthers}}</h3>
              </div>
            </div>
          </div>
        </div>
      
        <div class="row">
          <div class="col-md-12">
            <h3 class="text-center">Total venta: {{totalSale}}</h3>
            <button class="btn btn-success" v-on:click="sendSale()">Procesar venta</button>
          </div>

        </div>
     
      <modal name="hello-world">
        <div class="container ">
          <h3 class="mt-5">Ingrese datos</h3>
          <form v-on:submit.prevent="hide()">
            <div class="input-group-pretend mb-3">
              <input type="number" class="form-control mb-1" v-model="newOther.price" placeholder="Precio" required>
              <input type="text" class="form-control mb-1" v-model="newOther.quantity" placeholder="Cantidad" required>
            </div>
            <button class="btn btn-primary btn-block">Agregar</button>
          </form>
        </div>
      </modal>
      <modal name='bottles'>
        <div class="container">
          <div class="row">
          <div class="col-12  col-md-12">
          <div class="card">
            <div class="card-header">
              <h3>Cervezas</h3>
            </div>
            <div class="card-body">
                 <table class="table ">
              <thead>
                <th>Cerveza</th>
                <th>Stock</th>
                <th>brewery</th>
                <th>Precio</th>
                <th>Cantidad</th>
              </thead>
              <tbody>
                <tr v-for="bottle in BottlesStock">
                  <td>{{bottle.beer}}</td>
                  <td>{{bottle.quantity}}</td>
                  <td>{{bottle.brewery.name}}</td>
                  <td>{{bottle.price}}</td>
                  <td><input type="number form-control" v-model="newBottle.quantity" placeholder="Cantidad"></td>
                  <td><button class="btn btn-sm" v-on:click="createBottle(bottle)"><i class="material-icons">exposure_plus_1</i></button></td>
                </tr>
              </tbody>
            </table>
            </div>
          </div>
          </div>
        </div>       
        </div>       
      </modal>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import RadialProgressBar from 'vue-radial-progress'
const axios = require('axios')
class newGrowler {
  constructor(keg, quantity, price, idDelete) {

    this.keg = keg._id
    this.beer = keg.beer
    this.quantity = quantity
    this.price = price
    this.brewery = keg.brewery.name
    this.idDelete = idDelete
  }
}
class newPint {
  constructor(keg, quantity, price, idDelete) {

    this.keg = keg._id
    this.beer = keg.beer
    this.quantity = quantity
    this.price = price
    this.brewery = keg.brewery.name
    this.idDelete = idDelete
  }
}

export default {
    data () {
    return {
      completedSteps: 5,
      totalSteps: 10,
      kegs:[],
      growlers:[],
      bottles:[],
      BottlesStock:[],
      pints:[],
      others:[],
      totalGrowlers:0,
      totalPints:0,
      totalSale:0,
      totalOthers:0,
      totalBottles:0,
      showModal: false,
      newOther:{},
      newBottle:{},
      date:Date.now,
      client:"",

    }
  },
  created(){
     this.getKegs();
     this.getBottles()
  },
  methods:{
     getKegs() {
      axios.get('https://serverbeerra.herokuapp.com/keg')
        .then(response => {
          this.kegs = response.data.Kegs
        }).catch(e => {
          console.log(e)

        })
    },
    getBottles(){
      axios.get('https://serverbeerra.herokuapp.com/bottle')
      .then(response =>{
        console.log(response)
        this.BottlesStock = response.data.bottles
      }).catch(e => {
        console.log(e)

      })
    },
    createGrowler(keg,litres,price){

      if(keg.quantitySaled >= litres){
       
        let growler = new newGrowler(keg,litres,price,this.growlers.length)
        this.growlers.push(growler)
        this.CalculateGrowlers()
        keg.quantitySaled -= litres 
      }else{
        this.notifyWarning("No alcanza la cerveza disponible")
      }
    },
    deleteGrowler(id){ 
        
       let growlers = this.growlers
      for (let i = 0; i < growlers.length; i++) { 
        if(growlers[i].idDelete === id){
          let keg = this.kegs.find(keg => keg._id === growlers[i].keg)
          keg.quantitySaled  +=  growlers[i].quantity 
          growlers.splice(i,1)          
        }
      
        this.CalculateGrowlers()
      }     
    },
    CalculateGrowlers(){
      this.totalGrowlers = 0
      this.totalSale = 0
      for (let i = 0; i < this.growlers.length; i++) { 
       this.totalGrowlers += this.growlers[i].price       
      }
       this.calculateTotal()
    },
    CalculatePints(){
      this.totalPints = 0
      this.totalSale = 0
      for (let i = 0; i < this.pints.length; i++) { 
       this.totalPints += this.pints[i].price       
      }
      this.calculateTotal()
    },
    CalculateOther(){ 
        this.totalOthers = 0
        this.totalSale = 0
        for (let i = 0; i < this.others.length; i++) { 
        this.totalOthers += Number(this.others[i].price) 
        }
        this.calculateTotal()
    }, 
    CalculateBottle(){ 
        this.totalBottles = 0
        this.totalSale = 0
        for (let i = 0; i < this.bottles.length; i++) { 
        this.totalBottles += Number(this.bottles[i].price) 
        }
        this.calculateTotal()
    },

    createPint(keg,litres,price){
      if(keg.quantitySaled >= litres){
      let pint = new newPint(keg,litres,price,this.pints.length)
      this.pints.push(pint)
      this.CalculatePints()
      keg.quantitySaled -= litres
      }else{
        this.notifyWarning("No alcanza la cerveza disponible")
      }
    },
    deletePint(id){ 
      let pints = this.pints
      for (let i = 0; i < pints.length; i++) { 
        if(pints[i].idDelete === id){
          let keg = this.kegs.find(keg => keg._id === pints[i].keg)
          keg.quantitySaled  +=  pints[i].quantity 
          pints.splice(i,1)
        }
           
      }
      this.CalculatePints()
    },
  createOther (keg) {
    this.$modal.show('hello-world');
    this.newOther.keg = keg._id
    this.newOther.beer = keg.beer
    this.newOther.brewery = keg.brewery.name
    this.newOther.idDelete = this.others.length 
    
  },
  openModalBottles(){
    this.$modal.show('bottles');
  },
  createBottle(bottle){
    if(bottle.quantity >= this.newBottle.quantity && this.newBottle.quantity > 0  ){
    bottle.quantity -= Number(this.newBottle.quantity)
    this.newBottle._id = bottle._id
    this.newBottle.price =  (bottle.price * this.newBottle.quantity)
    this.newBottle.idDelete = this.bottles.length
    this.newBottle.beer = bottle.beer
    this.newBottle.brewery = bottle.brewery.name
    this.bottles.push(this.newBottle)
    this.CalculateBottle() 
    this.newBottle = {}
    }else{
      if( this.newBottle.quantity <= 0)
        this.notifyWarning("La cantidad no puede ser 0")
      else
        this.notifyWarning("No hay suficiente stock ")
    }
  },
  deleteBottle(id){ 
      let bottles = this.bottles
      for (let i = 0; i < bottles.length; i++) { 
        if(bottles[i].idDelete === id){            
            let bottle = this.BottlesStock.find(bottle => bottle._id === bottles[i]._id)
            bottle.quantity += Number(bottles[i].quantity)
            bottles.splice(i,1)
        }
      }
      this.CalculateBottle()
    },
   deleteOther(id){ 
       let others = this.others
      for (let i = 0; i < others.length; i++) { 
        if(others[i].idDelete === id){
            let keg = this.kegs.find(keg => keg._id === others[i].keg)
            keg.quantitySaled  +=  Number(others[i].quantity) 
            others.splice(i,1)
        }
      }
      this.CalculateOther()
    },
  hide () {
    let keg = this.kegs.find(keg => keg._id === this.newOther.keg)
    if(keg.quantitySaled >= this.newOther.quantity && this.newOther.quantity > 0){
      this.$modal.hide('hello-world');
      keg.quantitySaled -= this.newOther.quantity
      this.others.push(this.newOther)
      this.CalculateOther()
      this.newOther = {}
    }else{
       this.notifyWarning("No alcanza la cerveza disponible")
    }
  },
  calculateTotal(){
    this.totalSale = (this.totalPints + this.totalGrowlers + this.totalOthers + this.totalBottles)
  },
  sendSale(){
    axios.post(`https://serverbeerra.herokuapp.com/sale`,{
      date: this.date,
      client: this.client,
      totalSale: this.totalSale,
      growlers: this.growlers,
      bottles : this.bottles,
      others: this.others,
      pints: this.pints,
    }).then(res =>{
      console.log(res)
      this.reset()
     
     
    }).catch(e => {
      console.log(e)
    })
    
  },
  reset(){
      this.others = []
      this.growlers =[]
      this.bottles =[]
      this.pints =[]
      this.totalSale = 0
      this.totalOthers  = 0
      this.totalBottles = 0
      this.totalGrowlers = 0
      this.totalPints = 0
      this.client = ""
      this.date = ""
  },
  notifyWarning(text){
   Vue.notify({
                group: 'foo',
                type: 'error',
                title: 'Falta birra',
                text: text
              })
},
 empty(idKeg){
     axios.put(`https://serverbeerra.herokuapp.com/keg/empty/${idKeg}` )
     .then(res => {
       console.log(res)
       this.getKegs();
     })
  }
},

  components: {
    RadialProgressBar,

  }

}
  </script>

<style>
radial-progress-bar{
  background-image: url('../../assets/frontView.jpg')
}
</style>
