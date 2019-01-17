<template>
<div> 
<div id="brewery">
          <center><h1>CERVECERIAS</h1></center>
          <center><img :src="require('@/assets/sections/brewery.png')" alt="" class="position"></center>
          
      </div>  
  <div class="container">
    <div class="row mb-3">
      <div class="col-12 col-sm-6">
        <div v-if="errorMessage" class="alert alert-danger" role="alert">
            {{ errorMessage }}
          </div>
         <form v-on:submit.prevent="addBrewery">
         <div class="card mb-2 bg-dark">
           <div class="card-header">
             <h3>{{Cerveceria}}</h3>
           </div>
           <div class="card-body">
             <input type="text" class="form-control mb-1" placeholder="Cerveceria" v-model="newBrewery.name" required>
          <input type="text" class="form-control mb-3" placeholder="Direccion" v-model="newBrewery.address" required>
            <template v-if="edit === false">
              <div class="col-12 mb-3"><button class="btn btn-outline-success btn-block " >AGREGAR</button></div>
            </template>
            <template v-else>
              <div class="col-12 mb-3"><button class="btn btn-outline-success btn-block " >ACTUALIZAR</button></div>
            </template>
           </div>
         </div>
          <div class="card bg-dark">
           <div class="card-header">
            <h3>{{ContactoForm}}</h3>
           </div>
           <div class="card-body">
               <form v-on:submit.prevent="addcontact">
            <input type="text" class="form-control mb-1" placeholder="Nombre" v-model="newcontact.name" required>
            <input type="text" class="form-control mb-1" placeholder="Telefono" v-model="newcontact.tel" required>
            <input type="email" class="form-control mb-3" placeholder="Mail" v-model="newcontact.mail" required>
            <template v-if="editContact === false">
              <div class="col-12"><button class="btn btn-outline-primary btn-block" >AÑADIR CONTACTO</button></div>
            </template>
            <template v-else>
              <div class="col-12"><button class="btn btn-outline-primary btn-block" >ACTUALIZAR CONTACTO</button></div>
            </template>
          </form>
           </div>
         </div> 
        </form>
      </div>
      <div class="col-12 col-sm-6 table-responsive">
         <div class="card nuevacerveceria">
           <div class="card-header bg-dark ">
             <h3>{{Contacto}}</h3>
           </div>
           <div class="card-body">
             <table class="table ">
            <thead>
              <th>Nombre</th>
              <th>Telefono</th>
              <th>Email</th>
              <th>Eliminar</th>
              <th>Modificar</th>
            </thead>
            <tbody>
              <tr v-for="cont in contact">
                <td>{{cont.name}}</td>
                <td>{{cont.tel}}</td>
                <td>{{cont.mail}}</td>
                <td><button class="btn btn-outline-danger btn-sm" v-on:click="deleteContact(cont)"><i class="material-icons">delete</i></button></td>
                <td><button class="btn btn-outline-primary btn-sm" v-on:click="updateContact(cont)"><i class="material-icons">edit</i></button></td>
              </tr>
            </tbody>
          </table>
           </div>
         </div>          
      </div>
    </div>
    <div class="row">
      <div class="col-12  col-md-6">
        <div class="card">
          <div class="card-header bg-dark">
            <h3>Cervecerias</h3>
          </div>
          <div class="card-body">
            <table class="table  ">
            <thead>
              <th>Cerveceria</th>
              <th>Direccion</th>
              <th>contacto</th>
              <th>Eliminar</th>
              <th>Editar</th>
            </thead>
            <tbody>
              <tr v-for="brewery in breweries">
                <td>{{brewery.name}}</td>
                <th>{{brewery.address}}</th>
                <td><button class="btn btn-outline-success btn-sm" v-on:click="getcontact(brewery._id)"><i v-on:click="getcontact(brewery._id)" class="material-icons">contact_phone</i></button></td>
                <td><button class="btn btn-outline-danger btn-sm" v-on:click="showModal(brewery._id)"><i class="material-icons">delete</i></button></td>
                <td><button class="btn btn-outline-primary btn-sm" v-on:click="updateBrewery(brewery._id)"><i class="material-icons">edit</i></button></td>
              </tr>
            </tbody>
          </table>
          </div>
        </div>        
      </div>
       <div class="col-12 col-md-6 table-responsive">
         <div class="card">
           <div class="card-header bg-dark">
              <h3>Contactos cerveceria</h3>
           </div>
           <div class="card-body">
            <table class="table table-striped ">
              <thead>
                <th>Nombre</th>
                <th>Telefono</th>
                <th>Direccion</th>
              </thead>
              <tbody>
                <tr v-for="contact in contactBrewery">
                  <td>{{contact.name}}</td>
                  <td>{{contact.tel}}</td>
                  <td>{{contact.mail}}</td>
                  <td><a v-bind:href="whatsapp+contact.tel" target="_blank"  class="fab fa-whatsapp fa-lg"></a></td>
                </tr>
              </tbody>
          </table>
           </div>
         </div>
      </div>
  </div>
    </div>
        <modal name="delete" height="auto">
        <div class="container bg-dark">
          <div class="breadcrumb bg-warning">
            <h5 class>¿Esta seguro que desea eliminar la cerveceria?</h5>
          </div>

          <div class="input-group-pretend mb-3">
            <button class="btn btn-success" v-on:click="deleteBrewery(idBrewery)">Aceptar</button>
            <button class="btn btn-danger" v-on:click="hideModal()">Cancelar</button>
          </div>
        </div>
      </modal>
</div>
</template>
<script>
import Vue from 'vue'
import Joi from 'joi'
const schema = Joi.object().keys({
  id: Joi.string(),
  name: Joi.string().min(3).max(20).required(),
  contact: Joi.array().items(Joi.object({
    name: Joi.string().required(),
    tel: Joi.number().required(),
    mail: Joi.string().email().required(),
  })).min(1).required(),
  address : Joi.string().min(5).max(30).required()
})

const contactSchema = Joi.object().keys({
    _id: Joi.string(),
    name: Joi.string().min(3).max(20).required(),
    tel: Joi.number().required(),
    mail: Joi.string().email().required(),
})
class newBrewery{
  constructor(id,name,contacts,address){
    this.id = id
    this.name = name
    this.contact = contacts
    this.address = address
  }
}
const axios = require('axios')

export default {
data(){
  return{
    idBrewery:'',
    errorMessage:'',
      newBrewery:{
         contact:[],
      },
      newcontact:{},
      breweries:[],
      contact:[],
      contactBrewery:[],
      edit:false,
      editContact: false,
      Cerveceria :'Nueva cerveceria',
      Contacto : 'Contactos nueva cerveceria',
      ContactoForm: 'Nuevo contacto',
      whatsapp: 'https://wa.me/54',
      
  }



},
watch:{
  newBrewery:{
    handler(){
      this.errorMessage = ''
    },
    deep:true
  },
  newcontact:{
    handler(){
      this.errorMessage = ''
    },
    deep:true
  }
},
created(){
  this.getBreweries();
},
methods:{
  addcontact(){
    if(this.validContact()){
       console.log("Entre")
    if(!this.editContact){
      this.contact.push(this.newcontact)
      this.newBrewery.contact = this.contact
       Vue.notify({
        group: 'foo',
        type:'success',
        title: 'Contacto',
        text: 'Contacto agregado correctamente'
      })
      this.newcontact = {}
    }else{
      console.log("Editooo")
      this.newcontact = { }
      this.editContact = false;
      Vue.notify({
        group: 'foo',
        type:'success',
        title: 'Contacto',
        text: 'Contacto editado correctamente'
      })
    }
    
  }
  },
  deleteContact(contact){
    if(!this.editContact){
    this.contact.splice(contact,1)
    Vue.notify({
        group: 'foo',
        type:'success',
        title: 'Contacto',
        text: 'Contacto eliminado correctamente'
      })
    }else{
      Vue.notify({
        group: 'foo',
        type:'warn',
        title: 'Contacto',
        text: 'Termine de editar contacto para poder eliminar'
      })
    }
  },
  updateContact(contact){
    console.log("Hola")
    this.editContact = true
    this.newcontact = contact;
  
  },
  addBrewery(){
    
    if(this.edit === false){

       if(this.contact.length === 0){
        Vue.notify({
            group: 'foo',
            type:'warn',
            title: 'Contacto',
            text: 'Ingrese al menos un contacto'
      })
    }else{
      axios({
      method:'POST',
      url:'http://157.230.157.236/brewery',
      data:this.newBrewery,
      headers: {authorization: `Bearer ${localStorage.token}`}
      }).then(res => {
        console.log(res)
        if(res.status == 200){
          this.getBreweries()
          this.newBrewery = {}
          this.contact = []
           Vue.notify({
            group: 'foo',
            type:'success',
            title: 'Cerveceria',
            text: res.data.message
      })
    }
      }).catch(e =>{
        console.log(e)
         Vue.notify({
            group: 'foo',
            type:'error',
            title: 'Cerveceria',
            text: e.response.data
      })
      })
    }
      }else{
        if(this.contact.length === 0){
           Vue.notify({
            group: 'foo',
            type:'warn',
            title: 'Contacto',
            text: 'Ingrese al menos un contacto'
      })
        }else{
        axios({
          method:'PUT',
          url:`http://157.230.157.236/brewery/${this.newBrewery.id}`,
          data:this.newBrewery,
          headers: {authorization: `Bearer ${localStorage.token}`}
        }).then(res => {
          console.log(res)
          this.getBreweries()
          this.newBrewery={}
          this.contact=[]
          this.edit = false
          this.Cerveceria ='Nueva cerveceria'
          this.Contacto = 'Contactos nueva cerveceria'
          if(res.status == 200){
          Vue.notify({
            group: 'foo',
            type:'success',
            title: 'Cerveceria',
            text: res.data.message
          })
          }

        }).catch(e => {
          Vue.notify({
            group: 'foo',
            type:'error',
            title: 'Cerveceria',
            text: `Error al actualizar la cerveceria ${e}`
      })
        })
      }
      }
    
  },
  getBreweries(){
    axios({
      url:'http://157.230.157.236/brewery',
      headers: {authorization: `Bearer ${localStorage.token}`}
    })
    .then(res=>{
      console.log(res);
      this.breweries = res.data.Breweries;
    })
    .catch(e =>{
      console.log(e)
    })
  },
  getcontact(idBrewery){
    axios({
      url:`http://157.230.157.236/brewery/${idBrewery}`,
      headers: {authorization: `Bearer ${localStorage.token}`}
      })
    .then(res =>{
      console.log(res.data.brewery.contact)
      this.contactBrewery = res.data.brewery.contact
    })
  },
   showModal(idBrewery) {
     if(!this.edit){
      this.idBrewery = idBrewery;
      this.$modal.show("delete");
     }else{
      Vue.notify({
            group: 'foo',
            type:'warn',
            title: 'Cerveceria',
            text: 'Termine de editar la cerveceria para poder eliminar.'
      })
    }
    },
    hideModal() {
      this.$modal.hide("delete");
    },
  deleteBrewery(idBrewery){

    this.hideModal()
    axios({
      method:'delete',
      url:`http://157.230.157.236/brewery/${idBrewery}`,
      headers: {authorization: `Bearer ${localStorage.token}`}
    })
    .then(res => {
      console.log(res)
   
      if(res.status == 200){
         Vue.notify({
            group: 'foo',
            type:'success',
            title: 'Cerveceria',
            text: res.data.mensaje
      })
         this.getBreweries();
      }else if(res.status == 202){
         Vue.notify({
            group: 'foo',
            type:'warn',
            title: 'Cerveceria',
            text: res.data.mensaje
      })
      }

    }).catch(e => {

      Vue.notify({
            group: 'foo',
            type:'error',
            title: 'Cerveceria',
            text: e.response.data
      })
    })
    
  },
  updateBrewery(idBrewery){
      axios({
        url:`http://157.230.157.236/brewery/${idBrewery}`,
        headers: {authorization: `Bearer ${localStorage.token}`}
    })
    .then(res =>{
      console.log('Soy la brewery'+res.data.brewery)
      this.newBrewery = new newBrewery(res.data.brewery._id,res.data.brewery.name,res.data.brewery.contact,res.data.brewery.address)
      this.contact = this.newBrewery.contact
      this.Cerveceria = 'Editar cerveceria'
      this.Contacto = 'Editar contactos'
      this.edit = true
    })
  },
  validBrewery(){
    this.id = id
    this.name = name
    this.contact = contacts
    this.address = address
    const result = Joi.validate(this.newBrewery,schema)
    if(result.error === null){
      return true
    }else{
      console.log(result.error)
      if(result.error.message.includes('name'))
        this.errorMessage = 'El nombre ingresado es incorrecto'
      if(result.error.message.includes('contact'))
        this.errorMessage = 'Ingrese al menos un contacto'
      if(result.error.message.includes('address'))
        this.errorMessage = 'La direccion ingresada es incorrecta'
     
    }
  },
    validContact(){
    const result = Joi.validate(this.newcontact,contactSchema)
    console.log(result.error)
    if(result.error === null){
      return true
    }else{
      if(result.error.message.includes('name'))
        this.errorMessage = 'El nombre ingresado es incorrecto'
      if(result.error.message.includes('tel'))
        this.errorMessage = 'El telefono ingresado es incorrecto'
      if(result.error.message.includes('email'))
        this.errorMessage = 'El mail ingresado es incorrecto'
    }
  }
},

}
</script>
<style>

</style>
