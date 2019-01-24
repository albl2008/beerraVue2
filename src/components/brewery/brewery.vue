<template>
<div> 
<div id="brewery" >
          <div class="row" style="width: 50%; margin: 0 auto; "><div class="centerhead">
        <h1 class="h1head">Cervecerías</h1>
        </div>
        <img :src="require('@/assets/beerra/cerveceria2x.png')" alt class="underh1">
        
      </div>
          
      </div>  
  <div class="container">
    <div class="row mb-3">
      <div class="col-12 col-sm-6">
        <div v-if="errorMessage" class="alert alert-danger" role="alert">
            {{ errorMessage }}
          </div>
          <div class=""> <!-- -->
         <form v-on:submit.prevent="addBrewery">
         <div class="card bg-dark" style="padding: 1em;">
           <h3 class="tablaHead bg-dark">Nueva entrada</h3>
          <div class="" style="border: none !important;">
          
           <div class="card-body change" style="width: 48%;">
             <h3 class="tablaHead" style="">{{ContactoForm}}</h3>
               <form v-on:submit.prevent="addcontact">
                 <label>Nombre</label>
            <input type="text" class="form-control mb-1" placeholder="" v-model="newcontact.name" required>
            <label>Teléfono</label>
            <input type="text" class="form-control mb-1" placeholder="" v-model="newcontact.tel" required>
            <label>Email</label>
            <input type="email" class="form-control mb-3" placeholder="" v-model="newcontact.mail" required>
            <template v-if="editContact === false">
              <div class="" ><button style=" width: 73px; float: left; margin-right: 1em;" class="btn btn-outline-primary btn-block" >Añadir</button>
              <span style="color: gray; margin: 0 auto;">Primer paso.</span>
              </div>
            </template>
            <template v-else>
              <div class="" style="width: 79px; "><button class="btn btn-outline-primary btn-block" >Actualizar</button></div>
            </template>
          </form>
           </div>
         </div> 

         <div class="" style="border: none !important;">
          
           <div class="card-body change" style="width: 48%; position: absolute; margin-left: 47%; top: 2.9em; height: 325px;">
             <h3 class="tablaHead">{{Cerveceria}}</h3>
             <label>Cervecería</label>
             <input type="text" class="form-control mb-1" placeholder="" v-model="newBrewery.name" required>
             <label>Dirección</label>
          <input type="text" class="form-control mb-3" placeholder="" v-model="newBrewery.address" required>
            <template v-if="edit === false">
              <div class="" style="margin-top: 6.4em;" ><button style="width: 73px; float: left; margin-right: 1em;" class="btn btn-outline-success btn-block " >Agregar</button>
              <span style="color: gray; margin: 0 auto;">Segundo paso.</span></div>
            </template>
            <template v-else>
              <div class="" style="width: 82px; margin-top: 6.4em;"><button class="btn btn-outline-success btn-block " >Actualizar</button></div>
            </template>
           </div>
         </div>
         </div>
        </form>
        </div>
      </div>
      <div class="col-12 col-sm-6 table-responsive">
         <div class="card nuevacerveceria" style="">
           <div class="card-header tituloCardHeader bg-dark " style="border-radius: 0">
             <h3 class="tablaHead">{{Contacto}}</h3>
           </div>
           <div class="card-body change" >
             <table class="table ">
            <thead>
              <th>Nombre</th>
              <th>Teléfono</th>
              <th>Email</th>
              <th>Opciones</th>
              
            </thead>
            <tbody>
              <tr class="trHigh" v-for="cont in contact">
                <td style="max-width: 120px;" class="nowrap hoverShow">{{cont.name}}</td>
                <td style="max-width: 105px;" class="nowrap hoverShow">{{cont.tel}}</td>
                <td style="max-width: 160px;" class="nowrap hoverShow">{{cont.mail}}</td>
                <div class="options">
                <td style="width: 75px;"><button class="btn btn-outline-danger btn-sm fix disableBorder" v-on:click="deleteContact(cont)"><i class="material-icons resize">clear</i></button></td>
                <td><button class="btn btn-outline-primary btn-sm fix disableBorder" v-on:click="updateContact(cont)"><i class="material-icons resize">edit</i></button></td>
             </div>
              </tr>
            </tbody>
          </table>
           </div>
         </div>          
      </div>
    </div>
    <div class="row" style="margin-bottom: 3em;">
      <div class="col-12  col-md-6">
        <div class="card nuevacerveceria" style="margin-top: 1.4em;">
          <div class="card-header tituloCardHeader bg-dark">
            <h3 class="tablaHead">Cervecerías</h3>
          </div>
          <div class="card-body change">
            <table class="table  ">
            <thead>
              <th>Cervecería</th>
              <th>Dirección</th>
              <th>Opciones</th>
             
            </thead>
            <tbody>
              <tr class="trHigh" v-for="brewery in breweries">
                <td class="nowrap" style="max-width: 160px;">{{brewery.name}}</td>
                <th class="nowrap hoverShow roboto" style="max-width: 150px; font-weight: normal;">{{brewery.address}}</th>
                <div class="options">
                <td><button class="btn btn-outline-success btn-sm fix disableBorder" v-on:click="getcontact(brewery._id)"><i v-on:click="getcontact(brewery._id)" class="material-icons resize">contact_phone</i></button></td>
                <td><button class="btn btn-outline-danger btn-sm fix disableBorder" v-on:click="showModal(brewery._id)"><i class="material-icons resize">clear</i></button></td>
                <td><button class="btn btn-outline-primary btn-sm fix disableBorder" v-on:click="updateBrewery(brewery._id)"><i class="material-icons resize">edit</i></button></td>
              </div></tr>
            </tbody>
          </table>
          </div>
        </div>        
      </div>
       <div class="col-12 col-md-6 table-responsive">
         <div class="card nuevacerveceria" style="margin-top: 1.4em;">
           <div class="card-header bg-dark">
              <h3 class="tablaHead">Contactos actuales</h3>
           </div>
           <div class="card-body change">
            <table class="table">
              <thead>
                <!-- <th>Cervecería</th> -->
                <th>Nombre</th>
                <th>Teléfono</th>
                <th>Mail</th>
                <th></th>
              </thead>
              <tbody>
                <tr class="trHigh" v-for="contact in contactBrewery">               
                  <td style="max-width: 130px;" class="nowrap hoverShow">{{contact.name}}</td>
                  <td >{{contact.tel}}</td>
                  <td style="max-width: 240px;" class="nowrap hoverShow">{{contact.mail}}</td>
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
        <div class="container bg-dark card tabla" style="background: rgb(34, 34, 34) !important;">
          <div class=""><center>
            <h5 class="tablaHead" style="margin-bottom: 0.7em;">¿Esta seguro que desea eliminar la cerveceria?</h5>
          </center></div>

          <div class="input-group-pretend mb-3" style="margin-bottom: 0 !important;"><center>
            <button class="btn btn-outline-success" v-on:click="deleteBrewery(idBrewery)">Aceptar</button>
            <button class="btn btn-outline-danger" v-on:click="hideModal()">Cancelar</button></center>
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
      Cerveceria :'+ Cervecería',
      Contacto : 'Contactos de la nueva cervecería',
      ContactoForm: '+ Contacto',
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
      url:process.env.ROOT_API + 'brewery',
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
          url:process.env.ROOT_API + `brewery/${this.newBrewery.id}`,
          data:this.newBrewery,
          headers: {authorization: `Bearer ${localStorage.token}`}
        }).then(res => {
          console.log(res)
          this.getBreweries()
          this.newBrewery={}
          this.contact=[]
          this.edit = false
          this.Cerveceria ='+ Cervecería'
          this.Contacto = 'Contactos de la nueva cervecería'
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
            text: `Error al actualizar la cervecería ${e}`
      })
        })
      }
      }
    
  },
  getBreweries(){
    axios({
      url:process.env.ROOT_API + 'brewery',
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
      url:process.env.ROOT_API + `brewery/${idBrewery}`,
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
      url:process.env.ROOT_API + `brewery/${idBrewery}`,
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
        url:process.env.ROOT_API + `brewery/${idBrewery}`,
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
<style scoped >
.card-body.change{
  background: #272727 !important;
 
}

.change{
  border-radius: 0.6em;
}

.options{
  width: 20%;
}

.hoverShow{
  transition: 1s
}
.hoverShow:active{
  width: 100%;
    text-overflow:unset !important;
  white-space: unset !important;
  overflow:auto !important;
  
}
</style>
