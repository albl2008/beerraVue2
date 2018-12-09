<template>
    <section>
        <div class="container">
            <div class="row justify-content-center">
                  <h1 v-if="user">Bienvendido, {{user.username}}!! 🍺</h1>
                  <h1 v-if="!user">Trayendo informacion del usuario</h1>                 
            </div>
                <vue-frappe
            id="test"
            :labels="[
                'Enero', 'febrero', 'marzo', 'mayo',
                'abril', 'junio', 'julio', 'agosto',
                'septiembre','octubre','noviembre','diciembre'
            ]"
            title="Ventas mensuales"
            type="axis-mixed"
            :height="600"
            :colors="['purple', '#ffa3ef', 'light-blue']"
            :dataSets="this.sales.count">
        </vue-frappe>
        </div>
    </section>
</template>

<script>
import axios from 'axios'

export default {
    created(){
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
          
        }),
        this.getSales()
          
        
    },
    data(){
        return{
            user:{},
            sales:[],
            
        }
    },
    methods:{
        logout(){
                localStorage.isLoggIn =false
            localStorage.removeItem('token')
            this.$router.go('/signin')
        },
           getSales(){
            axios({
                url:'http://localhost:3000/sale/salesformonth',
                headers: {authorization: `Bearer ${localStorage.token}`}
                })
            .then(response =>{
                console.log(response)
                this.sales = response.data.sales
            }).catch(e => {
                console.log(e)
            })
        },
    }
}
</script>

<style>

</style>
