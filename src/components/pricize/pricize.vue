<template>
<div>
      <div id="pricize">
          <center><h1>PRECIOS Y TAMAÑOS</h1></center>
          <center><img :src="require('@/assets/sections/pricize.png')" alt=""></center>
          
      </div> 
    <div class="container">
      <div class="row">
       <div class="col-12 col-sm-12 col-md-8">
            <div class="card">
              <div class="card-header bg-dark">
                   <h3>Precios Actuales</h3>
              </div>
              <div class="card-body">
              <table class="table s">
              <thead>
              <th>Carga Grande</th>
              <th>Carga Pequeña</th>
              <th>Growler Grande</th>
              <th>Growler Pequeño</th>
              <th>Pinta</th>
              <th>Media Pinta</th>
              <th>2x1 (Pintas)</th>
              <th>Editar</th>
              </thead>
              <tbody>
                <tr v-for="pricize in pricizes" :key="pricize.id">
                  <td>{{pricize.loadprice}}</td>
                  <td>{{pricize.loadprice2}}</td>
                  <td>{{pricize.growlerprice}}</td>
                  <td>{{pricize.growlerprice2}}</td>
                  <td>{{pricize.pintprice}}</td>
                  <td>{{pricize.pintprice2}}</td>
                  <td>{{pricize.hhourprice}}</td>
                  <td><button class="btn btn-outline-primary btn-block" v-on:click="updatePricize(pricize._id)"><i class="material-icons">edit</i></button></td>
                </tr>
                

              </tbody>
             
            </table>
             
              </div>
            </div>           
      </div>
      
      <div class="col-12 col-sm-12  col-md-4 ">
         <div v-if="errorMessage" class="alert alert-danger" role="alert">
            {{ errorMessage }}
          </div>
          <div class="card bg-dark">
            <div class="card-header "><h3>Precios</h3></div>
            <div class="card-body">
              <form v-on:submit.prevent="addPricize()">

                <div class="input-group-pretend">
                  <input type="text" class="form-control mb-1" v-model="newPricize.growlerprice" placeholder="Precio Growler Grande (en $)" required>
                  <input type="text" class="form-control mb-1" v-model="newPricize.growlerprice2" placeholder="Precio Growler Chico (en $)" required>
                  <input type="text" class="form-control mb-1" v-model="newPricize.pintprice" placeholder="Precio Pinta (en $)" required>
                  <input type="text" class="form-control mb-1" v-model="newPricize.pintprice2" placeholder="Precio Media Pinta (en $)" required>
                  <input type="text" class="form-control mb-1" v-model="newPricize.loadprice" placeholder="Precio Carga Grande (en $)" required>
                  <input type="text" class="form-control mb-1" v-model="newPricize.loadprice2" placeholder="Precio Carga Chica (en $)" required>
                  <input type="text" class="form-control mb-1" v-model="newPricize.hhourprice" placeholder="Precio 2x1 de pintas (en $)" required>
                </div>
                  <template v-if="existpricize === false">
                  <button class="btn btn-primary btn-block" >Agregar precios y tamaños</button>
              </template>
                <template v-else-if="editprice===true">
                  <button class="btn btn-primary btn-block" >Actualizar precios y tamaños</button>
              </template>
               <template v-else>
                  <p class="seleccione">Solo puede Editar la lista de precios existente</p>
              </template>

              
        </form>
            </div>
          </div>
      
       

    </div>
      </div>
        <div class="row">
       <div class="col-12 col-sm-12 col-md-8">
            <div class="card">
              <div class="card-header bg-dark">
                   <h3>Tamaños Actuales</h3>
              </div>
              <div class="card-body">
              <table class="table s">
              <thead>
              <th>Growler Grande</th>
              <th>Growler Pequeño</th>
              <th>Pinta</th>
              <th>Media Pinta</th>
              <th>Editar</th>
              </thead>
              <tbody>
                <tr v-for="size in sizes" :key="size.id">
                  <td>{{size.growlersize}}</td>
                  <td>{{size.growlersize2}}</td>
                  <td>{{size.pintsize}}</td>
                  <td>{{size.pintsize2}}</td>
                  <td><button class="btn btn-outline-primary " v-on:click="updateSize(size._id)"><i class="material-icons">edit</i></button></td>
                </tr>
              </tbody>
             
            </table>
             
              </div>
            </div>           
      </div>
      
      <div class="col-12 col-sm-12  col-md-4 ">
         <div v-if="errorMessage2" class="alert alert-danger" role="alert">
            {{ errorMessage2 }}
          </div>
          <div class="card bg-dark">
            <div class="card-header"><h3>Tamaños</h3></div>
            <div class="card-body">
              <form v-on:submit.prevent="addSize()">

                <div class="input-group-pretend">
                  <input type="text" class="form-control mb-1" v-model="newSize.growlersize" placeholder="Tamaño Growler Grande (en L)" required>
                  <input type="text" class="form-control mb-1" v-model="newSize.growlersize2" placeholder="Tamaño Growler Pequeño (en L)" required>
                  <input type="text" class="form-control mb-1" v-model="newSize.pintsize" placeholder="Tamaño Pinta (en L)" required>
                  <input type="text" class="form-control mb-1" v-model="newSize.pintsize2" placeholder="Tamaño Media Pinta (en L)" required>
                </div>
                  <template v-if="existsize === false">
                  <button class="btn btn-outline-primary btn-block" >Agregar tamaños</button>
              </template>
                <template v-else-if="editsize===true">
                  <button class="btn btn-outline-primary btn-block" >Actualizar tamaños</button>
              </template>
               <template v-else>
                  <p class="seleccione">Solo puede Editar la lista de tamaños existente</p>
              </template>

              
        </form>
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
    loadprice : Joi.number().positive().required(),
    loadprice2 : Joi.number().positive().required(),
    pintprice : Joi.number().positive().required(),
    pintprice2 : Joi.number().positive().required(),
    growlerprice : Joi.number().positive().required(),
    growlerprice2 : Joi.number().positive().required(),
    hhourprice : Joi.number().positive().required()
})
const schema2 = Joi.object().keys({
    id: Joi.string(),
    growlersize : Joi.number().positive().required(),
    growlersize2 : Joi.number().positive().required(),
    pintsize : Joi.number().positive().required(),
    pintsize2 : Joi.number().positive().required(),
})

class newPricize {
  constructor(id, loadprice, loadprice2, pintprice, pintprice2, growlerprice, growlerprice2, hhourprice) {
    this.id = id
    this.loadprice = loadprice
    this.loadprice2 = loadprice2
    this.pintprice = pintprice
    this.pintprice2 = pintprice2
    this.growlerprice = growlerprice
    this.growlerprice2 = growlerprice2
    this.hhourprice = hhourprice
  }
}
class newSize {
  constructor(id, growlersize, growlersize2, pintsize, pintsize2) {
    this.id = id
    this.growlersize = growlersize
    this.growlersize2 = growlersize2
    this.pintsize = pintsize
    this.pintsize2 = pintsize2
  }
}

export default {
  data() {
    return {
      errorMessage:'',
      errorMessage2:'',
      newPricize:{},
      newSize:{},
      size:[],
      sizes:[],
      pricizes:[],
      pricize:[],
      editprice: false,
      existpricize:false,
      editsize: false,
      existsize:false,

    }
  },
  created() {
    this.getPricizes();
    this.getSizes();
  },
   watch:{
    newPay:{
      handler(){
        this.errorMessage = '',
        this.errorMessage2 = ''
      },
      deep : true
    }
  },
  methods: {
    getPricizes() {
      axios({
        url:'http://157.230.157.236/pricize/price',
        headers: {authorization: `Bearer ${localStorage.token}`}        
        })
        .then(response => {
          console.log(response)
          console.log(Object.keys(this.pricizes).length)
          this.pricizes = response.data.Pricizes
          if(Object.keys(this.pricizes).length === 0){
            this.existpricize = false
          }else{
            this.existpricize = true
          }
        }).catch(e => {
          console.log(e)

        })
    },
     getSizes() {
      axios({
        url:'http://157.230.157.236/pricize/size',
        headers: {authorization: `Bearer ${localStorage.token}`}
        })
        .then(response => {
          console.log(response)
          this.sizes = response.data.Sizes
          if(Object.keys(this.sizes).length === 0){
            this.existsize = false
          }else{
            this.existsize = true
          }
        }).catch(e => {
          console.log(e)

        })
    },
    getPricize(idPricize) {
        axios({
          url:`http://157.230.157.236/pricize/price/${idPricize}`,
          headers: {authorization: `Bearer ${localStorage.token}`}
          })
        .then(res => {
          
          this.pricize = new newPricize(res.data.pricize._id,res.data.pricize.growlersize, res.data.pricize.growlersize2,
            res.data.pricize.loadprice, res.data.pricize.loadprice2, res.data.pricize.pintsize, res.data.pricize.pintsize2,
            res.data.pricize.pintprice, res.data.pricize.pintprice2, res.data.pricize.growlerprice, res.data.pricize.growlerprice2,
            res.data.pricize.hhourprice
          )
          
        })
    },
      getSize(idSize) {
        axios({
          url:`http://157.230.157.236/pricize/size/${idSize}`,
          headers: {authorization: `Bearer ${localStorage.token}`}
          })
        .then(res => {
          
          this.pricize = new newPricize(res.data.pricize._id,res.data.pricize.growlersize, res.data.pricize.growlersize2,
            res.data.pricize.pintsize, res.data.pricize.pintsize2
          )
          
        })
    },
    addPricize(){
     if(this.validPrice()){
      if(this.editprice === false){

      axios({
        method:'POST',
        url:'http://157.230.157.236/pricize/price',
        data:this.newPricize,
        headers: {authorization: `Bearer ${localStorage.token}`}
      }).then(res =>{

        if(res.status === 200 ){
         Vue.notify({
          group: 'foo',
          type:'success',
          title: 'Precios',
          text: res.data.mensaje
        })
      }
      this.getPricizes(),
      this.newPricize = {}
     })
      .catch(e => {
        Vue.notify({
        group: 'foo',
        type:'error',
        title: 'Precios',
        text: `Error al guardar precios  ${e}`
      })
      })
      }else{
        axios({
          method:'PUT',
          url:`http://157.230.157.236/pricize/price/${this.newPricize.id}`,
          data:this.newPricize,
          headers: {authorization: `Bearer ${localStorage.token}`}
        }).then(res => {
           if(res.status === 200 ){
            Vue.notify({
              group: 'foo',
              type:'success',
              title: 'Precios',
              text: res.data.mensaje
            })
          this.getPricizes()
          this.newPricize = {}
          this.editprice = false
           }
        }).catch(e =>{
          console.log(e.data)
           Vue.notify({
          group: 'foo',
          type:'error',
          title: 'Precios',
          text: `Error al actualizar precios ${e}`
      })
        })
      }
      
      }    
         
  },
  addSize(){
     if(this.validSize()){
      if(this.editsize === false){

      axios({
        method:'POST',
        url:'http://157.230.157.236/pricize/size',
        data:this.newSize,
        headers: {authorization: `Bearer ${localStorage.token}`}
      }).then(res =>{

        if(res.status === 200 ){
         Vue.notify({
          group: 'foo',
          type:'success',
          title: 'Tamaños',
          text: res.data.mensaje
        })
      }
      this.getSizes(),
      this.newSize = {}
     })
      .catch(e => {
        Vue.notify({
        group: 'foo',
        type:'error',
        title: 'Tamaños',
        text: `Error al guardar tamaños ${e}`
      })
      })
      }else{
        axios({
          method:'PUT',
          url:`http://157.230.157.236/pricize/size/${this.newSize.id}`,
          headers: {authorization: `Bearer ${localStorage.token}`},
          data:this.newSize
        }).then(res => {
           if(res.status === 200 ){
            Vue.notify({
              group: 'foo',
              type:'success',
              title: 'Tamaños',
              text: res.data.mensaje
            })
          this.getSizes()
          this.newSize = {}
          this.editsize = false
           }
        }).catch(e =>{
          console.log(e.data)
           Vue.notify({
          group: 'foo',
          type:'error',
          title: 'Tamaños',
          text: `Error al actualizar tamaños ${e}`
      })
        })
      }
      
          
     }    
  },
   updatePricize(idPricize) {
      axios({
        
        url:`http://157.230.157.236/pricize/price/${idPricize}`,
        headers: {authorization: `Bearer ${localStorage.token}`}
        })
        .then(res => {
          
          this.newPricize = new newPricize(res.data.pricize._id,
            res.data.pricize.loadprice, res.data.pricize.loadprice2,
            res.data.pricize.pintprice, res.data.pricize.pintprice2, res.data.pricize.growlerprice, res.data.pricize.growlerprice2,
            res.data.pricize.hhourprice
          )
          this.editprice = true;
        })
    },
    updateSize(idSize) {
      axios({
        url:`http://157.230.157.236/pricize/size/${idSize}`,
        headers: {authorization: `Bearer ${localStorage.token}`}
        })
        .then(res => {
  
          this.newSize = new newSize(res.data.size._id,res.data.size.growlersize, res.data.size.growlersize2,
          res.data.size.pintsize, res.data.size.pintsize2
          )
          this.editsize = true;
        })
    },
    validPrice(){
            const result = Joi.validate(this.newPricize,schema)


           if(result.error === null){
                return true
            }else{
                console.log(result.error.message)
                
                if(result.error.message.includes('loadprice')){
                    this.errorMessage = 'Ingrese un numero correctamente'
                }
                if(result.error.message.includes('loadprice2')){
                    this.errorMessage = 'Ingrese un numero correctamente'
                }
                if(result.error.message.includes('pintprice')){
                    this.errorMessage = 'Ingrese un numero correctamente'
                }
                 if(result.error.message.includes('pintprice2')){
                    this.errorMessage = 'Ingrese un numero correctamente'
                }
                 if(result.error.message.includes('hhourprice')){
                    this.errorMessage = 'Ingrese un numero correctamente'
                }
                if(result.error.message.includes('growlerprice')){
                    this.errorMessage = 'Ingrese un numero correctamente'
                }
                if(result.error.message.includes('growlerprice2')){
                    this.errorMessage = 'Ingrese un numero correctamente'
                }
                //this.errorMessage = 
            }
           
        },
         validSize(){
            const result = Joi.validate(this.newSize,schema2)


           if(result.error === null){
                return true
            }else{
                console.log(result.error.message)
                
                if(result.error.message.includes('pintsize')){
                    this.errorMessage2 = 'Ingrese un numero correctamente'
                }
                if(result.error.message.includes('pintsize2')){
                    this.errorMessage2 = 'Ingrese un numero correctamente'
                }
                if(result.error.message.includes('growlersize')){
                    this.errorMessage2 = 'Ingrese un numero correctamente'
                }
                 if(result.error.message.includes('growlersize2')){
                    this.errorMessage2 = 'Ingrese un numero correctamente'
                }
                //this.errorMessage = 
            }
           
        }
  },

}
</script>
<style>

</style>
