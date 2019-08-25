/*!

=========================================================
* Black Dashboard React v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Row,
    Col
} from "reactstrap";


import NavBarHistorique from '../components/Historique/NavBarHistorique';
import TotalTempsParcouru from "../components/total/TotalTempsParcouru";

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bigChartData: "data1"
        };
    }

    setBgChartData = name => {
        this.setState({
            bigChartData: name
        });
    };

    render() {
        return (
            <>
                <div className="content">
                    <Row>
                        <Col xs="12">
                            <Card>
                                <CardHeader>
                                    <Row>
                                        <Col className="text-left" sm="4">
                                            {/*<h5 className="card-category">Level</h5>*/}
                                            <CardTitle tag="h2">Performance</CardTitle>
                                        </Col>
                                        <Col sm="6">

                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    <div className="chart-area">
                                        <TotalTempsParcouru/>
                                    </div>
                                    <NavBarHistorique/>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                </div>
            </>
        );
    }
}

export default Dashboard;
