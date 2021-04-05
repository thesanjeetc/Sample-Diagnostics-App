import React from "react";
import Chart from "chart.js";

class DoughnutChart extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.callback = props.callback;

    this.state = {
      newData: [],
    };
  }

  componentDidUpdate() {
    this.chart.data.datasets[0].data = this.state.newData;
    this.chart.update();
  }

  componentDidMount() {
    this.callback((res) => {
      this.setState({ newData: res });
    });

    this.chart = new Chart(this.canvasRef.current, {
      type: "doughnut",
      borderColor: "#000",
      options: {
        borderWidth: 0,
        borderColor: "#000",
        tooltips: {
          enabled: false,
        },
        hover: { mode: null },
        legend: {
          display: false,
          position: "top",
          usePointStyle: true,
        },
      },
      data: {
        datasets: [
          {
            backgroundColor: ["#5271ff"],
            hoverOffset: 4,
            borderColor: ["#5271ff", "#fff"],
            borderWidth: [0.8, 0.8],
          },
        ],
      },
    });
  }

  render() {
    return <canvas ref={this.canvasRef} />;
  }
}

export default DoughnutChart;
