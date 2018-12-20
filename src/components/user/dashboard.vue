<template>
    <section>
        <div class="container">
            <div class="row justify-content-center">
                  <h1 v-if="user">Bienvendido, {{user.username}}!! 😎</h1>
                  <h1 v-if="!user">Trayendo informacion del usuario</h1>                 
            </div>
            <div class="row"  >
                <h1 class="ml-2 mb-2">Cantida de ventas por mes.</h1> 
                <div class="col-md-12 ">
                   <Linechart v-if="loaded" :chartdata="chartdata" :labels="labels" height="150"/>
                </div>
            </div>
             <div class="row">
                 <h1 class=" ml-2 mb-2">Cantidad de ventas por formato</h1>
                <div class="col-md-12 ">
                   <Barchart v-if="loadedTypes" :growlerData="growlerData" :pintsData="pintsData" :bottlesData="bottlesData" :othersData="othersData"  :labels="labelsTypes"  height="150" />
                </div>
            </div>
                 <div class="row"  >
                <h1 class="ml-2 mb-2">Cantida de Litros por mes.</h1> 
                <div class="col-md-12 ">
                   <horizontal-bar v-if="loadedLitres" :chartdata="chartdatalitres" :labels="labels" height="150"/>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import axios from 'axios'
import Linechart from '../charts/chart'
import Barchart from '../charts/Bar'
import HorizontalBar from '../charts/HorizontalBar'
import uniq from 'uniq-array'
export default {
    components:{
        Linechart,
        Barchart,
        HorizontalBar
    },
    mounted(){
        this.getSales()
        this.typesForMonth()
        this.litresForMonth()
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
            labels:[],
            loaded: false,
            chartdata: [],
            user:{},
            options:null,
            sales:[10,25,35],
            growlerData:[],
            pintsData:[],
            othersData:[],
            bottlesData:[],
            loadedTypes: false,
            labelsTypes:[],
            heigh: 150,
            chartdatalitres:[],
            loadedLitres: false
         
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
                this.chartdata = this.salesYear(response.data.sales)
                this.labels = response.data.sales.map(sales => sales._id.month)
                this.labels.sort((a, b) => a - b)
                this.labels = uniq(this.labels)
                this.labels = this.getMonth(this.labels)
                this.loaded = true
                
            }).catch(e => {
                console.log(e)
            })
        },
        typesForMonth(){
            axios({
                 url:'http://localhost:3000/sale/typesformonth',
                 headers: {authorization: `Bearer ${localStorage.token}`}
            }).then(response => {
                    console.log(response)
                    this.growlerData = this.salesYearTypes(response.data.sales).growlers
                    this.pintsData = this.salesYearTypes(response.data.sales).pints
                    this.othersData = this.salesYearTypes(response.data.sales).others
                    this.bottlesData = this.salesYearTypes(response.data.sales).bottles
                    this.labelsTypes = response.data.sales.map(sales => sales._id.month)
                    this.labelsTypes.sort((a, b) => a - b)
                    this.labelsTypes = uniq(this.labelsTypes) 
                    this.labelsTypes = this.getMonth(this.labelsTypes)
                    this.loadedTypes = true
            })
        },
        litresForMonth(){
            axios({
                url:'http://localhost:3000/sale/litresformonth',
                headers: {authorization: `Bearer ${localStorage.token}`}
                })
            .then(response =>{
                console.log("litros",response)
                this.chartdatalitres = this.salesYear(response.data.sales)
                this.labels = response.data.sales.map(sales => sales._id.month)
                this.labels.sort((a, b) => a - b)
                this.labels = uniq(this.labels)
                this.labels = this.getMonth(this.labels)
                this.loadedLitres = true
                
            }).catch(e => {
                console.log(e)
            })
        },
        getMonth(array){
            let newArray = []
              let months = ['','Enero', 'Febrero', 'Marzo','Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre','Octubre', 'Noviembre','Diciembre']
             for (const key of array) {
                 
                 newArray.push(months[key])
             }
              return newArray
        },
        salesYear(array){
            let newArray = []
           
             for (const key of array) {
              
                 if(new Date().getFullYear() === key._id.year){
                      newArray.push(key.count)     
                       
            }
            console.log(newArray)
                 
             }
            return newArray
        },
        salesYearTypes(array){
            let data = {
                growlers :[],
                pints :[],
                others :[],
                bottles:[]
            }

                 for (const key of array) {
              
                 if(new Date().getFullYear() === key._id.year){
                    
                    data.growlers.push(key.growlers)
                    data.pints.push(key.pints)
                    data.others.push(key.others)
                    data.bottles.push(key.bottles)

            }
                 
             }
            return data
        }
       
       
    }
}
</script>

<style>
    .altura{
        height: 50px;
    }
</style>
