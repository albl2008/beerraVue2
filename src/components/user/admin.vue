<template>
  <div class="container">
    <div class="text-center">
      <h1>Administrador</h1>
      <div class="col-md-12">
        <div class="card">
          <div class="card-header bg-dark">
            <h3>USUARIOS</h3>
          </div>
          <div class="card-body">
            <table class="table s">
              <thead>
                <th>Usuario</th>
                <th>Email</th>
                <th>verificado</th>
                <th>Estado de pago</th>
                <th>Vencimiento</th>
                <th>Pago</th>
                <th>Suspender</th>
              </thead>
              <tbody>
                <tr v-for="user in users">
                  <td>{{user.username}}</td>
                  <td>{{user.email}}</td>
                  <td>{{user.verify}}</td>
                  <td>{{isPayed(user)}}</td>
                  <th>{{expired(user)}}</th>
                  <td>
                    <button class="btn btn-outline-success btn-sm" v-on:click="showModal(user._id)">
                      <i class="material-icons">attach_money</i>
                    </button>
                  </td>
                  <td>
                    <button class="btn btn-outline-danger btn-sm">
                      <i class="material-icons">highlight_off</i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <modal name="time" height="auto">
      <div class="container bg-dark">
        <div class="breadcrumb bg-warning">
          <h5 class>Ingrese la cantidad de meses pagados por el usuario</h5>
        </div>

        <form v-on:submit.prevent="newToken()">
          <div class="input-group-pretend mb-3">
            <input type="number" class="form-control mb-1" v-model="time" required>
          </div>
          <button class="btn btn-outline-warning btn-block">nuevo token</button>
        </form>
      </div>
    </modal>
  </div>
</template>

<script>
import axios from "axios";
import jwt from "jsonwebtoken";
import moment from "moment-timezone";
export default {
  data() {
    return {
      users: [],
      time: "",
      idUser: ""
    };
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    getUsers() {
      axios({
        url: process.env.ROOT_API + "admin",
        headers: { authorization: `Bearer ${localStorage.token}` }
      })
        .then(response => {
          console.log(response.data);
          this.users = response.data;
        })
        .catch(err => {
          console.log(err.response.data);
        });
    },
    showModal(idUser) {
      this.idUser = idUser;
      this.$modal.show("time");
    },
    newToken() {
      axios({
        method: "POST",
        url: process.env.ROOT_API + `payToken/${this.idUser}`,
        data: { time: this.time },
        headers: { authorization: `Bearer ${localStorage.token}` }
      })
        .then(res => {
          console.log(res);
          this.getUsers();
        })
        .catch(err => {
          console.log(err.response.data);
        });
      this.hide();
    },
    hide() {
      this.$modal.hide("time");
    },
    isPayed(user) {
      const token = "SDFSDFSDFSD,.,.,Fsfsdfsdffsdfsdfllokokkhhhdhcxzc";

      return jwt.verify(user.payToken, token, function(err, decoded) {
        if (err) {
          return "No pagado";
        } else {
          const d = new Date(0);
          d.setUTCSeconds(decoded.exp);
          console.log(moment(d).format("DD/MM/YYYY"));
          return "Pagado";
        }
      });
    },
    expired(user) {
      const token = "SDFSDFSDFSD,.,.,Fsfsdfsdffsdfsdfllokokkhhhdhcxzc";

      return jwt.verify(user.payToken, token, function(err, decoded) {
        if (err) {
          return "Vencido";
        } else {
          const d = new Date(0);
          d.setUTCSeconds(decoded.exp);
          return moment(d)
            .tz("UTC")
            .format("DD/MM/YYYY");
        }
      });
    }
  }
};
</script>

<style>
</style>
