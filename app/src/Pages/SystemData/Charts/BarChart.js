import React from "react";
import Chart from "chart.js";
import Config from "../../ConfigFile";

class BarChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newData: [],
    };

    this.callback = props.callback;

    this.canvasRef = React.createRef();
  }

  componentDidUpdate() {
    if (this.state.newData.length > 0) {
      if (this.labels === undefined) {
        this.labels = [];
        for (let i = 0; i < this.state.newData.length; i++) {
          this.labels.push(i);
        }
      }

      this.myChart.data.labels = this.labels;
      this.myChart.data.datasets[0].data = this.state.newData;
      this.myChart.update();
    }
  }

  componentDidMount() {
    this.callback((res) => {
      this.setState({ newData: res });
    });

    this.myChart = new Chart(this.canvasRef.current, {
      type: "bar",
      options: {
        tooltips: {
          enabled: false,
        },
        legend: {
          display: false,
        },
        scales: {
          yAxes: [
            {
              ticks: {
                min: 0,
                max: 100,
                stepSize: 20,
              },
              gridLines: {
                display: false,
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                display: false,
              },
            },
          ],
        },
      },
      data: {
        labels: this.labels,
        datasets: [
          {
            backgroundColor: Config.colours,
            hoverBackgroundColor: Config.colours,
          },
        ],
      },
    });
  }

  render() {
    return <canvas ref={this.canvasRef} />;
  }
}

export default BarChart;
