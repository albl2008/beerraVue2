<script>
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
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
        labels:this.labels,
        datasets: [
          {
            label: 'Ventas año actual',
            borderColor: '#249EBF',
            pointBackgroundColor: 'white',
            borderWidth: 1,
            pointBorderColor: '#249EBF',
            backgroundColor:'rgba(37, 159, 193, 0.42)' ,
            data: this.chartdata,
            
          }
        ]
      }, this.options)
  }
}
</script>
