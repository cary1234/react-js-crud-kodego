import React, { Component } from "react";
import { Container, Table, Row, Col, Modal, Button, Form } from 'react-bootstrap';

class MyForm extends Component {
    state = {
        form: { employee_id: '', first_name: '', last_name: '', email: '', password: '', privilege: '', status: '', isEdit: false },

        isOpenAddModalCustomer: false,
        isOpenEditModalCustomer: false,


    };

    openModalAddModalCustomer = () => {
        this.setState({ isOpenAddModalCustomer: true });
        console.log("Trigger: " + this.state.isOpenAddModalCustomer);
    }

    closeModalAddModalCustomer = () => this.setState({ isOpenAddModalCustomer: false });

    openModalEditModalCustomer = () => this.setState({ isOpenEditModalCustomer: true });
    closeModalEditModalCustomer = () => this.setState({ isOpenEditModalCustomer: false });

    isEmpty(obj) {
        return Object.entries(obj).length === 0 && obj.constructor === Object;
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props && !this.isEmpty(this.props.customer)) {
            this.setState({
                form: { ...this.props.customer, isEdit: true },
                isOpenEditModalCustomer: true
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

    onFormSubmitCustomer = (event) => {
        this.closeModalAddModalCustomer();
        this.closeModalEditModalCustomer();
        //prevent form submit
        event.preventDefault();

        //form validation
        if (this.formValidation()) {
            //console.log("ready to create");
            //send form data to app.js
            this.props.onFormSubmitCustomer(this.state.form)
        }
    };

    formValidation = () => {
        return true;
    }

    render() {
        return (
            <>
                <Container>
                    <div className="d-grid mt-3 mb-5">
                        <a href="#" className="btn  btn-primary" onClick={this.openModalAddModalCustomer}>Add Employee</a>
                    </div>
                </Container>

                {/* Add Employee Modal */}
                <Modal show={this.state.isOpenAddModalCustomer}>
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

                                {/* Employee ID */}
                                <Row>
                                    <Col xs={12} md={{ span: 12 }} className="mt-1">
                                        <Form.Control
                                            type="text"
                                            className="input text-center"
                                            name="employee_id"
                                            placeholder="Employee ID"
                                            onChange={this.handleChange}
                                            value={this.state.form.employee_id}
                                        />
                                    </Col>
                                </Row>

                                {/* First Name */}
                                <Row>
                                    <Col xs={12} md={{ span: 12 }} className="mt-1">
                                        <Form.Control
                                            type="text"
                                            className="input text-center"
                                            name="first_name"
                                            placeholder="First Name"
                                            onChange={this.handleChange}
                                            value={this.state.form.first_name}
                                        />
                                    </Col>
                                </Row>

                                {/* Last Name */}
                                <Row>
                                    <Col xs={12} md={{ span: 12 }} className="mt-1">
                                        <Form.Control
                                            type="text"
                                            className="input text-center"
                                            name="last_name"
                                            placeholder="Last Name"
                                            onChange={this.handleChange}
                                            value={this.state.form.last_name}
                                        />
                                    </Col>
                                </Row>

                                {/* Email */}
                                <Row>
                                    <Col xs={12} md={{ span: 12 }} className="mt-1">
                                        <Form.Control
                                            type="email"
                                            className="input text-center"
                                            name="email"
                                            placeholder="Company Email"
                                            onChange={this.handleChange}
                                            value={this.state.form.email}
                                        />
                                    </Col>
                                </Row>

                                {/* Password */}
                                <Row>
                                    <Col xs={12} md={{ span: 12 }} className="mt-1">
                                        <Form.Control
                                            type="password"
                                            className="input text-center"
                                            name="password"
                                            placeholder="Temporary Password"
                                            onChange={this.handleChange}
                                            value={this.state.form.password}
                                        />
                                    </Col>
                                </Row>

                                {/* Privilege */}
                                <Row>
                                    <Col xs={12} md={{ span: 12 }} className="mt-1">
                                        <select
                                            className="form-control form-select text-center"
                                            name="privilege"
                                            onChange={this.handleChange}
                                            value={this.state.form.privilege}
                                        >
                                            <option
                                                value=""
                                                selected
                                                disabled>
                                                Select Privilege
                                            </option>
                                            <option
                                                value="Regular">
                                                Regular
                                            </option>
                                            <option
                                                value="Admin">
                                                Admin
                                            </option>
                                            <option
                                                value="Super Admin">
                                                Super Admin
                                            </option>
                                        </select>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col xs={6} md={{ span: 5 }} className="mt-1">
                                        <div className="d-grid mt-3">
                                            <button className="btn btn-primary" onClick={this.onFormSubmitCustomer}>
                                                Done
                                            </button>
                                        </div>
                                    </Col>
                                    <Col xs={6} md={{ span: 7 }} className="mt-1">
                                        <div className="d-grid mt-3">
                                            <button className="btn btn-danger" onClick={this.closeModalAddModalCustomer}>
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
                <Modal show={this.state.isOpenEditModalCustomer}>
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

                                {/* Employee ID */}
                                <Row>
                                    <Col xs={12} md={{ span: 12 }} className="mt-1">
                                        <Form.Control
                                            type="text"
                                            className="input text-center"
                                            name="employee_id"
                                            placeholder="Employee ID"
                                            onChange={this.handleChange}
                                            value={this.state.form.employee_id}
                                        />
                                    </Col>
                                </Row>

                                {/* First Name */}
                                <Row>
                                    <Col xs={12} md={{ span: 12 }} className="mt-1">
                                        <Form.Control
                                            type="text"
                                            className="input text-center"
                                            name="first_name"
                                            placeholder="First Name"
                                            onChange={this.handleChange}
                                            value={this.state.form.first_name}
                                        />
                                    </Col>
                                </Row>

                                {/* Last Name */}
                                <Row>
                                    <Col xs={12} md={{ span: 12 }} className="mt-1">
                                        <Form.Control
                                            type="text"
                                            className="input text-center"
                                            name="last_name"
                                            placeholder="Last Name"
                                            onChange={this.handleChange}
                                            value={this.state.form.last_name}
                                        />
                                    </Col>
                                </Row>

                                {/* Email */}
                                <Row>
                                    <Col xs={12} md={{ span: 12 }} className="mt-1">
                                        <Form.Control
                                            type="email"
                                            className="input text-center"
                                            name="email"
                                            placeholder="Company Email"
                                            onChange={this.handleChange}
                                            value={this.state.form.email}
                                        />
                                    </Col>
                                </Row>

                                {/* Password */}
                                <Row>
                                    <Col xs={12} md={{ span: 12 }} className="mt-1">
                                        <Form.Control
                                            type="password"
                                            className="input text-center"
                                            name="password"
                                            placeholder="Temporary Password"
                                            onChange={this.handleChange}
                                            value={this.state.form.password}
                                        />
                                    </Col>
                                </Row>

                                {/* Privilege */}
                                <Row>
                                    <Col xs={12} md={{ span: 12 }} className="mt-1">
                                        <select
                                            className="form-control form-select text-center"
                                            name="privilege"
                                            onChange={this.handleChange}
                                            value={this.state.form.privilege}
                                        >
                                            <option
                                                value=""
                                                selected
                                                disabled>
                                                Privilege
                                            </option>
                                            <option
                                                value="Super Admin">
                                                Super Admin
                                            </option>
                                            <option
                                                value="Admin">
                                                Admin
                                            </option>
                                            <option
                                                value="Regular">
                                                Regular
                                            </option>
                                        </select>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col xs={6} md={{ span: 3, offset: 3 }} className="mt-1">
                                        <div className="d-grid mt-3">
                                            <button className="btn btn-primary" onClick={this.onFormSubmitCustomer}>
                                                Done
                                            </button>
                                        </div>
                                    </Col>
                                    <Col xs={6} md={{ span: 3 }} className="mt-1">
                                        <div className="d-grid mt-3">
                                            <button className="btn btn-danger" onClick={this.closeModalEditModalCustomer}>
                                                Close
                                            </button>
                                        </div>
                                    </Col>
                                </Row>
                            </form>
                        </Container>
                    </Modal.Body>
                </Modal>


            </>
        );
    }
}

export default MyForm;