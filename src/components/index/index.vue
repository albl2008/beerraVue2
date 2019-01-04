<template>
  <div class="container">
    <nav aria-label="breadcrumb" class="sticky-top">
      <ol class="breadcrumb bg-dark">
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
          <a href="http://localhost:8080/#/signup">Registrarse</a>
        </li>
        <li class="breadcrumb-item">
          <a href="http://localhost:8080/#/signin">Ingresar</a>
        </li>
      </ol>
    </nav>
    <div class="container">
      <div class="jumbotron bg-dark">
        <h1>¿Qué es
          <span id="animate2" class="badge badge-warning badge-pill beerra">Beerra</span>?
        </h1>
        <p>Es un sistema web pensado para
          <span class="badge badge-light badge-pill centros">centros de recarga</span> de Cerveza Artesanal
        </p>
        <p
          class="badge-warning badge-pill"
        >Proba todas las funcionalidades del sistema gratis por 30 días</p>
        <p class="lead">
          <a
            class="btn btn-outline-light btn-lg"
            href="http://localhost:8080/#/signup"
            role="button"
          >Registrarse</a>
        </p>
      </div>
    </div>

    <div class="container">
      <nav id="funcionalidades" aria-label="breadcrumb">
        <ol class="breadcrumb bg-warning">
          <li class="breadcrumb-item active divider" aria-current="page">Funcionalidades</li>
        </ol>
      </nav>
      <div class="card-columns">
        <div class="card bg-dark">
          <div class="card-body text-center">
            <p class="card-text">Control sobre Barriles</p>
            <button v-on:click="keg = !keg">
              <img :src="require('@/assets/beerra/keg.png')" alt class>
            </button>
            <p
              v-if="keg"
            >Podras controlar los barriles por estado, desde que llegan hasta son vaciados y pagados al proveedor.</p>
          </div>
        </div>
        <div class="card bg-dark">
          <div class="card-body text-center">
            <p class="card-text">Venta en distintos formatos</p>
            <button v-on:click="config = !config">
              <img :src="require('@/assets/beerra/config.png')" alt class>
            </button>
            <p
              v-if="config"
            >Podes recargar botellones y pintas, ademas de contar con la opcion 2x1 (happy hour) en pintas.</p>
          </div>
        </div>
        <div class="card bg-dark">
          <div class="card-body text-center">
            <p class="card-text">Manejo de gastos</p>
            <button v-on:click="pay = !pay">
              <img :src="require('@/assets/beerra/pagoss.png')" alt class>
            </button>
            <p
              v-if="pay"
            >Administra los gastos: alquiler, luz, gas(CO2), compras de botellones y pintas, limpieza, etc</p>
          </div>
        </div>
        <div class="card bg-warning">
          <div class="card-body text-center">
            <p class="card-text">Manejo de ventas</p>
           <button v-on:click="sell = !sell">
            <img :src="require('@/assets/beerra/sell.png')" alt class>
            </button>
            <p v-if="sell">Podras administrar las ventas de cerveza en los distintos formatos</p>
          </div>
        </div>
        <div class="card bg-dark">
          <div class="card-body text-center">
            <p class="card-text">Venta de botellas</p>
            <button v-on:click="bottle = !bottle">
              <img :src="require('@/assets/beerra/bottles.png')" alt class>
            </button>
            <p v-if="bottle">Podras cargar y administrar la venta de cerveza en botellas</p>
          </div>
        </div>
        <div class="card bg-warning">
          <div class="card-body text-center">
            <p class="card-text">Manejo de clientes</p>
            <button v-on:click="client = !client">
            <img :src="require('@/assets/beerra/clients.png')" alt class>
            </button>
            <p v-if="client">Llevaras un control sobre los clientes de tu centro de recarga, con contador de litros para cada uno</p>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
       <nav id="precios" aria-label="breadcrumb">
        <ol class="breadcrumb bg-dark">
          <li class="breadcrumb-item active divider" aria-current="page">Planes</li>
        </ol>
      </nav>
      <div class="card-columns">
        <div class="card bg-dark">
          <div class="card-body text-center">
            <p class="card-text">Hasta 3 Canillas</p>
            <button v-on:click="tres = !tres">
              <img :src="require('@/assets/beerra/pipes.png')" alt class>
              <p> 3- </p>
            </button>
            <p
              v-if="tres"
            >Para centros de recarga de hasta 3 canillas de expendio. Plan basico</p>
            <p v-if="tres" class="lead">
          <a
            class="btn btn-outline-light btn-lg"
            href="#"
            role="button"
          >Consultar!</a>
        </p>
          </div>
        </div>
        <div class="card bg-warning">
          <div class="card-body text-center">
            <p class="card-text">Hasta 7 Canillas</p>
            <button v-on:click="siete = !siete">
              <img :src="require('@/assets/beerra/pipes.png')" alt class>
              <p> 4 - 7 </p>
            </button>
            <p
              v-if="siete"
            >Para centros de recarga de hasta 7 canillas de expendio. Plan intermedio</p>
            <p v-if="siete" class="lead">
          <a
            class="btn btn-outline-light btn-lg"
            href="#"
            role="button"
          >Consultar!</a>
        </p>
          </div>
        </div>
        <div class="card bg-dark">
          <div class="card-body text-center">
            <p class="card-text">Más de 7 Canillas</p>
            <button v-on:click=" ocho= !ocho">
              <img :src="require('@/assets/beerra/pipes.png')" alt class>
              <p> +7 </p>
            </button>
            <p
              v-if="ocho"
            >Para centros de recarga de mas de 7 canillas de expendio. Plan avanzado</p>
            <p v-if="ocho" class="lead">
          <a
            class="btn btn-outline-light btn-lg"
            href="#"
            role="button"
          >Consultar!</a>
        </p>
          </div>
        </div>
      </div>


    </div>
    <div class="container">
      <center><div class="jumbotron bg-warning">
        <h1>
          <span id="animate3" class="badge badge-dark badge-pill beerra">Beerra</span>
        </h1>
        <p class="bg-dark badge-pill redondeo">Nuestro sistema esta en constante evolucion, tomamos requirimientos de nuestros clientes y lo mejoramos dia a dia <br>Envianos tu sugerencia con nuestro formulario de contacto  o directamente a nuestra casilla <br><span class="badge-light badge-pill">info@beerra.com.ar</span></p>
      
        
      </div></center>
    </div>
    <div class="container">
      <nav id="contacto" aria-label="breadcrumb">
        <ol class="breadcrumb bg-dark">
          <li class="breadcrumb-item active divider" aria-current="page">Contacto</li>
        </ol>
      </nav>
      <div class="row">
        <div class="col-lg-8 col-lg-offset-2">
          <form id="contact-form" method="post" action role="form" class="bg-dark">
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
                      class="form-control bg-warning"
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
                    <button
                      type="submit"
                      class="btn btn-outline-warning btn-send btn-lg"
                      value="Enviar"
                    >Enviar</button>
                  </center>
                  <br>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="col-lg-4">
          <div class="card bg-warning">
            <div class="card-body text-center">
              <p class="card-text">Contacto</p>
              <button v-on:click="contact = !contact">
                <img data-aos="zoom-out-left" :src="require('@/assets/beerra/contact.png')" alt class>
              </button>
              <p v-if="contact">
                <i class="material-icons">mail_outline</i> info@beerra.com.ar
              </p>
              <p v-if="contact">
                <i class="material-icons">phone</i> 2616563848
              </p>
              <p v-if="contact">
                <i class="material-icons">phone</i> 2616585487
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import AOS from 'aos';
import 'aos/dist/aos.css';

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

.beerra {
  font-size: 1.2em;
  font-family: "Black Ops One", cursive;
}
.divider {
  font-size: 1.2em;
  font-family: "Black Ops One", cursive;
  color: white !important;
}
.centros {
  font-family: "Courier New", Courier;
  font-size: 17px;
}
.form-group {
  margin: 10px;
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
.redondeo{
  border-radius:10px;
}
.breadcrumb-item a {
  font-size: 1.2em;
  font-family: "Black Ops One", cursive;
  color: white !important;
}
.breadcrumb-item a:hover {
  color: #ffc107 !important;
}
.bg-warning{
  background-color: #ffc107 !important;
}
</style>
