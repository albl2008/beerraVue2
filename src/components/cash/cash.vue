<template>
  <div id="cash">
    <div class="row" style="width: 50%; margin: 0 auto; ">
      <div class="centerhead">
        <h1 class="h1head">Caja</h1>
      </div>
      <img :src="require('@/assets/beerra/cash2x.png')" alt class="underh1">
    </div>

    <div class="container">
      <div class="row">
        <div class="col-lg-4 col-md-4">
          <div class="card bg-dark">
            <div class="card-body">
              <div class="stat-widget-five">
                <div class="stat-icon dib flat-color-1">
                  <span class="letra total">T</span>
                </div>
                <div class="stat-content">
                  <div class="text-left dib">
                    <div class="stat-text">
                      <span class="count">{{"$ "+ total}}</span>
                    </div>
                    <div class="stat-heading">
                      <span>Total</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-4 col-md-4">
          <div class="card bg-dark">
            <div class="card-body">
              <div class="stat-widget-five">
                <div class="stat-icon dib flat-color-2">
                  <span class="letra month">M</span>
                </div>
                <div class="stat-content">
                  <div class="text-left dib">
                    <div class="stat-text">
                      <span class="count">{{'$ ' + totalMonth}}</span>
                    </div>
                    <div class="stat-heading">
                      <span>Este mes</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!--<div class="col-lg-3 col-md-6">
          <div class="card bg-dark">
            <div class="card-body">
              <div class="stat-widget-five">
                <div class="stat-icon dib flat-color-3">
                  <span class="letra week">S</span>
                </div>
                <div class="stat-content">
                  <div class="text-left dib">
                    <div class="stat-text">
                      <span class="count">$ 349</span>
                    </div>
                    <div class="stat-heading">
                      <span>Esta semana</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>-->

        <div class="col-lg-4 col-md-4">
          <div class="card bg-dark">
            <div class="card-body">
              <div class="stat-widget-five">
                <div class="stat-icon dib flat-color-4">
                  <span class="letra today">H</span>
                </div>
                <div class="stat-content">
                  <div class="text-left dib">
                    <div class="stat-text">
                      <span class="count">{{'$ '+ totalDay}}</span>
                    </div>
                    <div class="stat-heading">
                      <span>Hoy</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row" style="margin-top: 2em;">
        <div class="col-md-3" style>
           <div v-if="errorMessage" class="alert alert-danger" role="alert">
            {{ errorMessage }}
          </div>
          <div class="card" style="background: #272727;">
            <div class="card-header bg-dark">
              <h3 class="tablaHead">Ingreso +</h3>
            </div>
            <div class="card-body">
              <form v-on:submit.prevent="addInFlow">
                <label>Monto</label>
                <input type="text" class="form-control mb-1" v-model="newInFlow.amount" required>
                <label>Descripción</label>
                <input type="text" class="form-control mb-1" v-model="newInFlow.description" required>
                <label>Fecha</label>
                <input type="date" class="form-control mb-1" v-model="newInFlow.date" required>
                <button  class="btn btn-outline-success" style="width: 75px; margin-top: 1em;">Agregar</button>
              </form>
              
            </div>
          </div>
        </div>

        <div class="col-md-3">
          <div v-if="errorMessageOut" class="alert alert-danger" role="alert">
            {{ errorMessageOut }}
          </div>
          <div class="card" style="background: #272727;">
            <div class="card-header bg-dark">
              <h3 class="tablaHead">Egreso -</h3>
            </div>
            <div class="card-body">
              <form v-on:submit.prevent="addOutFlow">
                <label>Monto</label>
                <input type="text" class="form-control mb-1" v-model="newOutFlow.amount">
                <label>Descripción</label>
                <input type="text" class="form-control mb-1" v-model="newOutFlow.description">
                <label>Fecha</label>
                <input type="date" class="form-control mb-1" v-model="newOutFlow.date">
                <button class="btn btn-outline-danger" style="width: 75px; margin-top: 1em;">Agregar</button>
              </form>
            </div>
          </div>
        </div>

        <div class="col-md-6">
          <div class="card tabla" style="background: #272727;">
            <div class="card-header tituloCardHeader bg-dark">
              <h3 class="tablaHead">Operaciones</h3>
            </div>
            <div class="card-body tabla">
              <span>Ingresos</span>
              <table class="table s">
                <thead>
                  <th>Monto</th>
                  <th>Descripción</th>
                  <th>Fecha</th>
                  <th>Eliminar</th>
                </thead>
                <tbody>
                  <tr class="trHigh" v-for="inflow in inF">
                    <td>{{inflow.amount}}</td>
                    <td>{{inflow.description}}</td>
                    <td>{{format(inflow.date)}}</td>
                    <div v-if="!inflow.sale" id="options" class="opacityOut">
                      <td>
                        <button v-on:click="removeInflow(inflow._id)" class="btn btn-outline-danger btn-sm fix disableBorder">
                          <i class="material-icons resize">clear</i>
                        </button>
                      </td>
                      <td>
                      </td>
                    </div>
                  </tr>
                </tbody>
              </table>
              <span>Egresos</span>
              <table class="table s">
                <thead>
                  <th>Monto</th>
                  <th>Descripción</th>
                  <th>Fecha</th>
                  <th>Elimminar</th>
                </thead>
                <tbody>
                  <tr class="trHigh" v-for="outflow in out">
                    <td>{{outflow.amount}}</td>
                    <td>{{outflow.description}}</td>
                    <td>{{format(outflow.date)}}</td>
                    <div v-if="verifyOptions(outflow)" id="options" class="opacityOut">
                      <td>
                        <button v-on:click="removeOutflow(outflow._id)" class="btn btn-outline-danger btn-sm fix disableBorder">
                          <i class="material-icons resize">clear</i>
                        </button>
                      </td>
                    </div>
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
import Joi from 'joi'
import axios from 'axios'
import moment from 'moment-timezone'
const InSchema = Joi.object().keys({
  amount: Joi.number().positive().required(),
  description: Joi.string().required(),
  date: Joi.date().required()
})
class newInFlow {
  constructor(amount,description,date){
    this.amount = amount,
    this.description = description,
    this.date = date
  }

}
class newOutFlow {
  constructor(amount,description,date){
    this.amount = amount,
    this.description = description,
    this.date = date
  }

}
export default {
  data(){
    return{
      newInFlow:{},
      newOutFlow:{},
      inF:[],
      out:[],
      total:0,
      totalMonth:0,
      totalDay:0,
      errorMessage:'',
      errorMessageOut:''
    

    }
  },
  watch:{
    newInFlow:{
      handler(){
        this.errorMessage = ''
      },
      deep : true
    },
      newOutFlow:{
      handler(){
        this.errorMessageOut = ''
      },
      deep : true
    }
  },
  created(){
    this.getIN()
    this.getOut()
    this.totals()
    this.totalsMonth()
    this.getTotalDay()
    //this.getTotalWeek()
  },
  methods:{
    addInFlow(){
      if(this.validIN()){
        axios({
          method:'POST',
          url: process.env.ROOT_API + 'cash/in',
          data: this.newInFlow,
          headers: {authorization: `Bearer ${localStorage.token}`}
        }).then(res =>{
            console.log("in",res)
            this.getIN()
            this.totals()
            this.totalsMonth()
            this.getTotalDay()
            this.newInFlow = {}
            this.notifySucces("Ingreso",res.data.message)
        }).catch(err => {
            this.notifyError("Ingreso", res.data.message)
        })
      }
    },
    removeInflow(id){
      axios({
        method:'DELETE',
        url:  process.env.ROOT_API + `cash/${id}`,
        headers: {authorization: `Bearer ${localStorage.token}`}
      }).then(res => {
            this.getIN()
            this.totals()
            this.totalsMonth()
            this.getTotalDay()
            this.notifySucces("Ingreso",res.data.message)
      }).catch(err => {
            this.notifyError("Ingreso",res.data.message)
      })
    },
    addOutFlow(){
      if(this.validOut()){
        axios({
          method:'POST',
          url: process.env.ROOT_API + 'cash/out',
          data: this.newOutFlow,
          headers: {authorization: `Bearer ${localStorage.token}`}
        }).then(res =>{
            console.log(res)
            this.getOut()
            this.totals()
            this.totalsMonth()
            this.getTotalDay()
            this.newOutFlow = {}
            this.notifySucces("Egreso",res.data.message)
        }).catch(err => {
          this.notifyError("Egreso",res.data.message)
            console.log(err.response.data)
        })
      }
    },
    removeOutflow(id){
      console.log("Holaaa")
      axios({
        method:'DELETE',
        url:  process.env.ROOT_API + `cash/out/${id}`,
        headers: {authorization: `Bearer ${localStorage.token}`}
      }).then(res => {
          console.log(res)
          this.getOut()
          this.totals()
          this.totalsMonth()
          this.getTotalDay()
          this.notifySucces("Egreso",res.data.message)
      }).catch(err => {
          this.notifyError("Egreso",res.data.message)
          console.log(err.response.data)
      })
    },
    getIN(){
      axios({
          url: process.env.ROOT_API + 'cash/in',
          headers: {authorization: `Bearer ${localStorage.token}`}
      }).then(res =>{
        console.log(res)
        this.inF = res.data.inflows 
      }).catch(err=>{
        console.log(err.response.data)
      })
    },
    getOut(){
      axios({
          url: process.env.ROOT_API + 'cash/out',
          headers: {authorization: `Bearer ${localStorage.token}`}
      }).then(res =>{
        this.out = res.data.outflows
      }).catch(err=>{
        console.log(err.response.data)
      })
    },
    totals(){
      axios({
          url: process.env.ROOT_API + 'cash/total',
          headers: {authorization: `Bearer ${localStorage.token}`}
      }).then(res =>{
        console.log(res)
        this.total = res.data.total
      }).catch(err=>{
        console.log(err.response.data)
      })
    },
     totalsMonth(){
      axios({
          url: process.env.ROOT_API + 'cash/month',
          headers: {authorization: `Bearer ${localStorage.token}`}
      }).then(res =>{
        let totalMonthIN = this.getMonthYears(res.data.ins)
        let totalMonthOut = this.getMonthYears(res.data.outs)
        this.totalMonth = totalMonthIN - totalMonthOut
      }).catch(err=>{
        console.log(err.response.data)
      })
    },
    getMonthYears(array){
            let newArray = []
           
             for (const key of array) {

                 if(new Date().getFullYear() === key._id.year && new Date().getMonth()+1 === key._id.month ){
                      newArray.push(key.count)     
                                
                  }
           
          }
            return newArray
    },
    getTotalDay(){
      axios({
        method:'POST',
        url: process.env.ROOT_API + `cash/day`,
        data:{day: new Date()},
        headers: { authorization: `Bearer ${localStorage.token}` }
      }).then(res => {
        
        console.log("respuesta dias",res)
        this.totalDay = res.data.totalDay
      }).catch(err => {
        console.log("hola",err.response.data)
      })
    },
    format(date) {
      if (date) return moment(date).tz('UTC').format("DD/MM/YYYY");
    },
    verifyOptions(out){
      if(out.outflow || out.payment){
        return false
      }else{
        return true
      }
    },
    validIN(){
            const result = Joi.validate(this.newInFlow,InSchema)
            if(result.error === null){
                
                return true
            }else{
                console.log(result.error.message)
                
                if(result.error.message.includes('amount')){
                    this.errorMessage = 'Ingreso un monto valido.'
                }
                if(result.error.message.includes('date')){
                    this.errorMessage = 'La fecha ingresada es incorrecta'
                }
                if(result.error.message.includes('date')){
                  this.errorMessage = 'La descripcion ingresada es incorrecta'
                }
            }
    },
       validOut(){
            const result = Joi.validate(this.newOutFlow,InSchema)
            if(result.error === null){
                
                return true
            }else{
                console.log(result.error.message)
                
                if(result.error.message.includes('amount')){
                    this.errorMessageOut = 'Ingreso un monto valido.'
                }
                if(result.error.message.includes('date')){
                    this.errorMessageOut = 'La fecha ingresada es incorrecta'
                }
                if(result.error.message.includes('date')){
                  this.errorMessageOut = 'La descripcion ingresada es incorrecta'
                }
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
  }
}
</script>

<style scoped>
.cardX {
  width: 100%;
  height: 15em;
  padding: 0.8em;
}

.cardY {
  background: rgba(51, 51, 51, 0.274) !important;
  margin: 0.4em 0.4em 0 0.4em;
  width: 49%;
  border: 1px solid #444;
  border-radius: 0.4em;
  height: 5.9em;
}

span,
p {
  color: white;
}

.cardContainer {
  width: 100%;
  display: flex;
}

.left {
  float: left;
}

.middle {
  margin: 0 auto;
}

.cube {
  height: 100%;
  padding: 1em;
  background: rgba(34, 34, 34, 0.493);
  width: 20%;
  border-radius: 0.3em 0 0 0.3em;
  border-right: 1px solid #444;
}

.letra {
  float: left;
  margin-right: 1em;
  margin-left: 0.5em;
  font-size: 32px;
}

.week {
  color: rgb(0, 255, 170);
}

.month {
  color: rgb(255, 136, 0);
}

.total {
  color: rgb(255, 0, 119);
}

.today {
  color: rgb(0, 238, 255);
}
</style>