<template>
    <div class="container">
      <div class="row">
        <div class="col-12 col-sm-12  col-md-4">
          <div class="card">
            <div class="card-header"><h3>Nuevo Barril</h3></div>
            <div class="card-body">
                      <form v-on:submit.prevent="addKeg" >

          <div class="input-group-pretend mb-3">
            <input type="text" class="form-control mb-1" v-model="newKeg.beer" placeholder="Beer" required>
              <select v-model="newKeg.quantity" class="custom-select mb-1" required >
                 
              <option v-for="q in quantities" v-bind:value="q.text">
                {{q.text}}
              </option>

            </select>
            <label >Estado: </label>
            <div v-for="s in status" class="form-check form-check-inline">
              <input required type="radio"  name="status" v-bind:value="s.value"  v-model="newKeg.sta" class="form-check-input mb-1" >
              <label for="one">{{s.text}}</label>

            </div>
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
              <th>Cantidad</th>
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
                  <td>{{keg.quantity}}</td>
                  <td>{{keg.sta}}</td>
                  <td>{{keg.ibu}}</td>
                  <td>{{keg.alcohol}}</td>
                  <td>{{keg.brewery.name}}</td>
                  <td><button class="btn btn-danger btn-sm" v-on:click="deleteKeg(keg._id)"><i class="material-icons">delete</i></button></td>
                  <td><button class="btn btn-primary btn-sm" v-on:click="updateKeg(keg._id)"><i class="material-icons">edit</i></button></td>
                  <td><button class="btn btn-primary btn-sm" v-on:click="connect(keg._id)"><i class="material-icons">power</i></button></td>
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
  constructor(id, beer, quantity, status, ibu, alcohol, brewery) {
    this.id = id
    this.beer = beer
    this.quantity = quantity
    this.sta = status
    this.ibu = ibu
    this.alcohol = alcohol
    this.brewery = brewery

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
          text: 'Empesado',
          value: 2
        },
        {
          text: 'Vacio',
          value: 3
        }
      ],
      edit: false,
      kegToEdit: '',



    }
  },
  created() {
    this.getKegs();
    this.getBreweries();
  },
  methods: {
    getKegs() {
      axios.get('https://serverbeerra.herokuapp.com/keg')
        .then(response => {
          console.log(response)
          this.kegs = response.data.Kegs

        }).catch(e => {
          console.log(e)

        })
    },
    addKeg() {

      if (this.edit === false) {

        axios.post('https://serverbeerra.herokuapp.com/keg',
            this.newKeg,
          ).then(res => {

            if (res.status === 200) {
              Vue.notify({
                group: 'foo',
                type: 'success',
                title: 'Contacto',
                text: res.data.mensaje
              })
            }
            this.getKegs(),
              this.newKeg = {}
          })
          .catch(e => {
            Vue.notify({
              group: 'foo',
              type: 'error',
              title: 'Barril',
              text: `Error al guardar barril ${e}`
            })
          })
      } else {
        axios.put(`https://serverbeerra.herokuapp.com/keg/${this.newKeg.id}`,
          this.newKeg
        ).then(res => {
          if (res.status === 200) {
            Vue.notify({
              group: 'foo',
              type: 'success',
              title: 'Barril',
              text: res.data.mensaje
            })
            this.getKegs()
            this.newKeg = {}
            this.edit = false
          }
        }).catch(e => {
          console.log(e.data)
          Vue.notify({
            group: 'foo',
            type: 'error',
            title: 'Barril',
            text: `Error al actualizar el barril ${e}`
          })
        })
      }
    },
    getBreweries() {
      axios.get('https://serverbeerra.herokuapp.com/brewery')
        .then(response => {
          this.breweries = response.data.Breweries
          console.log(response);
        })
    },
    deleteKeg(idKeg) {
      axios.delete(`https://serverbeerra.herokuapp.com/keg/${idKeg}`)
        .then(res => {
          if (res.status === 200) {
            Vue.notify({
              group: 'foo',
              type: 'success',
              title: 'Barril',
              text: res.data.mensaje
            })
            console.log(res)
            this.getKegs()
          }
        }).catch(e => {
          Vue.notify({
            group: 'foo',
            type: 'error',
            title: 'Barril',
            text: `Error al eliminar el barril ${e}`
          })
        })
    },
    updateKeg(idKeg) {
      axios.get(`https://serverbeerra.herokuapp.com/keg/${idKeg}`)
        .then(res => {
          
          this.newKeg = new newKeg(res.data.keg._id, res.data.keg.beer,
            res.data.keg.quantity, res.data.keg.sta, res.data.keg.ibu,
            res.data.keg.alcohol, res.data.keg.brewery._id
          )
          console.log(this.newKeg.brewery)
          this.edit = true;
        })
    },
    connect(idKeg){
     axios.put(`https://serverbeerra.herokuapp.com/keg/connect/${idKeg}` )
     .then(res => {
       console.log(res)
       this.getKegs();
     })
  }
  },

}
</script>
<style>

</style>
