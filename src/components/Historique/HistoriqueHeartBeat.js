import React, {Component} from "react";
import {
  Table
} from "reactstrap";
import {connect} from "react-redux";
import {
  getGameInfo

} from "../../store/actions/profileActions";
import PropTypes from "prop-types";
import Moment from "react-moment";


class HistoriqueHeartBeat extends Component {


  componentDidMount() {
    this.props.getGameInfo();
  }

  render() {

    const { dist_temps } = this.props.dist_temps;
    console.log(dist_temps);

    if (dist_temps.length === 0 ) {
      return (
          <div>
            {/*<Spinner color="success"/>*/}
            <h4>wait</h4>
          </div>

      )
    }

    return (

        <Table className="tablesorter" >
          <thead className="text-primary">
          <tr>
            <th>
              Date
            </th>
            <th>
              Value
            </th>
          </tr>
          </thead>
          <tbody>
          {dist_temps.liste_dist.map(function (game, idx) {
            return (
                <tr key={idx}>
                  <td>
                    <Moment format="YYYY/MM/DD">
                      {game.Date}
                    </Moment>
                  </td>
                  <td>
                    {game.heartBeat}
                  </td>
                </tr>
            );
          })}
          </tbody>
        </Table>

    );

  }
}

HistoriqueHeartBeat.propTypes = {
  getGameInfo: PropTypes.func.isRequired,
  dist_temps: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
  dist_temps: state.dist_temps
});
export default connect(
    mapStateToProps,
    {getGameInfo})(HistoriqueHeartBeat);