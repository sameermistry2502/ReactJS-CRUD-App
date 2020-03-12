import React, { Component } from 'react'
import axios from 'axios';
import { ToastsContainerPosition, ToastsContainer, ToastsStore } from 'react-toasts';
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
export default class EditCity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genralData: [],
            stateData: [],
            city_name: '',
            state_id: 0,
            country_id: 0
        };

        this.onChangeCityName = this.onChangeCityName.bind(this);
        this.onChangeState = this.onChangeState.bind(this);
        this.onChangeCountry = this.onChangeCountry.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        this.GetCountryRecord();
        this.GetStateRecord();
    }
    onChangeCityName(e) {
        this.setState({
            city_name: e.target.value
        });
    }
    onChangeState(e) {
        this.setState({
            state_id: e.target.value
        });
    }
    onChangeCountry(e) {
        this.setState({
            country_id: e.target.value
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        const data = new FormData(e.target);

        fetch('http://localhost:8000/city/' + this.props.match.params.id, {
            method: 'POST',
            body: data,
        });
    }
    GetCountryRecord = async () => {
        await axios({
            method: 'GET',
            url: 'http://localhost:8000/all_country',

        }).then(res => {
            if (res.data.staus_code === StatusCode.Success) {
                this.setState(
                    {
                        genralData: res.data.data,

                    });
            } else {
                this.setState(
                    {
                        genralData: [],

                    });
            }
        })

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
    render() {
        return (
            <div className="container">
                <h1>Edit City</h1>
                <div className="row">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label className="col-sm-3"><h4>Name</h4></label>
                            <input type="text" name="city_name" className="col-sm-9 form-control" value={this.state.city_name} onChange={this.onChangeCityName} />
                        </div>
                        <div className="form-group">
                            <label className="col-sm-3"><h4>State ID</h4></label>
                            <select className="col-sm-9 form-control" name="state_id" value={this.state.state_id} onChange={this.onChangeState}>
                                <option></option>
                                {
                                    this.state.stateData.length !== 0 ?
                                        this.state.stateData.map((state_data, i) =>
                                            <option value={state_data.id} key={i}>{state_data.state_name}</option>
                                        )
                                        :
                                        null
                                }
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-3"><h4>Country ID</h4></label>
                            <select className="col-sm-9 form-control" name="country_id" value={this.state.country_id} onChange={this.onChangeCountry}>
                                <option></option>
                                {
                                    this.state.genralData.length !== 0 ?
                                        this.state.genralData.map((country_data, j) =>
                                            <option value={country_data.id} key={j}>{country_data.name}</option>
                                        )
                                        :
                                        null
                                }
                            </select>
                        </div>
                        <div>

                            <input type="submit" name="submit" value="Update" className="btn btn-info pull-left col-sm-2" onClick={() => ToastsStore.success("City Updated Successfully")} />

                            <input type="reset" name="reset" value="Reset" className="btn btn-dark col-sm-2" onClick={() => ToastsStore.warning("Form is Reseted")} />
                        </div>


                    </form>
                </div>
                <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.BOTTOM_LEFT} />
            </div>
        )
    }
}
