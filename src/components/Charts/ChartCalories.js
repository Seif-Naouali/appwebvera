import React, { Component } from "react";
import { connect } from "react-redux";
import { getGameInfo, getTempsEnMinutes } from "../../store/actions/profileActions";
import { Line} from "react-chartjs-2";
import PropTypes from "prop-types";

class ChartCalories extends Component {

  constructor(props) {
    super(props);
    this.state = {

      chartData: [],
      listeD: [],
      listeT: []

    };


  }

  componentDidMount() {
    this.props.getTempsEnMinutes();
    this.props.getGameInfo();

  }

  static defaultProps = {
    displayTitle: true,
    displayLegend: true,
    legendPosition: "right",
    labelsLegend: {
      fontColor: "#000"
    }
  };

  render() {

    const { tempsMinutes } = this.props.tempsMinutes;
    const { dist_temps } = this.props.dist_temps;

    console.log(tempsMinutes);
console.log(dist_temps.liste_dist)
    if (tempsMinutes === undefined) {

      return (
        <div>
          {/*<Spinner color="success"/>*/}
          <h4></h4>
        </div>
      );

    }
    if (dist_temps.liste_dist === undefined) {

      return (
        <div>
          {/*<Spinner color="success"/>*/}
          <h4></h4>
        </div>
      );

    }

    let listeCalorie = [];

    for(let i=0;i< dist_temps.liste_dist.length;i++)

        listeCalorie.push( dist_temps.liste_dist[i].calorie );
    console.log(listeCalorie);




    return (



            <Line
                data={{
                    // labels: ["JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
                    labels: listeCalorie,
                    datasets: [
                        {
                            label: "Data",
                            fill: true,
                            // backgroundColor: gradientStroke,
                            borderColor: "#1f8ef1",
                            borderWidth: 2,
                            borderDash: [],
                            borderDashOffset: 0.0,
                            pointBackgroundColor: "#1f8ef1",
                            pointBorderColor: "rgba(255,255,255,0)",
                            pointHoverBackgroundColor: "#1f8ef1",
                            pointBorderWidth: 20,
                            pointHoverRadius: 4,
                            pointHoverBorderWidth: 15,
                            pointRadius: 4,
                            // data: [80, 100, 70, 80, 120, 80]
                            data: tempsMinutes.listeTempsEnMinutes
                        }
                    ]
                }}

                options={{
                    maintainAspectRatio: false,
                    legend: {
                        display: false
                    },
                    tooltips: {
                        backgroundColor: "#f5f5f5",
                        titleFontColor: "#333",
                        bodyFontColor: "#666",
                        bodySpacing: 4,
                        xPadding: 12,
                        mode: "nearest",
                        intersect: 0,
                        position: "nearest"
                    },
                    responsive: true,
                    scales: {
                        yAxes: [
                            {
                                barPercentage: 1.6,
                                gridLines: {
                                    drawBorder: false,
                                    color: "rgba(29,140,248,0.0)",
                                    zeroLineColor: "transparent"
                                },
                                ticks: {
                                    suggestedMin: 60,
                                    suggestedMax: 125,
                                    padding: 20,
                                    fontColor: "#9a9a9a"
                                }
                            }
                        ],
                        xAxes: [
                            {
                                barPercentage: 1.6,
                                gridLines: {
                                    drawBorder: false,
                                    color: "rgba(29,140,248,0.1)",
                                    zeroLineColor: "transparent"
                                },
                                ticks: {
                                    padding: 20,
                                    fontColor: "#9a9a9a"
                                }
                            }
                        ]
                    }}}
            />


    );
  }
}


ChartCalories.propTypes = {
  getTempsEnMinutes: PropTypes.func.isRequired,
  tempsMinutes: PropTypes.object.isRequired,
  getGameInfo: PropTypes.func.isRequired,
  dist_temps: PropTypes.object.isRequired

};
const mapStateToProps = (state) => ({
  tempsMinutes: state.tempsMinutes,
  dist_temps:state.dist_temps

});
export default connect(
  mapStateToProps,
  { getTempsEnMinutes,getGameInfo })(ChartCalories);