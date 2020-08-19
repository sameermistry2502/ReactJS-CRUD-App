import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
class ProjectForm extends Component {
    constructor(props) {
        super(props)
        this.state = { rows: [] };
    }
    appendRow(event) {
        var rel = event.target.getAttribute("rel");
        rel = parseInt(rel) + 1;
        var joined = this.state.rows.concat(
            <div className="row" id={'rows' + rel}>
                <div className="col-md-2">
                    <FormGroup>
                        <Label for="d_id">Data ID</Label>
                        <Input type="number" name="d_id" id={"d_id " + rel} placeholder="Enter Data ID" />
                    </FormGroup>
                </div>
                <div className="col-md-3">
                    <FormGroup>
                        <Label for="d_title">Data Title</Label>
                        <Input type="text" name="d_title" id={"d_title" + rel} placeholder="Enter Data Title" />
                    </FormGroup>
                </div>
                <div className="col-md-3">
                    <FormGroup>
                        <Label for="d_desc">Data Description</Label>
                        <Input type="textarea" name="d_desc" id={"d_desc" + rel} placeholder="Enter Data Description" />
                    </FormGroup>
                </div>
                <div className="col-md-2">
                    <FormGroup>
                        <Label for="d_file">File</Label>
                        <Input type="file" name="d_file" id={"d_file" + rel} />
                        <FormText color="muted">
                            This is some placeholder block-level help text for the above input.
                            It's a bit lighter and easily wraps to a new line.
                            </FormText>
                    </FormGroup>

                </div>
            </div>
        );
        this.setState({ rows: joined })
    }
    render() {
        return (
            <div className="container">
                <Form>
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input type="text" name="name" id="name" placeholder="Enter Name" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="type">Type</Label>
                        <Input type="text" name="type" id="type" placeholder="Enter Type" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="industry">Industry</Label>
                        <Input type="text" name="industry" id="industry" placeholder="Enter Industry" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="desc">Description</Label>
                        <Input type="textarea" name="desc" id="desc" placeholder="Enter Description" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="parent_id">Choose Project Type / Part</Label>
                        <Input type="select" name="parent_id" id="parent_id">
                            <option></option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="status">Status</Label>
                        <Input type="select" name="status" id="status">
                            <option value="active">Active</option>
                            <option value="in-active">InActive</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <div className="row">
                            <div className="col-md-2">
                                <FormGroup>
                                    <Label for="d_id">Data ID</Label>
                                    <Input type="number" name="d_id" id="d_id" placeholder="Enter Data ID" />
                                </FormGroup>
                            </div>
                            <div className="col-md-3">
                                <FormGroup>
                                    <Label for="d_title">Data Title</Label>
                                    <Input type="text" name="d_title" id="d_title" placeholder="Enter Data Title" />
                                </FormGroup>
                            </div>
                            <div className="col-md-3">
                                <FormGroup>
                                    <Label for="d_desc">Data Description</Label>
                                    <Input type="textarea" name="d_desc" id="d_desc" placeholder="Enter Data Description" />
                                </FormGroup>
                            </div>
                            <div className="col-md-2">
                                <FormGroup>
                                    <Label for="d_file">File</Label>
                                    <Input type="file" name="d_file" id="d_file" />
                                    <FormText color="muted">
                                        This is some placeholder block-level help text for the above input.
                                        It's a bit lighter and easily wraps to a new line.
                            </FormText>
                                </FormGroup>

                            </div>
                            <div className="col-md-2">
                                <button
                                    rel="1"
                                    type="button"
                                    id="addbtn"
                                    className="btn btn-circle"
                                    onClick={this.appendRow}>
                                    <i className="fa fa-plus" />
                                </button>
                            </div>

                        </div>
                        {this.state.rows}
                    </FormGroup>

                    <Button className="btn btn-info" style={{ width: 200 }}>Save</Button>
                </Form>
            </div>
        );
    }
}
export default ProjectForm;

