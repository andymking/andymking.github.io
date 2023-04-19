import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Navbar, ProgressBar, Modal} from 'react-bootstrap';
import {useEffect, useState} from 'react'
import './landing.css';
import {Link, useNavigate} from 'react-router-dom';



function LandingPage() {
    const [userName, setUserName] = useState("Johnny Appleseed");
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
      };


    const navigate = useNavigate();
    const handleClick = () => {
      // 👇️ replace set to true
      navigate('/survey', {replace: true});
    };
    return (
      <body>
        <Navbar id="landing-nav" className="p-5" variant="light">
          <Container>
            <Navbar.Brand href="#"></Navbar.Brand>
          </Container>
          <span id="nav-circle" className=""></span>
        </Navbar>
        
            <Container className="mt-5">
                <div id="intro" className="text-center">
                    <div className="mask">
                        <div className="d-grid justify-content-center align-items-center h-100">
                            <h1 className="mb-3">Welcome, {userName}!</h1>
                            <p className="mb-5">Thank you for stopping by today to tell us about your care preferences</p>
                            <Button id="start-survey" onClick={handleClick} className="mb-3" variant="secondary" size="lg">
                              Start Survey
                            </Button>
                            <Button onClick={handleShowModal} id="instructions" className="mb-3" variant="outline-secondary" size="lg">
                                Watch Instructions
                            </Button>
                            <Modal show={showModal} onHide={handleCloseModal} centered>
                                <Modal.Body>
                                <div className="video-wrapper">
                                    <iframe
                                    title="video"
                                    key="video"
                                    width="800"
                                    height="800"
                                    src="https://www.youtube.com/watch?v=wui5XY8cq7g"
                                    frameborder="0"
                                    allow="autoplay; encrypted-media"
                                    allowfullscreen
                                    ></iframe>
                                </div>
                                </Modal.Body>
                            </Modal>
                        </div>
                    </div>
                </div>
            </Container>
      </body>
    );
  }

export default LandingPage;