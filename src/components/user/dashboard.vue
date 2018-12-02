<template>
    <section>
        <div class="container">
            <div class="row justify-content-center">
                  <h1 v-if="user">Bienvendido, {{user.username}}!! 🍺</h1>
                  <h1 v-if="!user">Trayendo informacion del usuario</h1>                 
            </div>
            
        </div>
    </section>
</template>

<script>
import axios from 'axios'
export default {
    mounted(){
        axios({
            method: 'get',
            url: 'http://localhost:3000/',
            headers: {authorization: `Bearer ${localStorage.token}`}
        }).then( response => {
            if(response.data.user){
                 this.user = response.data.user
            }else{
                localStorage.removeItem('token')
                this.$router.push('/signin')
            }
          
        })
          
        
    },
    data(){
        return{
            user:{}
        }
    },
    methods:{
        logout(){
                localStorage.isLoggIn =false
            localStorage.removeItem('token')
            this.$router.go('/signin')
        }
    }
}
</script>

<style>

</style>
