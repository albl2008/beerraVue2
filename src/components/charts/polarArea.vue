<script>
import { Doughnut } from 'vue-chartjs'
import chartVue from './chart.vue';
import randomHexColor from 'random-hex-color'
export default {
  extends: Doughnut,
  props: {
    chartdata: {
      type: Array | Object,
      default: null
    },
    labels:{
       type: Array | Object,
      default: null
    },
   options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: true
              }
            }],
            xAxes: [ {
              gridLines: {
                display: false
              }
            }]
          },
          legend: {
            display: false
          },
          responsive: false,
          maintainAspectRatio: false
        }
      
  },
  mounted () {
    this.renderChart({
        labels: this.getlabels(this.chartdata),
        datasets: [this.objectsOfDataset(this.chartdata)]
      }, this.options)
  },
  methods:{
      getlabels(chartData){
let labels = []
          for(let cerveceria of chartData){
     
                let label = cerveceria._id[0]
                

                if(label){
                    labels.push(label)

                }
          }
     
          return labels
      },
      objectsOfDataset(chartData){
          
          let values = {data:[],backgroundColor: []}
          for(let cerveceria of chartData){
             
              
                  let value = cerveceria.count
                
                if(value !== 0){
                 
                    values.data.push(value)
                    values.backgroundColor.push(randomHexColor())
                }

            }
            return values
        }
  }
} 
</script>
