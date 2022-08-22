import React, { Component } from "react";
import { Container, Row, Col, Modal, Form, FloatingLabel } from 'react-bootstrap';

class MyForm extends Component {
    state = {
        form: { employee_id: '', first_name: '', last_name: '', email: '', password: '', privilege: '', status: '', isEdit: false },

        isOpenAddModalCustomer: false,
        isOpenEditModalCustomer: false,
        isOpenEditModalCustomerPassword: false,
    };

    openModalAddModalCustomer = () => this.setState({ isOpenAddModalCustomer: true });
    closeModalAddModalCustomer = () => this.setState({ isOpenAddModalCustomer: false });

    openModalEditModalCustomer = () => this.setState({ isOpenEditModalCustomer: true });
    closeModalEditModalCustomer = () => this.setState({ isOpenEditModalCustomer: false });

    openModalEditModalCustomerPassword = () => this.setState({ isOpenEditModalCustomerPassword: true });
    closeModalEditModalCustomerPassword = () => this.setState({ isOpenEditModalCustomerPassword: false });

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
                    <div className="d-grid mt-3">
                        <a href="/#" className="btn  btn-primary" onClick={this.openModalAddModalCustomer}>Add Employee</a>
                    </div>
                    <div className="d-grid mt-2 mb-3">
                        <a href="/#" className="btn  btn-danger" onClick={this.openModalEditModalCustomerPassword}>Change My Password</a>
                    </div>
                </Container>

                {/* Add Employee Modal */}
                <Modal show={this.state.isOpenAddModalCustomer}>
                    <Modal.Body>
                        <Container fluid className="">
                            <form>
                                <Row>
                                    <Col xs={6} md={{ span: 12 }} className="mt-1 mb-2 text-center">
                                        <label className="label">
                                            <h4> Fill up employee information</h4>
                                        </label>
                                    </Col>
                                </Row>

                                {/* Employee ID */}
                                <Row>
                                    <Col xs={12} md={{ span: 12 }} className="mt-1">
                                        <FloatingLabel
                                            label="Employee ID"
                                            className="mb-1"
                                        >
                                            <Form.Control
                                                type="text"
                                                className="text-center"
                                                name="employee_id"
                                                placeholder="Employee ID"
                                                onChange={this.handleChange}
                                                value={this.state.form.employee_id}
                                            />
                                        </FloatingLabel>
                                    </Col>
                                </Row>

                                {/* First Name */}
                                <Row>
                                    <Col xs={12} md={{ span: 12 }} className="mt-1">
                                        <FloatingLabel
                                            label="First Name"
                                            className="mb-1"
                                        >
                                            <Form.Control
                                                type="text"
                                                className="text-center"
                                                name="first_name"
                                                placeholder="First Name"
                                                onChange={this.handleChange}
                                                value={this.state.form.first_name}
                                            />
                                        </FloatingLabel>
                                    </Col>
                                </Row>

                                {/* Last Name */}
                                <Row>
                                    <Col xs={12} md={{ span: 12 }} className="mt-1">
                                        <FloatingLabel
                                            label="Last Name"
                                            className="mb-1"
                                        >
                                            <Form.Control
                                                type="text"
                                                className="text-center"
                                                name="last_name"
                                                placeholder="Last Name"
                                                onChange={this.handleChange}
                                                value={this.state.form.last_name}
                                            />
                                        </FloatingLabel>
                                    </Col>
                                </Row>

                                {/* Email */}
                                <Row>
                                    <Col xs={12} md={{ span: 12 }} className="mt-1">
                                        <FloatingLabel
                                            label="Email"
                                            className="mb-1"
                                        >
                                            <Form.Control
                                                type="text"
                                                className="text-center"
                                                name="email"
                                                placeholder="Company Email"
                                                onChange={this.handleChange}
                                                value={this.state.form.email}
                                            />
                                        </FloatingLabel>
                                    </Col>
                                </Row>

                                {/* Password */}
                                <Row>
                                    <Col xs={12} md={{ span: 12 }} className="mt-1">
                                        <FloatingLabel
                                            label="Password"
                                            className="mb-1"
                                        >
                                            <Form.Control
                                                type="password"
                                                className="text-center"
                                                name="password"
                                                placeholder="Password"
                                                onChange={this.handleChange}
                                            />
                                        </FloatingLabel>
                                    </Col>
                                </Row>

                                {/* Confirm Password */}
                                <Row>
                                    <Col xs={12} md={{ span: 12 }} className="mt-1">
                                        <FloatingLabel
                                            label="Confirm Password"
                                            className="mb-1"
                                        >
                                            <Form.Control
                                                type="password"
                                                className="text-center"
                                                name="password_confirm"
                                                placeholder="Confirm Password"
                                                onChange={this.handleChange}
                                            />
                                        </FloatingLabel>
                                    </Col>
                                </Row>

                                {/* Privilege */}
                                <Row>
                                    <Col xs={12} md={{ span: 12 }} className="mt-1">
                                        <FloatingLabel
                                            label="Privilege"
                                        >
                                            <Form.Select
                                                className="form-control form-select text-center"
                                                name="privilege"
                                                onChange={this.handleChange}
                                                value={this.state.form.privilege}
                                            >
                                                <option
                                                    value=""
                                                    selected
                                                    disabled
                                                >
                                                    Privilege
                                                </option>



                                                {
                                                    //if super admin
                                                    (localStorage.getItem('localStorageUserPrivilege') === 'Super Admin') ?
                                                        //then
                                                        (
                                                            <>

                                                                <option
                                                                    value="Super Admin">
                                                                    Super Admin
                                                                </option>
                                                            </>
                                                        )
                                                        :
                                                        //else regular employee
                                                        console.log("Employee")
                                                }


                                                <option
                                                    value="Admin"
                                                >
                                                    Admin
                                                </option>
                                                <option
                                                    value="Regular"
                                                >
                                                    Regular
                                                </option>
                                            </Form.Select >
                                        </FloatingLabel >
                                    </Col >
                                </Row >

                                {/* Buttons */}
                                < Row >
                                    <Col xs={6} md={{ span: 6 }} className="mt-1">
                                        <div className="d-grid mt-3">
                                            <button className="btn btn-primary" onClick={this.onFormSubmitCustomer}>
                                                Done
                                            </button>
                                        </div>
                                    </Col>
                                    <Col xs={6} md={{ span: 6 }} className="mt-1">
                                        <div className="d-grid mt-3">
                                            <button className="btn btn-danger" onClick={this.closeModalAddModalCustomer}>
                                                Close
                                            </button>
                                        </div>
                                    </Col>
                                </Row >
                            </form >
                        </Container >
                    </Modal.Body >
                </Modal >

                {/* Edit Employee Modal */}
                < Modal show={this.state.isOpenEditModalCustomer} >
                    <Modal.Body>
                        <Container fluid className="">
                            <form>
                                <Row>
                                    <Col xs={6} md={{ span: 12 }} className="mt-1 mb-2 text-center">
                                        <label className="label">
                                            <h4>Update employee information</h4>
                                        </label>
                                    </Col>
                                </Row>

                                {/* Employee ID */}
                                <Row>
                                    <Col xs={12} md={{ span: 12 }} className="mt-1">
                                        <FloatingLabel
                                            label="Employee ID"
                                            className="mb-1"
                                        >
                                            <Form.Control
                                                type="text"
                                                className="text-center"
                                                name="employee_id"
                                                placeholder="Employee ID"
                                                onChange={this.handleChange}
                                                value={this.state.form.employee_id}
                                            />
                                        </FloatingLabel>
                                    </Col>
                                </Row>

                                {/* First Name */}
                                <Row>
                                    <Col xs={12} md={{ span: 12 }} className="mt-1">
                                        <FloatingLabel
                                            label="First Name"
                                            className="mb-1"
                                        >
                                            <Form.Control
                                                type="text"
                                                className="text-center"
                                                name="first_name"
                                                placeholder="First Name"
                                                onChange={this.handleChange}
                                                value={this.state.form.first_name}
                                            />
                                        </FloatingLabel>
                                    </Col>
                                </Row>

                                {/* Last Name */}
                                <Row>
                                    <Col xs={12} md={{ span: 12 }} className="mt-1">
                                        <FloatingLabel
                                            label="Last Name"
                                            className="mb-1"
                                        >
                                            <Form.Control
                                                type="text"
                                                className="text-center"
                                                name="last_name"
                                                placeholder="Last Name"
                                                onChange={this.handleChange}
                                                value={this.state.form.last_name}
                                            />
                                        </FloatingLabel>
                                    </Col>
                                </Row>

                                {/* Email */}
                                <Row>
                                    <Col xs={12} md={{ span: 12 }} className="mt-1">
                                        <FloatingLabel
                                            label="Email"
                                            className="mb-1"
                                        >
                                            <Form.Control
                                                type="text"
                                                className="text-center"
                                                name="email"
                                                placeholder="Company Email"
                                                onChange={this.handleChange}
                                                value={this.state.form.email}
                                            />
                                        </FloatingLabel>
                                    </Col>
                                </Row>

                                {/* Password */}
                                <Row>
                                    <Col xs={12} md={{ span: 12 }} className="mt-1">
                                        <FloatingLabel
                                            label="Change Password"
                                            className="mb-1"
                                        >
                                            <Form.Control
                                                type="password"
                                                className="text-center"
                                                name="password"
                                                placeholder="Change Password"
                                                onChange={this.handleChange}
                                            />
                                        </FloatingLabel>
                                    </Col>
                                </Row>

                                {/* Confirm Password */}
                                <Row>
                                    <Col xs={12} md={{ span: 12 }} className="mt-1">
                                        <FloatingLabel
                                            label="Confirm Password"
                                            className="mb-1"
                                        >
                                            <Form.Control
                                                type="password"
                                                className="text-center"
                                                name="password_confirm"
                                                placeholder="Confirm Password"
                                                onChange={this.handleChange}
                                            />
                                        </FloatingLabel>
                                    </Col>
                                </Row>

                                {/* Privilege */}
                                <Row>
                                    <Col xs={12} md={{ span: 12 }} className="mt-1">
                                        <FloatingLabel
                                            label="Privilege"
                                        >
                                            <Form.Select
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

                                                {
                                                    //if super admin
                                                    (localStorage.getItem('localStorageUserPrivilege') === 'Super Admin') ?
                                                        //then
                                                        (
                                                            <>

                                                                <option
                                                                    value="Super Admin">
                                                                    Super Admin
                                                                </option>
                                                            </>
                                                        )
                                                        :
                                                        //else regular employee
                                                        console.log("Employee")
                                                }

                                                <option
                                                    value="Admin"
                                                >
                                                    Admin
                                                </option>
                                                <option
                                                    value="Regular"
                                                >
                                                    Regular
                                                </option>
                                            </Form.Select >
                                        </FloatingLabel >
                                    </Col >
                                </Row >

                                {/* Account Status */}
                                < Row >
                                    <Col xs={12} md={{ span: 12 }} className="mt-1">
                                        <FloatingLabel
                                            label="Account Status"
                                        >
                                            <Form.Select
                                                className="form-control form-select text-center"
                                                name="status"
                                                onChange={this.handleChange}
                                                value={this.state.form.status}
                                            >
                                                <option
                                                    value=""
                                                    selected
                                                    disabled>Account Status
                                                </option>
                                                <option
                                                    value="Active">
                                                    Active
                                                </option>
                                                <option
                                                    value="Inactive">
                                                    Inactive
                                                </option>
                                            </Form.Select>
                                        </FloatingLabel>
                                    </Col>
                                </Row >

                                {/* Buttons */}
                                < Row >
                                    <Col xs={6} md={{ span: 6 }} className="mt-1">
                                        <div className="d-grid mt-3">
                                            <button className="btn btn-primary" onClick={this.onFormSubmitCustomer}>
                                                Done
                                            </button>
                                        </div>
                                    </Col>
                                    <Col xs={6} md={{ span: 6 }} className="mt-1">
                                        <div className="d-grid mt-3">
                                            <button className="btn btn-danger" onClick={this.closeModalEditModalCustomer}>
                                                Close
                                            </button>
                                        </div>
                                    </Col>
                                </Row >
                            </form >
                        </Container >
                    </Modal.Body >
                </Modal >

                {/* Change Password Employee Modal */}
                < Modal show={this.state.isOpenEditModalCustomerPassword} >
                    <Modal.Body>
                        <Container fluid className="">
                            <form>
                                <Row>
                                    <Col xs={6} md={{ span: 12 }} className="mt-1 mb-2 text-center">
                                        <label className="label">
                                            <h4>Change account password</h4>
                                        </label>
                                    </Col>
                                </Row>

                                {/* Password */}
                                <Row>
                                    <Col xs={12} md={{ span: 12 }} className="mt-1">
                                        <FloatingLabel
                                            label="Change Password"
                                            className="mb-1"
                                        >
                                            <Form.Control
                                                type="password"
                                                className="text-center"
                                                name="password"
                                                placeholder="Change Password"
                                                onChange={this.handleChange}
                                            />
                                        </FloatingLabel>
                                    </Col>
                                </Row>

                                {/* Confirm Password */}
                                <Row>
                                    <Col xs={12} md={{ span: 12 }} className="mt-1">
                                        <FloatingLabel
                                            label="Confirm Password"
                                            className="mb-1"
                                        >
                                            <Form.Control
                                                type="password"
                                                className="text-center"
                                                name="password_confirm"
                                                placeholder="Confirm Password"
                                                onChange={this.handleChange}
                                            />
                                        </FloatingLabel>
                                    </Col>
                                </Row>


                                {/* Buttons */}
                                <Row>
                                    <Col xs={6} md={{ span: 6 }} className="mt-1">
                                        <div className="d-grid mt-3">
                                            <button className="btn btn-primary" onClick={this.onFormSubmitCustomer}>
                                                Done
                                            </button>
                                        </div>
                                    </Col>
                                    <Col xs={6} md={{ span: 6 }} className="mt-1">
                                        <div className="d-grid mt-3">
                                            <button className="btn btn-danger" onClick={this.closeModalEditModalCustomerPassword}>
                                                Close
                                            </button>
                                        </div>
                                    </Col>
                                </Row>
                            </form>
                        </Container>
                    </Modal.Body>
                </Modal >

            </>
        );
    }
}

export default MyForm;