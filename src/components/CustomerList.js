import React, { Component } from "react";
import Customer from "./Customer";
import { Container, Table, Col } from 'react-bootstrap';


import PaginationAttendance from './PaginationAttendance'


class CustomerList extends Component {

    onDeleteCustomer = id => {
        console.log('customer list ', id);
        this.props.onDeleteAttendance(id);
    }
    onEditCustomer = data => {
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
                                    <th>Account Status</th>
                                    {
                                        //if super admin
                                        (localStorage.getItem('localStorageUserPrivilege') === 'Super Admin') ?
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
                                                onDeleteCustomer={this.onDeleteCustomer}
                                                onEditCustomer={this.onEditCustomer}
                                            />
                                        )
                                    })}

                            </tbody>
                        </Table>
                    </Col>
                    <PaginationAttendance />
                </Container>
            </>
        );
    }
}

export default CustomerList;