<template>
   
      <div id="barriles">
         <div class="row" style="width: 50%; margin: 0 auto; "><div class="centerhead">
        <h1 class="h1head">Compras</h1>
        </div>
        <img :src="require('@/assets/beerra/byemoney2x.png')" alt class="underh1">
        
 
      </div>   <div class="container">
      <div class="row">
        <div class="col-12 col-sm-12 col-md-3">
          <div class="card" style="background: #272727;">
            <div class="card-header bg-dark">
              <h3 class="tablaHead">Nuevo Gasto</h3></div>
            <div class="card-body">
                      <form v-on:submit.prevent="addOutflow" >

          <div class="input-group-pretend mb-3">
           <label>Tipo</label>
             <select v-model="newOutflow.type" class="custom-select mb-1" required >
              <option v-for="t in types" v-bind:value="t.value">
                {{t.text}}
              </option>
             </select>
             <template v-if="newOutflow.type === 1">
                    <label>Tamaño</label>
                    <select v-model="newOutflow.size" class="custom-select mb-1" required >
                      <option v-bind:value="sizes[0].pintsize">
                          {{sizes[0].pintsize}}
                      </option>
                      <option v-bind:value="sizes[0].pintsize2">
                          {{sizes[0].pintsize2}}
                      </option>
             </select>
              <label>Cantidad</label>
           <input type="text" class="form-control mb-1" v-model="newOutflow.quantity" placeholder="" required>
           <label>Costo por unidad</label>
            <input type="text" class="form-control mb-1" v-model="newOutflow.price" placeholder="" required>
            <br>
                    
              <code>Fecha: {{format(newOutflow.date)}}</code>                
              <input-date v-model="newOutflow.date"></input-date>
              
             </template>
             <template v-if="newOutflow.type === 2 ">
                  <label>Tamaño</label>
                    <select v-model="newOutflow.size" class="custom-select mb-1" required >
                      <option>
                          {{sizes[0].growlersize}}
                      </option>
                      <option>
                          {{sizes[0].growlersize2}}
                      </option>
                    </select>
                        <label>Cantidad</label>
           <input type="text" class="form-control mb-1" v-model="newOutflow.quantity" placeholder="" required>
           <label>Costo por unidad</label>
            <input type="text" class="form-control mb-1" v-model="newOutflow.price" placeholder="" required>
             <br>
            <code>Fecha: {{format(newOutflow.date)}}</code>                
              <input-date v-model="newOutflow.date"></input-date>
             </template>
              <template v-if="newOutflow.type === 3 ">
                  <label>Descripción</label>
                  <input type="text" class="form-control mb-1" v-model="newOutflow.description" placeholder="" required>
                    <label>Costo</label>
            <input type="text" class="form-control mb-1" v-model="newOutflow.price" placeholder="" required>
             <br>
            <code>Fecha: {{format(newOutflow.date)}}</code>                
              <input-date v-model="newOutflow.date"></input-date>
             </template>
                  <template v-if="newOutflow.type === 4">
                 
                  <label>Cantidad</label>
                  
           <input type="text" class="form-control mb-1" v-model="newOutflow.quantity" placeholder="Cantidad (en Kg)" required>
           <label>Costo/Kg</label>
            <input type="text" class="form-control mb-1" v-model="newOutflow.price" placeholder="Costo/Kg" required>
             <br>
          <code>Fecha: {{format(newOutflow.date)}}</code>                
              <input-date v-model="newOutflow.date"></input-date>
            </template>
            <template v-if="newOutflow.type === 5">
                 
                  <label>Mes <small>/Periodo</small></label>
                  
           <input type="text" class="form-control mb-1" v-model="newOutflow.month" placeholder="Mes/Periodo" required>
           <label>Importe</label>
            <input type="text" class="form-control mb-1" v-model="newOutflow.price" placeholder="Importe" required>
             <br>
            <code>Fecha: {{format(newOutflow.date)}}</code>                
              <input-date v-model="newOutflow.date"></input-date>
            </template>
            <template v-if="newOutflow.type === 6">
                 
                  <label>Mes/Periodo</label>
                  
           <input type="text" class="form-control mb-1" v-model="newOutflow.month" placeholder="Mes/Periodo" required>
           <label>Importe</label>
            <input type="text" class="form-control mb-1" v-model="newOutflow.price" placeholder="Importe" required>
             <br>
           <code>Fecha: {{format(newOutflow.date)}}</code>                
              <input-date v-model="newOutflow.date"></input-date>
            </template>
            <template v-if="newOutflow.type === 7">
                 
                  <label>Descripción</label>
                  
           <input type="text" class="form-control mb-1" v-model="newOutflow.description" placeholder="Descripcion" required>
           <label>Costo</label>
            <input type="text" class="form-control mb-1" v-model="newOutflow.price" placeholder="Costo" required>
            <br>
            <code>Fecha: {{format(newOutflow.date)}}</code>                
              <input-date v-model="newOutflow.date"></input-date>
            </template>
        </div>
             <template v-if="edit === false">
                  <button class="btn btn-outline-primary">Guardar</button>
              </template>
                <template v-else>
                  <button class="btn btn-outline-primary" >Actualizar</button>
              </template>

        </form>
            </div>
          </div>
      </div>
     <div class="col-12 col-sm-12 col-md-9">
            <div class="card" style="background: #272727;">
              <div class="card-header bg-dark">
                   <h3 class="tablaHead">Pintas y Botellones</h3>
              </div>
              <div class="card-body">
              <table class="table s">
              <thead>
              <th>Tipo</th>
              <th>Tamaño</th>
              <th>Cantidad</th>
              <th>Costo <small>/unidad</small></th>
              <th>Fecha</th>
              <th>Total</th>
              <th>Eliminar</th>
              <th>Editar</th>
              </thead>
              <tbody>
                <tr v-for="outflow in outflows" :key="outflow.id">
                  <template v-if="outflow.type===1">
                    <td>Pintas</td>
                    <td>{{outflow.size}}</td>
                  <td>{{outflow.quantity}}</td>
                  <td>$ {{outflow.price}}</td>
                  <td>{{format(outflow.date)}}</td>
                   <td>{{outflow.price*outflow.quantity}}</td>
                  <td><button class="btn btn-outline-danger btn-sm fix disableBorder" v-on:click="deleteOutflow(outflow._id)"><i class="material-icons resize">clear</i></button></td>
                    <td><button class="btn btn-outline-primary btn-sm fix disableBorder" v-on:click="updateOutflow(outflow._id)"><i class="material-icons resize">edit</i></button></td>
                  </template>
                   <template v-if="outflow.type===2">
                    <td>Botellones</td>
                    <td>{{outflow.size}}<span class="litros"> l</span></td>
                  <td>{{outflow.quantity}}</td>
                  <td>$ {{outflow.price}}</td>
                  <td>{{format(outflow.date)}}</td>
                   <td>$ {{outflow.price*outflow.quantity}}</td>
                  <td><button class="btn btn-outline-danger btn-sm fix disableBorder" v-on:click="deleteOutflow(outflow._id)"><i class="material-icons resize">clear</i></button></td>
                    <td><button class="btn btn-outline-primary btn-sm fix disableBorder" v-on:click="updateOutflow(outflow._id)"><i class="material-icons resize">edit</i></button></td>
                  </template>
                  
                 
                </tr>
              </tbody>
             
            </table>
             
              </div>
            </div>           
      </div>   </div>
      
  
        <div class="row" style="margin-top: 2.5em;">
        <div class="col-12 col-md-6" >
          
            <div class="card" style="background: #272727;">
              <div class="card-header bg-dark">
                   <h3 class="tablaHead">Luz / Alquiler</h3>
              </div>
              <div class="card-body">
              <table class="table s">
              <thead>
              <th>Tipo</th>
              <th>Mes<small> /Periodo</small></th>
              <th>Monto</th>
              <th>Fecha</th>
              <th>Eliminar</th>
              <th>Editar</th>
              </thead>
              <tbody>
                <tr v-for="outflow in outflows" :key="outflow.id">
                  <template v-if="outflow.type===5">
                    <td>Alquiler</td>
                    <td>{{outflow.month}}</td>
                  <td>$ {{outflow.price}}</td>
                  <td>{{format(outflow.date)}}</td>
                  <td><button class="btn btn-outline-danger btn-sm disableBorder fix" v-on:click="deleteOutflow(outflow._id)"><i class="material-icons resize">clear</i></button></td>
                    <td><button class="btn btn-outline-primary btn-sm disableBorder fix" v-on:click="updateOutflow(outflow._id)"><i class="material-icons resize">edit</i></button></td>
                  </template>
                   <template v-if="outflow.type===6">
                    <td>Luz</td>
                    <td>{{outflow.month}}</td>
                  <td>$ {{outflow.price}}</td>
                  <td>{{format(outflow.date)}}</td>
                  <td><button class="btn btn-outline-danger btn-sm disableBorder fix" v-on:click="deleteOutflow(outflow._id)"><i class="material-icons resize ">clear</i></button></td>
                    <td><button class="btn btn-outline-primary btn-sm disableBorder fix" v-on:click="updateOutflow(outflow._id)"><i class="material-icons resize">edit</i></button></td>
                  </template>
                  
                 
                </tr>
              </tbody>
             
            </table>
             
              </div>
            </div> 

        
      </div>
      <div class="col-12 col-md-6" >
          
            <div class="card" style="background: #272727;">
              <div class="card-header bg-dark">
                   <h3 class="tablaHead">Limpieza / Otros</h3>
              </div>
              <div class="card-body">
              <table class="table s">
              <thead>
              <th>Tipo</th>
              <th>Descripción</th>
              <th>Monto</th>
              <th>Fecha</th>
              <th>Eliminar</th>
              <th>Editar</th>
              </thead>
              <tbody>
                <tr v-for="outflow in outflows" :key="outflow.id">
                  <template v-if="outflow.type===3">
                    <td>Limpieza</td>
                    <td class="nowrap" style="width: 100px; max-width: 150px;">{{outflow.description}}</td>
                  <td>$ {{outflow.price}}</td>
                  <td>{{format(outflow.date)}}</td>
                  <td><button class="btn btn-outline-danger btn-sm disableBorder fix" v-on:click="deleteOutflow(outflow._id)"><i class="material-icons resize">clear</i></button></td>
                    <td><button class="btn btn-outline-primary btn-sm disableBorder fix" v-on:click="updateOutflow(outflow._id)"><i class="material-icons resize">edit</i></button></td>
                  </template>
                   <template v-if="outflow.type===7">
                    <td>Otros</td>
                    <td>{{outflow.description}}</td>
                  <td>$ {{outflow.price}}</td>
                  <td>{{format(outflow.date)}}</td>
                  <td><button class="btn btn-outline-danger btn-sm disableBorder fix" v-on:click="deleteOutflow(outflow._id)"><i class="material-icons resize">clear</i></button></td>
                    <td><button class="btn btn-outline-primary btn-sm disableBorder fix" v-on:click="updateOutflow(outflow._id)"><i class="material-icons resize">edit</i></button></td>
                  </template>
                  
                 
                </tr>
              </tbody>
             
            </table>
             
              </div>
        

        
      </div>
      </div>
</div>

        <div class="row" style="margin-top: 2.5em; margin-bottom: 3em;">
        <div class="col-12 col-md-6" >
          
            <div class="card" style="background: #272727;">
              <div class="card-header bg-dark">
                   <h3 class="tablaHead">Gas CO2</h3>
              </div>
              <div class="card-body">
              <table class="table s">
              <thead>
              <th>Tipo</th>
              <th>Cant. <small>(Kg)</small></th>
              <th>Costo<small>/Kg</small></th>
              <th>Fecha</th>
              <th>Total</th>
              <th>Eliminar</th>
              <th>Editar</th>
              </thead>
              <tbody>
                <tr v-for="outflow in outflows" :key="outflow.id">
                  <template v-if="outflow.type===4">
                    <td>CO2</td>
                    <td>{{outflow.quantity}}</td>
                  <td>$ {{outflow.price}}</td>
                  
                  <td>{{format(outflow.date)}}</td>
                  <td>$ {{outflow.price*outflow.quantity}}</td>
                  <td><button class="btn btn-outline-danger btn-sm fix disableBorder" v-on:click="deleteOutflow(outflow._id)"><i class="material-icons resize">clear</i></button></td>
                    <td><button class="btn btn-outline-primary btn-sm fix disableBorder" v-on:click="updateOutflow(outflow._id)"><i class="material-icons resize">edit</i></button></td>
                  </template>
                  
                 
                </tr>
              </tbody>
             
            </table>
             
              </div>
            </div> 

        
      </div>
      
      </div>
</div>
    </div>
    </div>

</template>
<script>
import Vue from 'vue'
import axios  from 'axios'
import Joi from "joi";
import moment from 'moment-timezone'



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

class newOutflow {
  constructor(id, type, description, size, quantity, price, month, date) {
    
    if (type===1) {
      this.id = id
      this.type = type
      this.quantity = quantity
      this.price = price
      this.size=size
      this.date= date
    }if(type===2){
      this.id = id
      this.type = type
      this.quantity = quantity
      this.price = price
      this.size=size
      this.date = date
    }if (type===3){
      this.id = id
      this.type = type
      this.description = description
      this.price = price
      this.date = date
    }if (type===4) {
      this.id = id
      this.type = type
      this.quantity = quantity
      this.price = price
      this.date = date
    }if (type===5) {
      this.id = id
    this.type = type
      this.month = month
      this.price = price
      this.date = date
    }if (type===6) {
      this.id = id
    this.type = type
      this.month = month
      this.price = price
      this.date = date
    }if (type===7) {
      this.id = id
    this.type = type
        this.description = description
        this.price = price
        this.date = date
    }
    }
}
const schema = Joi.object().keys({
    id: Joi.string(),
    type : Joi.number().positive().min(1).max(7).required(),
    description : Joi.string(),
    date : Joi.date().required(),
    size : Joi.number().positive(),
    quantity: Joi.number().positive(),
    month: Joi.number().min(1).max(12),
    price: Joi.number().positive().required()
})

export default {
  data() {
    return {
      newOutflow: {
        date: new Date()
      },
      errorMessage: "",
      outflows: [],
      sizes:[],
      types: [{
          text: 'Pintas',
          value: 1
        },
        {
          text: 'Botellones',
          value: 2
        },
        {
          text: 'Limpieza',
          value: 3
        },
        {
          text: 'Gas (CO2)',
          value: 4
        },
        {
          text: 'Alquiler',
          value: 5
        },
        {
          text: 'Luz',
          value: 6
        },
        {
          text: 'Otros',
          value: 7
        },
      ],
      edit: false,
      outflowToEdit: '',



    }
  },
  watch:{
    newKeg:{
      handler(){
        this.errorMessage = ''
      },
      deep : true
    }
  },
  created() {
    this.getOutflows();
    this.getSizes();
    
  },
  methods: {
    getSizes(){
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
    getOutflows() {
      axios({
        url:process.env.ROOT_API + 'outflow',
        headers: {authorization: `Bearer ${localStorage.token}`}
        })
        .then(response => {
          console.log(response)
          this.outflows = response.data.Outflows

        }).catch(e => {
          console.log(e)

        })
    },
    addOutflow() {
      if(this.validOutflow()){
      if (this.edit === false) {

        axios({
          method:'POST',  
          url:process.env.ROOT_API + 'outflow',
          data: this.newOutflow,
          headers: {authorization: `Bearer ${localStorage.token}`}
          }).then(res => {

            if (res.status === 200) {
              Vue.notify({
                group: 'foo',
                type: 'success',
                title: 'Gasto Agregado',
                text: res.data.mensaje
              })
            }
            this.getOutflows(),
            this.newOutflow = {}
          })
          .catch(e => {
            console.log(e.response.data)
            Vue.notify({
              group: 'foo',
              type: 'error',
              title: 'Gasto',
              text: `Error al guardar barril ${e}`
            })
          })
      } else {
        axios({
          method:'PUT',
          url:process.env.ROOT_API + `outflow/${this.newOutflow.id}`,
          data:this.newOutflow,
          headers: {authorization: `Bearer ${localStorage.token}`}
        }).then(res => {
          if (res.status === 200) {
            Vue.notify({
              group: 'foo',
              type: 'success',
              title: 'Gasto Actualizado',
              text: res.data.mensaje
            })
            this.getOutflows()
            this.newOutflow = {}
            this.edit = false
          }
        }).catch(e => {
          console.log(e.data)
          Vue.notify({
            group: 'foo',
            type: 'error',
            title: 'Gasto',
            text: `Error al actualizar el gasto ${e}`
          })
        })
      }
      }
    },
    deleteOutflow(idOutflow) {
      axios({
        method:'DELETE',
        url:process.env.ROOT_API + `outflow/${idOutflow}`,
        headers: {authorization: `Bearer ${localStorage.token}`}
        })
        .then(res => {
          if (res.status === 200) {
            Vue.notify({
              group: 'foo',
              type: 'success',
              title: 'Gasto Eliminado',
              text: res.data.mensaje
            })
            console.log(res)
            this.getOutflows()
          }
        }).catch(e => {
          Vue.notify({
            group: 'foo',
            type: 'error',
            title: 'Gasto',
            text: `Error al eliminar el gasto ${e}`
          })
        })
    },
    updateOutflow(idOutflow) {
      axios({
        url:process.env.ROOT_API + `outflow/${idOutflow}`,
        headers: {authorization: `Bearer ${localStorage.token}`}
        })
        .then(res => {
          if (res.data.outflow.type === 1) {
             this.newOutflow = new newOutflow(res.data.outflow._id, res.data.outflow.type,res.data.outflow.description
            ,res.data.outflow.size, res.data.outflow.quantity,
            res.data.outflow.price,res.data.outflow.month,res.data.outflow.date
          )
          
          }
           if (res.data.outflow.type===2){
            this.newOutflow = new newOutflow(res.data.outflow._id, res.data.outflow.type,res.data.outflow.description
            ,res.data.outflow.size, res.data.outflow.quantity,
            res.data.outflow.price,res.data.outflow.month,moment(res.data.outflow.date).format('MM/DD/YYYY'))
          } 
           if(res.data.outflow.type === 3){
               this.newOutflow = new newOutflow(res.data.outflow._id, res.data.outflow.type,res.data.outflow.description
            ,res.data.outflow.size, res.data.outflow.quantity,
            res.data.outflow.price,res.data.outflow.month,moment(res.data.outflow.date).format('MM/DD/YYYY'))
          }
           if(res.data.outflow.type===4){
              this.newOutflow = new newOutflow(res.data.outflow._id, res.data.outflow.type,res.data.outflow.description
            ,res.data.outflow.size, res.data.outflow.quantity,
            res.data.outflow.price,res.data.outflow.month,moment(res.data.outflow.date).format('MM/DD/YYYY'))
          }
           if(res.data.outflow.type===5){
              this.newOutflow = new newOutflow(res.data.outflow._id, res.data.outflow.type,res.data.outflow.description
            ,res.data.outflow.size, res.data.outflow.quantity,
            res.data.outflow.price,res.data.outflow.month,moment(res.data.outflow.date).format('MM/DD/YYYY'))
          }
           if(res.data.outflow.type===6){
               this.newOutflow = new newOutflow(res.data.outflow._id, res.data.outflow.type,res.data.outflow.description
            ,res.data.outflow.size, res.data.outflow.quantity,
            res.data.outflow.price,res.data.outflow.month,moment(res.data.outflow.date).format('MM/DD/YYYY'))
          } if (res.data.outflow.type===7){
            this.newOutflow = new newOutflow(res.data.outflow._id, res.data.outflow.type,res.data.outflow.description
            ,res.data.outflow.size, res.data.outflow.quantity,
            res.data.outflow.price,res.data.outflow.month,moment(res.data.outflow.date).format('DD/MM/AAAA'))
          
          }
          this.edit = true;
        })
    },
    format(date){
      if(date)
          return moment(date).tz('UTC').format("DD/MM/YYYY");
      else
          return ""
  },
    validOutflow(){
    const result = Joi.validate(this.newOutflow,schema)
    console.log(result.error)
    if(result.error === null){
      return true
    }else{
      if(result.error.message.includes('type'))
        this.errorMessage = 'El tipo es incorrecto, seleccione nuevamente'
      if(result.error.message.includes('date'))
        this.errorMessage = 'Seleccione una fecha correcta'
      if(result.error.message.includes('price'))
        this.errorMessage = 'Ingrese un monto correcto'
      if(result.error.message.includes('month'))
        this.errorMessage = 'Ingrese el numero correspondiente al mes'
      if(result.error.message.includes('description'))
        this.errorMessage = 'Ingrese una descripción del gasto'
      if(result.error.message.includes('quantity'))
        this.errorMessage = 'Ingrese correctamente la cantidad'
    }
  }
},
}
</script>
<style>

</style>
