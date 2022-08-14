import React, { Component } from "react";
import { Spinner, Button } from 'react-bootstrap';

class Loader extends Component {
    render() {
        return (
            <div
                style={{
                    position: 'absolute', left: '50%', top: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
            >
                <Button variant="primary" disabled>
                    <Spinner
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    />
                    Loading...
                </Button>
            </div>
        )
    }
}

export default Loader;