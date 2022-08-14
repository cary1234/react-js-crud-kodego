import React, { Component } from "react";
import Customer from "./Customer";
import { Container, Table, Row, Col, Modal, Button } from 'react-bootstrap';


class CustomerList extends Component {

    onDelete = id => {
        console.log('customer list ', id);
        this.props.onDeleteAttendance(id);
    }
    onEdit = data => {
        console.log('customer list ', data);
        this.props.onEditAttendance(data);
    }
    render() {
        const customers = this.props.customers;
        return (
            <>
                <Container className="text-center">
                    <Col xs={12} md={12}>
                        <Table striped bordered hover responsive="sm">
                            <thead>
                                <tr>
                                    <th>Employee ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Privilege</th>
                                    {
                                        //if super admin
                                        (localStorage.getItem('localStorageUserPrivilege') == 'Super Admin') ?
                                            //then
                                            (
                                                <>

                                                    <th colSpan={2}>Actions</th>
                                                </>
                                            )
                                            :
                                            //else regular employee
                                            console.log("Employee")
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    customers.map((customer) => {
                                        return (
                                            <Customer
                                                customer={customer}
                                                key={customer.id}
                                                onDelete={this.onDelete}
                                                onEdit={this.onEdit}
                                            />
                                        )
                                    })}

                            </tbody>
                        </Table>
                    </Col>
                </Container>

            </>
        );
    }
}

export default CustomerList;