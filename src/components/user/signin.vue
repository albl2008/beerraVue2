<template>
    <div class="container backlime">
        <div class="row justify-content-center">
            <div class="col-md-6 ">
                <div class="midcontainer">
                    <div v-if="errorMessage" class="alert alert-danger animated fadeInDown mid" role="alert">
                    {{ errorMessage }}
                    </div>
            
                    <div v-if="resetPassword" class="alert alert-success animated fadeInDown mid" role="alert">
                    {{ resetPassword }}
                    </div>
                </div>
                <div class="card cardlogin">
                    <div class="card-header">
                        <h1 class="text-center">Login</h1>
                    </div>
                    <div class="card-body">
                                       <form v-on:submit.prevent="login">
                            <div class="form-group">
                                <label for="UserName">Nombre de usuario</label>
                                <input 
                                    v-model="user.username"
                                    type="text" 
                                    class="form-control" 
                                    id="UserName" 
                                    aria-describedby="emailHelp" 
                                    placeholder="Enter a username"
                                    required>
                                <small 
                                id="emailHelp" 
                                class="form-text text-muted">Ingrese su nombre de usuario para ingresar.
                                </small>
                            </div>
                                <div class="form-group ">
                                    <label for="password">Contraseña</label>
                                    <input 
                                    v-model="user.password"
                                    type="password" 
                                    class="form-control" 
                                    id="password" 
                                    aria-describedby="passwordHelp"
                                    placeholder="contraseña"
                                    required>
                                    <small 
                                    id="passwordHelp" 
                                    class="form-text text-muted">
                                    Ingrese su contraseña respetando mayusculas y minusculas.
                                    </small>
                                </div>        
                                <div class="container">
                                    <div class="row signinG breadcrumb">
                                        <button type="submit" class="btn btn-outline-dark">Ingresar </button>
                                        <div v-if="signingIN" class="">
                                            <img height="30px" width="30px" src="../../assets/load.svg" class="ml-2">
                                        </div>
                                    </div>
                                </div>                           
                        </form>
                    </div>
                    <router-link class="sLink" style="text-align: center;" :to="{path:'/recover'}">¿Olvidaste tu contraseña?</router-link>
                <router-link class="sLink" style="text-align: center; padding-bottom: 1em;" :to="{path:'/recoverUsername'}">¿Olvidaste tu nombre de usuario?</router-link></div>
                </div>
                <div class="center">
                
            </div>
        </div>
    </div>
</template>

<script>
const axios = require('axios') 
import Joi from 'joi'
import load from '../../assets/load.svg'
const schema = Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().min(8).trim().required(),
    
})
export default {
    data(){
            return{
                signingIN: false,
                errorMessage:'',
                user: {
                    username:'',
                    password:'',
                },
                resetPassword: this.$route.params.message
        }
    },
    watch:{
        user:{
            handler(){
                this.errorMessage = ''
            },
            deep: true
        }
    },
    methods: {
        login(){
            if(this.validUser()){
                this.signingIN = true
               axios.post(process.env.ROOT_API + 'signin',
               this.user)
               .then(response => {
                    this.signingIN = false
                    console.log(response)
                    if(response.status === 200){
                        localStorage.isLoggIn = true
                        localStorage.token = response.data.token
                        this.$router.go('/dashboard')
                    } 
                }).catch(err =>{
                    this.signingIN = false
                    this.errorMessage = err.response.data + "😰"
                    
                })
            }
                
        },
        validUser(){
            const result = Joi.validate(this.user,schema)
            if(result.error === null){
                
                return true
            }else{
                console.log(result.error.message)
                if(result.error.message.includes('username')){
                    this.errorMessage = 'Usuario ingresado invalido 😛'
                }
                if(result.error.message.includes('password')){
                    this.errorMessage = 'Contraseña ingresada invalida 😓 '
                }
                //this.errorMessage = 
            }
           
        }
    }
}



</script>

<style>

</style>
