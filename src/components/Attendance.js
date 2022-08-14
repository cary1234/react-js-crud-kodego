import React, { Component } from "react";
import { Container, Row, Col, Modal } from 'react-bootstrap';

class Attendance extends Component {
    state = {
        isOpenDeleteModalAttendance: false,
    };

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

    render() {
        const { id, employee_id_pk, real_location, site_location, type, remarks, created_at } = this.props.attendance;

        return (
            <>
                <tr>
                    <td>
                        {new Date(created_at).toLocaleString()}
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
                        <Container fluid className="text-center">
                            <form>
                                <Row>
                                    <Col xs={6} md={{ span: 12 }} className="mt-1 mb-2">
                                        <label className="label">
                                            <h4> Are you sure you want to permanently delete this record?</h4>
                                        </label>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col xs={6} md={{ span: 3, offset: 2 }} className="mt-1">
                                        <label className="label">First Name: </label>
                                    </Col>
                                    <Col xs={6} md={{ span: 4 }} className="mt-1">
                                        <input
                                            className="input text-center"
                                            type="text"
                                            name="created_at"
                                            value={new Date(created_at).toLocaleString()}
                                            disabled
                                        />
                                    </Col>
                                </Row>

                                <Row>
                                    <Col xs={6} md={{ span: 3, offset: 2 }} className="mt-1">
                                        <label className="label">
                                            Detected Location:
                                        </label>
                                    </Col>
                                    <Col xs={6} md={{ span: 4 }} className="mt-1">
                                        <input
                                            className="input text-center"
                                            type="text"
                                            name="real_location"
                                            value={real_location}
                                            disabled
                                        />
                                    </Col>
                                </Row>

                                <Row>
                                    <Col xs={6} md={{ span: 3, offset: 2 }} className="mt-1">
                                        <label className="label">
                                            Site Location:
                                        </label>
                                    </Col>
                                    <Col xs={6} md={{ span: 4 }} className="mt-1">
                                        <input
                                            className="input text-center"
                                            type="text"
                                            name="site_location"
                                            value={site_location}
                                            disabled
                                        />
                                    </Col>
                                </Row>

                                <Row>
                                    <Col xs={6} md={{ span: 3, offset: 3 }} className="mt-1">
                                        <div className="d-grid mt-3">
                                            <button className="btn btn-danger" onClick={() => this.onDeleteAttendance()}>
                                                Yes
                                            </button>
                                        </div>
                                    </Col>
                                    <Col xs={6} md={{ span: 3 }} className="mt-1">
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






