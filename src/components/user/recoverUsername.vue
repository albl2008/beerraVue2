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
                        <h1 class="text-center">Recuperar usuario</h1>
                    </div>
                    <div class="card-body">
                    <form v-on:submit.prevent="sendEmail"> 
                            <div class="form-group">
                                <label for="UserName">Mail</label>
                                <input 
                                    v-model="email.email"
                                    type="text" 
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
import axios from 'axios'
export default {
   
    data(){
        return{
            errorMessage:'',
            message:'',
            email:{
                email:''
            },
            sending : false,
            URL:'http://localhost:3000/'
        }
    },
    methods:{
        sendEmail(){
            this.message =''
            this.errorMessage = ''
            this.sending = true
            axios.post(`${this.URL}recoverUsername`,{
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
