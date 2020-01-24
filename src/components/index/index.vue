<template>
  <div class="container">
    
    <nav aria-label="breadcrumb" class="sticky-top nav">
      <ol class="breadcrumb bg-dark card">
        <li class="breadcrumb-item">
          <a href="#funcionalidades">Funcionalidades</a>
        </li>
        <li class="breadcrumb-item">
          <a href="#contacto">Contacto</a>
        </li>
        <li class="breadcrumb-item">
          <a v-bind:href="signup">Registrarse</a>
        </li>
        <li class="breadcrumb-item">
          <a v-bind:href="signin">Ingresar</a>
        </li>
      </ol>
    </nav>
    <div class="container" style="padding-bottom: 0;">
      <div class=" card bg-dark">
        <div class="subcontainer ">
          <h1>
            ¿Qué es
            <span id class="beerra">Beerra</span>?
          </h1>
          <p style="margin-bottom: 0.8em;">
            <span class="sistema">Es un sistema web pensado para</span>
            <span class="centros">venta de cerveza artesanal </span> <span class="sistema">en diversos formatos</span>
          </p>
          <p class="proba"> Cuenta con varias funcionalidades entre ellas el manejo de barriles en camara por estado.
            <span
              style="letter-spacing: 0.1em; text-transform: capitalize; color: #FB9336; 
              font-weight: bold; font-size: 29px; border: 1px solid white; padding: 3px 10px 6px 10px; 
              border-radius: 0.2em; background:  rgba(0, 0, 0, 0.042);"
            >gratis</span> por 2 meses
          </p>
          <p class="lead">
            <a
              class="btn btn-outline-light btn-lg"
              v-bind:href="signup"
              role="button"
            >Registrarse</a>
          </p>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="card bg-dark">
        <div class="subcontainer2">
            </div>
          </div>
        </div>

    <div class="container">
      <nav id="funcionalidades" aria-label="breadcrumb">
        <ol class="breadcrumb bg-warning">
          <li class="breadcrumb-item divider" aria-current="page">Funcionalidades Principales</li>
        </ol>
      </nav>
      <div class="card-columns">
        <div class="card bg-dark">
          <div class="card-body text-center">
            <h1 class="card-text">Control sobre Barriles</h1>
            <!-- <button v-on:click="keg = !keg"> -->
              <img :src="require('@/assets/beerra/kegg2.png')" alt class="imgicon">
            <!-- </button> -->
            <!-- <p
              v-if="keg"> -->
              <p>
              Podras controlar los barriles por estado y su pago contra pedido, registro de cervecerias con contacto integrado via WhatsApp web.</p>
          </div>
        </div>
        <div class="card bg-dark">
          <div class="card-body text-center">
            <h1 class="card-text">Venta en diversos formatos</h1>
            <!-- <button v-on:click="config = !config"> -->
              <img :src="require('@/assets/beerra/different2.png')" alt class="imgicon">
            <!-- </button> -->
            <!-- <p
              v-if="config"
            > --><p>Podes recargar botellones y pintas, ademas de contar con la opcion 2x1 (happy hour) y categoria Granel</p>
          </div>
        </div>
        <div class="card bg-dark">
          <div class="card-body text-center">
            <h1 class="card-text">Manejo de gastos</h1>
            <!-- <button v-on:click="pay = !pay"> -->
              <img :src="require('@/assets/beerra/moneyy2.png')" alt class="imgicon">
            <!-- </button> -->
            <!-- <p
              v-if="pay"
            >--><p>Administra los gastos: alquiler, luz, gas(CO2), compras de botellones y pintas, limpieza y otros y lleva un control interno de lo quemas se gasta.</p> 
          </div>
        </div>
        <div class="card bg-dark">
          <div class="card-body text-center">
            <h1 class="card-text">Manejo de ventas</h1>
            <!-- <button v-on:click="sell = !sell"> -->
              <img :src="require('@/assets/beerra/ventass2.png')" alt class="imgicon">
            <!-- </button> -->
         <!--    <p v-if="sell"> --><p>Las ventas realizadas en el sistema se iran almacenando para despues poder tener reportes mensuales del funcionamiento del comercio</p>
          </div>
        </div>
        <div class="card bg-dark">
          <div class="card-body text-center">
            <h1 class="card-text">Venta de botellas</h1>
            <!-- <button v-on:click="bottle = !bottle"> -->
              <img :src="require('@/assets/beerra/bottlee2.png')" alt class="imgicon">
            <!-- </button> -->
            <!-- <p v-if="bottle"> --><p>Podras cargar y administrar la venta de cerveza en botellas, en 3 tipos de formato: 330cc, 660cc y 1 L</p>
          </div>
        </div>
        <div class="card bg-dark">
          <div class="card-body text-center">
            <h1 class="card-text">Manejo de clientes</h1>
            <!-- <button v-on:click="client = !client"> -->
              <img :src="require('@/assets/beerra/people2.png')" alt class="imgicon">
            <!-- </button> -->
           <!--  <p
              v-if="client"
            > --><p>Listado de clientes, con contador de litros para cada uno y su propio avatar generado a partir del numero telfonico</p>
          </div>
        </div>
      </div>
    </div>
        
    <div class="container">
      <center>
        <div class="jumbotron bg-dark card">
          <h1>
            <img src="/static/img/beerraisol.185a2ab.png" class="banner">
            <!-- <span id="animate3" class="badge badge-dark badge-pill beerra">beerra</span> -->
          </h1>
          <p
            class="bg-dark badge-pill redondeo"
          >Nuestro sistema esta en constante evolución, tomamos requirimientos de nuestros clientes y lo mejoramos día a día
            <br>Envianos tu sugerencia o duda a nuestro correo
            <br>
            <span class="badge-light badge-pill" style="font-family: 'Lobster', serif; font-size: 22px;">info@beerra.com.ar</span><span class="badge-light badge-pill" style="font-family: 'Lobster', serif; font-size: 22px;">+5492616563848</span>
          </p>
        </div>
      </center>
    </div>
        </div>

 
</template>

<script>
import AOS from "aos";
import "aos/dist/aos.css";

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
  $("#animate3").on("mouseover", function() {
    $("#animate3").animateCss("rubberBand");
  });
});

AOS.init();

export default {
  data() {
    return {
      signin: process.env.ROOT +'signin',
      signup: process.env.ROOT +'signup',
      keg: false,
      bottle: false,
      sell: false,
      pay: false,
      client: false,
      config: false,
      contact: false,
      tres: false,
      siete: false,
      ocho: false
    };
  }
};
</script>

<style scoped>

.row.signinG.breadcrumb{
  margin: 0 auto; 
  margin-top: 1em;
  width: 97%;
 background: -moz-linear-gradient(45deg, rgba(28,28,28,0.3) 0%, rgba(255,255,255,0) 100%);
background: -webkit-linear-gradient(45deg, rgba(28,28,28,0.3) 0%,rgba(255,255,255,0) 100%);
background: linear-gradient(45deg, rgba(28,28,28,0.3) 0%,rgba(255,255,255,0) 100%);
filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#1c1c1c', endColorstr='#00ffffff',GradientType=1 );
  border: solid 1px #2b2b2b;

}

.contact{
  width: 30%;
  position: absolute;
  float: right !important;
  border-radius: 0.4em;
  right: 0;
  height: 100%;
  
}
.beerra {
  font-size: 32px !important;
  font-family: "Poppins", sans-serif !important;
  text-transform: lowercase;
  color: rgb(253, 147, 38);
}

.agenda{
  width: 37%;
  margin-top: 3em;
  margin-bottom: 4em;
}
.subcontainer {
  border-radius: 0.5em !important;
  padding: 1em;
  background: url('quees.png');
  background-size: cover;
  
}

.subcontainer2{
  border-radius: 0.5em !important;
  padding: 1em;
  background: url('screenshot.png');
  background-size: cover;
  height: 500px;
}

.breadcrumb-item::before{
  display: none;
}

.notsolidblack{
  background: -moz-linear-gradient(45deg, rgba(28,28,28,0.3) 0%, rgba(255,255,255,0) 100%);
background: -webkit-linear-gradient(45deg, rgba(28,28,28,0.3) 0%,rgba(255,255,255,0) 100%);
background: linear-gradient(45deg, rgba(28,28,28,0.3) 0%,rgba(255,255,255,0) 100%);
filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#1c1c1c', endColorstr='#00ffffff',GradientType=1 );
  margin-top: 13px;

  margin-bottom: 13px;
}

.subcontainer{
  font-size: -10px;
}
.divider {
  font-size: 22px;
  font-weight: bold;
  color: #2b2b2b !important;
  padding: 0;
}
.centros {
  font-family: "Courier New", Courier;
  font-weight: bold;
  padding: 3px;
  word-spacing: -10px;
  font-size: 22px;
  border-radius: 0.2em;
  background: rgba(0, 0, 0, 0.042);
  border: 1px solid rgb(252, 150, 7);
}
.form-group {
  margin: 10px;
}

.imgBack{
  background: url('quees.png');
  border-radius: 0.4em;
  padding: 10px;
  background-size: contain;
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
form {
  border-radius: 5px;
}
.redondeo {
  border-radius: 10px;
}
.breadcrumb-item a {
  font-size: 1.2em;
  font-family: "Impact";
  letter-spacing: 0.05em;
  color: white !important;
  padding: 0.8em;
  border-radius: 0.3em;
}


.breadcrumb-item:hover a{
    text-decoration: #ff7f07 !important;
  color: white !important;
 text-shadow: 0 5px 15px rgba(0, 0, 0, 0.404) !important;
 background: rgba(255, 255, 255, 0.051);
}
.bg-warning {
  background: rgb(252, 150, 7);
  background: -moz-linear-gradient(
    left,
    rgba(252, 150, 7, 1) 0%,
    rgba(252, 178, 7, 1) 60%,
    rgba(255, 193, 7, 1) 100%
  );
  background: -webkit-linear-gradient(
    left,
    rgba(252, 150, 7, 1) 0%,
    rgba(252, 178, 7, 1) 60%,
    rgba(255, 193, 7, 1) 100%
  );
  background: linear-gradient(
    to right,
    rgba(252, 150, 7, 1) 0%,
    rgba(252, 178, 7, 1) 60%,
    rgba(255, 193, 7, 1) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#fc9607', endColorstr='#ffc107',GradientType=1 );
}

.breadcrumb-item.divider li {
  color: #2b2b2b !important;
  font-family: "Roboto", sans-serif !important;
  font-weight: bold;
  letter-spacing: 0.1em;
  font-size: 24px;
  padding: 0.04em;
  height: 0.8em;
  margin: 0;
  top: 0;
}
.breadcrumb.bg-dark {
  width: 96%;
  margin: 0 auto;
  ;
}

li .breadcrumb-item{
  
}
ol.breadcrumb.bg-dark.card{
  height: 48px !important; 
  text-align: left !important;
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif !important;
}
.container {
  padding-top: 1em;
}
.proba {
  font-family: "Lobster", cursive;

  font-size: 25px;
}

.addradius .bg-dark {
  border-radius: 0.4em;
}

.sistema{
  font-family:Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  font-size: 22px;
  letter-spacing: 0.05em;
}

.breadcrumb.bg-warning{
  padding-top: 0 ;
  padding-bottom: 0;
}

.card-body.text-center{
  height: 380px;
}

h1.card-text{
  font-size: 27px !important;
}

.banner{
  width: 50%;
}

@media screen and (max-width: 768px){
 .sticky-top.nav{
   display: none;
 }

  .subcontainer2{
    background: url('miniscreen.png') center;
    background-size: cover !important;
  }

.contact{
  display: none;
}
}
</style>
