<template>
<div class="wrapper">

    <!-- Sidebar -->
    <nav id="sidebar" class="bg-dark sticky-footer">
     
      <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
          
         <li class="nav-item">
        <center><a class="nav-link" href="http://localhost:8080/#/">Beerra<span class="sr-only">(current)</span></a></center>
          
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
            <a class="nav-link " href="http://localhost:8080/#/signin">Login</a>
          </li>
           <li class="nav-item">
            <a class="nav-link " href="http://localhost:8080/#/signup">Sing up</a>
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
export default {
created(){
   this.isLogged = localStorage.token
},
  data(){
    return{
       active: null,
       isLogged: localStorage.token,
       bounce: null
    }
  },
  methods:{
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
  margin-top: 10px;
  width: 100%;
  margin-left: 150px;
  position:absolute;
}
a{
  font-size: 15px;
  font-family: 'Varela Round', sans-serif;
}

::-webkit-input-placeholder { /* Chrome/Opera/Safari */
  font-family:'Courier New', Courier;
  color: black;
  padding-top: 1em;
}
::-moz-placeholder { /* Firefox 19+ */
  font-family:'Courier New', Courier;
  color: black;
}

.wrapper {
    display: flex;
    width: 100%;
    align-items: stretch;
}

#sidebar {
    width: 250px;
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

.bg-dark{
  background-image: linear-gradient(to left,#343a40,black) !important;
}
h1{
  color:black;
  font-size:40px;
  font-family: 'Black Ops One', cursive;
}
li img {
  position: relative;
  margin-right: 30px;
  float:right;
}

h3 {
  font-size:22px;
  font-family: 'Varela Round', sans-serif;
  color:white;
}


td{
  font-family: 'Courier New', Courier;
  color: black;
  font-size:12px;
}
th{
  font-family: 'Courier New', Courier;
  color: black;
  font-size:12px;
}

#dashboard{
  display:inline-block;
}
#logout{
  display:inline-block;
}

</style>
