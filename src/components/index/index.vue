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
          <a href="#precios">Planes</a>
        </li>
        <li class="breadcrumb-item">
          <a href="process.env.ROOT + '#/signup'">Registrarse</a>
        </li>
        <li class="breadcrumb-item">
          <a href="process.env.ROOT + '#/signin'">Ingresar</a>
        </li>
      </ol>
    </nav>
    <div class="container" style="padding-bottom: 0;">
      <div class=" card bg-dark">
        <div class="subcontainer ">
          <h1>
            ¿Qué es
            <span id class="beerra">Beerra</span>?
            <!-- <span id="animate2" class="badge badge-warning badge-pill beerra">Beerra</span>? -->
          </h1>
          <p style="margin-bottom: 0.8em;">
            <span class="sistema">Es un sistema web pensado para</span>
            <span class="centros">centros de recarga</span> <span class="sistema">de Cerveza Artesanal</span>
          </p>
          <p class="proba">Proba todas las funcionalidades del sistema
            <span
              style="letter-spacing: 0.1em; text-transform: capitalize; color: #FB9336; 
              font-weight: bold; font-size: 29px; border: 1px solid white; padding: 3px 10px 6px 10px; 
              border-radius: 0.2em; background:  rgba(0, 0, 0, 0.042);"
            >gratis</span> por 2 semanas
          </p>
          <p class="lead">
            <a
              class="btn btn-outline-light btn-lg"
              href="process.env.ROOT + '#/signup'"
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
          <li class="breadcrumb-item divider" aria-current="page">Funcionalidades</li>
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
              Podras controlar los barriles por estado, desde que llegan hasta son vaciados y pagados al proveedor.</p>
          </div>
        </div>
        <div class="card bg-dark">
          <div class="card-body text-center">
            <h1 class="card-text">Venta en otros formatos</h1>
            <!-- <button v-on:click="config = !config"> -->
              <img :src="require('@/assets/beerra/different2.png')" alt class="imgicon">
            <!-- </button> -->
            <!-- <p
              v-if="config"
            > --><p>Podes recargar botellones y pintas, ademas de contar con la opcion 2x1 (happy hour) en pintas.</p>
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
            >--><p>Administra los gastos: alquiler, luz, gas(CO2), compras de botellones y pintas, limpieza, etc</p> 
          </div>
        </div>
        <div class="card bg-dark">
          <div class="card-body text-center">
            <h1 class="card-text">Manejo de ventas</h1>
            <!-- <button v-on:click="sell = !sell"> -->
              <img :src="require('@/assets/beerra/ventass2.png')" alt class="imgicon">
            <!-- </button> -->
         <!--    <p v-if="sell"> --><p>Podras administrar las ventas de cerveza en los distintos formatos</p>
          </div>
        </div>
        <div class="card bg-dark">
          <div class="card-body text-center">
            <h1 class="card-text">Venta de botellas</h1>
            <!-- <button v-on:click="bottle = !bottle"> -->
              <img :src="require('@/assets/beerra/bottlee2.png')" alt class="imgicon">
            <!-- </button> -->
            <!-- <p v-if="bottle"> --><p>Podras cargar y administrar la venta de cerveza en botellas</p>
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
            > --><p>Llevaras un control sobre los clientes de tu centro de recarga, con contador de litros para cada uno</p>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <nav id="precios" aria-label="breadcrumb">
        <ol class="breadcrumb bg-warning">
          <li class="breadcrumb-item divider" aria-current="page">Planes</li>
        </ol>
      </nav>
      <div class="card-columns">
        <div class="card bg-dark yellowB">
          <div class="card-body text-center">
            <h1 class="card-text">Hasta 3 Canillas</h1>
            <!-- <button v-on:click="tres = !tres"> -->
              <img :src="require('@/assets/beerra/3cani.png')" alt class="canilla">
              
            <!-- </button> -->
            <!-- <p v-if="tres"> --><p>Plan básico.</p>
            <!-- <p v-if="tres" class="lead"> --><p>
              <a class="btn btn-outline-light btn-lg" href="#" role="button">Consultar</a>
            </p>  
          </div>
        </div>
        <div class="card bg-dark yellowB">
          <div class="card-body text-center">
            <h1 class="card-text">Hasta 7 Canillas</h1>
            <!-- <button v-on:click="siete = !siete"> -->
              <img :src="require('@/assets/beerra/7cani.png')" alt class="canilla">
              <!-- <p>4 - 7</p> -->
            <!-- </button> -->
           <!--  <p v-if="siete"> --><p>Plan intermedio.</p>
           <!--  <p v-if="siete" class="lead"> -->
              <a class="btn btn-outline-light btn-lg" href="#" role="button">Consultar</a>
          <!--   </p> -->
          </div>
        </div>
        <div class="card bg-dark yellowB">
          <div class="card-body text-center">
            <h1 class="card-text">Más de 7 Canillas</h1>
            <!-- <button v-on:click=" ocho= !ocho"> -->
              <img :src="require('@/assets/beerra/nosecani.png')" alt class="canilla">
              <!-- <p>+7</p> -->
            <!-- </button> -->
            <!-- <p v-if="ocho"> --><p>Plan avanzado.</p>
           <!--  <p v-if="ocho" class="lead"> -->
              <a class="btn btn-outline-light btn-lg" href="#" role="button">Consultar</a>
          <!--   </p> -->
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
            <br>Envianos tu sugerencia con nuestro formulario de contacto o directamente a nuestra casilla.
            <br>
            <span class="badge-light badge-pill" style="font-family: 'Lobster', serif; font-size: 22px;">info@beerra.com.ar</span>
          </p>
        </div>
      </center>
    </div>
    <div class="container">
      <nav id="contacto" class="" aria-label="breadcrumb">
        <ol class="breadcrumb bg-warning">
          <li class="breadcrumb-item divider" aria-current="page">Contacto</li>
        </ol>
      </nav>
      <div class=" card contactBack bg-dark" >
        <div class="col-lg-8 col-lg-offset-2 ">
          <!-- <div class="col-lg-8 col-lg-offset-2" style="padding-left: 0px !important;"> -->
          <form id="contact-form" method="post" action role="form" class="notsolidblack">
            <div class="imgBack">
            <div class="messages"></div>

            <div class="controls">
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="form_name">Nombre *</label>
                    <input
                      id="form_name"
                      type="text"
                      name="name"
                      class="form-control badge-warning"
                      placeholder="Ingrese su nombre"
                      required="required"
                      data-error="Firstname is required."
                    >
                    <div class="help-block with-errors"></div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="form_lastname">Apellido *</label>
                    <input
                      id="form_lastname"
                      type="text"
                      name="surname"
                      class="form-control badge-warning"
                      placeholder="Ingrese su apellido"
                      required="required"
                      data-error="Lastname is required."
                    >
                    <div class="help-block with-errors"></div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="form_email">Email *</label>
                    <input
                      id="form_email"
                      type="email"
                      name="email"
                      class="form-control badge-warning"
                      placeholder="Ingrese su email "
                      required="required"
                      data-error="Valid email is required."
                    >
                    <div class="help-block with-errors"></div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="form_phone">Telefono</label>
                    <input
                      id="form_phone"
                      type="tel"
                      name="phone"
                      class="form-control badge-warning"
                      placeholder="Ingrese su telefono"
                    >
                    <div class="help-block with-errors"></div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <div class="form-group">
                    <label for="form_message">Mensaje *</label>
                    <textarea
                      id="form_message"
                      name="message"
                      class="form-control"
                      placeholder="Mensaje o sugerencia"
                      rows="4"
                      required
                      data-error="Please,leave us a message."
                    ></textarea>
                    <div class="help-block with-errors"></div>
                  </div>
                </div>
                <div class="col-md-12">
                  
                  <center>
                    <div class="row signinG breadcrumb">
                    <button
                      type="submit"
                      class="btn btn-outline-warning btn-send btn-lg"
                      value="Enviar"
                    >Enviar</button>
                    </div>
                  </center>
                  <br>
                </div>
              </div>
              </div>
            </div>
          </form>
        </div>
        <div class="contact col-lg-8">
          <div class="card notsolidblack" style="height: 94%; margin-bottom: 10px;">
            <div class="card-body text-center">
              <h1 class="card-text">Contacto directo</h1>
              <!-- <button v-on:click="contact = !contact"> -->
                <img
                  data-aos="zoom-out-left"
                  :src="require('@/assets/beerra/agenda2.png')"
                  alt
                  class="agenda"
                >
             <!--  </button> -->
             <p style="font-family: 'Roboto', sans-serif; font-size: 16px;">
              <!-- <p v-if="contact"> -->
                <i class="material-icons">mail_outline</i> info@beerra.com.ar
              </p>
              <p style="font-family: 'Roboto', sans-serif; font-size: 16px; margin-bottom: 0;">
             <!--  <p v-if="contact"> -->
                <i class="material-icons">phone</i> 2616563848
              </p>
              <p style="font-family: 'Roboto', sans-serif; font-size: 16px; margin-bottom: 0;">
             <!--  <p v-if="contact"> -->
                <i class="material-icons">phone</i> 2616585487
              </p>
              <p style="font-family: 'Roboto', sans-serif; font-size: 16px;">
             <!--  <p v-if="contact"> -->
                <i class="material-icons">phone</i> 2616585672
              </p>
            </div>
          </div>
        </div>
      </div>
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
