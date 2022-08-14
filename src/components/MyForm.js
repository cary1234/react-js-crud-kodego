import React, { Component } from "react";
import { Container, Table, Row, Col, Modal, Button, Form } from 'react-bootstrap';

class MyForm extends Component {
    state = {
        form: { first_name: '', last_name: '', email: '', isEdit: false },
        btnName: "Save",
        btnClass: "ui primary button submit-button",
        isOpenAddModal: false,
        isOpenEditModal: false
    };

    openModalAddModal = () => this.setState({ isOpenAddModal: true });
    closeModalAddModal = () => this.setState({ isOpenAddModal: false });

    openModalEditModal = () => this.setState({ isOpenEditModal: true });
    closeModalEditModal = () => this.setState({ isOpenEditModal: false });

    isEmpty(obj) {
        return Object.entries(obj).length === 0 && obj.constructor === Object;
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props && !this.isEmpty(this.props.customer)) {
            this.setState({
                form: { ...this.props.customer, isEdit: true },
                btnName: "Update",
                btnClass: "ui orange button submit-button",
                isOpenEditModal: true
            });
            //console.log("Update");
        }
    }

    //Note: Linked to the input fields of firstName, lastName and email
    handleChange = event => {
        const { name, value } = event.target;
        let form = this.state.form;
        form[name] = value;
        this.setState({ form });
    }

    onFormSubmit = (event) => {

        this.closeModalAddModal();
        this.closeModalEditModal();
        //prevent form submit
        event.preventDefault();

        //form validation
        if (this.formValidation()) {
            //console.log("ready to create");
            //send form data to app.js
            this.props.onFormSubmit(this.state.form)
        }

        //change the button to save
        this.setState({
            btnName: "Save",
            btnClass: "ui primary button submit-button"
        })

        //clear form fields
        this.clearFofrmFields();
    };

    formValidation = () => {
        return true;
    }

    clearFofrmFields = () => {
        this.setState({
            form: { first_name: '', last_name: '', email: '', isEdit: false }
        });

    }

    render() {
        return (
            <>
                <Container>
                    <div className="d-grid mt-3 mb-5">
                        <a href="#" className="btn  btn-primary" onClick={this.openModalAddModal}>Add Employee</a>
                    </div>
                </Container>

                {/* Add Employee Modal */}
                <Modal show={this.state.isOpenAddModal}>
                    <Modal.Body>
                        <Container fluid className="text-center">
                            <form>
                                <Row>
                                    <Col xs={6} md={{ span: 12 }} className="mt-1 mb-2">
                                        <label className="label">
                                            <h4> Fill up employee information</h4>
                                        </label>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col xs={6} md={{ span: 5 }} className="mt-1">
                                        <label className="label mt-1 ">Employee ID: </label>
                                    </Col>
                                    <Col xs={6} md={{ span: 7 }} className="mt-1">
                                        <input
                                            type="text"
                                            className="input text-center"
                                            name="employee_id"
                                            placeholder="123-456"
                                            onChange={this.handleChange}
                                            value={this.state.form.employee_id}
                                        />
                                    </Col>
                                </Row>

                                <Row>
                                    <Col xs={6} md={{ span: 5 }} className="mt-1">
                                        <label className="label mt-1 ">First Name: </label>
                                    </Col>
                                    <Col xs={6} md={{ span: 7 }} className="mt-1">
                                        <input
                                            type="text"
                                            className="input text-center"
                                            name="first_name"
                                            placeholder="Juan"
                                            onChange={this.handleChange}
                                            value={this.state.form.first_name}
                                        />
                                    </Col>
                                </Row>

                                <Row>
                                    <Col xs={6} md={{ span: 5 }} className="mt-1">
                                        <label className="label mt-1">
                                            Last Name:
                                        </label>
                                    </Col>
                                    <Col xs={6} md={{ span: 7 }} className="mt-1">
                                        <input
                                            type="text"
                                            className="input text-center"
                                            name="last_name"
                                            placeholder="Dela Cruz"
                                            onChange={this.handleChange}
                                            value={this.state.form.last_name}
                                        />
                                    </Col>
                                </Row>

                                <Row>
                                    <Col xs={6} md={{ span: 5 }} className="mt-1">
                                        <label className="label mt-1">
                                            Company Email:
                                        </label>
                                    </Col>
                                    <Col xs={6} md={{ span: 7 }} className="mt-1">
                                        <Form.Control
                                            type="email"
                                            className="input text-center"
                                            name="email"
                                            placeholder="j.delacruz@spediph.com"
                                            onChange={this.handleChange}
                                            value={this.state.form.email}
                                        />

                                    </Col>
                                </Row>

                                {/* Attendance Type */}
                                <Row>
                                    <Col xs={12} md={{ span: 12 }} className="mt-1">
                                        <select
                                            className="form-control form-select text-center"
                                            name="type"
                                            onChange={this.handleChange}
                                            value={this.state.form.type}
                                        >
                                            <option
                                                value=""
                                                selected
                                                disabled>
                                                Attendance Type
                                            </option>
                                            <option
                                                value="Time In">
                                                Time In
                                            </option>
                                            <option
                                                value="Time Out">
                                                Time Out
                                            </option>
                                        </select>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col xs={6} md={{ span: 5 }} className="mt-1">
                                        <div className="d-grid mt-3">
                                            <button className="btn btn-primary" onClick={this.onFormSubmit}>
                                                Done
                                            </button>
                                        </div>
                                    </Col>
                                    <Col xs={6} md={{ span: 7 }} className="mt-1">
                                        <div className="d-grid mt-3">
                                            <button className="btn btn-danger" onClick={this.closeModalAddModal}>
                                                Close
                                            </button>
                                        </div>
                                    </Col>
                                </Row>
                            </form>
                        </Container>
                    </Modal.Body>
                </Modal>

                {/* Edit Employee Modal */}
                <Modal show={this.state.isOpenEditModal}>
                    <Modal.Body>
                        <Container fluid className="text-center">
                            <form>
                                <Row>
                                    <Col xs={6} md={{ span: 12 }} className="mt-1 mb-2">
                                        <label className="label">
                                            <h4> Fill up employee information</h4>
                                        </label>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col xs={6} md={{ span: 2, offset: 2 }} className="mt-1">
                                        <label className="label mt-1 ">Name: </label>
                                    </Col>
                                    <Col xs={6} md={{ span: 3 }} className="mt-1">
                                        <input
                                            type="text"
                                            className="input text-center"
                                            name="first_name"
                                            placeholder="Juan"
                                            onChange={this.handleChange}
                                            value={this.state.form.first_name}
                                        />
                                    </Col>
                                </Row>

                                <Row>
                                    <Col xs={6} md={{ span: 2, offset: 2 }} className="mt-1">
                                        <label className="label mt-1">
                                            Position:
                                        </label>
                                    </Col>
                                    <Col xs={6} md={{ span: 3 }} className="mt-1">
                                        <input
                                            type="text"
                                            className="input text-center"
                                            name="last_name"
                                            placeholder="Dela Cruz"
                                            onChange={this.handleChange}
                                            value={this.state.form.last_name}
                                        />
                                    </Col>
                                </Row>

                                <Row>
                                    <Col xs={6} md={{ span: 2, offset: 2 }} className="mt-1">
                                        <label className="label mt-1">
                                            Position:
                                        </label>
                                    </Col>
                                    <Col xs={6} md={{ span: 3 }} className="mt-1">
                                        <input
                                            type="email"
                                            className="input text-center"
                                            name="email"
                                            placeholder="juandelacruz@spediph.com"
                                            onChange={this.handleChange}
                                            value={this.state.form.email}
                                        />
                                    </Col>
                                </Row>

                                <Row>
                                    <Col xs={6} md={{ span: 3, offset: 3 }} className="mt-1">
                                        <div className="d-grid mt-3">
                                            <button className="btn btn-primary" onClick={this.onFormSubmit}>
                                                Done
                                            </button>
                                        </div>
                                    </Col>
                                    <Col xs={6} md={{ span: 3 }} className="mt-1">
                                        <div className="d-grid mt-3">
                                            <button className="btn btn-danger" onClick={this.closeModalEditModal}>
                                                Close
                                            </button>
                                        </div>
                                    </Col>
                                </Row>
                            </form>
                        </Container>
                    </Modal.Body>
                    <Modal.Footer>
                        <Col xs={12} md={{ span: 12 }} className="text-center">
                            <i className="text-danger">
                                Once deleted it cannot be undone
                            </i>
                        </Col>
                    </Modal.Footer>
                </Modal>


            </>
        );
    }
}

export default MyForm;