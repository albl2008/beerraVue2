<template>
<div>
      <div id="pricize">
          <center><h1>PRECIOS Y TAMAÑOS</h1></center>
          <img :src="require('@/assets/sections/pricize.png')" alt="">
          
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
const axios = require('axios')


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
  methods: {
    getPricizes() {
      axios({
        url:'http://localhost:3000/pricize/price',
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
        url:'http://localhost:3000/pricize/size',
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
          url:`http://localhost:3000/pricize/price/${idPricize}`,
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
          url:`http://localhost:3000/pricize/size/${idSize}`,
          headers: {authorization: `Bearer ${localStorage.token}`}
          })
        .then(res => {
          
          this.pricize = new newPricize(res.data.pricize._id,res.data.pricize.growlersize, res.data.pricize.growlersize2,
            res.data.pricize.pintsize, res.data.pricize.pintsize2
          )
          
        })
    },
    addPricize(){
     
      if(this.editprice === false){

      axios({
        method:'POST',
        url:'http://localhost:3000/pricize/price',
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
          url:`http://localhost:3000/pricize/price/${this.newPricize.id}`,
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
      
          
         
  },
  addSize(){
     
      if(this.editsize === false){

      axios({
        method:'POST',
        url:'http://localhost:3000/pricize/size',
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
          url:`http://localhost:3000/pricize/size/${this.newSize.id}`,
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
      
          
         
  },
   updatePricize(idPricize) {
      axios({
        
        url:`http://localhost:3000/pricize/price/${idPricize}`,
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
        url:`http://localhost:3000/pricize/size/${idSize}`,
        headers: {authorization: `Bearer ${localStorage.token}`}
        })
        .then(res => {
  
          this.newSize = new newSize(res.data.size._id,res.data.size.growlersize, res.data.size.growlersize2,
          res.data.size.pintsize, res.data.size.pintsize2
          )
          this.editsize = true;
        })
    },
  },

}
</script>
<style>
#pricize img{
  position: relative;
  float: right;
}
#pricize img .left{
  position: relative;
  float: left;
}
#pricize h1 {
  font-size:40px;
  font-family: 'Black Ops One', cursive;
}
h3{
  font-size: 28px;
  font-family: 'Squada One', cursive;
  color:white;
}
p{
  font-family: 'Squada One', cursive;
  color: white;
}
.seleccione{
    font-size:20px;
}
th{
   font-family:'Courier New', Courier;
}
td{
  font-family:'Courier New', Courier;
}

input[type="text"], textarea {
  
  background-color : #beb9b9; 

}
</style>
