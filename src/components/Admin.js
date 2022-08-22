// npm install axios --save

import React, { Component } from "react";
import { Container, Table, Row, Col, Modal, Button } from 'react-bootstrap';
import axios from "axios";
import MyForm from "./MyForm"
import CustomerList from "./CustomerList";
import Loader from "./Loader";


class Admin extends Component {
    state = {
        customers: [],
        customer: {},
        loader: false,
        urlCustomers: window.urlBase + "api/customers",
        isOpen: false
    };

    componentDidMount() {
        this.getCustomers();
        console.log("component did mount: " + this.getCustomers());
    }

    getCustomers = async () => {
        try {
            this.setState({ loader: true });
            const customers = await axios.get(this.state.urlCustomers);
            this.setState({ customers: customers.data, loader: false });
        }
        catch (e) {
            console.log(e);
        }
    };

    deleteCustomer = async (id) => {
        this.setState({ loader: true });
        await axios.delete(`${this.state.urlCustomers}/${id}`);
        this.getCustomers();
    }

    //Note: onDelete command connection
    onDeleteCustomer = id => {
        //console.log('app ', id);
        this.deleteCustomer(id);
    };

    editCustomer = async (data) => {
        //clear customer obj
        this.setState({ customer: {}, loader: true })
        await axios.put(`${this.state.urlCustomers}/${data.id}`, {
            employee_id: data.employee_id,
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            password: data.password,
            privilege: data.privilege,
            status: data.status
        });
        this.getCustomers();
    };

    onEditCustomer = data => {
        //console.log('app ', data);
        this.setState({ customer: data });
    };

    createCustomer = async (data) => {
        this.setState({ loader: true });
        await axios.post(this.state.urlCustomers, {
            employee_id: data.employee_id,
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            password: data.password,
            privilege: data.privilege,
            status: 'Active',
        });
        this.getCustomers();
    }

    onFormSubmitCustomer = (data) => {
        // console.log('app', data);
        if (data.isEdit) {
            //if the edit is true
            this.editCustomer(data);
        } else {
            //if the edit is false
            this.createCustomer(data);
        }
    };

    onAddEmployee = (data) => {
        this.createCustomer(data);
    }

    render() {
        return (
            <>
                <MyForm customer={this.state.customer} onFormSubmitCustomer={this.onFormSubmitCustomer} />
                {
                    this.state.loader ? <Loader /> : ""
                }
                <CustomerList
                    customers={this.state.customers}
                    onDeleteAttendance={this.onDeleteCustomer}
                    onEditAttendance={this.onEditCustomer}
                />


            </>
        );
    }
}


export default Admin;