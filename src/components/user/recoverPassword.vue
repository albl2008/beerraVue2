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
                        <h1 class="text-center">Recuperar clave</h1>
                    </div>
                    <div class="card-body">
                    <form v-on:submit.prevent="sendEmail">
                            <div class="form-group">
                                <label for="UserName">Mail</label>
                                <input 
                                    v-model="email.email"
                                    type="email" 
                                    class="form-control" 
                                    id="UserName" 
                                    aria-describedby="emailHelp" 
                                    placeholder="Ingrese su email"
                                    required>
                                <small 
                                id="emailHelp" 
                                class="form-text text-muted">Ingrese el mail con el que se a registrado.
                                </small>
                            </div>
                               
                                <div class="container">
                                    <div class="row">
                                        <button type="submit" class="btn btn-primary">Enviar </button>
                                        <div v-if="sending">
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
const schema =Joi.object().keys({
    email: Joi.string().email().required()
})
export default {
   
    data(){
        return{
            errorMessage:'',
            message:'',
            email:{
                email:''
            },
            sending : false,
            url:process.env.ROOT_API + ''
        }
    },
    methods:{  
        sendEmail(){
            if(this.validMail()){
                this.sending = true
                axios.post(`${this.URL}resetPassword`,{
                    email: this.email.email
                }).then(response => {
                    console.log(response)
                    this.message = response.data.message
                    this.sending = false
                }).catch(error =>{
                    console.log(error.response.data)
                    this.errorMessage = error.response.data
                    this.sending = false
                })
            }
        },
        validMail(){
            const result = Joi.validate(this.email,schema)
            console.log(result)
            if(result.error === null){
                return true
            }else{
                this.errorMessage = 'El mail ingresado no tiene formato de mail'
            }
        }
        
    },
    watch:{
        email:{
            handler(){
                this.errorMessage = ''
            },
            deep: true
        },
       
    },

}
</script>

<style>

</style>
