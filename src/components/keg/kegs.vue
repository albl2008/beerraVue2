<template>
    <div class="container">
      <div class="row">
        <div class="col-12 col-sm-12  col-md-4">
          <div class="card">
            <div class="card-header"><h3>Nuevo Barril</h3></div>
            <div class="card-body">
                      <form v-on:submit.prevent="addKeg" >

          <div class="input-group-pretend mb-3">
            <label for="" class="text-left">Cerveza</label>
            <input type="text" class="form-control mb-1" v-model="newKeg.beer" placeholder="Beer" required>
           
            <template v-if="sale === false">
                 <select v-model="newKeg.quantity" class="custom-select mb-1" required >
                 
              <option v-for="q in quantities" v-bind:value="q.text">
                {{q.text}}
              </option>

            </select>
              <label >Estado: </label>
              <div v-for="s in status" class="form-check form-check-inline">
              <input required type="radio"  name="status" v-on:click="changeStatus(s.value)" v-bind:value="s.value"  v-model="newKeg.sta"  class="form-check-input mb-1" >
              <label for="one">{{s.text}}</label>

            </div>
            <template v-if="newKeg.sta === 2">
            <input type="text" class="form-control mb-1" v-model="newKeg.quantitySaled" placeholder="Cantidad disponible" required>
            </template>
            </template> 

            
            <input type="text" class="form-control mb-1" v-model="newKeg.ibu" placeholder="IBU" required>
            <input type="text" class="form-control mb-1" v-model="newKeg.alcohol" placeholder="Alcohol" required>
           
          <select v-model="newKeg.brewery" class="custom-select mb-1" required >
                 
              <option v-for="brewery in breweries" v-bind:value="brewery._id">
                {{brewery.name}}
              </option>

            </select>
        </div>
             <template v-if="edit === false">
                  <button class="btn btn-primary btn-block">SEND</button>
              </template>
                <template v-else>
                  <button class="btn btn-primary btn-block" >UPDATE</button>
              </template>

        </form>
            </div>
          </div>
      </div>

          <div class="col-12 col-sm-12 col-md-8">
            <div class="card">
              <div class="card-header">
                   <h3>Barriles</h3>
              </div>
              <div class="card-body">
                  <table class="table s">
              <thead>
              <th>Cerveza</th>
              <th>Cantidad Disponible</th>
              <th>Estado</th>
              <th>IBU</th>
              <th>alcohol</th>
              <th>brewery</th>
              <th>Eliminar</th>
              <th>Editar</th>
              <th>Conectar</th>
              </thead>
              <tbody>
                <tr v-for="keg in kegs" >
                  <td>{{keg.beer}}</td>
                  <td>{{keg.quantitySaled+"/"+keg.quantity}}</td>
                  <td>{{selectStatus(keg.sta)}}</td>
                  <td>{{keg.ibu}}</td>
                  <td>{{keg.alcohol}}</td>
                  <td>{{keg.brewery.name}}</td>
                  <td><button class="btn btn-danger btn-sm" v-on:click="deleteKeg(keg._id)"><i class="material-icons">delete</i></button></td>
                  <td><button class="btn btn-primary btn-sm" v-on:click="updateKeg(keg._id)"><i class="material-icons">edit</i></button></td>
                  <template v-if="keg.sta === 1 || keg.sta === 2">
                    <td><button class="btn btn-primary btn-sm" v-on:click="connect(keg._id)"><i class="material-icons">power</i></button></td>
                  </template>
                  <template v-else-if="keg.sta === 4">
                    <td><button class="btn btn-primary btn-sm" v-on:click="disconnect(keg._id)"><i class="material-icons">power_off</i></button></td>
                  </template>
                   <template v-else>
                    <td><button class="btn btn-primary btn-sm disabled" ><i class="material-icons">power</i></button></td>
                  </template>
                  
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
const axios = require('axios')

class newKeg {
  constructor(id, beer, quantity, status, ibu, alcohol, brewery,quantitySaled) {
    this.id = id
    this.beer = beer
    this.quantity = quantity
    this.sta = status
    this.ibu = ibu
    this.alcohol = alcohol
    this.brewery = brewery
    this.quantitySaled = quantitySaled
  }
}

export default {
  data() {
    return {
      newKeg: {},
      kegs: [],
      breweries: [],
      quantities: [{
          text: '20'
        },
        {
          text: '30'
        },
        {
          text: '50'
        }
      ],
      status: [{
          text: 'Lleno',
          value: 1
        },
        {
          text: 'Empezado',
          value: 2
        },
      ],
      edit: false,
      kegToEdit: '',
      sale:false,



    }
  },
  created() {
    this.getKegs();
    this.getBreweries();
  },
  methods: {
    getKegs() {
      axios.get('http://localhost:3000/keg')
        .then(response => {
          console.log(response)
          this.kegs = response.data.Kegs

        }).catch(e => {
          console.log(e)

        })
    },
    addKeg() {

      if (this.edit === false) {

        axios.post('http://localhost:3000/keg',
            this.newKeg,
          ).then(res => {

            if (res.status === 200) {
              this.notifySucces("Barril","Barril cargado correctamente")            
            }
            this.getKegs(),
              this.newKeg = {}
          })
          .catch(e => {
            this.notifyError("Barril","Error al guardar el barril")
          })
      } else {
        axios.put(`http://localhost:3000/keg/${this.newKeg.id}`,
          this.newKeg
        ).then(res => {
          if (res.status === 200) {
              this.notifySucces("Barril",res.data.mensaje)
            this.getKegs()
            this.newKeg = {}
            this.edit = false
            this.sale = false
          }
        }).catch(e => {
          console.log(e.data)
          this.notifyError("Barril","Error al modificar barril ")
        })
      }
    },
    getBreweries() {
      axios.get('http://localhost:3000/brewery')
        .then(response => {
          this.breweries = response.data.Breweries
          console.log(response);
        })
    },
    deleteKeg(idKeg) {
      if(this.edit === false){
      axios.delete(`http://localhost:3000/keg/${idKeg}`)
        .then(res => {
          if (res.status === 200) {
            this.notifySucces("Barril",res.data.mensaje)
            this.getKegs()
          }
        }).catch(e => {
         this.notifyError("Barril","Error al eliminar barril")
        })
      }else{
        this.notifyWarning("Barril","Precione actualizar para poder eliminar el barril")
      }
    },
    updateKeg(idKeg) {
      axios.get(`http://localhost:3000/keg/${idKeg}`)
        .then(res => {
          if(res.data.sale){
              this.newKeg = new newKeg(res.data.keg._id, res.data.keg.beer,
            res.data.keg.quantity, res.data.keg.sta, res.data.keg.ibu,
            res.data.keg.alcohol, res.data.keg.brewery._id,res.data.keg.quantitySaled
          )
         
          this.edit = true;
          this.sale = false
          }else{
               this.newKeg = new newKeg(res.data.keg._id, res.data.keg.beer,
            res.data.keg.quantity, res.data.keg.sta, res.data.keg.ibu,
            res.data.keg.alcohol, res.data.keg.brewery._id,res.data.keg.quantitySaled
          )
            
            this.edit = true;
            this.sale = true
          }
        
        })
    },
    connect(idKeg){
     axios.put(`http://localhost:3000/keg/connect/${idKeg}` )
     .then(res => {
       console.log(res)
       this.getKegs();
       if(res.status === 200)
        this.notifySucces("Barril","Barril conectado")
     }).catch(e =>{
        this.notifyError("Barril","Error al conectar barril")
     })
  },
  disconnect(idKeg){
       axios.put(`http://localhost:3000/keg/disconect/${idKeg}` )
     .then(res => {
       console.log(res)
       this.getKegs();
       this.notifySucces("Barril","Barril desconectado")
     }).catch(e => {
        this.notifyError("Barril","Error al desconectar barril")
     })
  },
  selectStatus(status){
     switch (status) {
       case 1:
         return "lleno"
         break;
        case 2:
          return "Empezado"
          break
        case 3:
          return "Vacio"
          break
        case 4:
          return "Conectado"
          break
        case 5:
          return "terminado"
          break
     }
  },
  changeStatus(status){
    if(status === 1)
      this.newKeg.quantitySaled = this.newKeg.quantity
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
  },

}
</script>
<style>

</style>
