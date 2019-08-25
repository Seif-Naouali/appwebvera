import React from 'react';

import {
    Col, Container,
    Nav,
    NavItem,
    NavLink,
    Row,
    TabContent,
    TabPane
} from 'reactstrap';
import classnames from 'classnames';
import HistoriqueCalories from "./HistoriqueCalories";
import HistoriqueHeartBeat from "./HistoriqueHeartBeat";
import HistoriqueDistance from './HistoriqueDistance';

export default class Resultat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: '1',
            resultats: [],
            charges: [],
            idCharge: '',
            NomSession: '',
            DateSession: '',
            idSes: '',
            dateRedactionAvis: '',
            membres: ''
        };

        this.toggle = this.toggle.bind(this);
    }


    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }


    componentDidMount = event => {

    }





    render() {
        return (


            <Container className="panel-body">

                <Nav tabs id={"nav"}>
                    <NavItem>
                        <NavLink
                            className={classnames({active: this.state.activeTab === '1'})}
                            onClick={() => {
                                this.toggle('1');
                            }}
                        >
                            Historique Distance
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({active: this.state.activeTab === '2'})}
                            onClick={() => {
                                this.toggle('2');
                            }}
                        >
                            Historique Calorie
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({active: this.state.activeTab === '3'})}
                            onClick={() => {
                                this.toggle('3');
                            }}
                        >
                            Historique Heart beat
                        </NavLink>
                    </NavItem>
                </Nav>

                <div className="panel-body">
                    <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="1">
                            <Row>
                                <Col sm="12">
                                    <HistoriqueDistance/>
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tabId="2">
                            <Row>
                                <Col sm="12">
                                    <HistoriqueCalories/>
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tabId="3">
                            <Row>
                                <Col sm="12">
                                    <HistoriqueHeartBeat/>
                                </Col>
                            </Row>
                        </TabPane>
                    </TabContent>
                </div>

            </Container>


        )
    }
}