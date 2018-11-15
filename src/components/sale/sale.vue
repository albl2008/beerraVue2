<template>
    <div class="container">
        <div class="row"> 
            <div class="col-md-7">  
            <div class="card">
                <div class="card-header">
                    <h3>Ventas</h3>
                </div>
                <div class="card-body">
            <table class="table">
              <thead>
              <th>Cliente</th>
              <th>Fecha</th>
              <th>Total venta</th>
              <th>Growlers</th>
              <th>Pintas</th>
              <th>Botellas</th>
              <th>Otros</th>
              </thead>
              <tbody>
                <tr v-for="sale in sales" >
                  <td>{{sale.client}}</td>
                  <td>{{sale.date}}</td>
                  <td>{{sale.totalSale}}</td>             
                  <td><button class="btn btn-primary" v-on:click="getGrowler(sale._id)"><i class="material-icons">remove_red_eye</i></button></td>
                  <td><button class="btn btn-primary" v-on:click="getPints(sale._id)"><i class="material-icons">remove_red_eye</i></button></td>
                  <td><button class="btn btn-primary" v-on:click="getBottles(sale._id)"><i class="material-icons">remove_red_eye</i></button></td>
                  <td><button class="btn btn-primary" v-on:click="getOther(sale._id)"><i class="material-icons">remove_red_eye</i></button></td>
                </tr>
              </tbody>
            </table>
            </div>
            </div>
            </div>
         <div class="col-md-5">
          <div class="card">
                    <div class="card-header">
                        <h3>Productos</h3>
                    </div>
              <div class="card-body">
                         <template v-if="isGrowlers === true">
                <table class="table ">
                    <thead>
                        <th>Cerveza</th>
                         <th>Cantidad (Litros)</th>
                        <th>Precio</th>
                    </thead>
                    <tbody>
                        <tr v-for="growler in growlers">
                            <td>{{growler.keg.beer}}</td>
                            <td>{{growler.quantity}}</td>
                            <td>{{growler.price}}</td>
                        </tr>
                    </tbody>
                </table>
            </template>
            <template v-else-if="isPints === true">
                 <table class="table ">
                    <thead>
                        <th>Cerveza</th>
                        <th>Cantidad (Litros)</th>
                        <th>Precio</th>
                     
                    </thead>
                    <tbody>
                        <tr v-for="pint in pints">
                            <td>{{pint.keg.beer}}</td>
                            <td>{{pint.quantity}}</td>
                            <td>{{pint.price}}</td>                           
                        </tr>
                    </tbody>
                </table>
            </template>
                <template v-else-if="isOther===true">
                 <table class="table ">
                    <thead>
                        <th>Cerveza</th>                         
                        <th>Cantidad (Litros)</th>
                        <th>Precio</th>                       
                    </thead>
                    <tbody>
                        <tr v-for="other in others">
                            <td>{{other.keg.beer}}</td>
                            <td>{{other.quantity}}</td>
                            <td>{{other.price}}</td>
                            
                        </tr>
                    </tbody>
                </table>
            </template>
            <template v-else>
                 <table class="table ">
                    <thead>
                        <th>Cerveza</th>                         
                        <th>Cantidad (Litros)</th>
                        <th>Precio</th>
                        <th>tamaño</th>
                    </thead>
                    <tbody>
                        <tr v-for="bottle in bottles">
                            <td>{{bottle.beer}}</td>
                            <td>{{bottle.quantity}}</td>
                            <td>{{bottle.price}}</td>
                            <td>{{bottle.size}}</td>
                        </tr>
                    </tbody>
                </table>
            </template>
              </div>
     
            </div>
          </div>
         
        </div>
    </div>
</template>
<script>
const axios = require('axios')
export default {
    data(){
        return{
           sales:[],
           growlers:[],
           bottles:[],
           pints:[],
           others:[],
           isGrowlers:false,
           isBottles:false,
           isPints:false ,
           isOther:false,    
        }
    },
    created(){
        this.getSales()
    },
    methods:{
        getSales(){
            axios.get('https://serverbeerra.herokuapp.com/sale')
            .then(response =>{
                console.log(response)
                this.sales = response.data.sales
            }).catch(e => {
                console.log(e)
            })
        },
        getGrowler(idSale){
             axios.get(`https://serverbeerra.herokuapp.com/sale/growlers/${idSale}`)
            .then(response =>{
                console.log(response)
                this.growlers = response.data.growlers
                this.isPints = false
                this.isGrowlers = true
                 this.isBottles = false
                 this.isOther=false
            }).catch(e => {
                console.log(e)
            })
        },
         getPints(idSale){
             axios.get(`https://serverbeerra.herokuapp.com/sale/pints/${idSale}`)
            .then(response =>{
                console.log(response)
                this.pints = response.data.pints
                this.isPints = true
                this.isGrowlers = false
                this.isBottles = false
                this.isOther=false
            }).catch(e => {
                console.log(e)
            })
        },
         getOther(idSale){
             axios.get(`https://serverbeerra.herokuapp.com/sale/other/${idSale}`)
            .then(response =>{
                console.log(response)
                this.others = response.data.others
                this.isPints = false
                this.isGrowlers = false
                this.isBottles = false
                this.isOther=true
            }).catch(e => {
                console.log(e)
            })
        },
         getBottles(idSale){
             axios.get(`https://serverbeerra.herokuapp.com/sale/bottles/${idSale}`)
            .then(response =>{
                console.log(response)
                this.bottles = response.data.bottles.bottles
                this.isPints = false
                this.isGrowlers = false
                this.isBottles = true
                this.isOther=false
            }).catch(e => {
                console.log(e)
            })
        }
    }
}
</script>
<style>

</style>
