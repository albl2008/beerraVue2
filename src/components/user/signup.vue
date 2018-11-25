<template>
    <div class="container">
        
        <div class="row justify-content-center">
            <div class="col-md-6 ">
                <div v-if="errorMessage" class="alert alert-danger" role="alert">
                   {{ errorMessage }}
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
                                    placeholder="Enter a username"
                                    required>
                                <small 
                                id="emailHelp" 
                                class="form-text text-muted">El usuario debe ser mayor a tres caracteres. 
                                Solo puede contener caracteres alfanumericos
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
                            <div class="row">
                                <button type="submit" class="btn btn-primary">Signup</button>
                                <div v-if="signingUP">
                                    <img height="30px" width="30px" src="../../assets/load.svg" class="ml-2">
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
                username:'',
                password:'',
                confirmPassword:''
            }
    }
       
    },
    methods:{
        signup(){
            
            if(this.validUser()){
                this.signingUP = true
                axios.post('http://localhost:3000/signup',
                {
                    username: this.user.username,
                    password: this.user.password
                }    
                ).then(response => {
                    this.signingUP = false
                    if(response.status === 200){
                        localStorage.token = response.data.token  
                        this.$router.go('/dashboard')
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

<style>

</style>
