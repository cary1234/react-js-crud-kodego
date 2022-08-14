import React, { Component } from "react";
import { Container, Table, Row, Col, Modal, Button } from 'react-bootstrap';
class Customer extends Component {
    state = {
        isOpenDeleteModal: false
    };

    openModalDeleteModal = () => this.setState({ isOpenDeleteModal: true });
    closeModalDeleteModal = () => this.setState({ isOpenDeleteModal: false });

    //Note: This onDelete is linked to CustomerList.js
    onDelete = () => {
        console.log('customer on delete');
        this.props.onDelete(this.props.customer.id);
    }
    onEdit = () => {
        console.log('customer on edit');
        this.props.onEdit(this.props.customer);
    }

    render() {
        const { id, employee_id, first_name, last_name, email, password, privilege } = this.props.customer;
        return (
            <>
                <tr>
                    <td>
                        {`${employee_id}`}
                    </td>
                    <td>
                        {`${first_name + " "}${last_name}`}
                    </td>
                    <td>
                        {email}
                    </td>
                    <td>
                        {
                            (`${privilege}` === 'Super Admin') ?
                                ("Super Admin") :
                                (`${privilege}` === 'Admin') ?
                                    ("Admin") :
                                    (`${privilege}` === 'Regular') ?
                                        ("Regular") :
                                        ("Error")
                        }
                    </td>
                    {
                        //if super admin
                        (localStorage.getItem('localStorageUserPrivilege') == 'Super Admin') ?
                            //then
                            (
                                <>
                                    <td>
                                        <button className="btn btn-primary" onClick={() => this.onEdit()}>
                                            Update
                                        </button>
                                    </td>
                                    <td>
                                        <button className="btn btn-danger" onClick={this.openModalDeleteModal}>
                                            Delete
                                        </button>
                                    </td>
                                </>
                            )

                            :
                            //else if admin
                            (localStorage.getItem('localStorageUserPrivilege') == 'Admin') ?
                                //then
                                console.log("Admin")
                                :
                                (localStorage.getItem('localStorageUserPrivilege') == 'Regular') ?
                                    //else regular employee
                                    console.log("Employee")
                                    :
                                    //else error
                                    console.log("Error")
                    }
                </tr>


                {/* Delete Employee Modal */}
                <Modal
                    show={this.state.isOpenDeleteModal}
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
                                            <h4> Are you sure you want to permanently delete the employee?</h4>
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
                                            name="first_name"
                                            value={first_name}
                                            disabled
                                        />
                                    </Col>
                                </Row>

                                <Row>
                                    <Col xs={6} md={{ span: 3, offset: 2 }} className="mt-1">
                                        <label className="label">
                                            Last Name:
                                        </label>
                                    </Col>
                                    <Col xs={6} md={{ span: 4 }} className="mt-1">
                                        <input
                                            className="input text-center"
                                            type="text"
                                            name="last_name"
                                            value={last_name}
                                            disabled
                                        />
                                    </Col>
                                </Row>

                                <Row>
                                    <Col xs={6} md={{ span: 3, offset: 2 }} className="mt-1">
                                        <label className="label">
                                            Email:
                                        </label>
                                    </Col>
                                    <Col xs={6} md={{ span: 4 }} className="mt-1">
                                        <input
                                            className="input text-center"
                                            type="text"
                                            name="email"
                                            value={email}
                                            disabled
                                        />
                                    </Col>
                                </Row>

                                <Row>
                                    <Col xs={6} md={{ span: 3, offset: 2 }} className="mt-1">
                                        <label className="label">
                                            Privilege:
                                        </label>
                                    </Col>
                                    <Col xs={6} md={{ span: 4 }} className="mt-1">
                                        <input
                                            className="input text-center"
                                            type="text"
                                            name="privilege"
                                            value={last_name}
                                            disabled
                                        />
                                    </Col>
                                </Row>

                                <Row>
                                    <Col xs={6} md={{ span: 3, offset: 3 }} className="mt-1">
                                        <div className="d-grid mt-3">
                                            <button className="btn btn-danger" onClick={() => this.onDelete()}>
                                                Yes
                                            </button>
                                        </div>
                                    </Col>
                                    <Col xs={6} md={{ span: 3 }} className="mt-1">
                                        <div className="d-grid mt-3">
                                            <button className="btn btn-primary" onClick={this.closeModalDeleteModal}>
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

export default Customer;