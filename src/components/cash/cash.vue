<template>
  <div id="cash">
    <div class="row" style="width: 50%; margin: 0 auto; ">
      <div class="centerhead">
        <h1 class="h1head">Caja</h1>
      </div>
      <img :src="require('@/assets/beerra/cash2x.png')" alt class="underh1">
    </div>

    <div class="container">
      <div class="row">
        <div class="col-lg-3 col-md-6">
          <div class="card">
            <div class="card-body">
              <div class="stat-widget-five">
                <div class="stat-icon dib flat-color-1">
                  <span class="letra total">T</span>
                </div>
                <div class="stat-content">
                  <div class="text-left dib">
                    <div class="stat-text">
                      <span class="count">$ 23569</span>
                    </div>
                    <div class="stat-heading">
                      <span>Total</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-3 col-md-6">
          <div class="card">
            <div class="card-body">
              <div class="stat-widget-five">
                <div class="stat-icon dib flat-color-2">
                  <span class="letra month">M</span>
                </div>
                <div class="stat-content">
                  <div class="text-left dib">
                    <div class="stat-text">
                      <span class="count">$ 3435</span>
                    </div>
                    <div class="stat-heading">
                      <span>Este mes</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-3 col-md-6">
          <div class="card">
            <div class="card-body">
              <div class="stat-widget-five">
                <div class="stat-icon dib flat-color-3">
                  <span class="letra week">S</span>
                </div>
                <div class="stat-content">
                  <div class="text-left dib">
                    <div class="stat-text">
                      <span class="count">$ 349</span>
                    </div>
                    <div class="stat-heading">
                      <span>Esta semana</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-3 col-md-6">
          <div class="card">
            <div class="card-body">
              <div class="stat-widget-five">
                <div class="stat-icon dib flat-color-4">
                  <span class="letra today">H</span>
                </div>
                <div class="stat-content">
                  <div class="text-left dib">
                    <div class="stat-text">
                      <span class="count">$ 2986</span>
                    </div>
                    <div class="stat-heading">
                      <span>Hoy</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row" style="margin-top: 2em;">
        <div class="col-md-2" style>
          <div class="card" style="background: #272727;">
            <div class="card-header bg-dark">
              <h3 class="tablaHead">Ingreso +</h3>
            </div>
            <div class="card-body">
              <label>Monto</label>
              <input type="text" class="form-control mb-1">
              <label>Palabra clave</label>
              <input type="text" class="form-control mb-1">
              <button class="btn btn-outline-success" style="width: 75px; margin-top: 1em;">Agregar</button>
            </div>
          </div>
        </div>

        <div class="col-md-2">
          <div class="card" style="background: #272727;">
            <div class="card-header bg-dark">
              <h3 class="tablaHead">Egreso -</h3>
            </div>
            <div class="card-body">
              <label>Monto</label>
              <input type="text" class="form-control mb-1">
              <label>Palabra clave</label>
              <input type="text" class="form-control mb-1">
              <button class="btn btn-outline-danger" style="width: 75px; margin-top: 1em;">Agregar</button>
            </div>
          </div>
        </div>

        <div class="col-md-8">
          <div class="card tabla" style="background: #272727;">
            <div class="card-header tituloCardHeader bg-dark">
              <h3 class="tablaHead">Operaciones</h3>
            </div>
            <div class="card-body tabla">
              <table class="table s">
                <thead>
                  <th>Monto</th>
                  <th>Descripción</th>
                  <th>Tipo</th>
                  <th>Fecha</th>
                  <th>Opciones</th>
                </thead>
                <tbody>
                  <tr class="trHigh">
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>

                    <div id="options" class="opacityOut">
                      <td>
                        <button class="btn btn-outline-danger btn-sm fix disableBorder">
                          <i class="material-icons resize">clear</i>
                        </button>
                      </td>
                      <td>
                        <button class="btn btn-outline-primary btn-sm fix disableBorder">
                          <i class="material-icons resize">edit</i>
                        </button>
                      </td>
                    </div>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
</script>

<style scoped>
.cardX {
  width: 100%;
  height: 15em;
  padding: 0.8em;
}

.cardY {
  background: rgba(51, 51, 51, 0.274) !important;
  margin: 0.4em 0.4em 0 0.4em;
  width: 49%;
  border: 1px solid #444;
  border-radius: 0.4em;
  height: 5.9em;
}

span,
p {
  color: white;
}

.cardContainer {
  width: 100%;
  display: flex;
}

.left {
  float: left;
}

.middle {
  margin: 0 auto;
}

.cube {
  height: 100%;
  padding: 1em;
  background: rgba(34, 34, 34, 0.493);
  width: 20%;
  border-radius: 0.3em 0 0 0.3em;
  border-right: 1px solid #444;
}

.letra {
  float: left;
  margin-right: 1em;
  margin-left: 0.5em;
  font-size: 32px;
}

.week {
  color: rgb(0, 255, 170);
}

.month {
  color: rgb(255, 136, 0);
}

.total {
  color: rgb(255, 0, 119);
}

.today {
  color: rgb(0, 238, 255);
}
</style>