import React, {Component} from 'react';

import {connect} from 'react-redux';
import {getTotalDistancesParcourus, getTotalTempsParcourus} from "../../store/actions/profileActions";
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
     Row
} from "reactstrap";

class TotalTempsParcouru extends Component {

    componentDidMount() {
        this.props.getTotalTempsParcourus();
        this.props.getTotalDistancesParcourus();

    }


    render() {


        var titleP = {
            marginTop: '60px',
        };
        var circleStyle = {
            padding: 10,
            margin: 20,
            display: "inline-block",
            backgroundColor: '#0000',
            borderRadius: "50%",
            border: "3px solid black",
            width: 180,
            height: 180,
        };
        const {temps} = this.props.temps;
        console.log(temps);
        const {totalDistances} = this.props.totalDistances;
        console.log(totalDistances);

        if (totalDistances === undefined) {
            return (
                <div>
                    <h6></h6>
                </div>

            )
        }

        return (

                <Row >
                    <div style={circleStyle}>
                        <h6 style={titleP}>
                            total temps parcourus
                        </h6>
                    </div>

                    <Row style={{circleStyle, paddingTop: '50px',paddingLeft:'300px'}}>
                        <h1 style={{fontSize: "90px"}}>
                            {temps.totalTemps}
                        </h1>

                        <h6>Min</h6>
                        <h1 style={{fontSize: "90px"}}>{totalDistances.totalD}</h1> <h6>Km</h6>

                    </Row>
                </Row>


        );
    }
}

TotalTempsParcouru.propTypes = {
    getTotalTempsParcourus: PropTypes.func.isRequired,
    // distancesByDate: PropTypes.object.isRequired,
    temps: PropTypes.object.isRequired,

    getTotalDistancesParcourus: PropTypes.func.isRequired,
    totalDistances: PropTypes.object.isRequired,


};
const mapStateToProps = (state) => ({
    temps: state.temps,
    totalDistances: state.totalDistances,


});
export default connect(
    mapStateToProps,
    {getTotalTempsParcourus, getTotalDistancesParcourus})(TotalTempsParcouru);