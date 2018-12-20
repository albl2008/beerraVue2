<script>
import { HorizontalBar } from 'vue-chartjs'

export default {
  extends: HorizontalBar,
  props: {
    chartdata: {
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
            label: 'Litros',
            borderColor: '#249EBF',
            pointBackgroundColor: 'white',
            borderWidth: 1,
            pointBorderColor: '#249EBF',
            backgroundColor: 'transparent',
            data: this.chartdata,
            
          }
        ]
      }, this.options)
  }
}
</script>
