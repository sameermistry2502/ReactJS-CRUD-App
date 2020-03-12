import React, { Component } from 'react'
import swal from 'sweetalert'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ToastsContainerPosition, ToastsContainer, ToastsStore } from 'react-toasts';
///import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const StatusCode =
{
    New: 201,
    Success: 200,
    Deleted: 204,
    Session_Expired: 440,
    Bad_Request: 400,
    Validation_Error: 422,
    Not_Found: 404
}

export default class State extends Component {

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this)
        this.state = {
            stateData: [],
            isOpen: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    componentDidMount() {
        this.GetStateRecord();
    }
    GetStateRecord = async () => {
        await axios({
            method: 'GET',
            url: 'http://localhost:8000/all_state',
        }).then(res => {
            if (res.data.staus_code === StatusCode.Success) {
                this.setState({
                    stateData: res.data.data,
                });
            } else {
                this.setState({
                    stateData: [],
                });
            }
        })
    }
    stateRemove = (id) => {

        swal({
            title: "Alert!",
            text: "Are You Sure you want to Delete!",
            type: "danger",
            buttons: ['No', 'Yes']
        }).then(action => {
            if (action) {
                let state_id = id;
                let URL = 'http://localhost:8000/state/' + state_id;
                (async () => {
                    await axios({
                        method: 'DELETE',
                        headers: {
                            'Access-Control-Allow-Origin': '*',
                            'Content-Type': 'application/json',
                        },
                        url: URL
                    }).then(response => {
                        console.log('response', response)
                        ToastsStore.warning(response.data);
                    })
                })();

            }
        })
    }

    render() {

        return (

            <div>
                <div className="container">
                    <h2>Display States --- <Link to={'/addstate'} className="nav-link">Add New State</Link></h2>
                    <table className="table country_table">
                        <thead>
                            <tr>
                                <th> Sr No</th>
                                <th> Name </th>
                                <th> Country</th>
                                <th> Actions </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.stateData.length !== 0 ?
                                    this.state.stateData.map((state_data, i) =>
                                        <tr key={i}>
                                            <td>{i}</td>
                                            <td>{state_data.state_name}</td>
                                            <td>{state_data.go_for_country.name}</td>
                                            <td>

                                                <Link to={'/view_s/' + state_data.id + '/state'} id={state_data.id}><i className="fa fa-eye" title="Show" ></i></Link>
                                                <Link to={'/edit/' + state_data.id} id={state_data.id}><i className="fa fa-edit" title="Edit" ></i></Link>
                                                <Link to={'/del/' + state_data.id} onClick={() => this.stateRemove(state_data.id)} ><i className="fa fa-trash" title="Delete" ></i></Link>
                                            </td>
                                        </tr>
                                    )
                                    :
                                    null
                            }
                        </tbody>
                    </table>
                </div>

                <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.BOTTOM_LEFT} />
            </div >
        )
    }
}
