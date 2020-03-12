import React, { Component } from 'react'
import axios from 'axios';
import { ToastsContainerPosition, ToastsContainer, ToastsStore } from 'react-toasts';
export default class EditCountry extends Component {
    constructor(props) {

        super(props);
        this.state = {
            genralData: [],
            iso: '',
            name: '',
            nicename: '',
            resp: '',
            isot: undefined,
            numcode: undefined,
            phonecode: undefined
        };
        this.onChangeIso = this.onChangeIso.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeNiceName = this.onChangeNiceName.bind(this);
        this.onChangeIsoThree = this.onChangeIsoThree.bind(this);
        this.onChangeNumcode = this.onChangeNumcode.bind(this);
        this.onChangePhoneCode = this.onChangePhoneCode.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    onChangeIso(e) {
        this.setState({
            iso: e.target.value
        });
    }
    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }
    onChangeNiceName(e) {
        this.setState({
            nicename: e.target.value
        });
    }
    onChangeIsoThree(e) {
        this.setState({
            isot: e.target.value
        });
    }
    onChangeNumcode(e) {
        this.setState({
            numcode: e.target.value
        });
    }
    onChangePhoneCode(e) {
        this.setState({
            phonecode: e.target.value
        });
    }
    componentDidMount() {
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
    handleSubmit(e) {
        e.preventDefault();
        const data = new FormData(e.target);

        fetch('http://localhost:8000/country/' + this.props.match.params.id, {
            method: 'POST',
            body: data,
        }).then(response => response.json())
            .then(json => this.setState({ resp: json.data.data }))
            .then(ToastsStore.success(this.state.resp));
    }
    render() {
        return (
            <div className="container">
                <h1>Edit Country</h1>
                <div className="row">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label className="col-sm-3"><h4>Iso</h4></label>
                            <input type="text" name="iso" className="col-sm-9 form-control" value={this.state.iso} onChange={this.onChangeIso} />
                        </div>
                        <div className="form-group">
                            <label className="col-sm-3"><h4>Name</h4></label>
                            <input type="text" name="name" className="col-sm-9 form-control" value={this.state.name} onChange={this.onChangeName} />
                        </div>
                        <div className="form-group">
                            <label className="col-sm-3"><h4>Nicename</h4></label>
                            <input type="text" name="nicename" className="col-sm-9 form-control" value={this.state.nicename} onChange={this.onChangeNiceName} />
                        </div>
                        <div className="form-group">
                            <label className="col-sm-3"><h4>Iso3</h4></label>
                            <input type="text" name="iso3" className="col-sm-9 form-control" value={this.state.isot} onChange={this.onChangeIsoThree} />
                        </div>
                        <div className="form-group">
                            <label className="col-sm-3"><h4>Numcode</h4></label>
                            <input type="number" name="numcode" className="col-sm-9 form-control" value={this.state.numcode} onChange={this.onChangeNumcode} />
                        </div>
                        <div className="form-group">
                            <label className="col-sm-3"><h4>Phonecode</h4></label>
                            <input type="number" name="phonecode" className="col-sm-9 form-control" value={this.state.phonecode} onChange={this.onChangePhoneCode} />
                        </div>
                        <div>

                            <input type="submit" name="submit" value="Update" className="btn btn-info pull-left col-sm-2" />

                            <input type="reset" name="reset" value="Reset" className="btn btn-dark col-sm-2" onClick={() => ToastsStore.warning("Form is Reseted")} />
                        </div>


                    </form>
                </div>
                <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.BOTTOM_LEFT} />
            </div>
        )
    }
}
