<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-6 ">
                 <div v-if="errorMessage" class="alert alert-danger" role="alert">
                   {{ errorMessage }}
                </div>
                  <div v-if="message" class="alert alert-success" role="alert">
                   {{ message }}
                </div>
                <div class="card">
                    <div class="card-header">
                        <h1 class="text-center">Restablecer contraseña</h1>
                    </div>
                    <div class="card-body">
                                       <form v-on:submit.prevent="resetPassword">
                            <div class="form-group">
                                <label for="UserName">Contraseña</label>
                                <input 
                                    v-model="user.password"
                                    type="password" 
                                    class="form-control" 
                                    id="UserName" 
                                    aria-describedby="emailHelp" 
                                    placeholder="nueva contraseña"
                                    required>
                                <small 
                                id="emailHelp" 
                                class="form-text text-muted">Ingrese nueva contraseña.
                                </small>
                            </div>
                                <div class="form-group ">
                                    <label for="password">confirmar contraseña</label>
                                    <input 
                                    v-model="user.confirmPassword"
                                    type="password" 
                                    class="form-control" 
                                    id="password" 
                                    aria-describedby="passwordHelp"
                                    placeholder="confirmar contraseña"
                                    required>
                                    <small 
                                    id="passwordHelp" 
                                    class="form-text text-muted">
                                    Confirme la contraseña anteriormente ingresada.
                                    </small>
                                </div>        
                                <div class="container">
                                    <div class="row">
                                        <button type="submit" class="btn btn-primary">Restablecer </button>
                                        <div v-if="changingPassword">
                                            <img height="30px" width="30px" src="../../assets/load.svg" class="ml-2">
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
import Joi from 'joi'
import axios from 'axios'

const schema = Joi.object().keys({
    password: Joi.string().min(8).trim().required(),
    confirmPassword: Joi.string().min(8).trim().required()
    
})
export default {
    data(){
            return{
                changingPassword: false,
                errorMessage:'',
                user: {
                    password:'',
                    confirmPassword:'',
                },
                url:process.env.ROOT_API + '',
                token: this.$route.params.token,
                message:''
        }
    },
    methods:{
        resetPassword(){
            if(this.validPassword()){
                console.log(this.token)
                axios.post(process.env.ROOT_API + 'newPassword',{
                    password: this.user.password,
                    token:this.token
                }).then(response =>{
                    console.log(response)
                    this.message = response.data.message + " inicie sesion."
                    this.user ={}
                    this.$router.push({path:`/signin/${this.message}`})

                }).catch(error =>{
                    console.log(error.response.data)
                    this.errorMessage = error.response.data
                })
            }
        },

        validPassword(){
            if(this.user.password != this.user.confirmPassword){
                this.errorMessage = 'Las contraseñas deben coincidir'
                return false
            }
            const result = Joi.validate(this.user,schema)
            if(result.error === null){
                
                return true
            }else{ 
                if(result.error.message.includes('password')){
                    this.errorMessage = 'Contraseña ingresada invalida 😓 '
                }  
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
