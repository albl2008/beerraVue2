<template>
    <div class="container">
      <div id="canillas">
      <center><h1>ENVASES</h1></center>
      <center><img :src="require('@/assets/sections/envases.png')" alt=""></center>
     
    </div>
      <div class="row">
        
          <div class="col-12 col-sm-12 col-md-7">
            <div class="card">
              <div class="card-header">
                <h3>Botellones</h3>
              </div>
              <div class="card-body">
                <table class="table ">
              <thead>
              <th>Tamaño</th>
              <th>Stock</th>
              <th>Costo</th>
              <th>Comprar</th>
              </thead>
              <tbody>
                <tr v-for="container in containers" >
                  <td>{{container.size}}</td>
                  <td>{{container.stock}}</td>
                  <td>{{container.cost}}</td>
                  <td><button class="btn btn-primary btn-sm" v-on:click="updateContainer(container._id)"><i class="material-icons">attach_money</i></button></td>
                </tr>
              </tbody>
            </table>
              </div>
            </div>            
      </div>
      <div class="col-12 col-sm-12  col-md-5">
          <div class="card">
            <div class="card-header">
               <h3>Compra</h3> 
            </div>  
            <div class="card-body">
  <form v-on:submit.prevent="addContainer" >

          <div class="input-group-pretend mb-3">
              
           <label>Tamaño: </label>
           <select v-model="newContainer.size">
             <option v-for="size in sizes">{{size.growlersize}}</option>
             <option v-for="size in sizes">{{size.growlersize2}}</option>
           </select>
            <input type="text" class="form-control mb-1" v-model="newContainer.stock" placeholder="Cantidad" required>  
            <input type="text" class="form-control mb-1" v-model="newContainer.cost" placeholder="Costo por Unidad" required>
          </div>
            <template v-if="edit === false">
                <button class="btn btn-primary btn-block">AGREGAR</button>
            </template>
            <template v-else>
                <button class="btn btn-primary btn-block" >COMPRAR</button>
            </template>

        </form>
            </div>
          </div>

      </div>

    </div>
    </div>

</template>
<script>
import Vue from 'vue'
const axios = require('axios')

class newContainer{
      constructor(id,size,stock,cost){
        this.id = id
        this.size = size
        this.stock = stock
        this.cost = cost
      }
}

export default {
  data(){
    return{
      newContainer:{},
      containers:[],
      edit: false,
      containerToEdit:'',
      sizes:{}



    }
  },
  created(){
        this.getContainers();
        this.getSizes();
        this.getContainerSizes();

    },
   methods:{
     getContainers(){
    axios.get('http://localhost:3000/container')
      .then(response =>{
        console.log(response)
        this.containers = response.data.Containers

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
     getContainerSizes() {
      axios.get('http://localhost:3000/pricize/size/growler')
        .then(response => {
          console.log(response)
          this.growlersize = response.data.growlersize
          this.growlersize2 = response.data.growlersize2
          let sizes = [this.growlersize,this.growlersize2]
        }).catch(e => {
          console.log(e)

        })
    },
    addContainer(){

      if(this.edit === false ){
        console.log(this.newContainer)
      axios.post('http://localhost:3000/container',
        this.newContainer,
      ).then(res =>{
           this.getContainers(),
            this.newContainer = {}
        if(res.status === 200 ){
         Vue.notify({
          group: 'foo',
          type:'success',
          title: 'Envases',
          text: res.data.mensaje
        })
      }
     
     })
      .catch(e => {
        Vue.notify({
        group: 'foo',
        type:'error',
        title: 'Envases',
        text: `Error al guardar envases ${e}`
      })
      })
      }else{
        axios.put(`http://localhost:3000/container/${this.newContainer.id}`,
          this.newContainer
        ).then(res => {
           if(res.status === 200 ){
            Vue.notify({
              group: 'foo',
              type:'success',
              title: 'Envases',
              text: res.data.mensaje
            })
          this.getContainers()
          this.newContainer = {}
          this.edit = false
           }
        }).catch(e =>{
          console.log(e.data)
           Vue.notify({
          group: 'foo',
          type:'error',
          title: 'Envases',
          text: `Error al actualizar los envases ${e}`
      })
        })
      }
    },
    updateContainer(idContainer){
      axios.get(`http://localhost:3000/container/${idContainer}`)
      .then(res => {
        console.log(res)
        this.newContainer = new newContainer  (res.data.container._id,res.data.container.size,
        res.data.container.stock,res.data.container.cost
        )
          this.edit = true;
      })
    }
   },

}
</script>
<style>

</style>
