import React, { Component } from 'react'
import { Container, Col, Row } from 'reactstrap';
import axios from 'axios';
export default class View extends Component {

    constructor(props) {
        super(props);
        this.state = {
            city_name: '',
            state_id: 0,
            country_id: 0,
            iso: '',
            name: '',
            nicename: '',
            isot: '',
            numcode: 0,
            phonecode: 0,
            state_name: '',
            country_s_id: 0
        };

    }
    componentDidMount() {
        axios.get('http://localhost:8000/city/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    city_name: response.data.city_name,
                    state_id: response.data.state_id,
                    country_id: response.data.country_id
                });
            })
            .catch(function (error) {
                console.log(error);
            })
        axios.get('http://localhost:8000/state/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    state_name: response.data.state_name,
                    country_s_id: response.data.country_id
                });

            })
            .catch(function (error) {
                console.log(error);
            })

        axios.get('http://localhost:8000/country/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    iso: response.data.iso,
                    name: response.data.name,
                    nicename: response.data.nicename,
                    isot: response.data.iso3,
                    numcode: response.data.numcode,
                    phonecode: response.data.phonecode
                });
            })
            .catch(function (error) {
                console.log(error);
            })

    }
    render() {

        const para = this.props.match.params.type;

        if (para === 'city') {
            return (
                <div>
                    <div id="city">
                        <Container>
                            <Row>
                                <h3 className="center">View City Details   -- {para}</h3>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <h4>CIty Name</h4>
                                </Col>
                                <Col md={6}>
                                    <p>{this.state.city_name}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <h4>Country</h4>
                                </Col>
                                <Col md={6}>
                                    <p>{this.state.country_id}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <h4>State</h4>
                                </Col>
                                <Col md={6}>
                                    <p>{this.state.state_id}</p>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </div>
            )
        }
        else if (para === 'state') {
            return (
                <div>
                    <div id="state">
                        <Container>
                            <Row>
                                <h3 className="center">View City Details   -- {para}</h3>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <h4>State Name</h4>
                                </Col>
                                <Col md={6}>
                                    <p>{this.state.state_name}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <h4>Country</h4>
                                </Col>
                                <Col md={6}>
                                    <p>{this.state.country_s_id}</p>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div>
                    <div>
                        <Container>
                            <Row>
                                <h3 className="center">View Country Details   -- {para}</h3>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <h4>ISO</h4>
                                </Col>
                                <Col md={6}>
                                    <p>{this.state.iso}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <h4>Name</h4>
                                </Col>
                                <Col md={6}>
                                    <p>{this.state.name}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <h4>Nice-Name</h4>
                                </Col>
                                <Col md={6}>
                                    <p>{this.state.nicename}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <h4>ISO-3</h4>
                                </Col>
                                <Col md={6}>
                                    <p>{this.state.isot}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <h4>Number-Code</h4>
                                </Col>
                                <Col md={6}>
                                    <p>{this.state.numcode}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <h4>Phone-Code</h4>
                                </Col>
                                <Col md={6}>
                                    <p>{this.state.phonecode}</p>
                                </Col>
                            </Row>
                        </Container>
                    </div>

                </div >
            )
        }

    }
}
