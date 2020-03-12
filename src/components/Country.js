import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
//const url = 'http://localhost:8000/all_country';
//const key = 'sameer@132';

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

export default class Country extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //countries: [],
            genralData: []
        };
    }
    componentDidMount() {
        this.GetCountryRecord();
    }
    DelteCountry = (id) => {
        axios.delete('http://localhost:8000/country/' + id)
            .then(json => {

                alert(json.data);

            })
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
                <h2>Display Countries</h2>
                <table className="table country_table">
                    <thead>
                        <tr>
                            <th> Sr No</th>
                            <th> Iso</th>
                            <th>Name</th>
                            <th>Nicename</th>
                            <th>Iso3</th>
                            <th>Numcode</th>
                            <th>Phonecode</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.genralData.length !== 0 ?
                                this.state.genralData.map((country_data, i) =>
                                    <tr key={i}>
                                        <td>{i}</td>
                                        <td>{country_data.iso}</td>
                                        <td>{country_data.name}</td>
                                        <td>{country_data.nicename}</td>
                                        <td>{country_data.iso3}</td>
                                        <td>{country_data.numcode}</td>
                                        <td>{country_data.phonecode}</td>
                                        <td>
                                            <Link to={'/view/' + country_data.id + '/country'} id={country_data.id}><i className="fa fa-eye" title="Show" ></i></Link>
                                            <Link to={'/cedit/' + country_data.id} id={country_data.id}><i className="fa fa-edit" title="Edit" ></i></Link>
                                            <Link onClick={() => this.DelteCountry(country_data.id)} id={country_data.id}> <i className="fa fa-trash" title="Delete" ></i></Link>
                                        </td>
                                    </tr>
                                )
                                :
                                null
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}
