import React from 'react';
import ApexCharts from 'react-apexcharts'

function Chart(props) {
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
  return <ApexCharts options={options} series={series} type="donut" width='150%'/>;
}

export default Chart