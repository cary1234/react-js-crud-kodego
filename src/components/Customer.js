import React, { Component } from "react";
import { Container, Table, Row, Col, Modal, Button, Form, InputGroup, FloatingLabel } from 'react-bootstrap';
class Customer extends Component {
    state = {
        isOpenDeleteModalCustomer: false,
    };

    openModalDeleteModalCustomer = () => this.setState({ isOpenDeleteModalCustomer: true });
    closeModalDeleteModalCustomer = () => this.setState({ isOpenDeleteModalCustomer: false });

    openModalEditModalCustomer = () => this.setState({ isOpenEditModalCustomer: true });
    closeModalEditModalCustomer = () => this.setState({ isOpenEditModalCustomer: false });

    //Note: This onDelete is linked to CustomerList.js
    onDeleteCustomer = () => {
        //console.log('customer on delete');
        this.props.onDeleteCustomer(this.props.customer.id);
    }
    onEditCustomer = () => {
        //console.log('customer on edit' + this.props.customer);
        this.props.onEditCustomer(this.props.customer);
    }

    render() {
        const { id, employee_id, first_name, last_name, email, password, privilege, status } = this.props.customer;
        return (
            <>

                {
                    //if super admin
                    (localStorage.getItem('localStorageUserPrivilege') == 'Admin' && `${privilege}` == 'Super Admin') ?
                        //then
                        (
                            //console.log("HEY: " + privilege)
                            <>
                            </>
                        )
                        :
                        //Admin
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
                                                    (<em className="text-danger">Not Assigned</em>)
                                    }
                                </td>
                                <td>
                                    {status}
                                </td>

                                {/* Account Types */}
                                {
                                    //if super admin
                                    (localStorage.getItem('localStorageUserPrivilege') == 'Super Admin') ?
                                        //then
                                        (
                                            <>
                                                <td>
                                                    <button className="btn btn-primary" onClick={() => this.onEditCustomer()}>
                                                        Update
                                                    </button>
                                                </td>
                                                <td>
                                                    <button className="btn btn-danger" onClick={this.openModalDeleteModalCustomer}>
                                                        Delete
                                                    </button>
                                                </td>
                                            </>
                                        )

                                        :
                                        //else if admin
                                        (localStorage.getItem('localStorageUserPrivilege') == 'Admin') ?
                                            //then
                                            <>
                                                <td>
                                                    <button className="btn btn-primary" onClick={() => this.onEditCustomer()}>
                                                        Update
                                                    </button>
                                                </td>
                                            </>
                                            :
                                            (localStorage.getItem('localStorageUserPrivilege') == 'Regular') ?
                                                //else regular employee
                                                console.log("Employee")
                                                :
                                                //else error
                                                console.log("Not Assigned Privilege")
                                }
                            </tr>
                        </>
                }




                {/* Delete Employee Modal */}
                <Modal
                    show={this.state.isOpenDeleteModalCustomer}
                >

                    <Modal.Body>
                        <Container fluid>
                            <form>
                                <Row>
                                    <Col xs={6} md={{ span: 12 }} className="mt-1 mb-1 text-center">
                                        <label className="label">
                                            <h5> Are you sure you want to permanently delete the employee record?</h5>
                                        </label>
                                    </Col>
                                </Row>


                                {/* Delete Rows Employee ID, Name, Email, Privilege, Account Status */}
                                <Row>
                                    <Col xs={12} md={{ span: 12 }} className="mt-1">

                                        <FloatingLabel
                                            label="Employee ID"
                                            className="mb-1"
                                        >
                                            <Form.Control
                                                type="text"
                                                value={employee_id}
                                                disabled
                                                className='text-center'
                                            />
                                        </FloatingLabel>

                                        <FloatingLabel
                                            label="First Name"
                                            className="mb-1"
                                        >
                                            <Form.Control
                                                type="text"
                                                value={first_name}
                                                disabled
                                                className='text-center'
                                            />
                                        </FloatingLabel>

                                        <FloatingLabel
                                            label="Last Name"
                                            className="mb-1"
                                        >
                                            <Form.Control
                                                type="text"
                                                value={last_name}
                                                disabled
                                                className='text-center'
                                            />
                                        </FloatingLabel>

                                        <FloatingLabel
                                            label="Email"
                                            className="mb-1"
                                        >
                                            <Form.Control
                                                type="text"
                                                value={email}
                                                disabled
                                                className='text-center'
                                            />
                                        </FloatingLabel>

                                        <FloatingLabel
                                            label="Privilege"
                                            className="mb-1"
                                        >
                                            <Form.Control
                                                type="text"
                                                value={privilege}
                                                disabled
                                                className='text-center'
                                            />
                                        </FloatingLabel>

                                        <FloatingLabel
                                            label="Account Status"
                                            className="mb-1"
                                        >
                                            <Form.Control
                                                type="text"
                                                value={status}
                                                disabled
                                                className='text-center'
                                            />
                                        </FloatingLabel>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col xs={6} md={{ span: 6 }} >
                                        <div className="d-grid mt-1">
                                            <button className="btn btn-danger" onClick={() => this.onDeleteCustomer()}>
                                                Yes
                                            </button>
                                        </div>
                                    </Col>
                                    <Col xs={6} md={{ span: 6 }}>
                                        <div className="d-grid mt-1">
                                            <button className="btn btn-primary" onClick={this.closeModalDeleteModalCustomer}>
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