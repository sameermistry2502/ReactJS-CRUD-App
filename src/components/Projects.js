import React, { Component } from 'react'
import axios from 'axios';
import Common from './Common'
import './sidebar.css';
const BASE_URL = 'http://localhost:8000';
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
export default class Projects extends Component {
    constructor(props) {
        super(props);
        this.state = {
            AllprojectData: [],
            InHouseProj: [],
            clientProj: []
        };
    }
    componentDidMount() {
        this.GetAllProjects();
        this.GetInHouseProjects();
        this.GetClientProjects();
    }
    GetAllProjects = async () => {
        await axios({
            method: 'GET',
            url: BASE_URL + '/all_project',
        }).then(res => {
            if (res.data.staus_code === StatusCode.Success) {
                this.setState({
                    AllprojectData: res.data.data,
                });
            } else {
                this.setState({
                    AllprojectData: [],
                });
            }
        })
    }
    GetInHouseProjects = async () => {
        await axios({
            method: 'GET',
            url: BASE_URL + '/inhouse_projects',
        }).then(res => {
            if (res.data.staus_code === StatusCode.Success) {
                this.setState({
                    InHouseProj: res.data.data,
                });
            } else {
                this.setState({
                    InHouseProj: [],
                });
            }
        })
    }
    GetClientProjects = async () => {
        await axios({
            method: 'GET',
            url: BASE_URL + '/client_projects',
        }).then(res => {
            if (res.data.staus_code === StatusCode.Success) {
                this.setState({
                    clientProj: res.data.data,
                });
            } else {
                this.setState({
                    clientProj: [],
                });
            }
        })
    }
    render() {
        let path = this.props.match.url;
        console.log(path);
        if (path === "/in_house") {
            return (
                <div id="sed-App">
                    <Common />
                    <div id="page-wrap">
                        <div className="container">
                            <h2>In House Projects</h2><button class="btn btn-success"><i class="fa fa-plus"></i> Add New</button>
                            <table className="table country_table">
                                <thead>
                                    <tr>
                                        <th>Sr No</th>
                                        <th>Name</th>
                                        <th>Type</th>
                                        <th>Industry</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {

                                        this.state.InHouseProj.length !== 0 ?
                                            this.state.InHouseProj.map((iproj_data, i) =>
                                                <tr key={i}>
                                                    <td>{i}</td>
                                                    <td>{iproj_data.name}</td>
                                                    <td>{iproj_data.type}</td>
                                                    <td>{iproj_data.industry}</td>
                                                    <td>
                                                        {
                                                            iproj_data.status === 'active' ?
                                                                <i className="fa fa-circle" style={{ color: "green" }} title="Active"></i>
                                                                :
                                                                <i className="fa fa-circle" style={{ color: "red" }} title="In-Active"></i>
                                                        }
                                                    </td>
                                                    <td><i className="fa fa-eye"></i> <i className="fa fa-edit"></i><i className="fa fa-trash"></i></td>
                                                </tr>
                                            )
                                            :
                                            null
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div >
            )
        }
        else if (path === "/client") {
            return (
                <div id="sed-App">
                    <Common />
                    <div id="page-wrap">
                        <div className="container">
                            <h2>Client Projects</h2><button class="btn btn-info"><i class="fa fa-plus"></i> Add New</button>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Sr No</th>
                                        <th>Name</th>
                                        <th>Type</th>
                                        <th>Industry</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {

                                        this.state.clientProj.length !== 0 ?
                                            this.state.clientProj.map((cproj_data, i) =>
                                                <tr key={i}>
                                                    <td>{i}</td>
                                                    <td>{cproj_data.name}</td>
                                                    <td>{cproj_data.type}</td>
                                                    <td>{cproj_data.industry}</td>
                                                    <td>
                                                        {
                                                            cproj_data.status === 'active' ?
                                                                <i className="fa fa-circle" style={{ color: "green" }} title="Active"></i>
                                                                :
                                                                <i className="fa fa-circle" style={{ color: "red" }} title="In-Active"></i>
                                                        }
                                                    </td>
                                                    <td><i className="fa fa-eye"></i> <i className="fa fa-edit"></i><i className="fa fa-trash"></i></td>
                                                </tr>
                                            )
                                            :
                                            null
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div id="sed-App">
                    <Common />
                    <div id="page-wrap">
                        <div className="container">
                            <h2>Projects</h2><button class="btn btn-primary"><i class="fa fa-plus"></i> Add New</button>
                            <table className="table country_table">
                                <thead>
                                    <tr>
                                        <th>Sr No</th>
                                        <th>Name</th>
                                        <th>Type</th>
                                        <th>Industry</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {

                                        this.state.AllprojectData.length !== 0 ?
                                            this.state.AllprojectData.map((proj_data, i) =>
                                                <tr key={i}>
                                                    <td>{i}</td>
                                                    <td>{proj_data.name}</td>
                                                    <td>{proj_data.type}</td>
                                                    <td>{proj_data.industry}</td>
                                                    <td>
                                                        {
                                                            proj_data.status === 'active' ?
                                                                <i className="fa fa-circle" style={{ color: "green" }} title="Active"></i>
                                                                :
                                                                <i className="fa fa-circle" style={{ color: "red" }} title="In-Active"></i>
                                                        }
                                                    </td>
                                                    <td><i className="fa fa-eye"></i> <i className="fa fa-edit"></i><i className="fa fa-trash"></i></td>
                                                </tr>
                                            )
                                            :
                                            null
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div >
            )
        }
    }
}
