<template>
    <section>
        <div class="container">
               <div v-if="message" class="alert alert-success animated fadeInDown mid" role="alert">
                   {{ message }}
                </div>
            <div class="row justify-content-center mb-5">
                  <h1 v-if="user">Bienvendido, {{user.username}}!! 😎</h1>
                  <h1 v-if="!user">Trayendo informacion del usuario</h1>                 
            </div>
            <div>
                <h1>{{'Fecha de vencimiento de pago: ' + dateExpired}}</h1>
            </div>
            <div class="text-center mb-5"><h1>Cantida de ventas por mes.</h1></div>
            <div class="row mb-5">
                <div class="col-md-12 ">
                   <Linechart v-if="loaded" :chartdata="chartdata" :labels="labels" height="150"/>
                </div>
            </div>
            <div class="text-center mb-5"><h1>Cantidad de ventas por formato</h1></div>
             <div class="row mb-5">
                <div class="col-md-12 ">
                   <Barchart v-if="loadedTypes" :growlerData="growlerData" :pintsData="pintsData" :bottlesData="bottlesData" :othersData="othersData"  :labels="labelsTypes"  height="150" />
                </div>
            </div>
            <div class="text-center mb-5"><h1>Litros vendidos en formato de botellon</h1></div>
              <div class="row mb-5">
                <div class="col-md-12 ">
                   <horizontal-bar v-if="loadedLitres" :chartdata="growlerData" :labels="labels" :colors="coloresBotellon" height="150" />
                </div>
            </div>
            <div class="text-center mb-5"><h1>Litros vendidos en formato de pintas</h1></div>
            <div class="row mb-5">
                <div class="col-md-12 ">
                   <horizontal-bar v-if="loadedLitres" :chartdata="pintsData" :labels="labelsPints" :colors="coloresPintas" height="150" />
                </div>
            </div>
            <div class="text-center mb-5"><h1>Litros vendidos en formato de venta otros</h1></div>
            <div class="row mb-5">
                <div class="col-md-12 ">
                   <horizontal-bar v-if="loadedLitres" :chartdata="othersData" :labels="labelsOther" :colors="coloresOtros" height="150" />
                </div>
            </div>
            <div class="text-center mb-5"><h1>Litros vendidos por cerveceria</h1></div>
            <div class="row">
                <div class="col-md-4 ">
                    <h1 class=" ml-2 mb-2 text-center">Pintas</h1>
                   <polar-area v-if="loadedBrewery" :chartdata="litresBrewery" />
                </div>
                <div class="col-md-4 ">
                    <h1 class=" ml-2 mb-2 text-center">Botellones</h1>
                   <polar-area v-if="loadedBrewery" :chartdata="litresGrowlers"  />
                </div>
                <div class="col-md-4 ">
                    <h1 class=" ml-2 mb-2 text-center">Otros</h1>
                   <polar-area v-if="loadedBrewery" :chartdata="litresOthers"  />
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
import polarArea from '../charts/polarArea'
import uniq from 'uniq-array'
export default {
    components:{
        Linechart,
        Barchart,
        HorizontalBar,
        polarArea
    },
    mounted(){
        this.getSales()
        this.typesForMonth()
        this.litresForMonth()
        this.litresForBrewery()
        this.expired()
        axios({
            method: 'get',
            url: process.env.ROOT_API + '',
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
             growlerlitres:[],
            pintsLitres:[],
            othersLitres:[],
            loadedTypes: false,
            labelsTypes:[],
            heigh: 150,
            chartdatalitres:[],
            loadedLitres: false,
            labelsPints:[],
            labelsOther:[],
            loadedBrewery: false,
            litresBrewery:[],
            litresGrowlers:[],
            litresOthers:[],
            message: this.$route.params.message,
            dateExpired : '',

            //colors
            coloresBotellon: ['rgba(0, 235, 141, 0.93)','rgba(0, 235, 141, 0.42)'],
            coloresPintas:['rgba(0, 235, 227, 0.99)','rgba(0, 235, 227, 0.42)'],
            coloresOtros:['rgba(235, 0, 0, 0.94)','rgba(235, 0, 0, 0.43)']
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
                url:process.env.ROOT_API + 'sale/salesformonth',
                headers: {authorization: `Bearer ${localStorage.token}`}
                })
            .then(response =>{
                console.log("ventas",response)
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
                 url:process.env.ROOT_API + 'sale/typesformonth',
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
                url:process.env.ROOT_API + 'sale/litresformonth',
                headers: {authorization: `Bearer ${localStorage.token}`}
                })
            .then(response =>{
               
                this.growlerData = this.salesYear(response.data.growlers)
                this.pintsData = this.salesYear(response.data.pints)
                this.othersData = this.salesYear(response.data.others)
                this.labelsLitres(response)
                this.loadedLitres = true
                
            }).catch(e => {
                console.log(e)
            })
        },
        labelsLitres(response){
            //growlers
                this.labels = response.data.growlers.map(sales => sales._id.month)
                this.labels.sort((a, b) => a - b)
                this.labels = uniq(this.labels)
                this.labels = this.getMonth(this.labels)
            //pints
                this.labelsPints = response.data.pints.map(sales => sales._id.month)
                this.labelsPints.sort((a, b) => a - b)
                this.labelsPints = uniq(this.labelsPints)
                this.labelsPints = this.getMonth(this.labelsPints)
            //others
                this.labelsOther = response.data.others.map(sales => sales._id.month)
                this.labelsOther.sort((a, b) => a - b)
                this.labelsOther = uniq(this.labelsOther)
                this.labelsOther = this.getMonth(this.labelsOther)
        },
        litresForBrewery(){
                axios({
                    url: process.env.ROOT_API + 'sale/litresforbrewery',
                    headers: {authorization: `Bearer ${localStorage.token}`}
                }).then(response => {
                   
                    this.litresBrewery = response.data.pints
                    this.litresGrowlers = response.data.growlers
                     this.litresOthers = response.data.others
                    this.loadedBrewery = true
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
        },
        expired(){
            axios({
                url:process.env.ROOT_API + 'expired',
                headers: {authorization: `Bearer ${localStorage.token}`}
            }).then(res => {
               this.dateExpired = res.data.date
            }).catch(err => {
                console.log(err)
            })
        }
       
       
    }
}
</script>

<style>
    .altura{
        height: 50px;
    }
</style>