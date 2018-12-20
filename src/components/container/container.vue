<template>
    <div class="container">
      <div id="canillas">
      <center><h1>ENVASES</h1></center>
      <center><img :src="require('@/assets/sections/envases.png')" alt=""></center>
     
    </div>
      <div class="row">
        
          <div class="col-12 col-sm-12 col-md-4">
            <div class="card">
              <div class="card-header">
                <h3>Botellones</h3>
              </div>
              <div class="card-body">
                <table class="table ">
              <thead>
              <th>Tamaño</th>
              <th>Stock</th>
              <th>Ver Ventas</th>
              </thead>
              <tbody>
                <tr v-for="container in containers" >
                  <td>{{container.size}}</td>
                  <td>{{container.stock}}</td>
                  <td><button v-on:click="showSales(container._id)" class="btn btn-outline-danger btn-sm" data-toggle="tooltip"
                      data-placement="top" title="Desconectar Barril"><i class="material-icons">attach_money</i></button></td>
                </tr>
              </tbody>
            </table>
              </div>
            </div>            
      </div>
      <div class="col-12 col-sm-12  col-md-3">
          <div class="card">
            <div class="card-header">
               <h3>Ver ventas</h3> 
            </div> 
            <template v-if="show"> 

              
              
            
            <div class="card-body">
                 <table class="table">
              <thead>
              <th>Cantidad</th>
              <th>Precio</th>
              
              
             
              </thead>
              <tbody>
                
                <tr v-for="sale in sales" v-bind:key="sale._id">
                  
                  <td>{{sale.quantitySaled}}</td>
                  <td>{{sale.totalPrice}}</td>
                  
                  
                 
                 
                </tr>
              </tbody>
            </table>
            </div>
            </template> 
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
      sizes:{},
      sales:{},
      show:false



    }
  },
  created(){
        this.getContainers();
        this.getSizes();
        this.getContainerSizes();
    },
   methods:{
     getContainers(){
    axios({
      url:'http://localhost:3000/container',
      headers: {authorization: `Bearer ${localStorage.token}`}
      })
      .then(response =>{
        console.log(response)
        this.containers = response.data.Containers

      }).catch(e => {
        console.log(e)

      })
    },
    showSales(idContainer){
            axios({
                url:`http://localhost:3000/sale/containersaled/${idContainer}`,
                headers: {authorization: `Bearer ${localStorage.token}`}
                })
            .then(response =>{
                console.log(response)
                this.sales = response.data.sales
            }).catch(e => {
                console.log(e)
            })
            this.show=true;
        },
    getSizes() {
      axios({
        url:'http://localhost:3000/pricize/size',
        headers: {authorization: `Bearer ${localStorage.token}`}
        })
        .then(response => {
          console.log(response)
          this.sizes = response.data.Sizes
        }).catch(e => {
          console.log(e)

        })
    },
     getContainerSizes() {
      axios({
        url:'http://localhost:3000/pricize/size/growler',
        headers: {authorization: `Bearer ${localStorage.token}`}
        })
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
      axios({
        method:'POST',
        url:'http://localhost:3000/container',
        data:this.newContainer,
        headers: {authorization: `Bearer ${localStorage.token}`}

      }).then(res =>{
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
        axios({
          method:'PUT',
          url:`http://localhost:3000/container/${this.newContainer.id}`,
          data:this.newContainer,
          headers: {authorization: `Bearer ${localStorage.token}`}
        }).then(res => {
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
      axios({
        url:`http://localhost:3000/container/${idContainer}`,
        headers: {authorization: `Bearer ${localStorage.token}`}
        })
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
