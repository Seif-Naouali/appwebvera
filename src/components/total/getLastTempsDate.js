import React, {Component} from "react";
import {
    Container, Row
} from "reactstrap";
import {connect} from "react-redux";
import {
    getGameInfo
} from "../../store/actions/profileActions";
import PropTypes from "prop-types";


class getLastTempsDate extends Component {


    componentDidMount() {

        this.props.getGameInfo();
    }

    render() {
        const {dist_temps} = this.props.dist_temps;
        console.log(dist_temps);


        return (

            <Container>

                {dist_temps.liste_dist ?
                    <Row>
                        <h1>
                            {dist_temps.liste_dist[0].distance}</h1>
                            <h6>Km</h6>
                       {/*<h1>*/}
                       {/*    {dist_temps.liste_dist[0].temps.substring(0, 2).toString()}*/}
                       {/*</h1> <h6>H</h6>*/}

                    </Row>

                    :
                    <p>
                        erreur
                    </p>
                }


            </Container>


        );
    }
}

getLastTempsDate.propTypes = {


    getGameInfo: PropTypes.func.isRequired,

    dist_temps: PropTypes.object.isRequired


};
const mapStateToProps = (state) => ({
    dist_temps: state.dist_temps

});
export default connect(
    mapStateToProps,
    {getGameInfo})(getLastTempsDate);