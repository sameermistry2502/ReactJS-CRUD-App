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
export default class EditState extends Component {
    constructor(props) {

        super(props);
        this.state = {
            genralData: [],
            state_name: '',
            country_id: 0,
        };
        this.onChangeStateName = this.onChangeStateName.bind(this);
        this.onChangeCountry = this.onChangeCountry.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    onChangeStateName(e) {
        this.setState({
            state_name: e.target.value
        });
    }
    onChangeCountry(e) {
        this.setState({
            country_id: e.target.value
        });
    }
    componentDidMount() {
        axios.get('http://localhost:8000/state/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    state_name: response.data.state_name,
                    country_id: response.data.country_id
                });

            })
            .catch(function (error) {
                console.log(error);
            })
        this.GetCountryRecord();
    }
    handleSubmit(e) {
        e.preventDefault();
        const data = new FormData(e.target);

        fetch('http://localhost:8000/state/' + this.props.match.params.id, {
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
    render() {
        return (
            <div className="container">
                <h1>Edit State</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label className="col-sm-3"><h4>Name</h4></label>
                        <input type="text" name="state_name" className="col-sm-9 form-control" value={this.state.state_name} onChange={this.onChangeStateName} />
                    </div>
                    <div className="form-group">
                        <label className="col-sm-3"><h4>Country ID</h4></label>
                        <select className="col-sm-9 form-control" name="country_id" onChange={this.onChangeCountry} value={this.state.country_id}>
                            <option></option>
                            {
                                this.state.genralData.length !== 0 ?
                                    this.state.genralData.map((country_data, i) =>
                                        <option value={country_data.id} key={i}> {country_data.name}</option>
                                    )
                                    :
                                    null
                            }
                        </select>
                    </div>
                    <div>
                        <input type="submit" name="submit" value="Update" className="btn btn-info pull-left col-sm-2" onClick={() => ToastsStore.success("Now your state is Updated")} />

                        <input type="reset" name="reset" value="Reset" className="btn btn-dark col-sm-2" onClick={() => ToastsStore.info("Form is Reseted")} />
                    </div>


                </form>
                <div><ToastsContainer store={ToastsStore} position={ToastsContainerPosition.BOTTOM_LEFT} /></div>
            </div >
        )
    }
}
