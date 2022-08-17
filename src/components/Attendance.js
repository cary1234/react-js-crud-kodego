import React, { Component } from "react";
import { Container, Row, Col, Modal, FloatingLabel, Form } from 'react-bootstrap';

class Attendance extends Component {
    constructor(props) {
        super(props)
        this.state = {
            timeCounter: 0,
            isOpenDeleteModalAttendance: false,
            dateIn: "",
            dateOut: "",
            datesIn: [],
            datesOut: []
        }
    }


    openModalDeleteModalAttendance = () => this.setState({ isOpenDeleteModalAttendance: true });
    closeModalDeleteModalAttendance = () => this.setState({ isOpenDeleteModalAttendance: false });

    openModalEditModalAttendance = () => this.setState({ isOpenEditModalAttendance: true });
    closeModalEditModalAttendance = () => this.setState({ isOpenEditModalAttendance: false });

    //Note: This onDelete is linked to CustomerList.js
    onDeleteAttendance = () => {
        console.log('attendance on delete');
        this.props.onDeleteAttendance(this.props.attendance.id);
    }

    onEditAttendance = () => {
        console.log('attendance on edit: ' + this.props.attendance);
        this.props.onEditAttendance(this.props.attendance);
    }

    // Jabez Paste near onEditAttendance Attendance.js
    onSelectAttendance = () => {
        this.props.onSelectAttendance(this.props.attendance);
    }



    render() {
        const { id, employee_id_pk, real_location, site_location, type, remarks, created_at } = this.props.attendance;

        return (
            <>
                <tr>
                    <td
                        className="align-middle"
                        onClick={this.onSelectAttendance}
                    >
                        {
                            new Date(created_at).toLocaleString()
                        }
                    </td>
                    <td>
                        {real_location}
                    </td>
                    <td>
                        {site_location}
                    </td>
                    <td>
                        {type}
                    </td>
                    <td>
                        {remarks}
                    </td>
                    <td>
                        <button className="btn btn-primary" onClick={() => this.onEditAttendance()}>
                            Update
                        </button>
                    </td>
                    <td>
                        <button className="btn btn-danger" onClick={this.openModalDeleteModalAttendance}>
                            Delete
                        </button>
                    </td>
                </tr>

                {/* Delete Attendance Modal */}
                <Modal
                    show={this.state.isOpenDeleteModalAttendance}
                    backdrop="static"
                    keyboard={false}
                    animation={false}
                    centered
                >
                    <Modal.Body>
                        <Container fluid className="">
                            <form>
                                <Row>
                                    <Col xs={6} md={{ span: 12 }} className="mt-1 mb-2">
                                        <label className="label text-center">
                                            <h5> Are you sure you want to permanently delete this record?</h5>
                                        </label>
                                    </Col>
                                </Row>

                                {/* Timestamp */}
                                <Row>
                                    <Col xs={12} md={{ span: 12 }} className="mt-1">
                                        <FloatingLabel
                                            label="Timestamp"
                                        >
                                            <Form.Control
                                                type="text"
                                                className="mb-1 text-center"
                                                name="created_at"
                                                value={new Date(created_at).toLocaleString()}
                                                disabled
                                            />
                                        </FloatingLabel>
                                    </Col>
                                </Row>

                                {/* Detected Location */}
                                <Row>
                                    <Col xs={12} md={{ span: 12 }} className="mt-1">
                                        <FloatingLabel
                                            label="Detected Location"
                                        >
                                            <Form.Control
                                                type="text"
                                                className="mb-1 text-center"
                                                name="real_location"
                                                value={real_location}
                                                disabled
                                            />
                                        </FloatingLabel>
                                    </Col>
                                </Row>

                                {/* Site Location */}
                                <Row>
                                    <Col xs={12} md={{ span: 12 }} className="mt-1">
                                        <FloatingLabel
                                            label="Site Location"
                                        >
                                            <Form.Control
                                                type="text"
                                                className="mb-1 text-center"
                                                name="site_location"
                                                value={site_location}
                                                disabled
                                            />
                                        </FloatingLabel>
                                    </Col>
                                </Row>

                                {/* Attendance Type */}
                                <Row>
                                    <Col xs={12} md={{ span: 12 }} className="mt-1">
                                        <FloatingLabel
                                            label="Attendance Type"
                                        >
                                            <Form.Control
                                                type="text"
                                                className="mb-1 text-center"
                                                name="type"
                                                value={type}
                                                disabled
                                            />
                                        </FloatingLabel>
                                    </Col>
                                </Row>

                                {/* Remarks */}
                                <Row>
                                    <Col xs={12} md={{ span: 12 }} className="mt-1">
                                        <FloatingLabel
                                            label="Remarks"
                                        >
                                            <Form.Control
                                                type="text"
                                                className="mb-1 text-center"
                                                name="remarks"
                                                value={remarks}
                                                disabled
                                            />
                                        </FloatingLabel>
                                    </Col>
                                </Row>

                                {/* Buttons */}
                                <Row>
                                    <Col xs={6} md={{ span: 6 }} className="mt-1">
                                        <div className="d-grid mt-3">
                                            <button className="btn btn-danger" onClick={() => this.onDeleteAttendance()}>
                                                Yes
                                            </button>
                                        </div>
                                    </Col>
                                    <Col xs={6} md={{ span: 6 }} className="mt-1">
                                        <div className="d-grid mt-3">
                                            <button className="btn btn-primary" onClick={this.closeModalDeleteModalAttendance}>
                                                No
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

export default Attendance;






