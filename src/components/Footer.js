import loginPictture from '../assets/images/undraw_remotely_2j6y.svg';
import { Link } from "react-router-dom";
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import logoUrl from '../assets/images/logo.png';
import { React, useState, useEffect } from "react";


import '../../node_modules/bootstrap/dist/js/bootstrap.bundle.js';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
    return (
        <>
            <div
                style={{
                    backgroundColor: "#add8e6"
                }}
            >

                {/* hide when <= medium */}
                <Container className=' d-none d-lg-block'
                >
                    <footer className="pb-2 pt-2 mt-auto"
                        style={{
                            backgroundColor: "#add8e6"
                        }}
                    >
                        <p className="copyright mb-0 text-center">
                            Copyright &copy; 2022 SPEDI Construction, Inc. All rights reserved. | This website is created <i className="ion-ios-heart" aria-hidden="true"></i> by <a href="https://cary1234.github.io/Portfolio-ReactJS/" target="_blank">Cary Bondoc</a>
                        </p>
                    </footer>
                </Container>
            </div>
        </>
    );
};

export default Footer;