<template>
<div class="wrapper">

    <!-- Sidebar -->
    <nav id="sidebar" class="bg-dark sticky-footer">
     
      <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
          
         <li class="nav-item">
        <center><a id="animate1" class="nav-link" href="http://localhost:8080/#/"><span class="badge badge-warning badge-pill beerra">Beerra</span><span class="sr-only">(current)</span></a></center>
          
        </li>
        <template v-if="isLogged ">
          <center><li class="nav-item">
            <a id="dashboard" class="nav-link" href="http://localhost:8080/#/dashboard"><i class="material-icons ">dashboard</i></a>
            <a id="logout" class="nav-link" v-on:click="logout()"><i class="material-icons ">exit_to_app</i></a>
          </li></center>
        <li class="nav-item">
          <a class="nav-link" href="http://localhost:8080/#/pipes">Canillas <img :src="require('@/assets/navbar/canilla.png')" alt="" class=""></a>
        </li> 
        <li class="nav-item">
          <a class="nav-link" href="http://localhost:8080/#/keg">Barriles <img :src="require('@/assets/navbar/barriles.png')" alt="" class=""></a>
        </li>
        <li class="nav-item">
          <a class="nav-link " href="http://localhost:8080/#/brewery">Cerveceria <img :src="require('@/assets/navbar/cerveceria.png')" alt="" class=""></a>
        </li>
        <li class="nav-item">
          <a class="nav-link " href="http://localhost:8080/#/bottle">Botellas <img :src="require('@/assets/navbar/bottles.png')" alt="" class=""></a>
        </li>
           <li class="nav-item">
          <a class="nav-link " href="http://localhost:8080/#/sale">Ventas <img :src="require('@/assets/navbar/ventas.png')" alt="" class=""></a>
        </li>
          <li class="nav-item">
          <a class="nav-link " href="http://localhost:8080/#/buy">Pago <img :src="require('@/assets/navbar/pago.png')" alt="" class=""></a>
        </li>
          <li class="nav-item">
          <a class="nav-link " href="http://localhost:8080/#/pricize">Configuracion <img :src="require('@/assets/navbar/config.png')" alt="" class=""></a>
        </li>
         <li class="nav-item">
          <a class="nav-link " href="http://localhost:8080/#/container">Envases <img :src="require('@/assets/navbar/container.png')" alt="" class=""></a>
        </li>
        <li class="nav-item">
          <a class="nav-link " href="http://localhost:8080/#/outflow">Compras <img :src="require('@/assets/navbar/buy.png')" alt="" class=""></a>
        </li>
        
        
         </template>
         <template v-else>       
          <li class="nav-item">
            <a class="nav-link " href="http://localhost:8080/#/signin">Login <i class="material-icons">account_circle</i></a>
          </li>
           <li class="nav-item ">
            <a class="nav-link " href="http://localhost:8080/#/signup">Registrarse <i class="material-icons">person_add</i></a>
          </li>
         </template>
      </ul>
    </nav>

    <!-- Page Content -->
    <div id="app">
      <router-view />
      <notifications group="foo" position="bottom right" width="450px" />
    </div>
  </div>

 
 
</template>

<script>
import axios from 'axios'
$(function() {
    $.fn.extend({
        animateCss: function (animationName) {
            var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            this.addClass('animated ' + animationName).one(animationEnd, function() {
                $(this).removeClass('animated ' + animationName);
            });
            return this;
        }
    });

    $('#animate1').on('mouseover',function(){
        $('#animate1').animateCss('tada');
    });
    $('#animate2').on('mouseover',function(){
        $('#animate2').animateCss('flash');
    });
});







export default {
created(){
  console.log('hola')
    this.checkIfAuthorized()
   this.isLogged = localStorage.token
},
  data(){
    return{
       active: null,
       isLogged: localStorage.token,
 
    }
  },
  methods:{
    checkIfAuthorized(){
      axios.interceptors.response.use(response => {
        return response;
      }, error => {
  
      if (error.response.status == 401) {
              let   message = 'El token expiro inicie sesion'
          localStorage.removeItem('token')
      this.$router.push({path:`/signin/${message}`})      }
     return error
  });
    },
    checkIfIsLogged () {
     return  localStorage.getItem('isLoggIn')
      
    },
      logout(){
            localStorage.isLoggIn =false
            localStorage.removeItem('token')
            this.$router.go('/signin')
        },
        hoverIn(){
            this.bounce = 'animated bounce'
        },
        hoverOut(){
            this.bounce = ''
        }
  },
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  margin-left: 104px;
  position:absolute;
  background-color: #343a40;
}
a{
  font-size: 15px;
  font-family: 'Varela Round', sans-serif;
}
.beerra{
  font-family: 'Black Ops One', cursive !important;
  font-size: 20px !important;
}

::-webkit-input-placeholder {
  /* Chrome/Opera/Safari */
  font-family: "Courier New", Courier;
  color: #ffc107 !important;
  padding-top: 1em;
}
::-moz-placeholder {
  /* Firefox 19+ */
  font-family: "Courier New", Courier;
  color: #ffc107 !important;
}
.card{
  border-radius: 10px !important;
  border-color:#ffc107;
}
.card-header{
  border-radius: 10px !important;
}

.wrapper {
    display: flex;
    width: 100%;
    align-items: stretch;
}

#sidebar {
    width: 15%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    color: #fff;
    transition: all 0.3s;
    height: 100%;
}


#sidebar a{
  margin-left: 15px;
  color:white;
  font-family:  'Squada One', cursive;
  font-size: 20px;

}
#sidebar a:hover{
  color:grey;
}

#sidebar button{
  margin-left: 15px;
}


#sidebar span{
  font-family:  'Squada One', cursive;
  font-size: 10px;
}
.active{
  color:grey;
}
textarea {
  font-family: "Courier New", Courier;
  color: #ffc107 !important;
}
input[type="text"], textarea {
  
  background-image: linear-gradient(to left,#343a40,black) !important;
}
input[type="email"], textarea {
  background-image: linear-gradient(to left,#343a40,black) !important;
}
input[type="password"], textarea {
  background-image: linear-gradient(to left,#343a40,black) !important;
}
input[type="tel"], textarea {
  background-image: linear-gradient(to left,#343a40,black) !important;
}
input[type="date"], textarea {
  background-image: linear-gradient(to left,#343a40,black) !important;
}
.bg-dark{
  background-image: linear-gradient(to left,#343a40,black) !important;
}
.card{
  background-image: linear-gradient(to left,#343a40,black);
}
.custom-select textarea{
  color:#ffc107;
}
.custom-select {
    color:#ffc107;
    background: linear-gradient(to left,#343a40,black) !important; 
    text-shadow: 0 1px 0 rgba(0, 0, 0, 0.4);
}
input{
  font-family: "Courier New", Courier;
  color: #ffc107 !important;
}
p{
  font-size: 20px;
  font-family: "Squada One", cursive;
  color:white;
}
label {
  font-size: 20px;
  font-family: "Squada One", cursive;
  color: #fff;
}
h1{
  color:white;
  font-size:40px;
  font-family: 'Black Ops One', cursive;
}
li img {
  position: relative;
  margin-right: 30px;
  float:right;
}
li i{
  position: relative;
  margin-right: 30px;
  float:right;
}

h3 {
  font-size:22px !important;
  font-family: 'Black Ops One', cursive !important;
  color:white;
}
h1 {
  font-size:30px !important;
  font-family: 'Black Ops One', cursive !important;
  color:white;
}

td{
  font-family: 'Courier New', Courier;
  color: white;
  font-size:13px;
}
th{
  font-family: 'Courier New', Courier;
  color: white;
  font-size:14px;
}
#dashboard{
  display:inline-block;
}
#logout{
  display:inline-block;
}
textarea:focus,
input:focus,
input[text]:focus,
.uneditable-input:focus {
  border-color: white !important;
  box-shadow: 0 1px 1px white inset, 0 0 8px white !important;
  outline: 0 none;
}
</style>
