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
                        <h1 class="text-center">Verificacion</h1>
                    </div>
                    <div class="card-body">
                    <form v-on:submit.prevent="verify">
                            <div class="form-group">
                                <label for="UserName">Token de verificacion</label>
                                <input 
                                    v-model="token.token"
                                    type="text" 
                                    class="form-control" 
                                    id="UserName" 
                                    aria-describedby="emailHelp" 
                                    placeholder="Ingrese el token"
                                    required>
                                <small 
                                id="emailHelp" 
                                class="form-text text-muted">Ingrese el token recibido en el email.
                                </small>
                            </div>
                               
                                <div class="container">
                                    <div class="row">
                                        <button type="submit" class="btn btn-primary">Verificar </button>
                                        <div v-if="verifying">
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
            token:{
                token:''
            },
            verifying : false
        }
    },
    methods:{
        verify(){
            console.log(this.token)
            this.verifying =true
            axios.post(process.env.ROOT_API + 'verify',
            {token:this.token.token})
            .then(res =>{
                console.log(res)
                this.verifying = false
                this.message = res.data.message
            }).catch(err =>{
                this.verifying = false
                this.errorMessage  = err.response.data
            })
        }
    },
    watch:{
        token:{
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
