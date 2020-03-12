import React, { Component } from 'react'
import { ToastsContainerPosition, ToastsContainer, ToastsStore } from 'react-toasts';
export default class AddCountry extends Component {
    handleSubmit(e) {
        e.preventDefault();
        const data = new FormData(e.target);

        fetch('http://localhost:8000/country', {
            method: 'POST',
            body: data,
        });
    }
    render() {

        return (
            <div className="container">
                <h1>Add New Country</h1>
                <div className="row">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label className="col-sm-3"><h4>Iso</h4></label>
                            <input type="text" name="iso" className="col-sm-9 form-control" />
                        </div>
                        <div className="form-group">
                            <label className="col-sm-3"><h4>Name</h4></label>
                            <input type="text" name="name" className="col-sm-9 form-control" />
                        </div>
                        <div className="form-group">
                            <label className="col-sm-3"><h4>Nicename</h4></label>
                            <input type="text" name="nicename" className="col-sm-9 form-control" />
                        </div>
                        <div className="form-group">
                            <label className="col-sm-3"><h4>Iso3</h4></label>
                            <input type="text" name="iso3" className="col-sm-9 form-control" />
                        </div>
                        <div className="form-group">
                            <label className="col-sm-3"><h4>Numcode</h4></label>
                            <input type="number" name="numcode" className="col-sm-9 form-control" />
                        </div>
                        <div className="form-group">
                            <label className="col-sm-3"><h4>Phonecode</h4></label>
                            <input type="number" name="phonecode" className="col-sm-9 form-control" />
                        </div>
                        <div>

                            <input type="submit" name="submit" value="Add Now" className="btn btn-success pull-left col-sm-2" onClick={() => ToastsStore.success("Country Added Successfully")} />

                            <input type="reset" name="reset" value="Reset" className="btn btn-dark col-sm-2" onClick={() => ToastsStore.warning("Form is Reseted")} />
                        </div>


                    </form>
                </div>
                <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.BOTTOM_LEFT} />
            </div>
        )
    }
}