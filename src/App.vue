<template>
  <div>

    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">

      <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
       
         <li class="nav-item active">
          <a class="nav-link" href="http://localhost:8080/#/">Beerra<span class="sr-only">(current)</span></a>
        </li>
        <template v-if="isLogged ">
        <li class="nav-item active">
          <a class="nav-link" href="http://localhost:8080/#/pipes">Canillas</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="http://localhost:8080/#/keg">Barriles</a>
        </li>
        <li class="nav-item">
          <a class="nav-link " href="http://localhost:8080/#/brewery">Cerveceria</a>
        </li>
        <li class="nav-item">
          <a class="nav-link " href="http://localhost:8080/#/bottle">Botellas</a>
        </li>
           <li class="nav-item">
          <a class="nav-link " href="http://localhost:8080/#/sale">Ventas</a>
        </li>
          <li class="nav-item">
          <a class="nav-link " href="http://localhost:8080/#/buy">Pago</a>
        </li>
          <li class="nav-item">
          <a class="nav-link " href="http://localhost:8080/#/pricize">Configuracion</a>
        </li>
         <li class="nav-item">
          <a class="nav-link " href="http://localhost:8080/#/container">Envases</a>
        </li>
        <li class="nav-item">
          <a class="nav-link " href="http://localhost:8080/#/outflow">Compras</a>
        </li>
        <div class="justify-content-end">
          <button class="btn btn-outline-success" v-on:click="logout">Logout</button>
        </div>
        
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
      
       isLogged: localStorage.token
      
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

  color: #2c3e50;
  margin-top: 60px;
}
a{
  font-size: 15px;
  font-family: 'Varela Round', sans-serif;
}

</style>
