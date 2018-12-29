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
            backgroundColor: 'rgba(255, 0, 21, 0.42)',
            data: this.growlerData
           
          },{
               label: 'Pintas',
            borderColor: '#FFFF00',
            pointBackgroundColor: 'white',
            borderWidth: 1,
            pointBorderColor: '#249EBF',
            backgroundColor: 'rgba(246, 255, 0, 0.42)',
            data: this.pintsData
          }
          ,{
            label: 'Otros',
            borderColor: 'rgba(0, 161, 255, 0.94)',
            pointBackgroundColor: 'white',
            borderWidth: 1,
            pointBorderColor: '#249EBF',
            backgroundColor: 'rgba(0, 161, 255, 0.42)',
            data: this.othersData
          },{
            label: 'Botellas',
            borderColor: '#790080',
            pointBackgroundColor: 'white',
            borderWidth: 1,
            pointBorderColor: '#249EBF',
            backgroundColor: 'rgba(121, 0, 128, 0.42)',
            data: this.bottlesData
          },

          
        ]
      }, this.options)
  }
}
</script>
