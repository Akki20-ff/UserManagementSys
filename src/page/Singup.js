import React from 'react';
import { v4 as uuidv4 } from 'uuid'; // Import the uuid function
import { useNavigate } from "react-router-dom";
import { useFormInputValidation } from 'react-form-input-validation';
import { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
function Singup() {

    const uniqueId = uuidv4();
    // const [users, setUsers] = useState([]);

    // useEffect(() => {
    //     loadUser();
    // }, []);

    const navigate = useNavigate();

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
                    navigate('/')
                    console.log(data)
                });


        }
    }

    return (
        <Container className="mt-4 p-4 border shadow rounded col-6">
            <h1>Sign Up Form</h1>
            <br />
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
        </Container>
    )
}

export default Singup