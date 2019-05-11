import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './menu.css';

const MenuModal = (props) => {
    return (
        <div>
            <Button color="secondary" onClick={ props.toggle } className="menu-btn" data-test="home-menu-button">Menu</Button>
            <Modal isOpen={ props.modal } toggle={ props.toggle } className="menu">
                <ModalHeader toggle={ props.toggle }>
                    <Container>
                        <Row>
                            <Col className="menu-button">
                                { props.user ? (<h2>{ props.user.firstName }</h2>) :
                                    <Link to='/login'>Login</Link>
                                }
                            </Col>
                        </Row>
                        <Row>
                            <Col className="menu-button">
                                { !props.user ? <Link to='/signup'>Signup</Link> : null }
                            </Col>
                        </Row>

                        <Row>
                            <Col className="menu-button">
                                { props.user ? (<Link to="#" className="logout" onClick={ props.logout }>Logout</Link>) : null }
                            </Col>
                        </Row>
                    </Container>
                </ModalHeader>
                <ModalBody className="modal-body">
                    <Container>
                        <Row>
                            <Col className="menu-button">
                                <Link to='/quickstart' data-test="menu-quickstart">Quick Start</Link>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="menu-button">
                                <Link to='/alerts' data-test="menu-alerts">Alerts</Link>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="menu-button">
                                <Link to='/history' data-test="menu-history">History</Link>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="menu-button">
                                <Link className="menu-link" to='/settings' data-test="menu-settings">Settings</Link>
                            </Col>
                        </Row>
                    </Container>
                </ModalBody>
                <ModalFooter>
                    {/* <Button color="secondary" onClick={ props.toggle }>Close</Button> */}
                </ModalFooter>
            </Modal>
        </div>
    )

};

export default MenuModal;