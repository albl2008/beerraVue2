<template>
    <div class="container backlime">
        
        <div class="row justify-content-center">
            <div class="col-md-6 ">
                <div v-if="errorMessage" class="alert alert-danger" role="alert">
                   {{ errorMessage }}
                </div>
                <div v-if="message" class="alert alert-success" role="alert">
                   {{ message }}
                </div>
                <div class="card">
                    <div class="card-header text-center">
                        <h1 class="">Sign Up!</h1>
                    </div>
                    <div class="card-body">                    
                        <form v-on:submit.prevent="signup">
                            <div class="form-group">
                                <label for="UserName">Nombre de usuario</label>
                                <input 
                                    v-model="user.username"
                                    type="text" 
                                    class="form-control" 
                                    id="UserName" 
                                    aria-describedby="emailHelp" 
                                    placeholder="Ingrese un nombre de usuario"
                                    required>
                                <small 
                                id="emailHelp" 
                                class="form-text text-muted">El usuario debe ser mayor a tres caracteres. 
                                Solo puede contener caracteres alfanumericos
                                </small>
                            </div>
                                 <div class="form-group">
                                <label for="email">Email</label>
                                <input 
                                    v-model="user.email"
                                    type="text" 
                                    class="form-control" 
                                    id="email" 
                                    aria-describedby="emailHelp" 
                                    placeholder="Ingrese su email"
                                    required>
                                <small 
                                id="emailHelp" 
                                class="form-text text-muted">Ingrese un email valido
                                </small>
                            </div>
                            <div class="form-row">
                                <div class="form-group col-md-6">
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
                                    La contraseña debe contener almenos ocho caracters.
                                    </small>
                                </div>
                                    <div class="form-group col-md-6">
                                    <label for="password">Confirmar contraseña</label>
                                    <input 
                                    v-model="user.confirmPassword"
                                    type="password" 
                                    class="form-control" 
                                    id="confirmPassword" 
                                    aria-describedby="passwordHelp"
                                    placeholder="confirmar contraseña"
                                    required>
                                    <small 
                                    id="passwordHelp" 
                                    class="form-text text-muted">
                                    Porfavor confirme la contraseña.
                                    </small>
                                </div>
                            </div>
                            <div class="container">
                                <div class="row signinG breadcrumb">
                                    <button type="submit" class="btn btn-outline-dark">Registrarse</button>
                                    <div v-if="signingUP" class="ml-2">
                                        <img height="30px" width="30px" src="../../assets/load.svg" class="ml-2 badge badge-pill bg-warning">
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
               
            </div>      
        </div>
    </div>
</template>

<script>
const axios = require('axios') 
import Joi from 'joi'
import load from '../../assets/load.svg'
const schema = Joi.object().keys({
    email: Joi.string().email(),
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().min(8).trim().required(),
    confirmPassword: Joi.string().min(8).trim().required(),
})
export default {
    data(){
        return{
            signingUP: false,
            errorMessage:'',
            user: {
                email:'',
                username:'',
                password:'',
                confirmPassword:''
            },
            message:''
    }
       
    },
    methods:{
        signup(){
            
            if(this.validUser()){
                this.signingUP = true
                axios.post(process.env.ROOT_API + 'signup',
                {
                    username: this.user.username,
                    password: this.user.password,
                    email: this.user.email
                }    
                ).then(response => {
                    this.signingUP = false
                    if(response.status === 200){
                            this.message = response.data.message
                    }
                }).catch(err =>{
                    this.signingUP = false
                    this.errorMessage = err.response.data + "😡"
                    
                })
            
                
            }
        },
        validUser(){
            if(this.user.password != this.user.confirmPassword){
                this.errorMessage = 'Las contraseñas deben coincidir'
                return false
            }
            const result = Joi.validate(this.user,schema)
            if(result.error === null){
                
                return true
            }else{
               
                if(result.error.message.includes('username')){
                    this.errorMessage = 'Usuario ingresado invalido 😛'
                }
                if(result.error.message.includes('password')){
                    this.errorMessage = 'Contraseña ingresada invalida 😓 '
                }
                if(result.error.message.includes('email')){
                    this.errorMessage = 'Mail ingresado invalido 😛'
                }
                //this.errorMessage = 
            }
           
        }
    },
    watch:{
        user:{
            handler(){
                this.errorMessage = ''
            },
            deep: true,
        }
    }
}
</script>

<style scoped>

.card{
    margin-top: 4em !important;
    width: 440px !important;
    margin: 0 auto;
}

</style>
