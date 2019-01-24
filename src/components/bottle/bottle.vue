<template>
<div>
 <div id="botellas">
         <div class="row" style="width: 50%; margin: 0 auto; "><div class="centerhead">
        <h1 class="h1head">Botellas</h1>
        </div>
        <img :src="require('@/assets/beerra/bottlee2x.png')" alt class="underh1">
        
      </div>
         
 </div>   
    <div class="container" style="margin-bottom: 3em;">
      <div class="row">
        <div class="col-12 col-sm-12  col-md-3">
          <div v-if="errorMessage" class="alert alert-danger" role="alert">
            {{ errorMessage }}
          </div>
          <div class="card bg-dark">
            <div class="card-header bg-dark">
              <template v-if="edit === false && buy===false">
                  <h3 class="tablaHead">Nueva</h3>
                  
              </template>
                <template v-else-if="edit === true && buy===false">
                  <h3 class="tablaHead">Actualizar</h3>
                  <center><button class="btn btn-outline-warning btn-sm fix disableBorder yell" v-on:click="agregar()"><i class="material-icons resize">add_circle_outline</i></button></center>
                   
              </template>
              <template v-else-if="edit === false && buy===true">
                  <h3 class="tablaHead">Comprar</h3>
                  <center><button style="" class="btn btn-outline-warning btn-sm fix disableBorder yell" v-on:click="agregar()"><i class="material-icons resize">add_circle_outline</i></button></center>
                  
              </template>

            </div>
           
          
               <template v-if="edit === false && buy === false">  
                  <div class="card-body" style="background: #272727;">
                           <form v-on:submit.prevent="addBottle" >
          
          <div class="input-group-pretend mb-4">
              <label>Estilo</label>
            <input type="text" class="form-control mb-1" v-model="newBottle.beer" placeholder="" required>
              <label>Fábrica</label>
            <select v-model="newBottle.brewery" class="custom-select mb-1" required>
              <option value="" disabled hidden>Brewery</option>
              <option v-for="brewery in breweries" v-bind:value="brewery._id" v-bind:key="brewery._id">
                {{ brewery.name }}
              </option>
            </select>
              <label>Tamaño <small>Litros</small></label> 
              
            <input type="text" class="form-control mb-1" v-model="newBottle.size" placeholder="" required>
            
              <label>IBU</label>  <label style="float: right; text-align: left;">Alcohol</label>
              <div class="ibuandalco">
            <input  style="width: 48%; float: left;" type="text" class="form-control mb-1" v-model="newBottle.ibu" placeholder="" required>
            <input style="width: 48%; float: right;" type="text" class="form-control mb-1" v-model="newBottle.alcohol" placeholder="" required>
              </div>
            

          </div>
            
                <button class="btn btn-outline-success" style="width: 75px; margin-top: 2em;">Agregar</button>
            

        </form>

          </div>
        </template>
         
        <template v-if="edit=== true && buy === false">
           <div class="card-body" style="background: #272727; ">
            <form v-on:submit.prevent="addBottle" >

          <div class="input-group-pretend mb-4">
              <label>Estilo</label>
            <input type="text" class="form-control mb-1" v-model="newBottle.beer" placeholder="" required>
              <label>Fabrica</label>
            <select v-model="newBottle.brewery" class="custom-select mb-1" required>
              <option value="" disabled hidden>Brewery</option>
              <option v-for="brewery in breweries" v-bind:value="brewery._id" v-bind:key="brewery._id">
                {{ brewery.name }}
              </option>
            </select>
            <template  v-if="newBottle.price !== undefined ">
            <label>Precio de Venta</label>
            <input type="text" class="form-control mb-1" v-model="newBottle.price" placeholder="" required>
            </template>  
              <label>Stock <small>Actual</small></label><label style="float: right; text-align: left;">
                Tamaño <small>Litros</small></label>
<div class="">
            <input style="width: 48%; float: left;" type="text" class="form-control mb-1" v-model="newBottle.stock" placeholder="" disabled> 
            <input style="width: 48%; float: right;" type="text" class="form-control mb-1" v-model="newBottle.size" placeholder="" required>
</div>
            <label>IBU</label>  <label style="float: right; text-align: left;">Alcohol</label>
            <div class="">
            <input style="width: 48%; float: left;" type="text" class="form-control mb-1" v-model="newBottle.ibu" placeholder="" required>
            
            <input style="width: 48%; float: right;" type="text" class="form-control mb-1" v-model="newBottle.alcohol" placeholder="" required>
            </div>

          </div>
             <button class="btn btn-outline-primary" style="width: 85px; margin-top: 2em;">Actualizar</button>

        </form>


               
          </div>
            </template>
       
       <template v-if="edit === false && buy===true">  
          <div class="card-body" style="background: #272727;">

                        <form v-on:submit.prevent="addBottle" >

          <div class="input-group-pretend mb-4">
              <label>Estilo</label>
            <input type="text" class="form-control mb-1" v-model="newBottle.beer" placeholder="Beer" disabled>
              <label>Stock <small>Actual</small></label><label style="float: right; text-align: left;">Tamaño<small>
                Litros</small></label> 
                <div class="">
            <input  style="width: 48%; float: left;" type="text" class="form-control mb-1" v-model="newBottle.stock" placeholder="Stock" disabled> 
              
            <input style="width: 48%; float: right;" type="text" class="form-control mb-1" v-model="newBottle.size" placeholder="Tamaño" disabled>
                </div>
              <label>Fábrica</label>
            <select v-model="newBottle.brewery" class="custom-select mb-1" disabled>
              <option value="" disabled hidden>Brewery</option>
              <option v-for="brewery in breweries" v-bind:value="brewery._id" v-bind:key="brewery._id">
                {{ brewery.name }}
              </option>
            </select>

              <label>Cantidad</label><label style="float: right; text-align: left;">Costo<small> Unitario</small></label>
              <div>
            <input style="width: 48%; float: left;" type="text" class="form-control mb-1" v-model="newBottleBuy.quantity" placeholder="" required>
            <input style="width: 48%; float: right;" type="text" class="form-control mb-1" v-model="newBottleBuy.unityPrice" placeholder="" required> 
              </div>
            <template v-if="newBottleBuy.quantity && newBottleBuy.unityPrice">
               <label>Total</label>
             <template v-show="edit">
               {{newBottleBuy.totalPrice = newBottleBuy.unityPrice * newBottleBuy.quantity}}
              
             </template>
            <input type="text" class="form-control mb-1" v-model="newBottleBuy.totalPrice" placeholder="Total" disabled required>
            </template>
            <label>P<small>recio Venta</small></label>   <code style="float: right; text-align: left; margin-top: 0.8em;" >Fecha: {{format(newBottleBuy.date)}}</code>   
            <div>
            <input style="width: 34%; float: left;" type="text" class="form-control mb-1" v-model="newBottle.price" placeholder="" required>
            
                      
              <input-date style="width: 62%; float: right; height: 33px" v-model="newBottleBuy.date"></input-date>
          </div></div>
          </br>
                <button class="btn btn-outline-primary" style="width: 78px; margin-top: 2em;">Comprar</button>
            

        </form>


          
          </div>
        </template>
            
          </div>
 </div>
      
          <div class="col-12 col-sm-12 col-md-9">
            <div class="card " style="background: #272727;">
              <div class="card-header bg-dark">
                <h3 class="tablaHead">Botellas</h3>
              </div>
              <div class="card-body">
                <table class="table ">
              <thead>
              <th>Fábrica</th>
              <th>Cerveza</th>
              <th>Stock</th>
              <th>Tamaño</th>
              <th>Precio</th>
            <th>Opciones<small> comprar / editar / eliminar</small></th>

              </thead>
              <tbody>
                <tr class="trHigh" v-for="bottle in bottles" v-bind:key="bottle._id" >
                  <td style="max-width: 200px; width: 200px;" class="nowrap">{{bottle.brewery.name}}</td>
                  <td style="max-width: 160px; width: 160px;" class="nowrap">{{bottle.beer}}</td>
                  <td>{{bottle.stock}}</td>
                  <td>{{bottle.size}}<span class="litros"> l</span></td>
                  <td>$ {{bottle.price}}</td>
                  <div id="options" class="opacityOut" style="width:">
                  <td><button class="btn btn-outline-primary fix disableBorder btn-sm" v-on:click="buyBottle(bottle._id)"><i class="material-icons resize">attach_money</i></button></td>
                  <td><button class="btn btn-outline-primary fix disableBorder btn-sm" v-on:click="updateBottle(bottle._id)"><i class="material-icons resize">edit</i></button></td>
                  <td><button class="btn btn-outline-danger fix disableBorder btn-sm" v-on:click="showModal(bottle._id)"><i class="material-icons resize  ">clear</i></button></td>
                  </div>
                </tr>
              </tbody>
            </table>
              </div>
            </div>            
      </div>
 </div><br>   
 <div class="row">
<div class="col-12 col-sm-12 col-md-8" style="margin-top: 1em;">
  
            <div class="card " style="background: #272727;">
              <div class="card-header bg-dark">
                <h3 class="tablaHead">Compras de Botellas</h3>
              </div>
              <div class="card-body">
                <table class="table ">
              <thead>
              <th>Fábrica</th>
              <th>Cerveza</th>
              <th>Tamaño</th>
              <th>Cantidad</th>
              <th>Costo</th>
              <th>Fecha</th>
              
              </thead>
              <tbody>
                <tr class="trHigh" v-for="bottleBuy in bottleBuys" v-bind:key="bottleBuy._id">
                  <td style="max-width: 200px; width: 200px;" class="nowrap">{{bottleBuy.bottle.brewery.name}}</td>
                  <td style="max-width: 140px; width: 140px;" class="nowrap"> {{bottleBuy.bottle.beer}}</td>
                  <td>{{bottleBuy.bottle.size}}<span class="litros"> l</span></td>
                  <td>{{bottleBuy.quantity}}</td>
                  <td>$ {{bottleBuy.unityPrice}}</td>
                  <td>{{format(bottleBuy.date)}}</td>
                 
                </tr>
              </tbody>
            </table>
              </div>
            </div>            
     
    <!-- <modal name="delete" height="auto">
       <div class="container bg-dark card tabla" style="background: rgb(34, 34, 34) !important;">
          <div class="">
              <h5 class="tablaHead">¿Esta seguro que desea eliminar el Barril?</h5>
          </div>
          
            <div class="input-group-pretend mb-3">
                  <button class="btn btn-success"  v-on:click="deleteBottle(idKeg)" >Aceptar</button>
                  <button class="btn btn-danger" v-on:click="hideModal()">Cancelar</button>
            </div>
            
        </div>
      </modal> -->
</div>
<div class="col-md-4" style="margin-top: 1em;">
  
            <div class="card " style="background: #272727;">
              <div class="card-header bg-dark">
                <h3 class="tablaHead">Información adicional</h3>
              </div>
              <div class="card-body">
                <table class="table ">
              <thead>
              <th>Fábrica</th>
              <th>Cerveza</th>
              <th>IBU</th>
              <th>Alcohol</th>
              </thead>
              <tbody>
                <tr class="trHigh" v-for="bottle in bottles" v-bind:key="bottle._id">
                  <td style="max-width: 100px; width: 100px;" class="nowrap">{{bottle.brewery.name}}</td>
                  <td style="max-width: 100px; width: 100px;" class="nowrap">{{bottle.beer}}</td>
                  <td>{{bottle.ibu}}</td>
                  <td>{{bottle.alcohol}} %</td>
                  
                 
                </tr>
              </tbody>
            </table>
              </div>
            </div>            
      

</div>
 </div>
      </div>

     <modal name="delete" height="auto">
        <div class="container card bg-dark " style="background: rgb(34, 34, 34) !important;">
          <div class="">
            <center>
              <h5 class="tablaHead" style="margin-bottom: 0.5em;">¿Está seguro que desea eliminar la botella?</h5></center>
          </div>
          
            <div class="input-group-pretend mb-3">
              <center>
                  <button class="btn btn-outline-success"  v-on:click="deleteBottle(idBottle)" >Aceptar</button>
                  <button class="btn btn-outline-danger" v-on:click="hideModal()">Cancelar</button></center>
            </div>
            
        </div>
      </modal>
 
    </div>

</template>
<script>
import Vue from 'vue'
import axios from'axios'
import moment from 'moment'
import Joi from 'joi'


Vue.component('input-date', {
  template: '\
      <input\
        type="date"\
        ref="input"\
        v-bind:value="dateToYYYYDDMM(value)"\
        v-on:input="updateValue($event.target)"\
        v-on:focus="selectAll"\
      >\
  ',
  props: {
    value: {
      type: Date,
      default: new Date()
     
    }
  },
  methods: {
    dateToYYYYDDMM(date) {
      // may have timezone caveats https://stackoverflow.com/a/29774197/1850609
      return date || date.toISOString() 
    },
    updateValue: function (target) {
      this.$emit('input', target.valueAsDate)
    },
    selectAll: function (event) {
      // Workaround for Safari bug
      // http://stackoverflow.com/questions/1269722/selecting-text-on-focus-using-jquery-not-working-in-safari-and-chrome
      setTimeout(function () {
      	event.target.select()
      }, 0)
    }
  }
});



const schema = Joi.object().keys({
  id: Joi.string(),
  bottle: Joi.string(),

  beer: Joi.string().min(2).max(20),
  size: Joi.number().positive(),
  price: Joi.number().positive(),
  stock: Joi.number().positive(),
  quantity:Joi.number().positive(),
  unityPrice: Joi.number().positive(),
  ibu: Joi.number().positive(),
  alcohol: Joi.number().positive(),
  brewery: Joi.string(),
   totalPrice: Joi.number().positive(),
   date: Joi.date(),
})

class newBottle{
      constructor(id,beer,size,ibu,alcohol,brewery,price,stock){
        this.id = id
        this.beer = beer
        this.size = size
        this.ibu = ibu
        this.alcohol = alcohol
        this.brewery = brewery
        this.price= price
        this.stock= stock
      }
}
class newBottleBuy{
      constructor(bottle){
        this.bottle = bottle
      }
}

export default {
  data(){
    return{
      idBottle:'',
      errorMessage:'',
      newBottle:{},
      bottles:[],
      breweries:[],
      quantities:[
        {text: '20'},
        {text: '30'},
        {text: '50'}
      ],
      newBottleBuy: {
        date: new Date()
      },
      bottleBuys:[],
      breweryName:[],
      edit: false,
      buy:false,
      bottleToEdit:'',



    }
  },
  watch:{
    newBottle:{
      handler(){
          this.errorMessage = ''
      },
      deep: true
    }
  },
  created(){
        this.getBottles();
        this.getBreweries();
        this.getBottleBuys();
    },
   methods:{
     getBottles(){
    axios({
      url:process.env.ROOT_API + 'bottle',
      headers: {authorization: `Bearer ${localStorage.token}`}
      })
      .then(response =>{
        console.log(response)
        this.bottles = response.data.bottles

      }).catch(e => {
        console.log(e)

      })
    },
    addBottle(){
      if(this.validBottle()){
      if(this.edit === false && this.buy===false){

      axios({
        method:'POST',
        url:process.env.ROOT_API + 'bottle',
        data: this.newBottle,
        headers: {authorization: `Bearer ${localStorage.token}`}
      }).then(res =>{

        if(res.status === 200 ){
         Vue.notify({
          group: 'foo',
          type:'success',
          title: 'Botella',
          text: res.data.message
        })
      }
      this.getBottles(),
      this.newBottle = {}
     })
      .catch(e => {
        console.log(e.response.data)
        Vue.notify({
        group: 'foo',
        type:'error',
        title: 'Barril',
        text: `Error al guardar barril ${e}`
      })
      })
      }else if(this.edit === true && this.buy===false){
        axios({
          method: 'put',
          url:process.env.ROOT_API + `bottle/${this.newBottle.id}`,
          data:this.newBottle,
          headers: {authorization: `Bearer ${localStorage.token}`}
        }).then(res => {
           if(res.status === 200 ){
            Vue.notify({
              group: 'foo',
              type:'success',
              title: 'Barril',
              text: res.data.mensaje
            })
          this.getBottles()
          this.newBottle = {}
          this.buy = false
          this.edit = false
           }
        }).catch(e =>{
          console.log(e.data)
           Vue.notify({
          group: 'foo',
          type:'error',
          title: 'Barril',
          text: `Error al actualizar el barril ${e}`
      })
        })
      }else if (this.buy === true && this.edit===false && this.validBottleBuy()){
        axios({
          method: 'POST',
          url:process.env.ROOT_API + `outflow/bottle`,
          data:{newBottleBuy:this.newBottleBuy,newPrice:this.newBottle.price},
          headers: {authorization: `Bearer ${localStorage.token}`}
        }).then(res => {
           if(res.status === 200 ){
            Vue.notify({
              group: 'foo',
              type:'success',
              title: 'Botella',
              text: res.data.message
            })
            
          this.getBottles()
          this.getBottleBuys()
          this.newBottle= {}
          this.newBottleBuy={}
          this.buy = false
          this.edit = false
           }
        }).catch(e =>{
          
         
           Vue.notify({
          group: 'foo',
          type:'error',
          title: 'Barril',
          text: `Error al actualizar el barril ${e}`
      })
        })
      
      }
      }
    },
   // getBreweryName(idBrewery){
   //   axios({
   //    url:process.env.ROOT_API + `brewery/${idBrewery}`,
   //     headers: {authorization: `Bearer ${localStorage.token}`}
   //   })
   //   .then(response =>{
   //     this.brewery = response.data.brewery
   //     this.breweryName = response.data.brewery.name
   //   })
//
   //   return this.breweryName
   // },
    getBreweries(){
      axios({
        url:process.env.ROOT_API + 'brewery',
        headers: {authorization: `Bearer ${localStorage.token}`}
      })
      .then(response =>{
        this.breweries = response.data.Breweries
        console.log(response);
      })
    },
    getBottleBuys(){
      axios({
        url:process.env.ROOT_API + 'bottle/buy',
        headers: {authorization: `Bearer ${localStorage.token}`}
      })
      .then(response =>{
        this.bottleBuys = response.data.BottleBuys
        console.log(response);
      })
    },
        showModal(idBottle){
          if(!this.edit){
      this.idBottle = idBottle
        this.$modal.show('delete');
          }else{
            this.notifyWarning("Botella","Termine de editar la botella")
          }
    },
    hideModal(){
      this.$modal.hide('delete');
    },
    deleteBottle(idBottle){
       this.$modal.hide('delete');
      axios({
        method: 'delete',
        url:process.env.ROOT_API + `bottle/${idBottle}`,
        headers: {authorization: `Bearer ${localStorage.token}`}
      })
      .then(res =>
      {
        console.log("Holaaaaa")
        
            Vue.notify({
              group: 'foo',
              type:'success',
              title: 'Barril',
              text: res.data.mensaje
            })
        console.log(res)
        this.getBottles()
         
        }).catch(e =>{
          
          Vue.notify({
          group: 'foo',
          type:'error',
          title: 'Barril',
          text: `No es posible eliminar la botella se han realizado ventas o compras.`
        })
      })
    },
    agregar(){
      this.buy=false;
      this.newBottle={};
      this.newBottleBuy={};
      this.edit=false;
    },
    updateBottle(idBottle){
     
      axios({
        url:process.env.ROOT_API + `bottle/${idBottle}`,
        headers: {authorization: `Bearer ${localStorage.token}`}
      })
      .then(res => {
        console.log(res)
        this.newBottle = new newBottle  (res.data.bottle._id,res.data.bottle.beer,
        res.data.bottle.size,res.data.bottle.ibu,
        res.data.bottle.alcohol, res.data.bottle.brewery,res.data.bottle.price,res.data.bottle.stock
        )
         
          this.edit = true;
          this.buy=false;
      })
    },
    buyBottle(idBottle){
   
      if(!this.edit){
      axios({
        url:process.env.ROOT_API + `bottle/${idBottle}`,
        headers: {authorization: `Bearer ${localStorage.token}`}
      })
       .then(res => {
        console.log(res)
        this.newBottle = new newBottle  (res.data.bottle._id,res.data.bottle.beer,res.data.bottle.size,res.data.bottle.ibu,
        res.data.bottle.alcohol, res.data.bottle.brewery,res.data.bottle.price,res.data.bottle.stock
        )
        this.newBottleBuy = new newBottleBuy (res.data.bottle._id)
      
          this.buy=true;
          this.edit=false;
      })
      }else{
          this.notifyWarning("Botella","Termine de editar la botella")
      }
    },
     validBottleBuy(){
      
            const result = Joi.validate(this.newBottleBuy,schema)
             if(result.error === null){
                
                return true
            }else{
                console.log(result.error.message)
                
                if(result.error.message.includes('beer')){
                    this.errorMessage = 'El estilo ingresado es incorrecto.'
                }
                if(result.error.message.includes('price')){
                    this.errorMessage = 'El precio ingresado es incorrecto.'
                }
                
                if(result.error.message.includes('size')){
                    this.errorMessage = 'El tamaño ingresado es incorrecto.'
                }
                 if(result.error.message.includes('ibu')){
                    this.errorMessage = 'El ibu ingresado es incorrecto.'
                }
                 if(result.error.message.includes('alcohol')){
                    this.errorMessage = 'El alcohol ingresado es incorrecto.'
                }
                if(result.error.message.includes('brewery')){
                    this.errorMessage = 'Es necesarios eleccionar una cerveceria.'
                }
               if(result.error.message.includes('unityPrice')){
                 this.errorMessage = 'El costo unitario es incorrecto.'
               }
                if(result.error.message.includes('quantity')){
                 this.errorMessage = 'La cantidad ingresada es incorrecta.'
               }
                //this.errorMessage = 
            }
           
        },
         validBottle(){
      
            const result = Joi.validate(this.newBottle,schema)
             if(result.error === null){
                
                return true
            }else{
                console.log(result.error.message)
                
                if(result.error.message.includes('beer')){
                    this.errorMessage = 'El estilo ingresado es incorrecto.'
                }
                if(result.error.message.includes('price')){
                    this.errorMessage = 'El precio ingresado es incorrecto.'
                }
                
                if(result.error.message.includes('size')){
                    this.errorMessage = 'El tamaño ingresado es incorrecto.'
                }
                 if(result.error.message.includes('ibu')){
                    this.errorMessage = 'El ibu ingresado es incorrecto.'
                }
                 if(result.error.message.includes('alcohol')){
                    this.errorMessage = 'El alcohol ingresado es incorrecto.'
                }
                if(result.error.message.includes('brewery')){
                    this.errorMessage = 'Es necesarios eleccionar una cerveceria.'
                }
                //this.errorMessage = 
            }
           
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
         format(date){
      if(date)
          return moment(date).format('DD/MM/YYYY');
      else
          return ""
  }
   },

}
</script>
<style scoped>

.yell{
  z-index: 999; position: absolute;
  background: #1f1f1f;
  top: 0.9em;
  left: 14em;
}

.yell:hover{
  background: #ffc107;
  color: #1f1f1f;
}

.card-body{
  border-radius: 0.6em;
}

</style>
