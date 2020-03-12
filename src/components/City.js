import React, { Component } from 'react'
import axios from 'axios';
//import Pagination from "react-js-pagination";
import { Link } from 'react-router-dom';
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


export default class City extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cityData: [],
            activePage: null,
            itemsCountPerPage: null,
            last_page_url: null,
            next_page_url: null,
            prev_page_url: null,
            to: null,
            total: null
        };
        //this.setPage(this.props.match.params.page || this.props.activePage)
    }

    componentDidMount() {
        this.GetCityRecord();
        //this.handlePageChange(pageNumber);

    }
    GetCityRecord = async () => {
        await axios({
            method: 'GET',
            url: 'http://localhost:8000/all_city?page=' + 1,
        }).then(res => {
            if (res.data.staus_code === StatusCode.Success) {
                this.setState({
                    cityData: res.data.data.data,
                    activePage: res.data.data.current_page,
                    itemsCountPerPage: res.data.data.per_page,
                    last_page_url: res.data.data.last_page_url,
                    next_page_url: res.data.data.next_page_url,
                    prev_page_url: res.data.data.prev_page_url,
                    to: res.data.data.to,
                    total: res.data.data.total
                });
            } else {
                this.setState({
                    cityData: [],
                });
            }
        })
    }
    handlePageChange(event) {
        this.setState({
            currentPage: Number(event.target.id)

        });
        //this.props.history.push("/city/" + event.target.id);
    }

    render() {
        const { itemsCountPerPage, cityData, activePage } = this.state;
        const indexOfLastTodo = activePage * itemsCountPerPage;
        const indexOfFirstTodo = indexOfLastTodo - itemsCountPerPage;
        const currentTodos = cityData.slice(indexOfFirstTodo, indexOfLastTodo);

        const renderTodos = currentTodos.map((cityData, i) => {
            return (
                <tr key={i}>
                    <td>{i}</td>
                    <td>{cityData.city_name}</td>
                    <td>{cityData.get_state.state_name}</td>
                    <td>{cityData.get_country.name}</td>
                    <td>
                        <Link to={'/view_c/' + cityData.id + '/city'} id={cityData.id}><i className="fa fa-eye" title="Show" ></i></Link>
                        <Link to={'/editc/' + cityData.id} id={cityData.id}><i className="fa fa-edit" title="Edit" ></i></Link>
                        <Link to={'/del_c/' + cityData.id} id={cityData.id}> <i className="fa fa-trash" title="Delete" ></i></Link>
                    </td>
                </tr>
            );
        });

        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(cityData.length / itemsCountPerPage); i++) {
            pageNumbers.push(i);
        }


        const renderPageNumbers = pageNumbers.map(number => {
            return (
                <ul className='pagination'>
                    {pageNumbers.map(number => (
                        <li key={number} className='page-item'>
                            <a onClick={() => cityData(number)} href='!#' className='page-link'>
                                {number}
                            </a>
                        </li>
                    ))}
                </ul>
            );
        });
        return (
            <div>
                <div className="container">
                    <h2>Display Cities----<Link to={'/addcity'} className="nav-link">Add New City</Link></h2>
                    <table className="table country_table">
                        <thead>
                            <tr>
                                <th> Sr No</th>
                                <th> Name </th>
                                <th> State</th>
                                <th> Country</th>
                                <th> Actions </th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderTodos}
                        </tbody>
                    </table>
                </div>
                <div className='container'>
                    {renderPageNumbers}
                </div>

            </div >
        )
    }
}
