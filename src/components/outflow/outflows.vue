<template>
    <div class="container">
      <div class="row">
        <div class="col-12 col-sm-12  col-md-4">
          <div class="card">
            <div class="card-header"><h3>Nuevo Gasto</h3></div>
            <div class="card-body">
                      <form v-on:submit.prevent="addOutflow" >

          <div class="input-group-pretend mb-3">
            <input type="text" class="form-control mb-1" v-model="newOutflow.name" placeholder="Nombre" required>
             <select v-model="newOutflow.type" class="custom-select mb-1" required >
              <option v-for="t in types" v-bind:value="t.value">
                {{t.text}}
              </option>
             </select>
            <input type="text" class="form-control mb-1" v-model="newOutflow.unity" placeholder="Unidad" required>
           <input type="text" class="form-control mb-1" v-model="newOutflow.quantity" placeholder="Cantidad" required>
            <input type="text" class="form-control mb-1" v-model="newOutflow.price" placeholder="Monto" required>
             <input type="date" class="form-control mb-1 " v-model="newOutflow.date" required>
        </div>
             <template v-if="edit === false">
                  <button class="btn btn-primary btn-block">GUARDAR</button>
              </template>
                <template v-else>
                  <button class="btn btn-primary btn-block" >ACTUALIZAR</button>
              </template>

        </form>
            </div>
          </div>
      </div>

          <div class="col-12 col-sm-12 col-md-8">
            <div class="card">
              <div class="card-header">
                   <h3>Gastos</h3>
              </div>
              <div class="card-body">
                  <table class="table s">
              <thead>
              <th>Nombre</th>
              <th>Tipo</th>
              <th>Unidad</th>
              <th>Cantidad</th>
              <th>Monto</th>
              <th>Fecha</th>
              <th>Eliminar</th>
              <th>Editar</th>
              </thead>
              <tbody>
                <tr v-for="outflow in outflows" >
                  <td>{{outflow.name}}</td>
                  <td>{{ types.find(function(element) {
                   return element.value ===  outflow.type;
                    }).text}}</td>
                  <td>{{outflow.unity}}</td>
                  <td>{{outflow.quantity}}</td>
                  <td>{{outflow.price}}</td>
                  <td>{{format(outflow.date)}}</td>
                  <td><button class="btn btn-danger btn-sm" v-on:click="deleteOutflow(outflow._id)"><i class="material-icons">delete</i></button></td>
                  <td><button class="btn btn-primary btn-sm" v-on:click="updateOutflow(outflow._id)"><i class="material-icons">edit</i></button></td>
                </tr>
              </tbody>
            </table>
              </div>
            </div>           
      </div>

    </div>
    </div>

</template>
<script>
import Vue from 'vue'
import axios  from 'axios'
import moment from 'moment'

class newOutflow {
  constructor(id, name, type, quantity, unity, price, date) {
    this.id = id
    this.name = name
    this.quantity = quantity
    this.type = type
    this.unity = unity
    this.price = price
    this.date = date
    }
}

export default {
  data() {
    return {
      newOutflow: {},
      outflows: [],
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
          text: 'Gas - Luz',
          value: 4
        },
        {
          text: 'Alquiler',
          value: 5
        },
        {
          text: 'Otros',
          value: 6
        }
      ],
      edit: false,
      outflowToEdit: '',



    }
  },
  created() {
    this.getOutflows();
    
  },
  methods: {
    getOutflows() {
      axios({
        url:'http://localhost:3000/outflow',
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

      if (this.edit === false) {

        axios({
          method:'POST',  
          url:'http://localhost:3000/outflow',
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
          url:`http://localhost:3000/outflow/${this.newOutflow.id}`,
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
    },
    deleteOutflow(idOutflow) {
      axios({
        method:'DELETE',
        url:`http://localhost:3000/outflow/${idOutflow}`,
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
        url:`http://localhost:3000/outflow/${idOutflow}`,
        headers: {authorization: `Bearer ${localStorage.token}`}
        })
        .then(res => {
          
          this.newOutflow = new newOutflow(res.data.outflow._id, res.data.outflow.name, res.data.outflow.type
            ,res.data.outflow.quantity, res.data.outflow.unity,
            res.data.outflow.price,moment(res.data.outflow.price).format('MM/DD/YYYY')
          )
         
          this.edit = true;
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
<style>

</style>
