import React, { Component } from "react";
import { Container, Table, Col, } from 'react-bootstrap';
import Attendance from './Attendance'


import PaginationAttendance from './PaginationAttendance'

class AttendanceList extends Component {

    onDeleteAttendance = id => {
        console.log('attendance delete list ', id);
        this.props.onDeleteAttendance(id);
    }

    onEditAttendance = data => {
        console.log('attendance edit list ', data);
        this.props.onEditAttendance(data);
    }

    render() {
        const attendances = this.props.attendances;
        return (
            <>
                <Container className="text-center">
                    <Col xs={12} md={12}>
                        <Table striped bordered hover responsive="sm">
                            <thead>
                                <tr>
                                    <th>Timestamp</th>
                                    <th>Detected Location</th>
                                    <th>Site Location</th>
                                    <th>Type</th>
                                    <th>Remarks</th>
                                    <th colSpan={2}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    attendances.map((attendance) => {
                                        return (
                                            <Attendance
                                                attendance={attendance}
                                                key={attendance.id}
                                                onDeleteAttendance={this.onDeleteAttendance}
                                                onEditAttendance={this.onEditAttendance}
                                            />
                                        )
                                    })
                                }
                            </tbody>
                        </Table>
                    </Col>



                    <PaginationAttendance />

                </Container>



            </>
        );
    }
}

export default AttendanceList;