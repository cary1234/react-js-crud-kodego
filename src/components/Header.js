import logoUrl from '../assets/images/logo.png';
import { Container, Row, Col, Modal } from 'react-bootstrap';
import { React, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import * as Icon from 'react-bootstrap-icons';

const Header = (props) => {
    const [showLogout, setShowLogout] = useState(false);
    const handleCloseLogout = () => setShowLogout(false);
    const handleShowLogout = () => setShowLogout(true);

    return (
        <>
            <div style={{
                backgroundColor: "#add8e6"
            }}>
                <Container>
                    <nav
                        className="navbar navbar-expand-lg navbar-light"
                        style={{
                            backgroundColor: "#add8e6"
                        }}>
                        <div className="container-fluid">
                            <a className="navbar-brand">
                                <img src={logoUrl} height="75" alt="SPEDI Logo" />
                            </a>

                            {/* hide when <= medium */}
                            <h5 className="d-none d-lg-block">
                                Company Name Here
                            </h5>

                            {/* show when >= medium */}
                            <h6 className="d-lg-none">
                                Welcome back,
                                <em >
                                    {" " + localStorage.getItem('localStorageUserFirstName') + " "}
                                    {localStorage.getItem('localStorageUserLastName') + " "}
                                </em>
                            </h6>

                            <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                                <span className="navbar-toggler-icon"></span>
                            </button>

                            <div className="collapse navbar-collapse text-center" id="navbarCollapse">
                                <div className="navbar-nav mx-auto">
                                    <NavLink
                                        className="nav-item nav-link"
                                        to="/attendance"
                                    >
                                        Dashboard
                                    </NavLink>
                                    {/* {
                                        this.props.conditionA ? "Condition A" ?
                                            "Condition A" :
                                            this.props.conditionB ?
                                                "Condition B" :
                                                "Neither"
                                    } */}
                                    {
                                        //if super admin
                                        (localStorage.getItem('localStorageUserPrivilege') === 'Super Admin') ?
                                            //then
                                            <NavLink
                                                className="nav-item nav-link"
                                                to="/superadmin"
                                            >
                                                Super Admin
                                            </NavLink>
                                            :
                                            //else if admin
                                            (localStorage.getItem('localStorageUserPrivilege') === 'Admin') ?
                                                //then
                                                <NavLink
                                                    className="nav-item nav-link"
                                                    to="/admin"
                                                >
                                                    Admin
                                                </NavLink>
                                                :
                                                //else regular employee
                                                console.log("Not Admin")
                                    }
                                </div>
                                <div className="navbar-nav ms-auto d-none d-md-none d-lg-block">
                                    <em className="navbar-nav me-3">
                                        Welcome back,
                                        {" " + localStorage.getItem('localStorageUserFirstName') + " "}
                                        {localStorage.getItem('localStorageUserLastName') + " "}
                                    </em>
                                </div>

                                <a href="/#" className="navbar-brand ms-3">
                                    <Icon.BoxArrowRight
                                        color="blue"
                                        size={35}
                                        onClick={() => handleShowLogout()}
                                    />
                                </a>
                            </div>
                        </div>
                    </nav>
                </Container>
            </div>


            {/* Delete Employee Modal */}
            <Modal
                show={showLogout}
                onHide={handleCloseLogout}
                backdrop="static"
                keyboard={false}
                animation={false}
            >

                <Modal.Body>
                    <Container fluid className="text-center">
                        <form>
                            <Row>
                                <Col xs={12} md={{ span: 12 }} className="mt-1 mb-2">
                                    <label className="label">
                                        <h4> Are you sure you want sign out?</h4>
                                    </label>
                                </Col>
                            </Row>

                            <Row>
                                <Col xs={6} md={{ span: 3, offset: 3 }} className="mt-1">
                                    <div className="d-grid">
                                        <Link to="/" className="btn btn-danger">
                                            Yes
                                        </Link>
                                    </div>
                                </Col>
                                <Col xs={6} md={{ span: 3 }} className="mt-1">
                                    <div className="d-grid">
                                        <button className="btn btn-primary" onClick={() => setShowLogout(false)}>
                                            No
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



export default Header


