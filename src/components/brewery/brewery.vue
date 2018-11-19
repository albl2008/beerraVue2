<template>
  <div class="container">
    <div class="row mb-3">
      <div class="col-12 col-sm-6">
         <form v-on:submit.prevent="addBrewery">
         <div class="card mb-2  ">
           <div class="card-header">
             <h5>{{Cerveceria}}</h5>
           </div>
           <div class="card-body">
             <input type="text" class="form-control mb-1" placeholder="Cerveceria" v-model="newBrewery.name" required>
          <input type="text" class="form-control mb-3" placeholder="Direccion" v-model="newBrewery.address" required>
            <template v-if="edit === false">
              <dir class="col-12 mb-3"><button class="btn btn-success btn-block " >ADD BREWERY</button></dir>
            </template>
            <template v-else>
              <dir class="col-12 mb-3"><button class="btn btn-success btn-block " >UPDATE BREWERY</button></dir>
            </template>
           </div>
         </div>
          <div class="card">
           <div class="card-header">
            <h5>{{ContactoForm}}</h5>
           </div>
           <div class="card-body">
               <form v-on:submit.prevent="addcontact">
            <input type="text" class="form-control mb-1" placeholder="Nombre" v-model="newcontact.name" required>
            <input type="text" class="form-control mb-1" placeholder="Telefono" v-model="newcontact.tel" required>
            <input type="email" class="form-control mb-3" placeholder="Mail" v-model="newcontact.mail" required>
            <template v-if="editContact === false">
              <dir class="col-12"><button class="btn btn-primary  " >ADD CONTACT</button></dir>
            </template>
            <template v-else>
              <dir class="col-12"><button class="btn btn-primary " >UPDATE CONTACT</button></dir>
            </template>
          </form>
           </div>
         </div> 
        </form>
      </div>
      <div class="col-12 col-sm-6 table-responsive">
         <div class="card">
           <div class="card-header">
             <h5>{{Contacto}}</h5>
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
                <td><button class="btn btn-danger btn-sm" v-on:click="deleteContact(cont)"><i class="material-icons">delete</i></button></td>
                <td><button class="btn btn-primary btn-sm" v-on:click="updateContact(cont)"><i class="material-icons">edit</i></button></td>
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
          <div class="card-header">
            <h5>Cervecerias</h5>
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
                <td><button class="btn btn-success btn-sm" v-on:click="getcontact(brewery._id)"><i v-on:click="getcontact(brewery._id)" class="material-icons">contact_phone</i></button></td>
                <td><button class="btn btn-danger btn-sm" v-on:click="deleteBrewery(brewery._id)"><i class="material-icons">delete</i></button></td>
                <td><button class="btn btn-primary btn-sm" v-on:click="updateBrewery(brewery._id)"><i class="material-icons">edit</i></button></td>
              </tr>
            </tbody>
          </table>
          </div>
        </div>        
      </div>
       <div class="col-12 col-md-6 table-responsive">
         <div class="card">
           <div class="card-header">
              <h5>Contactos cerveceria</h5>
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

</template>
<script>
import Vue from 'vue'

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
      whatsapp: 'https://wa.me/54'
  }



},
created(){
  this.getBreweries();
},
methods:{
  addcontact(){
    if(this.editContact === false){
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
      this.newcontact = { }
      this.editContact = false;
      Vue.notify({
        group: 'foo',
        type:'success',
        title: 'Contacto',
        text: 'Contacto editado correctamente'
      })
    }
  },
  deleteContact(contact){
    this.contact.splice(contact,1)
    Vue.notify({
        group: 'foo',
        type:'success',
        title: 'Contacto',
        text: 'Contacto eliminado correctamente'
      })
  },
  updateContact(contact){
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
      axios.post('http://localhost:3000/brewery',
      this.newBrewery
      ).then(res => {
        console.log(res)
        if(res.status == 200){
          this.getBreweries()
          this.newBrewery = {}
          this.contact = []
           Vue.notify({
            group: 'foo',
            type:'success',
            title: 'Cerveceria',
            text: res.data.mensaje
      })
    }
      }).catch(e =>{
        console.log(e)
         Vue.notify({
            group: 'foo',
            type:'error',
            title: 'Cerveceria',
            text: `Error al guardar la cerveceria ${e}`
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
        axios.put(`http://localhost:3000/brewery/${this.newBrewery.id}`,
          this.newBrewery
        ).then(res => {
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
            text: res.data.mensaje
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
    axios.get('http://localhost:3000/brewery')
    .then(res=>{
      console.log(res);
      this.breweries = res.data.Breweries;
    })
    .catch(e =>{
      console.log(e)
    })
  },
  getcontact(idBrewery){
    axios.get(`http://localhost:3000/brewery/${idBrewery}`)
    .then(res =>{
      console.log(res.data.brewery.contact)
      this.contactBrewery = res.data.brewery.contact
    })
  },
  deleteBrewery(idBrewery){
    axios.delete(`http://localhost:3000/brewery/${idBrewery}`)
    .then(res => {
      console.log(res)
      this.getBreweries();
      if(res.status == 200){
         Vue.notify({
            group: 'foo',
            type:'success',
            title: 'Cerveceria',
            text: res.data.mensaje
      })
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
            text: `Error al eliminar la cerveceria ${e}`
      })
    })
  },
  updateBrewery(idBrewery){
      axios.get(`http://localhost:3000/brewery/${idBrewery}`)
    .then(res =>{
      console.log('Soy la brewery'+res.data.brewery)
      this.newBrewery = new newBrewery(res.data.brewery._id,res.data.brewery.name,res.data.brewery.contact,res.data.brewery.address)
      this.contact = this.newBrewery.contact
      this.Cerveceria = 'Editar cerveceria'
      this.Contacto = 'Editar contactos'
      this.edit = true
    })
  }
},

}
</script>
<style>
a{
   color: rgb(99, 250, 99);;
}
a:hover{
  color:inherit;
  text-decoration: none;
}

</style>
