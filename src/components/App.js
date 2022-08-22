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

window.urlBase = "http://127.0.0.1:8000/"

class App extends Component {

    // states including the url for get, update, delete, search using axios
    state = {
        attendances: [],
        attendance: {},
        logins: [],
        login: {},
        urlAttendances: window.urlBase + "api/attendances",
        urlAttendancesEmployee: window.urlBase + "api/search?search=" + localStorage.getItem('localStorageUserID'),
        urlLogin: window.urlBase + "api/login",
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
        console.log("URL: " + window.location.href)
    }

    //Attendance
    getAttendances = async () => {
        this.setState({ loader: true });

        const attendances = await axios.get(this.state.urlAttendancesEmployee);
        console.log("Get Attendanace URL: " + this.state.urlAttendancesEmployee)
        this.setState({ attendances: attendances.data, loader: false });
        console.log("attendances data: " + JSON.stringify(attendances.data));
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

    // Jabez Paste near onEditAttendance App.js
    onSelectAttendance = (data) => {
        console.log("OnSelectAttendance Data: " + JSON.stringify(data))
        let attendanceDate = new Date(data.created_at);
        this.SelectAttendance(data, attendanceDate);
    };

    SelectAttendance = (data, attendanceDate) => {
        var greaterTime;
        var lesserTime;
        var differenceMilliSeconds;

        // get the clicked attendance data

        console.log("attendance: Date in App", attendanceDate.toDateString());
        console.log("attendance: Time in App", attendanceDate.toTimeString());

        // reset to 0
        this.setState({
            hours: 0,
            idx: "hey hey",
        });
        this.state.attendances.map((attendance) => {
            // get all attendance dates
            let allAttendanceDate = new Date(attendance.created_at);

            // Check if the clicked data has same date and has different type
            if (
                allAttendanceDate.toDateString() === attendanceDate.toDateString() &&
                attendance.type !== data.type
            ) {
                // Check what variable is greater or lesser time
                if (allAttendanceDate < attendanceDate) {
                    greaterTime = attendanceDate;
                    lesserTime = allAttendanceDate;
                } else if (attendanceDate < allAttendanceDate) {
                    greaterTime = allAttendanceDate;
                    lesserTime = attendanceDate;
                }

                differenceMilliSeconds = greaterTime - lesserTime;

                let seconds = Math.floor(differenceMilliSeconds / 1000);
                let minutes = Math.floor(seconds / 60);
                let hours = Math.floor(minutes / 60);

                seconds = seconds % 60;
                // 👇️ if seconds are greater than 30, round minutes up (optional)
                minutes = seconds >= 30 ? minutes + 1 : minutes;

                minutes = minutes % 60;

                // 👇️ If you don't want to roll hours over, e.g. 24 to 00
                // 👇️ comment (or remove) the line below
                // commenting next line gets you `24:00:00` instead of `00:00:00`
                // or `36:15:31` instead of `12:15:31`, etc.
                hours = hours % 24;


                this.setState({
                    hours: hours + " Hours " + minutes + " Minutes"// Return is HH : MM : SS
                });
                console.log(this.state.hours);
            }
        });
    }

    deleteAttendance = async (id) => {
        this.setState({ loader: true });
        await axios.delete(`${this.state.urlAttendances}/${id}`);
        this.getAttendances();
    }

    editAttendance = async (data) => {
        //clear customer obj
        this.setState({ attendance: {}, loader: true })
        await axios.put(`${this.state.urlAttendances}/${data.id}`, {
            created_at: data.created_at,
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

    onFormSubmitAttendance = (data) => {
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

            //Get the privilege value of the logged user
            const obj = JSON.stringify(logins.data);
            var stringify = JSON.parse(obj);

            console.log("Data: " + obj)
            console.log("Stringify: " + stringify)

            for (var i = 0; i < stringify.length; i++) {
                var isUserAdmin = stringify[i]['privilege'];
                var userID = parseInt(stringify[i]['id']);
                var userFirstName = stringify[i]['first_name'];
                var userLastName = stringify[i]['last_name'];
                var status = stringify[i]['status'];

                localStorage.setItem('localStorageUserPrivilege', isUserAdmin);
                localStorage.setItem('localStorageUserID', userID);
                localStorage.setItem('localStorageUserFirstName', userFirstName);
                localStorage.setItem('localStorageUserLastName', userLastName);
                console.log("Stringify Val: " + stringify[i])
            }
            if (status == "Active") {
                window.location.replace("/attendance")
            } else {
                this.setState({ isLoginValid: false });
                this.setState({ isOpenLogin: true });
            }

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
                                                onFormSubmit={this.onFormSubmitAttendance}
                                            />
                                            {/* //Jabez */}
                                            <h3 className="text-center">
                                                {
                                                    (this.state.hours == null || this.state.hours == 0) ? ""
                                                        :
                                                        "Total Time: " + (this.state.hours)
                                                }
                                            </h3>

                                            <AttendanceList
                                                attendances={this.state.attendances}
                                                onDeleteAttendance={this.onDeleteAttendance}
                                                onEditAttendance={this.onEditAttendance}
                                                //Jabez
                                                onSelectAttendance={this.onSelectAttendance}
                                                idx={this.state.idx}
                                                hours={this.state.hours}
                                            />
                                            {/* {console.log("attendance data: " + JSON.stringify(this.state.attendances))} */}
                                        </>}
                                />


                                <Route
                                    exact path="/admin"
                                    element={
                                        <>
                                            <Header />
                                            <Admin />
                                        </>}
                                />

                                <Route
                                    exact path="/superadmin"
                                    element={
                                        <>
                                            <Header />
                                            <Admin />
                                        </>}
                                />
                                {
                                    //   console.log("url: " + window.location.href)
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

                {/* modal for wrong login */}

                <Modal
                    show={this.state.isOpenLogin}
                    centered
                >

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
                                        <button onClick={() => window.location = 'tel:+18475555555'} className="btn btn-primary"
                                            role="button">
                                            Call Support
                                        </button>
                                    </div>
                                </Col>
                            </Row>

                            <Row>
                                <Col xs={12} md={{ span: 12 }} className="mt-1 mb-1">
                                    <div className="d-grid">
                                        <button className="btn btn-danger" onClick={this.closeModalLoginModal}>
                                            Try Again
                                        </button>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </Modal.Body>
                </Modal>
            </>
        )
    }
}

export default App;