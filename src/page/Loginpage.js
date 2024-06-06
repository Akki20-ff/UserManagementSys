
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';


function Loginpage() {

  const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const submitUser = async e => {


    var user = { username, password };
    console.log(user)
    e.preventDefault();

    fetch(`https://sheetdb.io/api/v1/hbkpktyhuck8h/search?email=${username}&password=${password}`)
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log(data)
        if (data.length === 0) {
          console.log('The object is empty');
          setShowAlert(true);
        } else {
          console.log('The object is not empty');
           navigate("/Dashboard")
        }

      }
      )
      .catch((error) => console.error('Error:', error));

  }

  const handleEmail = (e) => {
    setEmail(e.target.value);

  }

  const handlePassword = (e) => {
    setPassword(e.target.value);
    console.log(password);
  }
  return (
    <>
      {showAlert && (
        <Alert variant='warning'>
          Please Enter Valid Email and Password
        </Alert>
      )}

      <div className="col-4 mx-auto mt-5 border ronded p-4 shadow">


        <Form onSubmit={submitUser} >
          <h2> Login </h2>
          <Form.Group className="my-4" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" name="username" id="username" value={username}
              onChange={handleEmail} />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="my-4" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" name="password" id="password" value={password}
              onChange={handlePassword} />
          </Form.Group>

          <Button variant="primary" type="submit" className="">
            Submit
          </Button>

          <h3 className="mt-3">New Registration <span> <Link to={'/Singup'}>Click</Link></span></h3> 
        </Form>
      </div>
    </>
  )
}

export default Loginpage