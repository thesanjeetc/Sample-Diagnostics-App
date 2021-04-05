import React from "react";
import Chart from "chart.js";
import Config from "../../ConfigFile";

class LineChart extends React.Component {
  constructor(props) {
    super(props);

    this.canvasRef = React.createRef();
    this.callback = props.callback;

    this.state = {
      newData: [],
    };
  }

  componentDidUpdate() {
    if (this.state.newData.length > 0) {
      if (this.data === undefined) {
        this.data = new Array(this.state.newData.length);

        for (var i = 0; i < this.data.length; i++) {
          this.data[i] = new Array(Config.xLineTicks).fill(-1);
        }

        this.labels = [];
        for (let i = 0; i < Config.xLineTicks; i++) {
          this.labels.push(i);
        }
      }

      this.state.newData.forEach((value, i) => {
        this.data[i].push(value);
        this.data[i].shift();
      });

      this.chart.data.datasets = this.getDatasets();
      this.chart.data.labels = this.labels;
      this.chart.update();
    }
  }

  getDatasets() {
    let datasets = [];
    this.data.forEach((processor, i) => {
      datasets.push({
        data: processor,
        fill: "none",
        lineTension: 0.2,
        backgroundColor: Config.colours[i],
        pointRadius: 0,
        borderColor: Config.colours[i],
        borderWidth: 2.0,
      });
    });
    return datasets;
  }

  componentDidMount() {
    this.callback((res) => {
      this.setState({ newData: res });
    });

    this.chart = new Chart(this.canvasRef.current, {
      type: "line",
      options: {
        animation: false,
        tooltips: {
          enabled: false,
        },
        hover: { mode: null },
        legend: {
          display: false,
          position: "top",
          usePointStyle: true,
        },
        scales: {
          xAxes: [
            {
              display: false,
              gridLines: {
                display: false,
              },
            },
          ],
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
        },
      },
    });
  }

  render() {
    return <canvas ref={this.canvasRef} />;
  }
}

export default LineChart;
