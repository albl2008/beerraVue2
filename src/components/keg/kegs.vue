<template>
  <div>
    <div id="barriles">
      <center>
        <h1>BARRILES</h1>
      </center>
      <center><img :src="require('@/assets/sections/kegs.png')" alt="" class="position"></center>
    </div>
    <div class="container">

      <div class="row">
        <div class="col-12 col-sm-12  col-md-3">
          <div v-if="errorMessage" class="alert alert-danger" role="alert">
            {{ errorMessage }}
          </div>
          <div class="card bg-dark">

            <template v-if="edit === false">
              <div class="card-header">
                <h3>AGREGAR BARRIL</h3>
              </div>
            </template>

            <template v-else>
              <div class="card-header">
                <h3>ACTUALIZAR BARRIL</h3>
              </div>
            </template>

            <div class="card-body">

            <form v-on:submit.prevent="addKeg" >

              <div class="input-group-pretend mb-3">
                <template v-if="edit===false">
                <span class="badge badge-success">N°{{Object.keys(kegs).length+1}}</span><br><br>
                </template>
                <template v-else>
                <span class="badge badge-success">N°{{Object.keys(kegs).length}}</span> 
                </template>
              </div>
            <input type="text" class="form-control mb-1" v-model="newKeg.beer" placeholder="Estilo" required>
        
            <template v-if="sale === false">
              <select v-model="newKeg.quantity" class="custom-select mb-1" required >
                  <option class="courier" value="" disabled selected>Tamaño</option>
                  <option v-for="q in quantities" v-bind:value="q.text">
                    {{q.text}}
                  </option>
              </select>
            </template>

              <div v-for="s in status" class="form-check form-check-inline courier">
                <input required type="radio"  name="status" v-on:click="changeStatus(s.value)" v-bind:value="s.value"  v-model="newKeg.sta"  class="form-check-input mb-1" >
                <label for="one">{{s.text}}</label>
              </div>

              
               
              


                  <template v-if="newKeg.sta === 2">
                    <input type="text" class="form-control mb-1" v-model="newKeg.quantitySaled" placeholder="Cantidad disponible"
                      required>
                  </template>



                  <input type="text" class="form-control mb-1" v-model="newKeg.ibu" placeholder="IBU" required>
                  <input type="text" class="form-control mb-1" v-model="newKeg.alcohol" placeholder="Alcohol" required>

                  <select v-model="newKeg.brewery" class="custom-select mb-1" required >
                    <option class="courier" value="" disabled selected>Cerveceria</option>
                    <option v-for="brewery in breweries" v-bind:value="brewery._id">
                      {{brewery.name}}
                    </option>

                  </select>
                  <swatches class="text-center" v-model="color" :colors="colors" row-length="5" shapes="circles"
                    show-border popover-to="right">
                  </swatches>
                

                <div class="card-footer">
                  <template v-if="edit === false">
                    <button class="btn btn-outline-success btn-block">Agregar</button>
                  </template>
                  <template v-else>
                    <button class="btn btn-outline-primary btn-block">Actualizar</button>
                  </template>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div class="col-12 col-sm-12 col-md-9">
          <div class="card">
            <div class="card-header bg-dark">
              <h3>LISTADO DE BARRILES</h3>
            </div>
            <div class="card-body">
              <table class="table s">
                <thead>
                  <th>N°</th>
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
                  <tr v-for="(keg,i) in kegs">
                    <td> <span class="badge badge-success">{{i+1}}</span></td>
                    <td>{{keg.beer}}</td>
                    <td>{{keg.quantitySaled+"/"+keg.quantity}}</td>
                    <td>{{selectStatus(keg.sta)}}</td>
                    <td>{{keg.ibu}}</td>
                    <td>{{keg.alcohol}}</td>
                    <td>{{keg.brewery.name}}</td>
                    <td><button class="btn btn-outline-danger btn-sm" v-on:click="showModal(keg._id)"><i class="material-icons">delete</i></button></td>
                    <td><button class="btn btn-outline-primary btn-sm" v-on:click="updateKeg(keg._id)"><i class="material-icons">edit</i></button></td>
                    <template v-if="keg.sta === 1 || keg.sta === 2">
                      <td><button class="btn btn-outline-success btn-sm" v-on:click="connect(keg._id)"><i class="material-icons">power</i></button></td>
                    </template>
                    <template v-else-if="keg.sta === 4">
                      <td><button class="btn btn-outline-danger btn-sm" v-on:click="disconnect(keg._id)"><i class="material-icons">power_off</i></button></td>
                    </template>
                    <template v-else>
                      <td><button class="btn btn-outline-primary btn-sm disabled"><i class="material-icons">power</i></button></td>
                    </template>

                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
         <modal name="delete" height="auto">
        <div class="container bg-dark ">
          <div class="breadcrumb bg-warning">
              <h5 class="">¿Esta seguro que desea eliminar el Barril?</h5>
          </div>
          
            <div class="input-group-pretend mb-3">
                  <button class="btn btn-success"  v-on:click="deleteKeg(idKeg)" >Aceptar</button>
                  <button class="btn btn-danger" v-on:click="hideModal()">Cancelar</button>
            </div>
            
        </div>
      </modal>
  </div>
</template>
<script>
import Joi from 'joi'
import Vue from 'vue'
import Swatches from 'vue-swatches'
import "vue-swatches/dist/vue-swatches.min.css"
import axios from 'axios'

const schema = Joi.object().keys({
    id: Joi.string(),
    beer : Joi.string().min(2).max(30).required(),
    quantity : Joi.number().positive().min(20).max(50).required(),
    sta : Joi.number().positive().required(),
    ibu : Joi.number().positive().required(),
    alcohol : Joi.number().positive().required(),
    brewery : Joi.required(),
    quantitySaled : Joi.number().positive().max(50)
})

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
  components: { Swatches },
  data() {
    return {
     idKeg: '',
      errorMessage:'',
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
      color:'#F3F993',
      colors: [
        ['#F3F993','#F5F75C','#F6F513','#EAE615','#E0D01B' ],
        ['#D5BC26','#CDAA37','#C1963C','#BE8C3A','#BE823A' ],
        ['#C17A37','#BF7138','#BC6733','#B26033','#A85839' ],
        ['#985336','#8D4C32','#7C452D','#6B3A1E','#5D341A' ],
        ['#4E2A0C','#4A2727','#361F1B','#261716','#231716' ],
        ['#19100F','#16100F','#120D0C','#100B0A','#050B0A' ]
      ],
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
    this.getKegs();
    this.getBreweries();
  },
  methods: {
    getKegs() {
      axios({
        url: 'http://localhost:3000/keg',
        headers: {authorization: `Bearer ${localStorage.token}`}
      })
        .then(response => {
          console.log(response)
          this.kegs = response.data.Kegs

        }).catch(e => {
          console.log(e)
        
        })
    },
    addKeg() {
      if(this.validKeg()){
      if (this.edit === false) {

        axios({
            method:'POST',
            url:'http://localhost:3000/keg',
            data: this.newKeg,
            headers: {authorization: `Bearer ${localStorage.token}`}
          }).then(res => {

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
        axios({
          method: 'PUT',
          url:`http://localhost:3000/keg/${this.newKeg.id}`,
          data:this.newKeg,
          headers: {authorization: `Bearer ${localStorage.token}`}
        }).then(res => {
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
      }
    },
    getBreweries() {
      axios({
        url:'http://localhost:3000/brewery',
        headers: {authorization: `Bearer ${localStorage.token}`}
        })
        .then(response => {
          this.breweries = response.data.Breweries
          console.log(response);
        })
    },
    showModal(idKeg){
      this.idKeg = idKeg
        this.$modal.show('delete');
         
    },
    hideModal(){
      this.$modal.hide('delete');
    },
    deleteKeg(idKeg) {
     this.hideModal()
      if(this.edit === false ){
      axios({
        method:'DELETE',
        url:`http://localhost:3000/keg/${idKeg}`,
        headers: {authorization: `Bearer ${localStorage.token}`}

        })
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
      axios({
        url:`http://localhost:3000/keg/${idKeg}`,
        headers: {authorization: `Bearer ${localStorage.token}`}
        })
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
     axios({
       method:'PUT',
       url:`http://localhost:3000/keg/connect/${idKeg}`,
        headers: {authorization: `Bearer ${localStorage.token}`}
     })
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
       axios({
         method:'PUT',
         url:`http://localhost:3000/keg/disconect/${idKeg}`,
         headers: {authorization: `Bearer ${localStorage.token}`}
       })
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
 validKeg(){
            const result = Joi.validate(this.newKeg,schema)
            if(this.newKeg.quantity < this.newKeg.quantitySaled){
                  this.errorMessage = 'La cantidad disponible no puede ser mayor la cantidad del barril'
            }
            else if(result.error === null){
                
                return true
            }else{
                console.log(result.error.message)
                
                if(result.error.message.includes('beer')){
                    this.errorMessage = 'Hay algo mal con el estilo ingresado.'
                }
                if(result.error.message.includes('quantity')){
                    this.errorMessage = 'Es necesario seleccionar una cantidad.'
                }
                if(result.error.message.includes('status')){
                    this.errorMessage = 'Es necesario seleccionar un estado.'
                }
                 if(result.error.message.includes('ibu')){
                    this.errorMessage = 'Hay algo mal con el ibu ingresado.'
                }
                 if(result.error.message.includes('alcohol')){
                    this.errorMessage = 'Hay algo mal con el alcohol ingresado.'
                }
                if(result.error.message.includes('brewery')){
                    this.errorMessage = 'Es necesarios eleccionar una cerveceria.'
                }
                if(result.error.message.includes('quantitySaled')){
                    this.errorMessage = 'Hay algo mal con la cantidad disponible.'
                }
                //this.errorMessage = 
            }
           
        }
  },

}
</script>
<style>

</style>
