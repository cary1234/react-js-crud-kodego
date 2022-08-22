
import { Container } from 'react-bootstrap';
import { Link } from "react-router-dom";

const Underconstruction = () => {


    return (
        <>
            <Container>
                <div className="container-fluid text-center mt-5 pt-5">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="error-template">
                                <h1>
                                    Oops!
                                </h1>
                                <h2>
                                    404 Not Found
                                </h2>
                                <div className='error-details mt-3 pt-3'>
                                    Sorry, an error has occured, Requested page not found!
                                </div>
                                <div className="error-actions mt-3 pt-3 mb-5 pb-5">


                                    <Link
                                        to="/"
                                        className="btn btn-outline-light btn-primary btn-lg"
                                    >
                                        Take Me Home
                                    </Link>




                                    <button onClick={() => window.location = 'mailto:support@spediph.com'} className="btn btn-outline-light btn-secondary btn-lg"
                                    >
                                        Contact Support
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default Underconstruction