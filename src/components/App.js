// import '../../node_modules/bootstrap/dist/js/bootstrap.bundle.js';
// import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { React, Component } from "react";
import axios from "axios";
import { Container, Row, Col, Button, Form, Modal } from 'react-bootstrap';

import Login from './Login'
import Attendance from './Attendance'
import Header from './Header'
import Admin from './Admin'
import Underconstruction from './Underconstruction'
import Footer from './Footer'
import MyAttendanceForm from './MyAttendanceForm'
import AttendanceList from './AttendanceList'
import Loader from "./Loader";
import PaginationAttendance from './PaginationAttendance'













// testing code

import Sidebar from './Sidebar';
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarFooter,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
} from 'cdbreact';
<Sidebar />
// end of testing code

class App extends Component {

    state = {
        attendances: [],
        attendance: {},
        logins: [],
        login: {},
        urlAttendances: "http://127.0.0.1/kodego_attendance_system/laravel-rest-api/public/api/attendances",
        urlAttendancesEmployee: "http://127.0.0.1:8000/api/search?search=" + localStorage.getItem('localStorageUserID'),
        urlLogin: "http://127.0.0.1:8000/api/login",
        isOpenLogin: false,
        isLoginValid: false
    };

    componentDidUpdate() {
        <button className="btn btn-primary" onClick={this.openModalLoginModal}>
            Done
        </button>
    }

    componentDidMount() {
        this.getAttendances();
        console.log(window.location.href)
    }

    //Attendance
    getAttendances = async () => {
        this.setState({ loader: true });
        const attendances = await axios.get(this.state.urlAttendancesEmployee);
        this.setState({ attendances: attendances.data, loader: false });
    };

    //Note: onDelete command connection
    onDeleteAttendance = id => {
        console.log('app ', id);
        this.deleteAttendance(id);
    };

    onEditAttendance = data => {
        console.log('app ', data);
        this.setState({ attendance: data });
    };

    deleteAttendance = async (id) => {
        this.setState({ loader: true });
        await axios.delete(`${this.state.urlAttendances}/${id}`);
        this.getAttendances();
    }

    editAttendance = async (data) => {
        //clear customer obj
        this.setState({ attendance: {}, loader: true })
        await axios.put(`${this.state.urlAttendances}/${data.id}`, {
            employee_id_pk: data.employee_id_pk,
            real_location: data.real_location,
            site_location: data.site_location,
            type: data.type,
            remarks: data.remarks
        });

        this.getAttendances();
    };

    createAttendance = async (data) => {
        this.setState({ loader: true });
        await axios.post(this.state.urlAttendances, {
            employee_id_pk: localStorage.getItem('localStorageUserID'),
            real_location: localStorage.getItem('localStorageRealLocation'),
            site_location: data.site_location,
            type: data.type,
            remarks: data.remarks
        });
        this.getAttendances();
    }

    onFormSubmitAdd = (data) => {
        // console.log('app', data);
        if (data.isEdit) {
            //if the edit is true
            this.editAttendance(data);
        } else {
            //if the edit is false
            this.createAttendance(data);
        }
    };

    onFormSubmitEdit = (data) => {
        this.editAttendance(data);
    };

    onAddAttendance = (data) => {
        this.createAttendance(data);
    }

    onFormLogin = async (data) => {
        this.setState({ loader: true });
        //console.log('url login: ' + `${this.state.urlLogin}?email=${data.email}&password=${data.password}`)
        const logins = await axios.get(`${this.state.urlLogin}?email=${data.email}&password=${data.password}`);
        this.setState({ logins: logins.data, loader: false });

        if (logins.data.length > 0) {
            //console.log("Valid Login");
            this.setState({ isLoginValid: true });
            localStorage.setItem('localStorageIsLoginValid', true);

            //Get the is_admin value of the logged user
            const obj = JSON.stringify(logins.data);
            var stringify = JSON.parse(obj);


            console.log("Data: " + obj)
            console.log("Stringify: " + stringify)

            for (var i = 0; i < stringify.length; i++) {
                var isUserAdmin = stringify[i]['privilege'];
                var userID = parseInt(stringify[i]['id']);
                var userFirstName = stringify[i]['first_name'];
                var userLastName = stringify[i]['last_name'];

                localStorage.setItem('localStorageUserPrivilege', isUserAdmin);
                localStorage.setItem('localStorageUserID', userID);
                localStorage.setItem('localStorageUserFirstName', userFirstName);
                localStorage.setItem('localStorageUserLastName', userLastName);
                console.log("Stringify Val: " + stringify[i])
            }
            window.location.replace("/attendance")


        } else {
            console.log("Invalid Login")
            this.setState({ isLoginValid: false });
            this.setState({ isOpenLogin: true });
            localStorage.setItem('localStorageIsLoginValid', false);
        }
    };


    openModalLoginModal = () => this.setState({ isOpenLogin: true });
    closeModalLoginModal = () => this.setState({ isOpenLogin: false });

    renderElement() {
        if (this.state.loader == true) {
            return (
                <>
                    <Loader />
                </>
            );
        } else {
            if (localStorage.getItem('localStorageIsLoginValid') == true) {
                //valid login
                //console.log("Valid login");
                window.location.replace("/attendance")
                return (
                    <>

                    </>
                );
            } else {
                //invalid login
                //console.log("Invalid login");
                return (
                    <>
                        < Router >
                            <Routes>
                                <Route
                                    exact path="/"
                                    element={
                                        <Login
                                            login={this.state.login}
                                            onFormLogin={this.onFormLogin}
                                        />}
                                />

                                <Route
                                    exact path="/attendance"
                                    element={
                                        <>
                                            <Header />
                                            <MyAttendanceForm
                                                attendance={this.state.attendance}
                                                onFormSubmit={this.onFormSubmitAdd}
                                            />
                                            <AttendanceList
                                                attendances={this.state.attendances}
                                                onDeleteAttendance={this.onDeleteAttendance}
                                                onEditAttendance={this.onEditAttendance}
                                            />
                                            <PaginationAttendance />
                                        </>}
                                />


                                <Route
                                    exact path="/admin"
                                    element={
                                        <>
                                            <Header />
                                            <Admin />
                                            <PaginationAttendance />
                                        </>}
                                />

                                <Route
                                    exact path="/superadmin"
                                    element={
                                        <>
                                            <Header />
                                            <Admin />
                                            <PaginationAttendance />
                                        </>}
                                />
                                {
                                    console.log("url: " + window.location.href)
                                }
                                <Route
                                    exact path="/*"
                                    element={
                                        <>
                                            <Header />
                                            <Underconstruction />
                                        </>} />



                            </Routes>
                        </Router >
                        <Footer />
                    </>
                );
            }
        }
    }

    render() {
        return (
            <>
                {this.renderElement()}

                <Modal
                    show={this.state.isOpenLogin}
                    backdrop="static"
                    keyboard={false}
                    animation={false}
                >

                    {/* modal for wrong login */}
                    <Modal.Body>
                        <Container fluid className="text-center">
                            <Row>
                                <Col xs={12} md={{ span: 12 }} className="mt-1 mb-2">
                                    <label className="label">
                                        You have entered an invalid <b>company</b> email or password
                                    </label>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={6} md={{ span: 6 }} className="mt-1 mb-2">
                                    <div className="d-grid mt-3">
                                        <button onClick={() => window.location = 'mailto:support@spediph.com'} className="btn btn-primary"
                                            role="button">
                                            Email Support
                                        </button>
                                    </div>
                                </Col>
                                <Col xs={6} md={{ span: 6 }} className="mt-1 mb-2">
                                    <div className="d-grid mt-3">
                                        <button className="btn btn-danger" onClick={this.closeModalLoginModal}>
                                            Close
                                        </button>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </Modal.Body>
                </Modal>


                {/* testing code */}
                {/* <Sidebar /> */}
                {/* end of testing code */}
            </>
        )
    }
}

export default App;