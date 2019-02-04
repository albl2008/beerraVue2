<template>
  <div>
    <div id="barriles">
  
      <div class="row" style="width: 50%; margin: 0 auto;"><div class="centerhead">
        <h1 class="h1head">Barriles</h1></div>
        <img :src="require('@/assets/beerra/kegg2.png')" alt class="underh1">
      </div>
      <center></center>
    </div>
    <div class="container">

      <div class="row">
        <div class="col-12 col-sm-12  col-md-3">
          <div v-if="errorMessage" class="alert alert-danger" role="alert">
            {{ errorMessage }}
          </div>
          <div class="card bg-dark limitHeight">

            <template v-if="edit === false">
              <div class="card-header bg-dark">
                <h3 class="tablaHead">Agregar barril</h3>
              </div>
            </template>

            <template v-else>
              <div class="card-header bg-dark">
                <h3 class="tablaHead">Actualizar barril</h3>
              </div>
            </template>

            <div class="card-body tabla">

            <form v-on:submit.prevent="addKeg" >

              <!-- <div class="input-group-pretend mb-3">
                <template v-if="edit===false">
                  <center>
                <span style="background: #2b2b2b; font-size: 30px; font-family: 'Roboto', sans-serif;
                border: 1px solid #646464;" class="badge badge-dark"><span class="litros">n°</span> <span class="number"
                >{{Object.keys(kegs).length+1}}</span></span></center>
                </template>
                <template v-else>
                  <center>
                <span style="background: #2b2b2b; font-size: 30px; font-family: 'Roboto', sans-serif;
                border: 1px solid #646464;" class="badge badge-dark"><span class="litros">n°</span> <span class=
                "number">{{Object.keys(kegs).length}}</span></span> </center>
                </template>
              </div> -->
              <label>Estilo</label>
            <input type="text" class="form-control mb-1" v-model="newKeg.beer" placeholder="" required>
        
            <template v-if="sale === false">
              <label>Tamaño</label>
              <select v-model="newKeg.quantity" class="custom-select mb-1" required >
                  <option class="courier" value="" disabled selected>Tamaño</option>
                  <option v-for="q in quantities" v-bind:value="q.text">
                    {{q.text}}
                  </option>
              </select>
            
<label>Estado</label></br>
              <div v-for="s in status" class="form-check form-check-inline courier">
                <input required type="radio"  name="status" v-on:click="changeStatus(s.value)" v-bind:value="s.value"  v-model="newKeg.sta"  class="form-check-input mb-1" >
                <label class="roboto" style="font-size: 16px;" for="one">{{s.text}}</label>
              </div></br>
    </template>
              
               
              


                  <template v-if="newKeg.sta === 2">
                    <input type="text" class="form-control mb-1" v-model="newKeg.quantitySaled" placeholder="Cantidad disponible"
                      required>
                  </template>
                    <label>IBU</label>  <label style="float: right; text-align: left;">Alcohol</label>
                    <div class="ibuandalco">

                  <input style="width: 48%; float: left;" type="text" class="form-control mb-1" v-model="newKeg.ibu" placeholder="" required>
                
                  <input style="width: 48%; float: right;" type="text" class="form-control mb-1" v-model="newKeg.alcohol" placeholder="" required>
</div>
  <label>Cervecería</label>
                  <select  style="margin-bottom: 1em !important;" v-model="newKeg.brewery" class="custom-select mb-1" required >
                    <option class="courier" value="" disabled selected>Cerveceria</option>
                    <option v-for="brewery in breweries" v-bind:value="brewery._id">
                      {{brewery.name}}
                    </option>

                  </select>
                  <!-- <swatches style="" class="text-center" v-model="color" :colors="colors" row-length="5" shapes="circles"
                    show-border popover-to="right">
                  </swatches>
                 -->

                
                  <template v-if="edit === false">
                    <button style="width: 33% !important; float: left;" class="btn btn-outline-success btn-block">Agregar</button>
                  </template>
                  <template v-else>
                    <button style="margin-top:1em; width: 37% !important; float: left;" class="btn btn-outline-primary btn-block">Actualizar</button>
                  </template>
       
              </form>
            </div>
          </div>
        </div>

        <div style="margin-bottom: 3em;" class="col-12 col-sm-12 col-md-9">
          <div class="card tabla bg-dark">
            <div class="card-header tituloCardHeader bg-dark">
              <h3 class="tablaHead">Barriles</h3>
            </div>
            <div class="card-body tabla">
              <table class="table s">
                <thead>
                  <th>Cerveza</th>
                  <th>Disponible</th>
                  <th>Estado</th>
                  <th>IBU</th>
                  <th>Alcohol</th>
                  <th>Cerveceria</th>
                  <th>Opciones</th>
              
                </thead>
                <tbody>
               
                  <tr v-for="keg in kegs" class="trHigh">
                       <template v-if="keg.sta !== 5">
                    <td style="max-width: 120px;" class="nowrap">{{keg.beer}}</td>
                    <td><strong style="font-size: 16px;">{{keg.quantitySaled}}<span class="litros"> l</span></strong> /{{keg.quantity}}<span class="litros"> l</span></td>
                    <td>{{selectStatus(keg.sta)}}</td>
                    <td>{{keg.ibu}}</td>
                    <td>{{keg.alcohol}} %</td>
                    <td style="max-width: 120px;" class="nowrap">{{keg.brewery.name}}</td>
                
                    <div id="options" class="opacityOut">
                    <td><button class="btn btn-outline-danger btn-sm fix disableBorder" v-on:click="showModal(keg._id)"><i class="material-icons resize">clear</i></button></td>
                    <td><button class="btn btn-outline-primary btn-sm fix disableBorder" v-on:click="updateKeg(keg._id)"><i class="material-icons resize">edit</i></button></td>
                    <template v-if="keg.sta === 1 || keg.sta === 2">
                      <td><button class="btn btn-outline-success btn-sm fix disableBorder" v-on:click="connect(keg._id)"><i class="material-icons resize">power</i></button></td>
                    </template>
                    <template v-else-if="keg.sta === 4">
                      <td><button class="btn btn-outline-danger btn-sm fix disableBorder " v-on:click="disconnect(keg._id)"><i class="material-icons resize">power_off</i></button></td>
                    </template>
                    <template v-else>
                      <td><button class="btn btn-outline-primary btn-sm fix disabled disableBorder vacio"><i class="material-icons resize"><strong>remove_circle_outline</strong></i></button></td>
                    </template>
                    </div>
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
        <div class="container bg-dark card tabla " style="background: rgb(34, 34, 34) !important;">
          <div class=""><center>
              <h5 class="tablaHead">¿Esta seguro que desea eliminar el Barril?</h5></center>
          </div>
          <center>
            <div class="input-group-pretend mb-3" style="margin-bottom: 0 !important;">
                  <button class="btn btn-outline-success"  v-on:click="deleteKeg(idKeg)" >Aceptar</button>
                  <button class="btn btn-outline-danger" style="" v-on:click="hideModal()">Cancelar</button>
            </div></center>
            
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
        url: process.env.ROOT_API + 'keg',
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
           console.log(this.storage.load)
          this.storage.load = true
        axios({
            method:'POST',
            url:process.env.ROOT_API + 'keg',
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
                
          this.storage.load = false
            console.log(this.storage.load)
      } else {
        axios({
          method: 'PUT',
          url:process.env.ROOT_API + `keg/${this.newKeg.id}`,
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
        url:process.env.ROOT_API + 'brewery',
        headers: {authorization: `Bearer ${localStorage.token}`}
        })
        .then(response => {
          this.breweries = response.data.Breweries
          console.log(response);
        })
    },
    showModal(idKeg){
      if(!this.edit){
      this.idKeg = idKeg
        this.$modal.show('delete');
      }else{
        this.notifyWarning("Barril","Termine de editar barril")
      }
    },
    hideModal(){
      this.$modal.hide('delete');
    },
    deleteKeg(idKeg) {
     this.hideModal()
      if(this.edit === false ){
      axios({
        method:'DELETE',
        url:process.env.ROOT_API + `keg/${idKeg}`,
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
        url:process.env.ROOT_API + `keg/${idKeg}`,
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
      if(!this.edit){
     axios({
       method:'PUT',
       url:process.env.ROOT_API + `keg/connect/${idKeg}`,
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
      }else{
        this.notifyWarning("Barril","Termine de editar barril")
      }
  },
  disconnect(idKeg){
    if(!this.edit){
       axios({
         method:'PUT',
         url:process.env.ROOT_API + `keg/disconect/${idKeg}`,
         headers: {authorization: `Bearer ${localStorage.token}`}
       })
     .then(res => {
       console.log(res)
       this.getKegs();
       this.notifySucces("Barril","Barril desconectado")
     }).catch(e => {
        this.notifyError("Barril","Error al desconectar barril")
     })
    }else{
      this.notifyWarning("Barril","Termine de editar barril")
    }
  },
  selectStatus(status){
     switch (status) {
       case 1:
         return "Lleno"
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
          return "Pagado"
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
<style scoped>

.tabla{
  background: #272727 !important;
  border-radius: 0.6em;
}

.card-header.tituloCardHeader.bg-dark{
  padding-bottom: 1em;
}
.card-body{
  background: none;
}
.card{
  background: #272727;
}
.fix{
  margin-left: 0.4em;
}
/* 
.opacityOut{
  opacity: 0.3;
}

.opacityOut:hover{
  opacity: 1;
} */

.trHigh{

}

.trHigh:hover{
background: rgba(255, 255, 255, 0.063);
}

.card-body.tabla{

}

.input-group-pretend.mb-3{
  font-size: 30px;
  height: 52px !important;
}

.number{
  font-size: 32px;
  font-family: 'Lobster', cursive;
}

.btn.btn-outline-success.btn-block{
  width: 100% !important;
  margin-top: 1em;
}

.limitHeight{

  /* position: static !important; */
  width: 257px !important;
}
</style>
