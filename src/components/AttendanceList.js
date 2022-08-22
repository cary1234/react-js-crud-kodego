import React, { Component } from "react";
import { Container, Table, Col, } from 'react-bootstrap';
import Attendance from './Attendance'
import PaginationAttendance from './PaginationAttendance'

class AttendanceList extends Component {

    state = {
        idx1: this.props.idx,
        hours1: this.props.hours,
    }

    onDeleteAttendance = id => {
        console.log('attendance delete list ', id);
        this.props.onDeleteAttendance(id);
    }

    onEditAttendance = data => {
        console.log('attendance edit list ', data);
        this.props.onEditAttendance(data);
    }

    // Jabez Paste near onEditAttendance AttendanceList
    onSelectAttendance = data => {
        this.props.onSelectAttendance(data);
    }

    render() {
        const attendances = this.props.attendances;
        const idx1 = this.props.idx;
        const hours1 = this.props.hours;
        return (
            <>
                <Container className="text-center">
                    <Col xs={12} md={12}>
                        {
                            //"sample state: " + idx1
                            //"sample hour: " + hours1
                        }
                        <Table striped bordered hover responsive="sm">
                            <thead>
                                <tr>
                                    <th>Timestamp</th>
                                    <th>Detected Location</th>
                                    <th>Site Location</th>
                                    <th>Type</th>
                                    <th>Remarks</th>
                                    {
                                        //if super admin
                                        (localStorage.getItem('localStorageUserPrivilege') == 'Super Admin' || localStorage.getItem('localStorageUserPrivilege') == 'Admin') ?
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
                                                //Jabez
                                                onSelectAttendance={this.onSelectAttendance}
                                                idx1={this.state.idx1}
                                                hours1={this.state.hours1}
                                            />
                                        )
                                    })
                                }
                            </tbody>
                        </Table>
                    </Col>




                </Container>
                <PaginationAttendance />



            </>
        );
    }
}

export default AttendanceList;