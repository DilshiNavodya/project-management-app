import React from 'react';
import ApexCharts from 'react-apexcharts'

function Chart(props) {
  console.log(props.series)
  console.log(props.labels)
    const series = props.series
    const lables = props.labels
        const    options = {
              chart: {
                type: 'donut',
              },
              labels: lables,
              responsive: [{
                breakpoint: 480,
                options: {
                  chart: {
                    width: 100,
                  },
                  legend: {
                    position: 'bottom'
                  },
                }
              }]
            }
  return <ApexCharts options={options} series={series} type="donut" width='80%'/>;
}

export default Chart