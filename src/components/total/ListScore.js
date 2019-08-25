import React, {Component} from 'react';
import { Table
} from "reactstrap";
import {connect} from 'react-redux';
import {getBestScore} from "../../store/actions/profileActions";
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';

class ListScore extends Component {

    componentDidMount() {
        this.props.getBestScore();

    }

    render() {

        const {best_score} = this.props.best_score;
        console.log(best_score);


        if (best_score.length === 0) {
            return (
                <div>
                    {/*<Spinner color="success"/>*/}
                    <h4>wait</h4>
                </div>


            )
        }


        return (


            <Table className="tablesorter">
                <thead className="text-primary">
                <tr>
                    <th>Score</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    {best_score.listeScore.map(function (game, idx) {
                        return (
                            <tr key={idx}>
                                <td>
                                        {game}
                                </td>
                            </tr>


                        );
                    })}
                </tr>
                </tbody>
            </Table>


        );
    }
}

ListScore.propTypes = {

    getBestScore: PropTypes.func.isRequired,
    best_score: PropTypes.object.isRequired,


};
const mapStateToProps = (state) => ({
    best_score: state.best_score,

});
export default connect(
    mapStateToProps,
    {getBestScore})(ListScore);