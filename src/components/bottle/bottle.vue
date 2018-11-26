<template>
<div>
 <div id="barriles">
          <h1>BOTELLAS</h1>
          <img :src="require('@/assets/botellas.png')" alt="">
          <img class="left" :src="require('@/assets/botellas.png')" alt="">
 </div>   
    <div class="container">
      <div class="row">
        <div class="col-12 col-sm-12  col-md-3">
          <div class="card bg-dark">
            <div class="card-header">
              <template v-if="edit === false">
                   <div class="card-header"><h3>AGREGAR BOTELLA(S)</h3></div>
              </template>
                <template v-else>
                  <div class="card-header"><h3>ACTUALIZAR BOTELLA(S)</h3></div>
              </template>

            </div>  
            <div class="card-body">
                           <form v-on:submit.prevent="addBottle" >

          <div class="input-group-pretend mb-3">
            <input type="text" class="form-control mb-1" v-model="newBottle.beer" placeholder="Beer" required>
            <input type="text" class="form-control mb-1" v-model="newBottle.stock" placeholder="Stock" required>  
            <input type="text" class="form-control mb-1" v-model="newBottle.size" placeholder="Tamaño" required>
            <input type="text" class="form-control mb-1" v-model="newBottle.price" placeholder="Precio" required>
            <input type="text" class="form-control mb-1" v-model="newBottle.ibu" placeholder="IBU" required>
            <input type="text" class="form-control mb-1" v-model="newBottle.alcohol" placeholder="Alcohol" required>
            <select v-model="newBottle.brewery" class="custom-select mb-1" required>
              <option value="" disabled hidden>Brewery</option>
              <option v-for="brewery in breweries" v-bind:value="brewery._id">
                {{ brewery.name }}
              </option>
            </select>
          </div>
            <template v-if="edit === false">
                <button class="btn btn-outline-success btn-block">AGREGAR</button>
            </template>
            <template v-else>
                <button class="btn btn-outline-primary btn-block" >ACTUALIZAR</button>
            </template>

        </form>
            </div>
          </div>

      </div>
          <div class="col-12 col-sm-12 col-md-9">
            <div class="card">
              <div class="card-header">
                <h3 class="list">BOTELLAS</h3>
              </div>
              <div class="card-body">
                <table class="table ">
              <thead>
              <th>Cerveza</th>
              <th>Stock</th>
              <th>Size</th>
              <th>IBU</th>
              <th>alcohol</th>
              <th>brewery</th>
              <th>Precio</th>
              <th>Eliminar</th>
              <th>Editar</th>
              </thead>
              <tbody>
                <tr v-for="bottle in bottles" >
                  <td>{{bottle.beer}}</td>
                  <td>{{bottle.stock}}</td>
                  <td>{{bottle.size}}</td>
                  <td>{{bottle.ibu}}</td>
                  <td>{{bottle.alcohol}}</td>
                  <td>{{bottle.brewery.name}}</td>
                  <td>{{bottle.price}}</td>
                  <td><button class="btn btn-outline-danger btn-sm" v-on:click="deleteBottle(bottle._id)"><i class="material-icons">delete</i></button></td>
                  <td><button class="btn btn-outline-primary btn-sm" v-on:click="updateBottle(bottle._id)"><i class="material-icons">edit</i></button></td>
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

class newBottle{
      constructor(id,beer,stock,size,ibu,alcohol,brewery,price){
        this.id = id
        this.beer = beer
        this.stock = stock
        this.size = size
        this.price = price
        this.ibu = ibu
        this.alcohol = alcohol
        this.brewery = brewery

      }
}

export default {
  data(){
    return{
      newBottle:{},
      bottles:[],
      breweries:[],
      quantities:[
        {text: '20'},
        {text: '30'},
        {text: '50'}
      ],
     
      edit: false,
      bottleToEdit:'',



    }
  },
  created(){
        this.getBottles();
        this.getBreweries();
    },
   methods:{
     getBottles(){
    axios.get('http://localhost:3000/bottle')
      .then(response =>{
        console.log(response)
        this.bottles = response.data.bottles

      }).catch(e => {
        console.log(e)

      })
    },
    addBottle(){

      if(this.edit === false ){

      axios.post('http://localhost:3000/bottle',
        this.newBottle,
      ).then(res =>{

        if(res.status === 200 ){
         Vue.notify({
          group: 'foo',
          type:'success',
          title: 'Contacto',
          text: res.data.mensaje
        })
      }
      this.getBottles(),
      this.newBottle = {}
     })
      .catch(e => {
        Vue.notify({
        group: 'foo',
        type:'error',
        title: 'Barril',
        text: `Error al guardar barril ${e}`
      })
      })
      }else{
        axios.put(`http://localhost:3000/bottle/${this.newBottle.id}`,
          this.newBottle
        ).then(res => {
           if(res.status === 200 ){
            Vue.notify({
              group: 'foo',
              type:'success',
              title: 'Barril',
              text: res.data.mensaje
            })
          this.getBottles()
          this.newBottle = {}
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
      }
    },
    getBreweries(){
      axios.get('http://localhost:3000/brewery')
      .then(response =>{
        this.breweries = response.data.Breweries
        console.log(response);
      })
    },
    deleteBottle(idBottle){
      axios.delete(`http://localhost:3000/bottle/${idBottle}`)
      .then(res =>
      {
         if(res.status === 200 ){
            Vue.notify({
              group: 'foo',
              type:'success',
              title: 'Barril',
              text: res.data.mensaje
            })
        console.log(res)
        this.getBottles()
         }
        }).catch(e =>{
          Vue.notify({
          group: 'foo',
          type:'error',
          title: 'Barril',
          text: `Error al eliminar el barril ${e}`
        })
      })
    },
    updateBottle(idBottle){
      axios.get(`http://localhost:3000/bottle/${idBottle}`)
      .then(res => {
        console.log(res)
        this.newBottle = new newBottle  (res.data.bottle._id,res.data.bottle.beer,
        res.data.bottle.stock,res.data.bottle.size,res.data.bottle.ibu,
        res.data.bottle.alcohol, res.data.bottle.brewery,res.data.bottle.price
        )
          this.edit = true;
      })
    }
   },

}
</script>
<style>
#botellas img{
  position: relative;
  float: right;
}
#botellas img .left{
  position: relative;
  float: left;
}
#botellas h1 {
  font-size:40px;
  font-family: 'Black Ops One', cursive;
}

h3 {
  font-size:22px;
  font-family: 'Varela Round', sans-serif;
  color:white;
}


td{
  font-family: 'Courier New', Courier;
  color: black;
  font-size:12px;
}
th{
  font-family: 'Courier New', Courier;
  color: black;
  font-size:12px;
}

::-webkit-input-placeholder { /* Chrome/Opera/Safari */
  font-family:'Courier New', Courier;
  color: black;
}
::-moz-placeholder { /* Firefox 19+ */
  font-family:'Courier New', Courier;
  color: black;
}

div select option .custom-select {
    background-color: #beb9b9 !important; 
    color: #fff;
    text-shadow: 0 1px 0 rgba(0, 0, 0, 0.4);
}
.courier{
  font-family:'Courier New', Courier;
  color: white;
  font-size: 14px;
}
.list{
  color:black;
}

input[type="text"], textarea {

  background-color : #beb9b9; 

}
</style>
