
import React, { Component } from "react";
import { Container, Table, Row, Col, Modal, Button, Form, InputGroup } from 'react-bootstrap';
import Clock from 'react-live-clock';
import axios from 'axios';

class MyAttendanceForm extends Component {

    state = {
        form: { real_location: '', site_location: '', type: '', remarks: '', isEdit: false },
        btnName: "Save",
        btnClass: "ui primary button submit-button",
        isOpenAddModalAttendance: false,
        isOpenEditModalAttendance: false,
        urlIpInfo: "https://ipinfo.io/json?token=5ec5b65121ca42",

    };

    openModalAddModalAttendance = () => this.setState({ isOpenAddModalAttendance: true });
    closeModalAddModalAttendance = () => this.setState({ isOpenAddModalAttendance: false });

    openModalEditModalAttendance = () => this.setState({ isOpenEditModalAttendance: true });
    closeModalEditModalAttendance = () => this.setState({ isOpenEditModalAttendance: false });

    onFormSubmitAdd = (event) => {
        this.closeModalAddModalAttendance();
        //prevent form submit
        event.preventDefault();
        this.props.onFormSubmitAdd(this.state.form)
    };

    isEmpty(obj) {
        return Object.entries(obj).length === 0 && obj.constructor === Object;
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props && !this.isEmpty(this.props.attendance)) {
            this.setState({
                form: { ...this.props.attendance, isEdit: true },
                btnName: "Update",
                btnClass: "ui orange button submit-button",
                isOpenEditModalAttendance: true
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
        this.closeModalAddModalAttendance();
        this.closeModalEditModalAttendance();
        //prevent form submit
        event.preventDefault();
        //form validation
        if (this.formValidation()) {
            //console.log("ready to create");
            //send form data to app.js
            this.props.onFormSubmit(this.state.form)
        }
    };

    formValidation = () => {
        return true;
    }

    clearFofrmFields = () => {
        this.setState({
            form: { first_name: '', last_name: '', email: '', isEdit: false }
        });

    }

    getCurrentCity = async (data) => {
        const responses = await axios.get(`${this.state.urlIpInfo}`);
        var cityValue = JSON.stringify(responses.data.city).replace(/['"]+/g, '');
        console.log("val: " + cityValue)

        this.setState({ real_location: cityValue });
        localStorage.setItem('localStorageRealLocation', cityValue);
    }

    render() {
        const { id, real_location, site_location, type, remarks, created_at } = this.props.attendance;


        return (
            <>
                <Container>
                    <div className="d-grid mt-3 mb-5">
                        <a href="#"
                            className="btn  btn-primary"
                            onClick={() => {
                                this.openModalAddModalAttendance();
                                this.getCurrentCity();
                            }}
                        >Add Attendance</a>
                    </div>
                </Container>

                {/* Add Employee Modal */}
                <Modal
                    show={this.state.isOpenAddModalAttendance}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Body>
                        <Container fluid className="text-center">
                            <form>

                                {/* Timestamp and Detected Location */}
                                <Row>
                                    <Col xs={12} md={{ span: 12 }} className="mt-1">
                                        <h1>
                                            <Clock className='text-center' format={'MM/DD/YYYY h:mm:ss A'} ticking={true} timezone={'Asia/Singapore'} />
                                        </h1>
                                        <h5>
                                            {"Detected Location: " + this.state.real_location}
                                        </h5>
                                    </Col>
                                </Row>

                                {/* Site Location */}
                                <Row>
                                    <Col xs={12} md={{ span: 12 }} className="mt-1">
                                        <select
                                            className="form-control form-select text-center"
                                            name="site_location"
                                            onChange={this.handleChange}
                                            value={this.state.form.site_location}
                                        >
                                            <option
                                                value=""
                                                selected
                                                disabled>
                                                Site Location
                                            </option>
                                            <option
                                                value="Office: Quezon City">
                                                Office: Quezon City
                                            </option>
                                            <option
                                                value="Office: Valenzuela City">
                                                Office: Valenzuela City
                                            </option>
                                            <option
                                                value="NTS Molino Bacoor, Cavite">
                                                NTS Molino Bacoor, Cavite
                                            </option>
                                            <option
                                                value="NTI Alaminos 2, Pangasinan">
                                                NTI Alaminos 2, Pangasinan
                                            </option>
                                            <option
                                                value="NTS Brookside General Trias, Cavite">
                                                NTS Brookside General Trias, Cavite
                                            </option>
                                            <option
                                                value="NTI Shell Mahogany, Cavite">
                                                NTI Shell Mahogany, Cavite
                                            </option>
                                            <option
                                                value="NTS Melendrez, Rizal">
                                                NTS Melendrez, Rizal
                                            </option>
                                            <option
                                                value="NTI Shell Magalang Angeles, Pampanga">
                                                NTI Shell Magalang Angeles, Pampanga
                                            </option>
                                            <option
                                                value="KDR GMA Edsa, Quezon City">
                                                KDR GMA Edsa, Quezon City
                                            </option>
                                            <option
                                                value="NTI Acienda Silang, Cavite">
                                                NTI Acienda Silang, Cavite
                                            </option>
                                            <option
                                                value="CNG SLT 2 Binan, Laguna">
                                                CNG SLT 2 Binan, Laguna
                                            </option>
                                            <option
                                                value="NFR Pusok, Cebu">
                                                NFR Pusok, Cebu
                                            </option>
                                            <option
                                                value="NTI Levi Mariano, Taguig">
                                                NTI Levi Mariano, Taguig
                                            </option>
                                        </select>
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

                                {/* Remarks */}
                                <Row>
                                    <Col xs={12} md={{ span: 12 }} className="mt-1">
                                        <InputGroup>
                                            <InputGroup.Text>Remarks</InputGroup.Text>
                                            <Form.Control
                                                as="textarea"
                                                name="remarks"
                                                onChange={this.handleChange}
                                                value={this.state.form.remarks}
                                            />
                                        </InputGroup>
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
                                            <button className="btn btn-danger" onClick={this.closeModalAddModalAttendance}>
                                                Close
                                            </button>
                                        </div>
                                    </Col>
                                </Row>
                            </form>
                        </Container>
                    </Modal.Body>
                </Modal>



                {/* Edit Attendance Modal */}
                <Modal show={this.state.isOpenEditModalAttendance}>
                    <Modal.Body>
                        <Container fluid className="text-center">
                            <form>
                                <Row>
                                    <Col xs={12} md={{ span: 12 }} className="mt-1 mb-2">
                                        <label className="label">
                                            <h4>Update Attendance Record</h4>
                                        </label>
                                    </Col>
                                </Row>

                                {/* Timestamp*/}
                                <Row>
                                    <Col xs={12} md={{ span: 12 }} className="mt-1">
                                        <InputGroup>
                                            <Form.Control
                                                className="text-center"
                                                name="created_at"
                                                onChange={this.handleChange}
                                                value={new Date(this.state.form.created_at).toLocaleString()}
                                                placeholder="Timestamp"
                                            />
                                        </InputGroup>
                                    </Col>
                                </Row>

                                {/* Detected Location */}
                                <Row>
                                    <Col xs={12} md={{ span: 12 }} className="mt-1">
                                        <InputGroup>
                                            <Form.Control
                                                className="text-center"
                                                name="real_location"
                                                onChange={this.handleChange}
                                                value={this.state.form.real_location}
                                                placeholder="Detected Location"
                                            />
                                        </InputGroup>
                                    </Col>
                                </Row>

                                {/* Site Location */}
                                <Row>
                                    <Col xs={12} md={{ span: 12 }} className="mt-1">
                                        <select
                                            className="form-control form-select text-center"
                                            name="site_location"
                                            onChange={this.handleChange}
                                            value={this.state.form.site_location}
                                        >
                                            <option
                                                value=""
                                                selected
                                                disabled>
                                                Site Location
                                            </option>
                                            <option
                                                value="Office: Quezon City">
                                                Office: Quezon City
                                            </option>
                                            <option
                                                value="Office: Valenzuela City">
                                                Office: Valenzuela City
                                            </option>
                                            <option
                                                value="NTS Molino Bacoor, Cavite">
                                                NTS Molino Bacoor, Cavite
                                            </option>
                                            <option
                                                value="NTI Alaminos 2, Pangasinan">
                                                NTI Alaminos 2, Pangasinan
                                            </option>
                                            <option
                                                value="NTS Brookside General Trias, Cavite">
                                                NTS Brookside General Trias, Cavite
                                            </option>
                                            <option
                                                value="NTI Shell Mahogany, Cavite">
                                                NTI Shell Mahogany, Cavite
                                            </option>
                                            <option
                                                value="NTS Melendrez, Rizal">
                                                NTS Melendrez, Rizal
                                            </option>
                                            <option
                                                value="NTI Shell Magalang Angeles, Pampanga">
                                                NTI Shell Magalang Angeles, Pampanga
                                            </option>
                                            <option
                                                value="KDR GMA Edsa, Quezon City">
                                                KDR GMA Edsa, Quezon City
                                            </option>
                                            <option
                                                value="NTI Acienda Silang, Cavite">
                                                NTI Acienda Silang, Cavite
                                            </option>
                                            <option
                                                value="CNG SLT 2 Binan, Laguna">
                                                CNG SLT 2 Binan, Laguna
                                            </option>
                                            <option
                                                value="NFR Pusok, Cebu">
                                                NFR Pusok, Cebu
                                            </option>
                                            <option
                                                value="NTI Levi Mariano, Taguig">
                                                NTI Levi Mariano, Taguig
                                            </option>
                                        </select>
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

                                {/* Remarks */}
                                <Row>
                                    <Col xs={12} md={{ span: 12 }} className="mt-1">
                                        <InputGroup>
                                            <Form.Control
                                                className="text-center"
                                                name="remarks"
                                                onChange={this.handleChange}
                                                value={this.state.form.remarks}
                                                placeholder="Remarks"
                                            />
                                        </InputGroup>
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
                                            <button className="btn btn-danger" onClick={this.closeModalEditModalAttendance}>
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

export default MyAttendanceForm;