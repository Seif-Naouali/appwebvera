import React, { Component } from "react";
import {
   Spinner
} from "reactstrap";
import { connect } from "react-redux";
import {
  getGameInfo
} from "../../store/actions/profileActions";
import PropTypes from "prop-types";


class getLastCalorie extends Component {


  componentDidMount() {

    this.props.getGameInfo();
  }

  render() {
    const { dist_temps } = this.props.dist_temps;
    console.log(dist_temps);

    if(dist_temps === undefined ){
      return (
        <div>
          <Spinner color="success" />
        </div>

      )
    }

    var titleP = {
      marginTop: "60px"
    };
    var circleStyle = {
      padding: 10,
      paddingLeft:50,
      margin: 20,
      display: "inline-block",
      backgroundColor: "#0000",
      borderRadius: "50%",
      border: "3px solid black",
      width: 180,
      height: 180
    };
    return (


        <div style={circleStyle}>
          <h6 style={titleP}>Last Calorie</h6>
          <p>

            {dist_temps.liste_dist ?
              <div>
                <p>{dist_temps.liste_dist[0].calorie}</p>
              </div> : <Spinner color="success" />
            }
          </p>
        </div>




    );
  }
}

getLastCalorie.propTypes = {


  getGameInfo: PropTypes.func.isRequired,

  dist_temps: PropTypes.object.isRequired


};
const mapStateToProps = (state) => ({
  dist_temps: state.dist_temps

});
export default  connect(
  mapStateToProps,
  { getGameInfo })(getLastCalorie);