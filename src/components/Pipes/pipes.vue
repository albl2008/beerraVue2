<template>

  <div>
    <div id="canillas">
     <div class="row" style="width: 50%; margin: 0 auto;"><div class="centerhead">
        <h1 class="h1head">Canillas</h1>
        </div>
        <img :src="require('@/assets/beerra/canillas.png')" alt class="underh1">
        
      </div>
     
     <h3 class="text-center badge badge-dark precios total">$ <span style="font-size: 34px;">{{totalSale}}</span> </h3>
     
    </div>
    
    

    <div class="container">
      <div class="row mb-5">
         <h1 class="barrilesConnected badge badge-dark">Barriles conectados</h1>
        <template >
          <div class="text-center col-md-12"> <img v-if="!timeout" height="90px" width="90px" src="../../assets/load.svg" ></div>
         
               <carousel-3d v-if="timeout" ref="mycarousel" :display="7" :controls-prev-html="'&#10092;'" :controls-next-html="'&#10093;'" :controlsVisible="true" :height="354" :width="260" :count="kegs.lenght">
                 
              <slide v-for="(keg, i) in  kegs" :index="i" :key="keg._id">
                
              <div class="card sliderCard">
                <div class="card-header tituloCardHeader bg-dark" style="height:">
                  <div class="row">
                    <h3 class="text-center col-md-10 estilo nowrap">{{keg.beer}}</h3>
                    <button v-on:click="openModalDisconect(keg)" class="btn btn-outline-danger btn-sm" data-toggle="tooltip"
                      data-placement="top" title="Desconectar Barril" style=""><i class="material-icons power">power_off</i></button>
                  </div>

                </div>
                <div class="card-body text-center">
                  <radial-progress-bar :diameter="diametro" :startColor="'#FDC02F'" :stopColor="'#FA9628'" :completed-steps="keg.quantitySaled"
                    :total-steps="keg.quantity" class="">
                    <p><span class="badge badge-warning badgeGradient tamano nowrap" style="max-width: 150px;">{{ keg.brewery.name }}</span></p>
                    <p><span class="badge badge-dark">{{ keg.quantity }} <span class="litros">l</span></span></p>
                    <template v-if="keg.quantitySaled<=15">
                      <p><span class="badge badge-danger">{{ keg.quantitySaled }} <span class="litros">l</span></span></p>
                    </template>
                    <template v-else>
                      <p><span class="badge badge-success">{{ keg.quantitySaled }} <span class="litros">l</span></span></p>
                    </template>
                  </radial-progress-bar>
                </div>
                <div class="mb-1 text-center">
                 
                      <button :class="{ disabled: isDisabled }" :disabled="isDisabled" class="btn btn-light btn-sm add"
                        v-on:click="createGrowler(keg,sizes[0].growlersize,prices[0].loadprice)" data-toggle="tooltip"
                        data-placement="top" title="Carga Grande"><img :src="require('@/assets/growlerlleno.png')" alt="carga"></button>
                      <button :class="{ disabled: isDisabled }" :disabled="isDisabled" class="btn btn-light btn-sm add"
                        v-on:click="createGrowler(keg,sizes[0].growlersize2,prices[0].loadprice2)" data-toggle="tooltip"
                        data-placement="top" title="Carga Chica"><img :src="require('@/assets/growler1l.png')" alt=""></button>
                      <button :class="{ disabled: isDisabled }" :disabled="isDisabled" class="btn btn-light btn-sm add"
                        v-on:click="createPint(keg,sizes[0].pintsize,prices[0].pintprice)" data-toggle="tooltip" data-placement="top"
                        title="Pinta"><img :src="require('@/assets/pinta.png')" alt=""></button>
                      <button class="btn btn-light btn-sm add" v-on:click="happyhour(keg,sizes[0].pintsize,prices[0].hhourprice)"
                        data-toggle="tooltip" data-placement="top" title="Happy Hour"><img :src="require('@/assets/hhour.png')"
                          alt=""></button>
                      <button :class="{ disabled: isDisabled }" :disabled="isDisabled" class="btn btn-light btn-sm add"
                        v-on:click="createOther(keg)" data-toggle="tooltip" data-placement="top" title="Por cantidad"><img
                          :src="require('@/assets/other.png')" alt=""></button>
                </div>
              </div>
             
            </slide>
             
 </carousel-3d>

        </template>
      </div>   
          
        
      </div>
      
<div class="container">
      <div class="row mb-2">
        <div class="col-6 col-sm-12 col-md-6">
          <div class="card tabla">
            <div class="card-header tituloCardHeader bg-dark">
              <div class="row">
                <div class="col-md-9 text-center ">
                  <h3 class="estilo text-left tablaHead">Botellones</h3>
                </div>

               

                
                  <template v-for="container in containersStock">
                   <template v-if="container.size === sizes[0].growlersize" >  
                            
                        <button style="margin-left: 2.8em;"class="btn-light btn-sm btn add" data-toggle="tooltip"
                          data-placement="top" title="Envase Vacio Grande" v-on:click="createContainer(container,1,sizes[0].growlersize,prices[0].growlerprice)"><img
                            :src="require('@/assets/cargaG.png')" alt=""></button>
                    </template>
                     
                    <template  v-else >

                      <button style="margin-left: 4px;" class="btn-light btn-sm btn md-2 add" data-toggle="tooltip"
                        data-placement="top" title="Envase Vacio Pequeño" v-on:click="createContainer(container,1,sizes[0].growlersize2,prices[0].growlerprice2)"><img
                          :src="require('@/assets/cargas.png')" alt=""></button>
                          
                    </template>
                   
                  </template>
                
                

              </div>
            </div>
            <div class="card-body bodyMob">
              <table class="table s">
                <thead>
                  <th class="wrapMobile">Cerveza</th>
                  <th class="wrapMobile">Cerveceria</th>
                  <th class="wrapMobile">Cantidad</th>
                  <th class="wrapMobile">Precio</th>
                  <th class="wrapMobile">Eliminar</th>
                </thead>
                <tbody>
                  <tr class="trHigh" v-for="growler in growlers">
                    <td class="nowrap wrapMobile" style="max-width: 65px;">{{growler.beer}}</td>
                    <td class="nowrap wrapMobile" style="max-width: 65px;">{{growler.brewery}}</td>
                    <td class="nowrap wrapMobile" style="max-width: 65px;">{{growler.quantity}} <span class="litros">l</span></td>
                    <td class="nowrap wrapMobile" style="max-width: 65px;">$ {{growler.price}}</td>
                    <td class="nowrap wrapMobile" style="max-width: 65px;"><button class="btn btn-outline-danger btn-sm fix disableBorder" v-on:click="deleteGrowler(growler.idDelete)"><i class="material-icons resize">clear</i></button></td>
                  </tr>
                </tbody>
              </table>
              <h3 class="text-center badge badge-dark precios">Total: $ {{totalGrowlers}}</h3>
              <table class="table s">
                <thead>
                  <th class="wrapMobile">Tamaño</th>
                  <th class="wrapMobile">Cantidad</th>
                  <th class="wrapMobile">Precio</th>
                  <th class="wrapMobile">Eliminar</th>
                </thead>
                <tbody>
                  <tr class="trHigh" v-for="container in containers">
                    <td>{{container.size}} <span class="litros">l</span></td>
                    <td>{{container.quantitySaled}}</td>
                    <td>$ {{container.price}}</td>
                    <td style="width: 20%;"><button class="btn btn-outline-danger btn-sm  fix disableBorder" style="margin: 0 auto; margin-left:10px;" v-on:click="deleteContainer(container.idDelete)"><i style="" class="material-icons resize">clear</i></button></td>
                  </tr>
                </tbody>
              </table>
              <h3 class="text-center badge badge-dark precios">Envases: $ {{totalContainers}}</h3>

            </div>
          </div>
        </div>

        <div class="col-6 col-sm-12 col-md-6 mb-5">

          <div class="card tabla ">
            <div class="card-header tituloCardHeader bg-dark">
              <div class="row">
                <div class="col-md-10">
                  <h3 class="estilo text-left tablaHead">Botellas</h3>
                </div>
                <div class="col-md-2 "><button class="text-center btn-light btn-sm btn add " data-toggle="tooltip"
                    data-placement="top" title="Agregar Botella(s)" v-on:click="openModalBottles()"><img :src="require('@/assets/bottle.png')"
                      alt=""></button></div>
              </div>
            </div>
            <div class="card-body">
              <table class="table s">
                <thead>
                  <th class="wrapMobile">Cerveza</th>
                  <th class="wrapMobile">Cerveceria</th>
                  <th class="wrapMobile">Cantidad</th>
                  <th class="wrapMobile">Precio</th>
                  <th class="wrapMobile">Eliminar</th>
                </thead>
                <tbody>
                  <tr class="trHigh" v-for="bottle in bottles">
                    <td class="nowrap" style="max-width: 100px;">{{bottle.beer}}</td>
                    <td class="nowrap" style="max-width: 100px;">{{bottle.brewery}}</td>
                    <td class="nowrap wrapMobile" style="max-width: 65px;">{{bottle.quantitySaled}} <span class="litros">l</span></td>
                    <td class="nowrap wrapMobile" style="max-width: 65px;">$ {{bottle.price}}</td>
                    <td><button class="btn btn-outline-danger btn-sm fix disableBorder" v-on:click="deleteBottle(bottle.idDelete)"><i class="material-icons resize">clear</i></button></td>
                  </tr>
                </tbody>
              </table>

              <div class="row">
                <div class="col-md-12">
                  <h3 class="text-center badge badge-dark precios">Total: $ {{totalBottles}}</h3>

                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
      </div>
      <div class="container">
      <div class="row mb-5">
        <div class="col-6 col-sm-12 col-md-6">
          <div class="card tabla">
            <div class="card-header tituloCardHeader bg-dark">
              <h3 class="estilo text-left tablaHead">Pintas</h3>
            </div>
            <div class="card-body">
              <table class="table s">
                <thead>
                  <th class="wrapMobile">Cerveza</th>
                  <th class="wrapMobile">Cerveceria</th>
                  <th class="wrapMobile">Cantidad</th>
                  <th class="wrapMobile">Precio</th>
                  <th class="wrapMobile">Eliminar</th>

                </thead>
                <tbody>
                  <tr class="trHigh" v-for="pint in pints" :key="pint._id">
                    <td class="nowrap" style="max-width: 65px;">{{pint.beer}}</td>
                    <td class="nowrap" style="max-width: 65px;">{{pint.brewery}}</td>
                    <td class="nowrap wrapMobile" style="max-width: 65px;">{{pint.quantity}} <span class="litros">l</span></td>
                    <td class="nowrap wrapMobile" style="max-width: 65px;">$ {{pint.price}}</td>
                    <td class="nowrap wrapMobile" style="max-width: 65px;"><button class="btn btn-outline-danger btn-sm fix disableBorder" v-on:click="deletePint(pint.idDelete)"><i class="material-icons resize">clear</i></button></td>
                  </tr>
                </tbody>
              </table>
              <h3 class="text-center badge badge-dark precios">Total: $ {{totalPints}}</h3>
            </div>

          </div>

        </div>
        <div class="col-6 col-sm-12 col-md-6">
          <div class="card tabla">
            <div class="card-header bg-dark">
              <h3 class="estilo text-left tablaHead">Por cantidad</h3>
            </div>
            <div class="card-body">
              <table class="table s">
                <thead>
                  <th class="wrapMobile">Cerveza</th>
                  <th class="wrapMobile">Cerveceria</th>
                  <th class="wrapMobile">Cantidad</th>
                  <th class="wrapMobile">Precio</th>
                  <th class="wrapMobile">Eliminar</th>

                </thead>
                <tbody>
                  <tr class="trHigh" v-for="other in others">
                    <td class="nowrap wrapMobile" style="max-width: 65px;">{{other.beer}}</td>
                    <td class="nowrap wrapMobile" style="max-width: 65px;">{{other.brewery}}</td>
                    <td class="nowrap wrapMobile" style="max-width: 65px;">{{other.quantity}} <span class="litros">l</span></td>
                    <td class="nowrap wrapMobile" style="max-width: 65px;">$ {{other.price}}</td>
                    <td class="nowrap wrapMobile" style="max-width: 65px;"><button class="btn btn-outline-danger btn-sm fix disableBorder" v-on:click="deleteOther(other.idDelete)"><i class="material-icons resize">clear</i></button></td>
                  </tr>
                </tbody>
              </table>
              <h3 class="text-center badge badge-dark precios">Total: $ {{totalOthers}}</h3>
            </div>
          </div>
        </div>
      </div>
      </div>
       <div class="container">
      <div class="row" style="margin-bottom: 3em; ">
        <div class="col-md-3"></div>
        <div class="col-md-6 card tabla bg-warning flex">
          <form v-on:submit.prevent="sendSale" >
         <div class="text-center form-group">
            <div class="fechacliente">
              <h3 class="tablaHead izqh3 ">Fecha</h3><h3 class="tablaHead derh3">Cliente</h3>
            <input type="date" class="form-control fecha" v-model="date" required aria-label="Small" aria-describedby="inputGroup-sizing-sm">
            
            <select v-model="client" class="custom-select cliente" required >
                  
                  <option v-for="client in clients" v-bind:value="client._id">
                    {{client.name}}
                  </option>
              </select>
            
          </div>
          </div>
             <h3 class="text-center badge badge-dark precios marginprecio">Total venta: $ {{totalSale}} </h3>
           <button class="btn btn-outline-warning procesar">Procesar venta</button>
        </form>
        </div>
        <div class="col-md-3"></div>
      </div>
      </div>
     
        
         
      
      <modal name="hello-world" height="auto">
        <div class="container bg-dark card tabla" style="background: #222 !important;" >
       
            <center>
              <h5 class="badge   tablaHead text-center porCantidad" style="
              
              
              margin-bottom: 1em;">Venta por cantidad específica</h5>
              
         </center>
          
          <form v-on:submit.prevent="hide()">
              <label>Precio</label><label style="float: right;">Cantidad<small> Litros</small></label>
            <div class="input-group-pretend mb-3">
            
              <input style="float: left; width: 48%; 
              margin-bottom: 1em !important;" type="number" class="form-control mb-1" v-model="newOther.price" placeholder="Precio" required>
              <input type="text" style="width: 48%; float: right;" class="form-control mb-1" v-model="newOther.quantity" placeholder="Cantidad" required>
            </div>
            
            <button style="width: 275px; margin-left: 25%;" class="agregarModal btn btn-outline-success ">Agregar</button>
          </form>
        </div>
      </modal>

      <modal name="disconect" 
             height="auto"> 
            
        <button class="btn btn-outline-danger posicion" style="width: 32px; z-index: 999; position: absolute;" v-on:click="cerrar()">X</button>
        <div class="container tabla card bg-dark" style="background: #222 !important;">
        
          <h3 class="tablaHead text-center" style="">¿Desconectar Barril?</h3>
          <div id="row">
             <div class="middlebar">
            <div class="brewandbeer">
            <h3 style="margin-top: 1em; margin-bottom: 0;" class="tablaHead text-center"> <span style="width: 100%;" class="badge badgeGradient badge-warning nowrap">{{this.newDisconect.beer}}</span></h3>
                     <center><span class="de">de</span></center>
            <h3 class="tablaHead text-center"><span style="width: 100%;" class="badge badgeGradient nowrap badge-warning">{{this.newDisconect.brewery}}</span></h3>
  </div>
  <h3 class=" text-center toright" style="margin-bottom: 1em;"><span style="font-size: 48px;" class="badge badge-danger modifyDanger">{{this.newDisconect.quantitySaled}} <span class="litros">l</span></span></h3>
 
           </div>
           
            <h2 class="hide">{{keg = this.newDisconect.keg}}</h2>
            
            <div class="breadcrumb bg-danger modalRedcrumb">
            <h5 class="redh5" >Recuerde: El barril pasará a vacío y solo se podra pagar al proveedor del mismo. <button v-on:click="empty(keg)" class="btn btn-outline-danger fixmodalb">Vacío</button></h5>
            
            </div>
             <div class="breadcrumb bg-success modalGreencrumb">
         
            <h5 class="greenh5">Recuerde: El barril pasará a "empezado" y se podra volver a conectar desde "Barriles" .   <button v-on:click="started(keg)" class="btn btn-outline-success">Desconectar</button></h5>
          </div>
          </div>
        </div>
        
      </modal>

      <modal name='bottles'
      height='auto'
      >
        <div class="container" style="width: 100%;">
          <div class="row">
            <div class="col-12 col-md-12">
              <div class="card" style="background: #272727;">
                <div class="card-header bg-dark">
                  <h3 class="tablaHead">Botellas</h3>
                </div>
                <div class="card-body">
                  <table class="table ">
                    <thead>
                      <th>Cerveza</th>
                      <th>Stock</th>
                      <th>Cervecería</th>
                      <th>Precio</th>
                      <th>Cantidad</th>
                    </thead>
                    <tbody>
                      <tr v-for="bottle in BottlesStock">
                        <td>{{bottle.beer}}</td>
                        <td>{{bottle.stock}}</td>
                        <td class="nowrap" style="max-width: 100px;">{{bottle.brewery.name}}</td>
                        <td>$ {{bottle.price}}</td>
                        <td ><input style="width: 100px;" type="number form-control" v-model="newBottle.quantitySaled" placeholder="Cantidad"><button class="btn btn-sm btn-outline-warning" v-on:click="createBottle(bottle)">Agregar</button></td>
                       
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
import { Carousel3d, Slide } from 'vue-carousel-3d';
import RadialProgressBar from 'vue-radial-progress'
const moment = require('moment-timezone')
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
      newDisconect:{
          keg:'',
          beer:''
      },
      diametro: 220,
      clients:[],
      keg:'',
      timeout:false

    
      

    }
  },

  created(){

     this.getKegs();
     this.getBottles();
     this.getPrices();
     this.getSizes();
     this.getContainers();
     this.getClients();
     
     
  },


  methods:{
    getClients(){
    axios({
      url:process.env.ROOT_API + 'clients',
      headers: {authorization: `Bearer ${localStorage.token}`}
    })
    .then(res=>{
      console.log(res);
      this.clients = res.data.Clients;
    })
    .catch(e =>{
      console.log(e)
    })
    },
   
     getKegs() {
       this.timeout = false
      axios({
        url:process.env.ROOT_API + 'keg/kegConnected',
        headers: {authorization: `Bearer ${localStorage.token}`}
        })
        .then(response => {
          this.kegs = response.data.Kegs
         this.timeout = true
        }).catch(e => {
          console.log(e)

        })
        
    },
    getBottles(){
      axios({
        url:process.env.ROOT_API + 'bottle',
        headers: {authorization: `Bearer ${localStorage.token}`}
      })
      .then(response =>{
        console.log(response)
        this.BottlesStock = response.data.bottles
      }).catch(e => {
        console.log(e)

      })
    },
     getPrices() {
      axios({
        url:process.env.ROOT_API + 'pricize/price',
        headers: {authorization: `Bearer ${localStorage.token}`}
      })
        .then(response => {
          console.log(response)
          this.prices = response.data.Pricizes
        }).catch(e => {
          console.log(e)

        })
    },
     getSizes() {
      axios({
        url:process.env.ROOT_API + 'pricize/size',
        headers: {authorization: `Bearer ${localStorage.token}`}
      })
        .then(response => {
          console.log(response)
          this.sizes = response.data.Sizes
        }).catch(e => {
          console.log(e)

        })
    },
    getContainers(){
      axios({url:
      process.env.ROOT_API + 'container',
      headers: {authorization: `Bearer ${localStorage.token}`}
      })
      .then(response => {
          console.log(response)
          this.containersStock = response.data.Containers
          return true
        }).catch(e => {
          return false
          console.log(e)
        })
    },
    cerrar(){
     this.newDisconect={
      keg:'',
      beer:''
     }
     this.$modal.hide('disconect');
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
   beforeOpen (event) {
    console.log(event.params.keg)
  },
  openModalDisconect(keg){
      
    this.newDisconect.keg = keg._id
    this.newDisconect.beer = keg.beer
    this.newDisconect.brewery = keg.brewery.name
    this.newDisconect.quantitySaled = keg.quantitySaled
    console.log(this.newDisconect);
    this.$modal.show('disconect');
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
    axios({
    method:'POST',
    url:process.env.ROOT_API + `sale`,
    data:{
      date: this.date,
      client: this.client,
      totalSale: this.totalSale,
      growlers: this.growlers,
      bottles : this.bottles,
      others: this.others,
      containers: this.containers,
      pints: this.pints,
    },
    headers: {authorization: `Bearer ${localStorage.token}`} 
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
    this.newDisconect={
      keg:'',
      beer:''
    }
     axios({
       method:'PUT',
       url:process.env.ROOT_API + `keg/started/${idKeg}` ,
       headers: {authorization: `Bearer ${localStorage.token}`}
     })
     .then(res => {
       console.log(res)
       this.getKegs();
     })
     
     this.$modal.hide('disconect');
  },
 empty(idKeg){
    this.newDisconect={
      keg:'',
      beer:''
    }
     axios({
      method: 'PUT',
      url:process.env.ROOT_API + `keg/empty/${idKeg}`,
      headers: {authorization: `Bearer ${localStorage.token}`}
     })
     .then(res => {
       console.log(res)
       this.getKegs();
     })
     
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
    'carousel-3d': Carousel3d,
    'slide': Slide,
    

  }

}

  </script>

<style scoped>
.posicion{
  float:right;
}
.estilo{
  font-size:30px;
  font-family: 'Squada One', cursive;
}

.precios{
  font-size: 28px;
  font-family: 'Squada One', cursive;
  color:#FD9326;
}

.add{
  border-color:#ffc107;
}
.add:hover{
  border-color:#ffc107;
  background-color: #ffc107;
}
.cliente{
  font-family: 'Roboto', sans-serif;
  font-size: 16px !important;
  margin: 0 0 0 auto !important ;
  width: 48%;
  float: right;
}

h5{
  color:white;
  font-size: 20px;
  font-family: 'Squada One', cursive;
 
}
.btn-success{
  border-color:white !important;
}
.btn-danger{
  border-color:white !important;
}
button .onh{
  
  color: white;
}

.hide{
  display:none;
}
.inline button{
  display:inline-block;
}
.inline{
  text-align: center;
}

.card-body.text-center{
  background: #242424;
}

.card.sliderCard{
  background: #242424 !important;
  height: 354px !important;
}

.mb-1.text-center{
  margin-bottom: 1em !important;
}

.text-center.col-md-10.estilo{ /* TITULO CARD SLIDER*/
  margin-top: 0.15em;
  margin-left: 1em;
  font-family: 'Impact', sans-serif !important;
    text-overflow: ellipsis;
  white-space: nowrap;
}

.card-header.tituloCardHeader.bg-dark{
  padding-bottom: 1em;
}

.btn-outline-danger{
  z-index: 999;
  margin-left: 81.6%;
  right: 0.9em;
  margin-top: 0.9em;
}

.badge-dark{

  font-size: 22px;
  border: 1px solid #616161;
  background: #2b2b2b;
}

.badge-warning{
  
  font-size: 20px;
}

.badge-success{
  font-size: 36px;
   font-family: 'Roboto', sans-serif !important;
}

.badge-danger{
  font-size: 36px;
   font-family: 'Roboto', sans-serif !important;
}

.lowBar{
  color: #ffffff;
  padding: 0.05em;
 
}
.lowBar:hover{
  color: #242424;
}

.btn.btn-light.btn-sm.add{
 background: #4b4b4b;
 border: 1px solid #616161;
}

.btn.btn-light.btn-sm.add:hover{
  background: #fff;
  color: #242424;
}

.carousel-3d-container{
  height: 430px !important;
  background: #222222 !important;
  border-radius: 0.4em;
  padding-top: 2em;
  border: 1px solid #4b4b4b;
  margin-top: 0;
  width: 97%;
}

.barrilesConnected{
  background: #222222 !important;
  font-weight: 300;
  font-size: 24px !important;
  position: absolute;
  z-index: 999;
  margin-left: 3%;
}

.card.tabla{
  background: #272727 !important;
}

.tablaHead{
  font-family: 'Roboto', sans-serif !important;
  font-size: 23px !important;
  font-weight: 800;
}

tbody tr td{
  border: none;
  font-family: 'Roboto', sans-serif;
      text-overflow: ellipsis;
  white-space: nowrap;
}

tr{
  background: #2b2b2b;
}
tr:nth-child(even) {
    background-color: #272727;
}

.fix{
  margin: 0 10px 0 10px;
}

.row.mb-5{
  margin-bottom: 0 !important;
}
.fechacliente{
  margin-top: 1em;

}
.fecha{
  float: left !important;
  width: 48%;
  font-family: 'Roboto', sans-serif;
}
.flex{
  width: 50%;
}

.izqh3{
  float: left;
}

.derh3{ width: 105%;}

.total{
  position: fixed;
  z-index: 999;
  margin-left: 50em;
  width: 10%;
  text-align: left;
  border: #FD9326 solid 1px;
  background: #222222;
}

.marginprecio{
  margin-top: 1em;
  width: 264px;
}
.procesar{
  margin-top: 0.85em;
  margin-bottom: 1.3em;
  margin-left: 1.4em;
  color: #FD9326;
  background: #1f1f1f;
  border: 1px solid #FD9326;
  /* border: none; */
  font-weight: 500;
}

.procesar:hover{
  background: #FD9326;
  color: #2b2b2b;
}

.container.tabla.card.bg-dark{
  background: none;
}

.btn-outline-success{
right: 0 !important;
margin-top: 0.7em;
}
.fixmodalb{
  margin: 0.7em 14px 0 0;
  width: 101px;
}

.de{
  color: white;
}

.toright{
  float: right;
  margin-top: 1em;
  margin-bottom: 2.1em !important;
}

.middlebar{
  margin-bottom: 2em;
  height: 50%;
}

.modifyDanger{
  border: 1px solid #616161;
  color: white;
}

@media screen and (max-width: 768px){
  html{
    width: 100%;
  }
  .container{
    width: 100%;
  }

  .col-6.col-sm-12.col-md-6{
    width: 100% !important;
    display: inline-block !important;
  }

  .col-6{
    max-width: 100% !important;
    flex: none;
  }

  .agregarModal{
    margin: 0  auto !important;
    width: 100% !important;
  }

  .porCantidad{
    text-overflow: ellipsis;
  white-space: nowrap;
  overflow:hidden;
    max-width: 200px;
  }

  .wrapMobile{
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow:hidden;
  padding-left: 0;
  max-width: 50px !important;
  }

  .text-center.badge.badge-dark.precios.marginprecio{
    margin: 0 auto !important;
    display: block;
    position: relative;
    margin-top: 3em !important;
  }

  .procesar{
    margin: 0 auto;
    display: block;
    margin-top: 0.8em;
    margin-bottom: 0.8em;
  }

  .bodyMob{
    padding-top: 2em;
  }

  .mb-5{
    margin-bottom: 0 !important;
  }

  .card{
    margin: 0 auto;
  }

  .underh1{
    display: none;
  }

  .centerhead{
    margin: 0 auto;
  }
  .redh5{
    font-size: 14px !important;
  }
  .greenh5{
    font-size: 14px !important;
  }

}

</style>
