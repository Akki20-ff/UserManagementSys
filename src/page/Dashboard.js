import React from 'react'
import Table from 'react-bootstrap/Table';
import { useFormInputValidation } from 'react-form-input-validation';
import { v4 as uuidv4 } from 'uuid'; // Import the uuid function
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import Singup from './Singup';
import { useNavigate } from 'react-router-dom';



function Dashboard() {
    // Get All Data
    const [userdata, setUserdata] = useState([]);

    // Modal
    const [lgShow, setLgShow] = useState(false);
    const [edShow, setEdShow] = useState(false);

    // Get data by id
    const [usered, setUsered] = useState('');

    const uniqueId = uuidv4();
    const navigate = useNavigate();


    const loadData = async () => {

        fetch('https://sheetdb.io/api/v1/hbkpktyhuck8h?sort_by=name&sort_order=asc')
            .then((response) => response.json())
            .then((data) => {
                setUserdata(data)
                // console.log(data)
            });

    }

    const DeleteData = async (e) => {
        var id = e.target.value
        console.log(id)
        fetch(`https://sheetdb.io/api/v1/hbkpktyhuck8h/id/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((data) => {
                loadData();
                console.log('data')
            });

    }


    useEffect(() => {
        loadData();
    }, []);

    const [fields, errors, form] = useFormInputValidation({
        name: "",
        email: "",
        password: "",
        confirm_password: "",
        id: ""


    }, {
        name: "required",
        email: "required|email",
        password: "required",
        confirm_password: "required|same:password"


    });

    const onSubmit = async (event) => {

        console.log("thsi work properly  ", event.target.name.value);

        const isValid = await form.validate(event);

        var headers = {
            "Content-type": "application/json",
            "Accept": "application/json"
        }
        if (isValid) {


            fetch('https://sheetdb.io/api/v1/hbkpktyhuck8h', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    data: [
                        {
                            'name': fields.name,
                            'email': fields.email,
                            'password': fields.password,
                            'confirm_password': fields.confirm_password,
                            'id': uniqueId
                        }
                    ]
                })
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data)
                    setLgShow(false)
                    loadData();
                });


        }
    }


    const editData = async (e) => {
        var id = e.target.value
        console.log(id)
        setUsered(userdata.find(user => user.id === id));
        setEdShow(true)

    }
    const onEditSubmit = async (event) => {
        event.preventDefault();
        const id = usered.id;
        fetch(`https://sheetdb.io/api/v1/hbkpktyhuck8h/id/${id}`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data: {
                    name: usered.name,
                    email: usered.email,
                    password: usered.password,
                    confirm_password: usered.confirm_password
                }
            })
        })
            .then(response => response.json())
            .then(() => {
                setEdShow(false);
                loadData();
            });
    };

    return (
        <>
            <div className='col-6 mx-auto mt-5 '>
                <div className='d-flex justify-content-between my-4'>  <h2> User's Data </h2><Button variant="primary" className='col-3' onClick={() => setLgShow(true)}>Add New</Button> </div>

                <Table >
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>E-Mail</th>
                            <th>Password</th>
                            <th className='text-center'>Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {userdata.map((data, index) =>

                            <tr>
                                <td>{index + 1}</td>
                                <td>{data.name}</td>
                                <td>{data.email}</td>
                                <td>{data.password}</td>
                                <td className='text-center'>
                                    <Button variant="danger" className='me-2' value={data.id} onClick={DeleteData}>Delete</Button>
                                    <Button variant="info" value={data.id} onClick={editData}>Edit</Button>
                                </td>


                            </tr>

                        )}

                    </tbody>
                </Table>

            </div>
            {/* Add data */}
            <Modal
                size="lg"
                show={lgShow}
                onHide={() => setLgShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Add New User
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='mb-3'>

                    <Form onSubmit={onSubmit}>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    onBlur={form.handleBlurEvent}
                                    onChange={form.handleChangeEvent}
                                    value={fields.name}
                                    isInvalid={!!errors.name}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.name}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formEmail">
                                <Form.Label>E-mail</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    onBlur={form.handleBlurEvent}
                                    onChange={form.handleChangeEvent}
                                    value={fields.email}
                                    isInvalid={!!errors.email}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.email}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    onBlur={form.handleBlurEvent}
                                    onChange={form.handleChangeEvent}
                                    value={fields.password}
                                    isInvalid={!!errors.password}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.password}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formConfirmPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="confirm_password"
                                    onBlur={form.handleBlurEvent}
                                    onChange={form.handleChangeEvent}
                                    value={fields.confirm_password}
                                    isInvalid={!!errors.confirm_password}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.confirm_password}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <div className="text-center mt-3">
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </div>
                    </Form>

                </Modal.Body>
            </Modal>


            {/* Edit User Modal */}
            <Modal size="lg" show={edShow} onHide={() => setEdShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit User Data</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={onEditSubmit}>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={usered.name || ""}
                                    onChange={(e) => setUsered({ ...usered, name: e.target.value })}
                                />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formEmail">
                                <Form.Label>E-mail</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={usered.email || ""}
                                    onChange={(e) => setUsered({ ...usered, email: e.target.value })}
                                />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="password"
                                    value={usered.password || ""}
                                    onChange={(e) => setUsered({ ...usered, password: e.target.value })}
                                />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formConfirmPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="confirm_password"
                                    value={usered.confirm_password || ""}
                                    onChange={(e) => setUsered({ ...usered, confirm_password: e.target.value })}
                                />
                            </Form.Group>
                        </Row>
                        <div className="text-center mt-3">
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default Dashboard