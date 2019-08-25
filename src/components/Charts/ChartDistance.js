import React, { Component } from "react";
import { connect } from "react-redux";
import { getDistancesTemps } from "../../store/actions/profileActions";
import { Line} from "react-chartjs-2";
import PropTypes from "prop-types";


class ChartDistance extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tooltipOpen: false,
            chartData: [],
            listeD: [],
            listeT: []

        };


    }

    componentDidMount() {
        this.props.getDistancesTemps();

    }

    static defaultProps = {
        displayTitle: true,
        displayLegend: true,
        legendPosition: "right",
        labelsLegend: {
            fontColor: "#000"
        }
    };
    toggle() {
        this.setState({
            tooltipOpen: !this.state.tooltipOpen
        });
    }

    render() {

        const { distances_temps } = this.props.distances_temps;



        if (distances_temps === undefined || distances_temps.listedistances === undefined || distances_temps.listeTempsEnMinutes === undefined) {

            return (
                <div>
                    {/*<Spinner color="success"/>*/}
                    <h4></h4>
                </div>
            );

        }
        console.log(distances_temps.listedistances);
        console.log(distances_temps.listeTempsEnMinutes);


        // let ctx = getContext("2d").getContext("2d");
        //
        // let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
        //
        // gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
        // gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
        // gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors
        return (
            <Line
                data={{
                    // labels: ["JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
                    labels: distances_temps.listedistances,
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
                    data:distances_temps.listeTempsEnMinutes
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


ChartDistance.propTypes = {
    getDistancesTemps: PropTypes.func.isRequired,
    distances_temps: PropTypes.object.isRequired


};
const mapStateToProps = (state) => ({
    distances_temps: state.distances_temps

});
export default connect(
    mapStateToProps,
    { getDistancesTemps })(ChartDistance);