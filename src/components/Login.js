import loginPictture from '../assets/images/undraw_remotely_2j6y.svg';
import { Container, Row, Col, Form, FloatingLabel, Modal, Table } from 'react-bootstrap';
import logoUrl from '../assets/images/logo.png';
import { React, Component } from "react";
import * as Icon from 'react-bootstrap-icons';

class Login extends Component {
    state = {
        form: { id: '', employee_id: '', first_name: '', last_name: '', email: '', password: '', privilege: '' },
        guideModalStatus: false,
    };

    //Note: Linked to the input fields of firstName, lastName and email
    handleChange = event => {
        const { name, value } = event.target;
        let form = this.state.form;
        form[name] = value;
        this.setState({ form });
    }

    getLogin = (event) => {
        //console.log("trigger")
        this.props.onFormLogin(this.state.form)
        event.preventDefault();
    };

    isEmpty(obj) {
        return Object.entries(obj).length === 0 && obj.constructor === Object;
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props && !this.isEmpty(this.props.login)) {
            this.setState({
                form: { ...this.props.login, isEdit: true },
            });
            //console.log("Update");
        }
    }


    openGuideModal = () => this.setState({ guideModalStatus: true });
    closeGuideModal = () => this.setState({ guideModalStatus: false });

    render() {
        return (
            <>
                <Container className="d-none d-lg-block">
                    <Row className="mt-2 pt-2">
                    </Row>
                </Container>

                <Container>
                    <Row className="">
                        <Col xs={12} md={{ span: 8, offset: 2 }} className="contents text-center">
                            <h3>
                                <a className="navbar-brand me-3">
                                    <img src={logoUrl} height="100" alt="SPEDI" />
                                </a>
                                Company Name
                            </h3>
                        </Col>
                    </Row>

                    <Row className="">
                        <Col lg={{ span: 4, offset: 2 }} className="d-none d-md-none d-lg-block">
                            <img src={loginPictture} alt="Login" className="img-fluid" width={350} />
                        </Col>
                        <Col md={12} lg={{ span: 4 }} className="contents">
                            <Row className="justify-content-center">
                                <Col md={{ span: 10 }} className="contents">
                                    <h5>Attendance Monitoring System</h5>
                                    {/* <p className="mb-4">For all your technical concerns, kindly email the support team at <a href="mailto:support@spediph.com">support@email.com</a>.</p> */}
                                    <Form>

                                        {/* Email Address */}
                                        <FloatingLabel
                                            label="Company Email Address"
                                            className="mb-1 mt-4"
                                        >
                                            <Form.Control
                                                type="text"
                                                name="email"
                                                placeholder='Company Email Address'
                                                onChange={this.handleChange}
                                                value={this.state.form.email}
                                            />
                                        </FloatingLabel>

                                        {/* Password */}
                                        <FloatingLabel
                                            label="Password"
                                            className="mb-1 mt-3"
                                        >
                                            <Form.Control
                                                type="password"
                                                name="password"
                                                placeholder="Company Password"
                                                onChange={this.handleChange}
                                                value={this.state.form.password}
                                            />
                                        </FloatingLabel>

                                        {/* Login Button */}
                                        <div className="d-grid mt-3 mb-3">
                                            <button type="button"
                                                className="btn btn-outline-info"
                                                onClick={this.getLogin}>
                                                Sign In
                                            </button>
                                        </div>

                                        {/* Guide Button */}
                                        <div className="d-grid mt-3 mb-3">
                                            <button type="button"
                                                className="btn btn-outline-info"
                                                onClick={this.openGuideModal}>
                                                How to Use
                                            </button>
                                        </div>
                                    </Form>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>

                <Container className="d-none d-lg-block">
                    <Row className=" ms-5 ps-3 pt-4 pb-5">
                        <Col xs={12} lg={{ span: 3, offset: 1 }} className="text-center">



                            <button className="btn">
                                <Icon.Facebook
                                    color="blue"
                                    size={50}
                                />
                            </button>
                        </Col>
                        <Col xs={12} lg={{ span: 3 }} className="text-center">
                            <button className="btn">
                                <Icon.Instagram
                                    color="blue"
                                    size={50}
                                />
                            </button>
                        </Col>
                        <Col xs={12} lg={{ span: 3 }} className="text-center">
                            <button className="btn">
                                <Icon.Twitter
                                    color="blue"
                                    size={50}
                                />
                            </button>
                        </Col>
                    </Row>
                </Container>



                {/* modal for guide */}

                <Modal
                    show={this.state.guideModalStatus}
                    centered
                >
                    <Modal.Header>

                        <Col md={{ span: 12 }}>
                            <h5 className="text-center">
                                Guide on How to Use
                            </h5>
                        </Col>
                    </Modal.Header>

                    <Modal.Body>
                        <Container fluid className=" text-justify">
                            <Row>
                                <Col xs={12} md={{ span: 12 }} className="text-center">
                                    <label className="label">
                                        Demo Accounts
                                    </label>
                                </Col>
                            </Row>
                            <Row>

                                <Table className='text-center' striped bordered hover>
                                    <thead>
                                        < tr>
                                            <th>
                                                Email Address
                                            </th>
                                            <th>
                                                Password
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                superadmin@email.com
                                            </td>
                                            <td>
                                                123
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                admin@email.com
                                            </td>
                                            <td>
                                                1234
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                regular@email.com
                                            </td>
                                            <td>
                                                12345
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Row>
                            <Row>
                                <Col xs={12} md={{ span: 12 }} className="mt-1 mb-2">
                                    <label className="label">
                                        <em className='text-danger'>Note: </em>This system was created from scratch in just three-weeks as part of the requirements in my KodeGo boot camp. The system uses  <em>ReactJS</em> and <em>Laravel</em>, both of which I just learned and experimented in one month.
                                    </label>
                                </Col>
                            </Row>

                            <Row>
                                <Col xs={12} md={{ span: 12 }} className="mt-3 mb-1">
                                    <div className="d-grid">
                                        <button className="btn btn-danger" onClick={this.closeModalLoginModal}>
                                            Close
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
export default Login;


