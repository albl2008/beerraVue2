<template>
  <div class="wrapper">
    <!-- Sidebar -->
    <nav id="sidebar" class="bg-dark sticky-footer">
      <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
        <li class="nav-item">
          <center class="centerC">
            <a id class="nav-link" href="http://localhost:8080/#/">
              <img class="isonav" src="./beerraisol.png">
              <span class="sr-only">(current)</span>
            </a>
          </center>
          <!-- <center><a id="animate1" class="nav-link" href="http://localhost:8080/#/"><img class="isonav" src="./beerrazeiv0.png"><span class="sr-only">(current)</span></a></center> -->
        </li>
        <template v-if="isLogged ">
          <center>
            <li class="nav-item">
              <a id="dashboard" class="nav-link" href="http://localhost:8080/#/dashboard">
                <i class="material-icons">dashboard</i>
              </a>
              <a id="logout" class="nav-link" v-on:click="logout()">
                <i class="material-icons">exit_to_app</i>
              </a>
            </li>
          </center>
          <li class="nav-item">
            <a class="nav-link" href="http://localhost:8080/#/pipes">Canillas
              <img :src="require('@/assets/navbar/canilla.png')" alt class>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="http://localhost:8080/#/keg">Barriles
              <img :src="require('@/assets/navbar/barriles.png')" alt class>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="http://localhost:8080/#/brewery">Cervecerías
              <img :src="require('@/assets/navbar/cerveceria.png')" alt class>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="http://localhost:8080/#/clients">Clientes
              <img :src="require('@/assets/navbar/clients.png')" alt class>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="http://localhost:8080/#/bottle">Botellas
              <img :src="require('@/assets/navbar/bottles.png')" alt class>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="http://localhost:8080/#/sale">Ventas
              <img :src="require('@/assets/navbar/ventas.png')" alt class>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="http://localhost:8080/#/buy">Pagos
              <img :src="require('@/assets/navbar/pago.png')" alt class>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="http://localhost:8080/#/pricize">Configuración
              <img :src="require('@/assets/navbar/config.png')" alt class>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="http://localhost:8080/#/container">Envases
              <img :src="require('@/assets/navbar/container.png')" alt class>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="http://localhost:8080/#/outflow">Compras
              <img :src="require('@/assets/navbar/buy.png')" alt class>
            </a>
          </li>
        </template>
        <template v-else>
          <li class="nav-item">
            <a class="nav-link" href="http://localhost:8080/#/signin">Ingresar
              <i class="material-icons">account_circle</i>
            </a>
            <!--  <a class="nav-link " href="http://localhost:8080/#/signin">Login <i class="material-icons">account_circle</i></a> -->
          </li>
          <li class="nav-item">
            <a class="nav-link" href="http://localhost:8080/#/signup">Registrarse
              <i class="material-icons">person_add</i>
            </a>
          </li>
        </template>

      </ul>
      
    </nav>

    <!-- Page Content -->
    <div id="app">
      <transition name="fade" mode="out-in">
        <router-view/>
        <vue-glide>
          <vue-glide-slide></vue-glide-slide>
        </vue-glide>
      </transition>
        <notifications group="foo" position="bottom right" width="450px"/>
     
      <div class="sticky-footer footer">
        <p class="footP">
          <!--<img class="footerImg" src="./beerrazeiv0.png">-->
          <small style="color:#FD9326; letter-spacing: 0.05em;">beerra</small>
          <small style="color: #6b6b6b;">2019</small>
          <small style="font-size: 10px; margin-bottom: 0.3em;">info@beerra.com.ar</small>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
$(function() {
  $.fn.extend({
    animateCss: function(animationName) {
      var animationEnd =
        "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";
      this.addClass("animated " + animationName).one(animationEnd, function() {
        $(this).removeClass("animated " + animationName);
      });
      return this;
    }
  });

  $("#animate1").on("mouseover", function() {
    $("#animate1").animateCss("tada");
  });
  $("#animate2").on("mouseover", function() {
    $("#animate2").animateCss("flash");
  });
});

export default {
  created() {
    console.log("hola");
    this.checkIfAuthorized();
    this.isLogged = localStorage.token;
  },
  data() { counter: 0
    return {
      active: null,
      isLogged: localStorage.token
    };
  },
  methods: {
    checkIfAuthorized() {
      axios.interceptors.response.use(
        response => {
          return response;
        },
        error => {
          console.log(error);
          if (error.response.status == 401) {
            let message = "El token expiro inicie sesion";
            localStorage.removeItem("token");
            this.$router.push({ path: `/signin/${message}` });
          }

          return Promise.reject(error);
        }
      );
    },
    checkIfIsLogged() {
      return localStorage.getItem("isLoggIn");
    },
    logout() {
      localStorage.isLoggIn = false;
      localStorage.removeItem("token");
      this.$router.go("/signin");
    },
    hoverIn() {
      this.bounce = "animated bounce";
    },
    hoverOut() {
      this.bounce = "";
    }
  },
  name: "App",
  
};
</script>

<style>
html,
body {
  height: 100% !important;
  margin: 0 auto;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  margin-left: 104px;
  position: absolute;
  height: 100%;
  background-color: #242424;
}
a {
  font-size: 15px;
  font-family: "Varela Round", sans-serif;
}
.beerra {
  font-family: "Black Ops One", cursive !important;
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
.card {
  border-radius: 0.6em;
  border: 1px solid rgb(88, 88, 88) !important;
}
/*
.container{
  height: 95%;
  margin-bottom: 0;
  margin-top: 0;
}*/
.container.backlime {
  background: url("./components/user/backlime.png");
  background-size: cover;
}

.signinG {
  background: rgb(255, 193, 7);
  background: -moz-linear-gradient(
    45deg,
    rgba(255, 193, 7, 1) 0%,
    rgba(252, 178, 7, 1) 40%,
    rgba(252, 150, 7, 1) 100%
  );
  background: -webkit-linear-gradient(
    45deg,
    rgba(255, 193, 7, 1) 0%,
    rgba(252, 178, 7, 1) 40%,
    rgba(252, 150, 7, 1) 100%
  );
  background: linear-gradient(
    45deg,
    rgba(255, 193, 7, 1) 0%,
    rgba(252, 178, 7, 1) 40%,
    rgba(252, 150, 7, 1) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffc107', endColorstr='#fc9607',GradientType=1 );
  border-radius: 0.4em;
}

.sLink {
  color: rgb(161, 161, 161);
}

.sLink:hover {
  color: white;
  text-decoration: none;
}

.cardlogin {
  height: 500px;
  width: 70%;
  margin: 0 auto;
  margin-top: 4em;
}

textarea, input{
  border: 1px solid #414141 !important;
  background-color: #222222 !important;
}

.card {
  background: rgb(83, 83, 83);
  background: -moz-linear-gradient(
    45deg,
    rgba(71, 71, 71, 1) 0%,
    rgba(56, 56, 56, 1) 100%
  );
  background: -webkit-linear-gradient(
    45deg,
    rgba(71, 71, 71, 1) 0%,
    rgba(56, 56, 56, 1) 100%
  );
  background: linear-gradient(
    45deg,
    rgba(71, 71, 71, 1) 0%,
    rgba(56, 56, 56, 1) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#474747', endColorstr='#383838',GradientType=1 );
}
.card-header {
  height: 50px;
  border-radius: 0.6em !important;
  background: rgba(56, 56, 56, 1);
}

.center > router-link {
  margin: 0 auto !important;
  text-align: center !important;
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

#sidebar a {
  margin-left: 15px;
  color: white;
  font-family: "Squada One", cursive;
  font-size: 20px;
}
#sidebar a:hover {
  color: grey;
}

#sidebar button {
  margin-left: 15px;
}

#sidebar span {
  font-family: "Squada One", cursive;
  font-size: 10px;
}
.active {
  color: grey;
}
textarea {
  font-family: "Courier New", Courier;
  color: #ffc107 !important;
}
input[type="text"],
textarea {
  background: #2b2b2b !important;
  border: 1px rgb(114, 114, 114);
}
input[type="number"],
textarea {
  -moz-appearance: textfield;
  background: #2b2b2b !important;
  border: 1px rgb(114, 114, 114);
}
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type="email"],
textarea {
  background: #2b2b2b !important;
  border: 1px rgb(114, 114, 114);
}
input[type="password"],
textarea {
  background: #2b2b2b !important;
  border: 1px rgb(114, 114, 114);
}
input[type="tel"],
textarea {
  background: #2b2b2b !important;
  border: 1px rgb(114, 114, 114);
}
input[type="date"],
textarea {
  background: #2b2b2b !important;
  border: 1px rgb(114, 114, 114);
}

.custom-select {
  color: white;
  font-family: "Courier New", Courier, monospace;
  border: 1px solid #414141 !important;
  background: #2B2B2B !important;
}

input, textarea {
  font-family: "Courier New", Courier;
  color: white !important;
}

input:focus {
  border: 1px solid #ffc107 !important;
  outline: rgb(114, 114, 114) !important;
}
p {
  font-size: 20px;
  font-family: "Squada One", cursive;
  color: white;
}
label {
  font-size: 20px;
  font-family: "Squada One", cursive;
  color: #fff;
}
h1 {
  color: white;
  font-size: 40px;
  /*font-family: 'Black Ops One', cursive;*/
}
li img {
  position: relative;
  margin-right: 30px;
  float: right;
}
li i {
  position: relative;
  margin-right: 30px;
  float: right;
}

h3 {
  font-size: 22px !important;
  font-family: "Black Ops One", cursive !important;
  color: white;
}

h1 {
  font-size: 30px !important;
  color: white;
}

td {
  font-family: "Courier New", Courier;
  color: white;
  font-size: 13px;
}
th {
  font-family: "Courier New", Courier;
  color: white;
  font-size: 14px;
}
#dashboard {
  display: inline-block;
}
#logout {
  display: inline-block;
}
.custom-select:focus,
textarea:focus,
input:focus,
input[text]:focus,
.uneditable-input:focus {
  border-color: rgb(94, 94, 94) !important;
  box-shadow: 0 1px 1px rgb(56, 56, 56) inset, 0 0 8px rgb(56, 56, 56) !important;
  outline: 0 none;
}

.mid {
  position: absolute;
  display: block;
  margin: 0 auto !important;
  width: 96%;
  text-align: center;
}

.alert-danger {
  background: #1f1f1f !important;
  border: solid 1px #ff0050;
  color: #ff0050;
  border-radius: 0.5em;
}

.alert-success {
  background: #1f1f1f !important;
  border: solid 1px #00ff95;
  color: #00ff95;
  border-radius: 0.5em;
}

.btn-outline-primary{
  color: rgb(0, 195, 255);
  background: #1f1f1f;
  border: rgb(0, 195, 255) 1px solid;
}

.btn-outline-primary:hover{
  background: rgb(0, 195, 255);
  color: #1f1f1f;
}
.isonav {
  width: 75%;
  margin-bottom: 1em;
}
/*
.isonav:hover{
  background: rgba(255, 255, 255, 0.238);
  border-radius: 0.3em;
  border: 1px solid #fdfdfd1c;
}*/

.footer {
  background: #1f1f1f !important;
  height: 3%;
  bottom: 0 !important;
  left: 0;
  width: 100%;
  z-index: 3;
  position: fixed;
  margin-left: 104px;
}

.footP {
  font-size: 16px;
  text-align: center !important;
  /*margin-top: 0.5em;*/
  font-family: "Poppins", sans-serif;
  font-weight: normal;
}
/*
.footerImg{
  width: 9%;
  margin: 0 auto;
}

  <!--<div class="sticky-footer footer"><p class="footP">-->
      <!--<img class="footerImg" src="./beerrazeiv0.png">--><!--<strong style="color:#FAAE2C; letter-spacing: 0.2em;">beerra</strong> <small>2019</small>--></p>
   <!-- </div>-->

*/

.bg-dark {
  background: #2b2b2b !important;
  
  margin-bottom: 0;
  
}
select:invalid {color: gray}
.courier{
  color: white !important;
}
.imgicon{
  width: 50% !important;
}
.footerImg {
  width: 9%;
  margin: 0 auto;
  padding-top: 0.1em;
}

.centerC {
  width: 100%;
  height: 100% !important;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.nav-link{
  margin: 0 auto !important;
  padding-left: 20px !important;
  border-radius: 0.2em;
  
}

.nav-link:hover{
  text-decoration: #ffc107 !important;
  color: white !important;
 text-shadow: 0 5px 15px rgba(0, 0, 0, 0.404) !important;
 background: rgba(255, 255, 255, 0.051);
}
.canilla{
  width: 70%;
}
.nav-link:active{
  background: #262626 !important;
  transition: 0.1s;
}

.yellowB:hover{
  border: 1px solid white !important;
  transition: 0.4s;
}

.centerhead{
margin-left: 35%;
}

.h1head{
  font-family: 'Lobster', cursive !important;
  font-size: 43px !important;
  margin-top: 1.8em;
}

.underh1{
  width: 15%;
  height: 100%;
  margin-top: 3em;
}

.carousel-3d-slide{
  background: none !important;
  border-radius: 0.4em;
  
 
}
.carousel-3d-slide.current{
 -webkit-box-shadow: 3px 10px 81px -10px rgb(54, 54, 54);
-moz-box-shadow: 3px 10px 81px -10px rgb(54, 54, 54);
box-shadow: 3px 10px 81px -10px rgb(54, 54, 54);

}

.btn-outline-danger{
  background: #1f1f1f;
  border: 1px solid #ff0050;
  color: #ff0050;
}

.btn-outline-danger:hover{
  background: #ff0050;
  color: #1f1f1f;
}

.btn.btn-outline-danger.btn-sm{
  margin-bottom: 0.4em !important;
}

i.material-icons{
  margin-top: 0.2em !important;
}

.badge-danger{
  background: #2b2b2b;
  border: 1px solid #ff3776;
  color: #ff0050;
}

.badge-success{
  background: #2b2b2b;
  color: #00ff95;
  border: 1px solid #56ffb9;
}

.litros{
  font-family: 'Lobster', cursive ;
  opacity: 0.5;
}

.table  thead th{
  border: none;
  font-family: 'Arial', sans-serif;
  background: #22222286;
  border-top: none;
}
.table th{
  border: none !important;
}
.precios{
  font-family: 'Roboto', sans-serif !important;
  
}

.resize{
  font-size: 12px;
  padding: 0.2em;
}

.nowrap{
   text-overflow: ellipsis;
  white-space: nowrap;
  overflow:hidden;
}

.badgeGradient{
 color: rgba(252, 150, 7, 1);
 border: 1px rgba(252, 150, 7, 1) solid;
 background: #222;
}
.v--modal-box.v--modal{
  background: transparent !important;
}

.v--modal-overlay{
  background: rgba(0, 0, 0, 0.3) !important;
}

.btn-outline-success{
  color: #00ff95;
  background: #1f1f1f;
  border: 1px solid #00ff95;
}

.btn-outline-success:hover{
  background: #00ff95;
  color: #2b2b2b;
}

.modalRedcrumb{
  border: #ff3776 1px solid;
  background: #222222 !important;
  width: 48%;
  margin: 0 !important;
  float: left;
  height: 130px;
}

.redh5{
  color: #ff0050 !important;
  font-family: 'Roboto', sans-serif !important;
  font-size: 16px !important;
}

.greenh5{
  color: #00ff95 !important;
    font-family: 'Roboto', sans-serif !important;
  font-size: 16px !important;
}

.modalGreencrumb{
  border: 1px solid #56ffb9;
  background: #222 !important;
  width: 48%;
  float: right;
  height: 130px;  
}

.brewandbeer{
  width: 48%;
  float: left;
  margin-bottom: 1.2em;
}

.vue-notification {
  font-size: 12px;
  padding: 10px;
  margin: 0 5px 5px;

  color: white;
  background: #44A4FC;
  border-left: 5px solid #187FE7;
  margin-bottom: 1em !important;
}

.vue-notification.warn {
  background: #222;
  border-radius: 0.3em;
  border: 1px solid rgba(252, 150, 7, 1);
  /* border-left: 4px solid  rgba(252, 150, 7, 1); */
}

.vue-notification.error {
   background: #222;
  border-radius: 0.3em;
  border: 1px solid #ff0050;
  /* border-left: 4px solid #ff0050; */
}

.vue-notification.success {
  background: #222;
  border-radius: 0.3em;
  border: 1px solid #56ffb9;
  /* border-left: 4px solid #56ffb9; */
}


.tablaHead{
  font-family: 'Roboto', sans-serif !important;
  font-size: 23px !important;
  font-weight: 800;
  color: white;
}

tbody tr td{
  border: none !important;
  font-family: 'Roboto', sans-serif !important;
      text-overflow: ellipsis !important;
  white-space: nowrap !important;
}


tr{
  background: #2b2b2b;
}
tr:nth-child(even) {
    background-color: #272727;
}

.btn-outline-primary{
  background: #1f1f1f;
}

.disableBorder{
  border: none !important;
}

.roboto{
  font-family: 'Roboto', sans-serif;
}

.card.nuevacerveceria{
  background: #272727 !important;
}

.trHigh:hover{
background: rgba(255, 255, 255, 0.063) !important;
}

.vacio{
  background: #1f1f1f !important;
  color: #FD9326 !important; 
}

.vacio:hover{
 background: #FD9326 !important;
 color: #1f1f1f !important;
}
</style>
