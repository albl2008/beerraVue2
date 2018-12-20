<script>
import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  props: {
    growlerData: {
      type: Array | Object,
      default: null
    },
    pintsData: {
      type: Array | Object,
      default: null
    },
    othersData: {
      type: Array | Object,
      default: null
    },
     bottlesData: {
      type: Array | Object,
      default: null
    },
    labels:{
       type: Array | Object,
      default: null
    },
   onpnptions: {
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
        labels:this.labels,
        datasets: [
          {
            label: 'Botellones',
            borderColor: '#f47b67',
            pointBackgroundColor: 'white',
            borderWidth: 1,
            pointBorderColor: '#249EBF',
            backgroundColor: 'transparent',
            data: this.growlerData
           
          },{
               label: 'Pintas',
            borderColor: '#FFFF00',
            pointBackgroundColor: 'white',
            borderWidth: 1,
            pointBorderColor: '#249EBF',
            backgroundColor: 'transparent',
            data: this.pintsData
          }
          ,{
            label: 'Otros',
            borderColor: '#008080',
            pointBackgroundColor: 'white',
            borderWidth: 1,
            pointBorderColor: '#249EBF',
            backgroundColor: 'transparent',
            data: this.othersData
          },{
            label: 'Botellas',
            borderColor: '#008000',
            pointBackgroundColor: 'white',
            borderWidth: 1,
            pointBorderColor: '#249EBF',
            backgroundColor: 'transparent',
            data: this.bottlesData
          },

          
        ]
      }, this.options)
  }
}
</script>
