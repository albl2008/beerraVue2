<template>
  <div>
    <div id="canillas">
      <center><h1>BARRILES CONECTADOS</h1></center>
      <img :src="require('@/assets/sections/pipes.png')" alt="">
     
    </div>
    <div class="container">
      
      <div class="row mb-5">

        <template v-for="keg in kegs">
          <template v-if="keg.sta === 4">
            <div class="col-md-3 col-sm-12 mb-5">
              <div class="card">
                <div class="card-header tituloCardHeader bg-dark">
                  <div class="row">
                    <h3 class="text-center col-md-10 estilo">{{keg.beer}}</h3>
                    <button v-on:click="openModalDisconect(keg)" class="btn btn-outline-danger btn-sm" data-toggle="tooltip"
                      data-placement="top" title="Desconectar Barril"><i class="material-icons">power_off</i></button>
                  </div>

                </div>
                <div class="card-body text-center">
                  <radial-progress-bar :diameter="diametro" :startColor="'#ffc107'" :stopColor="'#e2ba1f'" :completed-steps="keg.quantitySaled"
                    :total-steps="keg.quantity" class="">
                    <p><span class="badge badge-warning">{{ keg.brewery.name }}</span></p>
                    <p><span class="badge badge-dark">{{ keg.quantity }}</span></p>
                    <template v-if="keg.quantitySaled<=15">
                      <p><span class="badge badge-danger">{{ keg.quantitySaled }}</span></p>
                    </template>
                    <template v-else>
                      <p><span class="badge badge-success">{{ keg.quantitySaled }}</span></p>
                    </template>
                  </radial-progress-bar>
                </div>
                <div class="mb-1 text-center">
                 
                      <button :class="{ disabled: isDisabled }" :disabled="isDisabled" class="btn btn-outline-dark btn-sm"
                        v-on:click="createGrowler(keg,sizes[0].growlersize,prices[0].loadprice)" data-toggle="tooltip"
                        data-placement="top" title="Carga Grande"><img :src="require('@/assets/growlerlleno.png')" alt="carga"></button>
                      <button :class="{ disabled: isDisabled }" :disabled="isDisabled" class="btn btn-outline-dark btn-sm"
                        v-on:click="createGrowler(keg,sizes[0].growlersize2,prices[0].loadprice2)" data-toggle="tooltip"
                        data-placement="top" title="Carga Chica"><img :src="require('@/assets/growler1l.png')" alt=""></button>
                      <button :class="{ disabled: isDisabled }" :disabled="isDisabled" class="btn btn-outline-dark btn-sm"
                        v-on:click="createPint(keg,sizes[0].pintsize,prices[0].pintprice)" data-toggle="tooltip" data-placement="top"
                        title="Pinta"><img :src="require('@/assets/pinta.png')" alt=""></button>
                      <button class="btn btn-outline-dark btn-sm" v-on:click="happyhour(keg,sizes[0].pintsize,prices[0].hhourprice)"
                        data-toggle="tooltip" data-placement="top" title="Happy Hour"><img :src="require('@/assets/hhour.png')"
                          alt=""></button>
                      <button :class="{ disabled: isDisabled }" :disabled="isDisabled" class="btn btn-outline-dark btn-sm"
                        v-on:click="createOther(keg)" data-toggle="tooltip" data-placement="top" title="Por cantidad"><img
                          :src="require('@/assets/other.png')" alt=""></button>
                </div>
              </div>



            </div>
          </template>
        </template>
      </div>
      <div class="row ">
        <div class=" offset-md-3 col-md-6 mb-5 ">
          <div class="form-inline venta">
            <h3><span class="badge badge-pill badge-dark">Cliente:</span></h3>
            <input type="text" class="form-control" v-model="client" id="cliente" requiered aria-label="Small"
              placeholder="Nombre" aria-describedby="inputGroup-sizing-sm">
            <h3><span class="badge badge-pill badge-dark">Fecha:</span></h3>
            <input type="date" class="form-control" v-model="date" required aria-label="Small" aria-describedby="inputGroup-sizing-sm">
          </div>
        </div>
      </div>

      <div class="row mb-2">
        <div class="col-6 col-sm-12 col-md-6">
          <div class="card">
            <div class="card-header tituloCardHeader bg-dark">
              <div class="row">
                <div class="col-md-9 text-center ">
                  <h3 class="estilo text-left">Botellones</h3>
                </div>

               

                
                  <template v-for="container in containersStock">
                   <template v-if="container.size === sizes[0].growlersize" >          
                        <button class="  btn-outline-light btn-sm btn" data-toggle="tooltip"
                          data-placement="top" title="Envase Vacio" v-on:click="createContainer(container,1,sizes[0].growlersize,prices[0].growlerprice)"><img
                            :src="require('@/assets/carga2.png')" alt=""></button>
                    </template>
                     
                    <template  v-else >

                      <button class=" btn-outline-light btn-sm btn mr-1 " data-toggle="tooltip"
                        data-placement="top" title="Envase Vacio" v-on:click="createContainer(container,1,sizes[0].growlersize2,prices[0].growlerprice2)"><img
                          :src="require('@/assets/carga.png')" alt=""></button>
                    </template>
                   
                  </template>
                
                

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
                  <tr v-for="growler in growlers">
                    <td>{{growler.beer}}</td>
                    <td>{{growler.brewery}}</td>
                    <td>{{growler.quantity}}</td>
                    <td>{{growler.price}}</td>
                    <td><button class="btn btn-danger btn-sm" v-on:click="deleteGrowler(growler.idDelete)"><i class="material-icons">delete</i></button></td>
                  </tr>
                </tbody>
              </table>
              <h3 class="text-center precios">Total: {{totalGrowlers}}</h3>
              <table class="table s">
                <thead>
                  <th>Tamaño</th>
                  <th>Cantidad</th>
                  <th>Precio</th>
                  <th>Eliminar</th>
                </thead>
                <tbody>
                  <tr v-for="container in containers">
                    <td>{{container.size}}</td>
                    <td>{{container.quantitySaled}}</td>
                    <td>{{container.price}}</td>
                    <td><button class="btn btn-danger btn-sm" v-on:click="deleteContainer(container.idDelete)"><i class="material-icons">delete</i></button></td>
                  </tr>
                </tbody>
              </table>
              <h3 class="text-center precios">Envases: {{totalContainers}}</h3>

            </div>
          </div>
        </div>

        <div class="col-6 col-sm-12 col-md-6 mb-5">

          <div class="card">
            <div class="card-header tituloCardHeader bg-dark">
              <div class="row">
                <div class="col-md-10">
                  <h3 class="estilo text-left">Botellas</h3>
                </div>
                <div class="col-md-2 "><button class="text-center btn-outline-light btn-sm btn " data-toggle="tooltip"
                    data-placement="top" title="Agregar Botella(s)" v-on:click="openModalBottles()"><img :src="require('@/assets/bottle.png')"
                      alt=""></button></div>
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
                    <td>{{bottle.quantitySaled}}</td>
                    <td>{{bottle.price}}</td>
                    <td><button class="btn btn-danger btn-sm" v-on:click="deleteBottle(bottle.idDelete)"><i class="material-icons">delete</i></button></td>
                  </tr>
                </tbody>
              </table>

              <div class="row">
                <div class="col-md-12">
                  <h3 class="text-center precios">Total: {{totalBottles}}</h3>

                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
      <div class="row mb-5">
        <div class="col-6 col-sm-12 col-md-6">
          <div class="card">
            <div class="card-header tituloCardHeader bg-dark">
              <h3 class="estilo text-left">Pintas</h3>
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
                  <tr v-for="pint in pints">
                    <td>{{pint.beer}}</td>
                    <td>{{pint.brewery}}</td>
                    <td>{{pint.quantity}}</td>
                    <td>{{pint.price}}</td>
                    <td><button class="btn btn-danger btn-sm" v-on:click="deletePint(pint.idDelete)"><i class="material-icons">delete</i></button></td>
                  </tr>
                </tbody>
              </table>
              <h3 class="text-center precios">Total: {{totalPints}}</h3>
            </div>

          </div>

        </div>
        <div class="col-6 col-sm-12 col-md-6">
          <div class="card">
            <div class="card-header bg-dark">
              <h3 class="estilo text-left">Por cantidad</h3>
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
              <h3 class="text-center precios">Total: {{totalOthers}}</h3>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <h3 class="text-center precios">Total venta: {{totalSale}}</h3>
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

      <modal name="disconect">
        <div class="container ">
          <h3 class="mt-5">¿Desconectar Barril?</h3>
          <div id="row">
            <h3 class="">Cerveza: {{newDisconect.beer}}</h3>
            <button v-on:click="empty(newDisconect.kegid)" class="btn btn-danger">Vacio</button>
            <button v-on:click="started(newDisconect.kegid)" class="btn btn-danger">Desconectar</button>
          </div>
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
                        <td>{{bottle.stock}}</td>
                        <td>{{bottle.brewery.name}}</td>
                        <td>{{bottle.price}}</td>
                        <td><input type="number form-control" v-model="newBottle.quantitySaled" placeholder="Ingrese cantidad"></td>
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
const moment = require('moment')
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
      containers:[],
      containersStock:[],
      BottlesStock:[],
      pints:[],
      others:[],
      totalGrowlers:0,
      totalPints:0,
      totalSale:0,
      totalOthers:0,
      totalBottles:0,
      totalContainers:0,
      showModal: false,
      newOther:{},
      newBottle:{},
      newContainer:{},
      date:Date.now,
      client:"",
      prices:[],
      sizes:[],
      hhour: 0,
      newDisconect:{},
      diametro: 220

    
      

    }
  },
  created(){
     this.getKegs();
     this.getBottles();
     this.getPrices();
     this.getSizes();
     this.getContainers();
  },

  methods:{
     getKegs() {
      axios.get('http://localhost:3000/keg')
        .then(response => {
          this.kegs = response.data.Kegs
        }).catch(e => {
          console.log(e)

        })
    },
    getBottles(){
      axios.get('http://localhost:3000/bottle')
      .then(response =>{
        console.log(response)
        this.BottlesStock = response.data.bottles
      }).catch(e => {
        console.log(e)

      })
    },
     getPrices() {
      axios.get('http://localhost:3000/pricize/price')
        .then(response => {
          console.log(response)
          this.prices = response.data.Pricizes
        }).catch(e => {
          console.log(e)

        })
    },
     getSizes() {
      axios.get('http://localhost:3000/pricize/size')
        .then(response => {
          console.log(response)
          this.sizes = response.data.Sizes
        }).catch(e => {
          console.log(e)

        })
    },
    getContainers(){
      axios.get('http://localhost:3000/container')
      .then(response => {
          console.log(response)
          this.containersStock = response.data.Containers
          return true
        }).catch(e => {
          return false
          console.log(e)
        })
    },
    createGrowler(keg,litres,price){

      if(keg.quantitySaled >= litres){
       
        let growler = new newGrowler(keg,litres,price,this.growlers.length)
        this.growlers.push(growler)
        this.CalculateGrowlers()
        keg.quantitySaled -= litres 
        this.notifySucces("Botellon","Botellon cargado correctamente")
      }else{
        this.notifyWarning("Cerveza","No alcanza la cerveza disponible")
      }
    },
    deleteGrowler(id){ 
        
       let growlers = this.growlers
      for (let i = 0; i < growlers.length; i++) { 
        if(growlers[i].idDelete === id){
          let keg = this.kegs.find(keg => keg._id === growlers[i].keg)
          keg.quantitySaled  +=  growlers[i].quantity 
          growlers.splice(i,1)   
          this.notifySucces("Botellon","Botellon eliminado correctamente")       
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
    CalculateContainer(){ 
        this.totalContainers = 0
        this.totalSale = 0
        for (let i = 0; i < this.containers.length; i++) { 
        this.totalContainers += Number(this.containers[i].price) 
        }
        this.calculateTotal()
    },

    createPint(keg,litres,price){
      if(keg.quantitySaled >= litres){
      let pint = new newPint(keg,litres,price,this.pints.length)
      this.pints.push(pint)
      this.CalculatePints()
      keg.quantitySaled -= litres
      this.notifySucces("Pinta","Pinta cargada correctamente")
      }else{
        this.notifyWarning("Cerveza","No alcanza la cerveza disponible")
      }
    },
    happyhour(keg,litres,price){
      this.hhour++
      if(keg.quantitySaled >= litres){
      let pint = new newPint(keg,litres,price/2,this.pints.length)
      this.pints.push(pint)
      this.CalculatePints()
      keg.quantitySaled -= litres
      this.notifySucces("Pinta","Pinta cargada correctamente")}
      else{
        this.notifyWarning("Cerveza","No alcanza la cerveza disponible")
      }
    },
    deletePint(id){ 
      let pints = this.pints

      for (let i = 0; i < pints.length; i++) { 
        
        if(pints[i].idDelete === id){
          let keg = this.kegs.find(keg => keg._id === pints[i].keg)
          keg.quantitySaled  +=  pints[i].quantity
          let price = this.prices.find(price => price.hhourprice/2 === pints[i].price) 
          if(price){
            this.hhour--
          }
          pints.splice(i,1)
          this.notifySucces("Pinta","Pinta eliminada correctamente")
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
  openModalDisconect(keg){
    this.$modal.show('disconect');
    this.newDisconect.kegid = keg._id
    this.newDisconect.beer = keg.beer
    this.newDisconect.brewery = keg.brewery.name
    this.newDisconect.quantity = keg.quantity
    this.newDisconect.quantitySaled = keg.quantitySaled
    

  },
  createBottle(bottle){
    if(bottle.stock >= this.newBottle.quantitySaled && this.newBottle.quantitySaled > 0  ){
    bottle.stock -= Number(this.newBottle.quantitySaled)
    this.newBottle._id = bottle._id
    this.newBottle.price =  (bottle.price * this.newBottle.quantitySaled)
    this.newBottle.unitPrice = bottle.price
    this.newBottle.idDelete = this.bottles.length
    this.newBottle.beer = bottle.beer
    this.newBottle.brewery = bottle.brewery.name
    this.bottles.push(this.newBottle)
    this.CalculateBottle() 
    this.newBottle = {}
    this.notifySucces("Botella","Botella cargada correctamente")
    }else{
      if( this.newBottle.quantitySaled <= 0)
        this.notifyWarning("Botellas","La cantidad no puede ser 0")
      else
        this.notifyWarning("Botellas","No hay suficiente stock ")
    }
  },
  createContainer(container,quantitySaled,size,price){
    this.newContainer.quantitySaled=quantitySaled
    if(container.stock >= this.newContainer.quantitySaled && this.newContainer.quantitySaled > 0  ){
    container.stock -= Number(this.newContainer.quantitySaled)
    this.newContainer._id = container._id
    this.newContainer.price =  (price * this.newContainer.quantitySaled)
    this.newContainer.idDelete = this.containers.length
    this.newContainer.size = size
    this.newContainer.unitPrice = container.cost
    this.containers.push(this.newContainer)
    this.CalculateContainer() 
    this.newContainer = {}
    this.notifySucces("Envase","Envase cargado correctamente")
    }else{
      if( this.newContainer.quantitySaled <= 0)
        this.notifyWarning("Envases","La cantidad no puede ser 0")
      else
        this.notifyWarning("Envases","No hay suficiente stock ")
    }
  },
  deleteBottle(id){ 
      let bottles = this.bottles
      for (let i = 0; i < bottles.length; i++) { 
        if(bottles[i].idDelete === id){            
            let bottle = this.BottlesStock.find(bottle => bottle._id === bottles[i]._id)
            bottle.stock += Number(bottles[i].quantitySaled)
            bottles.splice(i,1)
            this.notifySucces("Botella","Bottela eliminada correctamente")
        }
      }
      this.CalculateBottle()
    },
    deleteContainer(id){ 
      let containers = this.containers
      for (let i = 0; i < containers.length; i++) { 
        if(containers[i].idDelete === id){            
            let container = this.containersStock.find(container => container._id === containers[i]._id)
            container.stock += Number(containers[i].quantitySaled)
            containers.splice(i,1)
            this.notifySucces("Envases","Envase eliminado correctamente")
        }
      }
      this.CalculateContainer()
    },
   deleteOther(id){ 
       let others = this.others
      for (let i = 0; i < others.length; i++) { 
        if(others[i].idDelete === id){
            let keg = this.kegs.find(keg => keg._id === others[i].keg)
            keg.quantitySaled  +=  Number(others[i].quantity) 
            others.splice(i,1)
            this.notifySucces("Otro","Otro eliminado correctamente")
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
      this.notifySucces("Otro","Otro cargado correctamente")
    }else{
       this.notifyWarning("Cerveza","No alcanza la cerveza disponible")
    }
  },
  calculateTotal(){
    this.totalSale = (this.totalPints + this.totalGrowlers + this.totalOthers + this.totalBottles + this.totalContainers)
  },
  sendSale(){
    axios.post(`http://localhost:3000/sale`,{
      date: this.date,
      client: this.client,
      totalSale: this.totalSale,
      growlers: this.growlers,
      bottles : this.bottles,
      others: this.others,
      containers: this.containers,
      pints: this.pints,
    }).then(res =>{
      console.log(res)
      this.reset()
      if(res.status === 200)
        this.notifySucces("Venta","Venta procesada correctamente")
     
    }).catch(e => {
      console.log(e)
      this.notifyError("Venta","Erorr al procesar la venta")

    })
    
  },
  reset(){
      this.others = []
      this.growlers =[]
      this.bottles =[]
      this.pints =[]
      this.containers=[]
      this.totalSale = 0
      this.totalOthers  = 0
      this.totalBottles = 0
      this.totalGrowlers = 0
      this.totalPints = 0
      this.totalContainers = 0
      this.client = ""
      this.date = ""
  },
  notifyWarning(title,text){
   Vue.notify({
                group: 'foo',
                type: 'warn',
                title: title,
                text: text
              })
},
notifySucces(title,text){
   Vue.notify({
                group: 'foo',
                type: 'success',
                title: title,
                text: text
              })
},
notifyError(title,text){
   Vue.notify({
                group: 'foo',
                type: 'error',
                title: title,
                text: text
              })
},
started(idKeg){
    this.newDisconect={}
     axios.put(`http://localhost:3000/keg/started/${idKeg}` )
     .then(res => {
       console.log(res)
       this.getKegs();
     })
     this.newDisconect={}
     this.$modal.hide('disconect');
  },
 empty(idKeg){
    
     axios.put(`http://localhost:3000/keg/empty/${idKeg}` )
     .then(res => {
       console.log(res)
       this.getKegs();
     })
     this.newDisconect={}
     this.$modal.hide('disconect');
  }
},

 computed: {
    isDisabled () {
      if ( this.hhour % 2 == 0) {
        return false;
      } else {
        return true;
      }
    }
  },

  components: {
    RadialProgressBar,

  }

}

  </script>

<style>

#canillas img{
  position: relative;
  float: right;
}
#canillas img .left{
  position: relative;
  float: left;
}
#canillas h1 {
  font-size:40px;
  font-family: 'Black Ops One', cursive;
}
span{
  font-size:12px !important;
  font-family: 'Black Ops One', cursive;
}
.estilo{
  font-size:30px;
  font-family: 'Squada One', cursive;
}
.venta h3 span{
  font-size: 18px !important;
  letter-spacing: 1px;
  font-family: 'Squada One', cursive;
  background-image: linear-gradient(to left,#343a40,black);
}

.precios{
  font-size: 28px;
  font-family: 'Squada One', cursive;
  color:black;
}
input[type="text"], textarea {

  background-color : #fff; 

}

</style>
