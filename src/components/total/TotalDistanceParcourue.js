import React, {Component} from 'react';

import { connect } from 'react-redux';
import {getTotalDistancesParcourus } from "../../store/actions/profileActions";
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row} from "reactstrap";

class TotalDistanceParcourue extends Component{

  componentDidMount() {
    this.props.getTotalDistancesParcourus();

  }

  render() {

    const { totalDistances } = this.props.totalDistances;
    console.log(totalDistances);


    if(totalDistances === undefined ){
      return (
        <div>
          <h6></h6>
        </div>

      )
    }


    return(
        <Container>

          {totalDistances.totalD ?   <Row> <h1>{totalDistances.totalD}</h1> <h6>Km</h6> </Row>  :
              <h5>
                {totalDistances.message}

              </h5>
            }

        </Container>

    );
  }
}

TotalDistanceParcourue.propTypes ={

  getTotalDistancesParcourus:PropTypes.func.isRequired,
  totalDistances: PropTypes.object.isRequired,



};
const mapStateToProps = (state)=>({
  totalDistances:state.totalDistances,

});
export default connect(
  mapStateToProps,
  {getTotalDistancesParcourus})(TotalDistanceParcourue);