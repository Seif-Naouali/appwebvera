import React, {Component} from 'react';
import {
  Spinner, Table
} from "reactstrap";
import { connect } from 'react-redux';
import {getBestScore } from "../../store/actions/profileActions";
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import Moment from "react-moment";

class BestScoreUser extends Component{

  componentDidMount() {
    this.props.getBestScore();

  }

  render() {

    const { best_score } = this.props.best_score;
    console.log(best_score);


    if (best_score.length === 0 ) {
      return (
          <div>
            {/*<Spinner color="success"/>*/}
            <h4>wait</h4>
          </div>

      )
    }


    return(

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
            {best_score.listeScore.map(function (game, idx) {
              return (
                  <tr key={idx}>
                      {/*<td>*/}
                      {/*  <Moment format="YYYY/MM/DD">*/}
                      {/*    {game.Date}*/}
                      {/*  </Moment>*/}
                      {/*</td>*/}
                    <td>
                      {game}
                    </td>
                  </tr>
              );
            })}
            </tbody>
          </Table>




    );
  }
}

BestScoreUser.propTypes ={

  getBestScore:PropTypes.func.isRequired,
  best_score: PropTypes.object.isRequired,



};
const mapStateToProps = (state)=>({
  best_score:state.best_score,

});
export default connect(
    mapStateToProps,
    {getBestScore})(BestScoreUser);