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
                  <th>Pago</th>
                  <th>Suspender</th>
                </thead>
                <tbody>
                    <tr v-for="user in users">
                        <td>{{user.username}}</td>
                        <td>{{user.email}}</td>
                        <td>{{user.verify}}</td>
                        <td>{{isPayed(user)}}</td>
                        <td><button class="btn btn-outline-success btn-sm" ><i class="material-icons">attach_money</i></button></td>
                        <td><button class="btn btn-outline-danger btn-sm" ><i class="material-icons">highlight_off</i></button></td>
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
import axios from 'axios'
import jwt from 'jsonwebtoken'
export default {
    data(){
        return{
                users: []
        }
    },
    mounted(){
        this.getUsers()
    },
    methods:{
        getUsers(){
            axios({
                url:'http://localhost:3000/admin',
                headers: {authorization: `Bearer ${localStorage.token}`}
            }).then(response => {
                console.log(response.data)
                this.users = response.data 
            }).catch( err => {
                console.log(err.response.data)
            })
        },
        
        isPayed(user){
            const token ='SDFSDFSDFSD,.,.,Fsfsdfsdffsdfsdfllokokkhhhdhcxzc'
           return jwt.verify(user.payToken,token, function(err, decoded) {
                    if(err){
                        return "No pagado"
                    }else{
                        return "Pagado"
                    }
            })
        }
    }
}
</script>

<style>

</style>
