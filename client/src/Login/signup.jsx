import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import 'admin-lte/dist/css/adminlte.min.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
import 'admin-lte/dist/css/adminlte.min.css';
const MySwal = withReactContent(Swal)

const Signup = () => {
  function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const email = form.elements.email.value;
    const username = form.elements.username.value;
    const password = form.elements.password.value;
    axios.post('http://localhost:3001/auth/register',{ username: username,email: email, password: password, })
    .then(response => {
      MySwal.fire({
        title: "Error",
        text: response.data.msg,
        icon: "error",
      });
    })
    .catch(error => {
      MySwal.fire({
        title: "Error",
        text: error.response.data.msg,
        icon: "error",
      });
    });
  }
  return (
    <div className="login-page">
      <div className="login-box">
        <div className="login-logo">
          <b>REPORT </b>Management
        </div>
        <div className="card">
          <div className="card-body login-card-body">
            <p className="login-box-msg">Sign up Here</p>
            <Form  onSubmit={handleSubmit}>
            <FormGroup>
            <Label for="exampleUsername">Username</Label>
            <Input type="text" name="username" id="exampleUsername" placeholder="Enter username" />
            </FormGroup>
            <FormGroup>
            <Label for="exampleEmail">Email</Label>
            <Input type="email" name="email" id="exampleEmail" placeholder="Enter email" />
            </FormGroup>
            <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input type="password" name="password" id="examplePassword" placeholder="Input new password" />
            </FormGroup>
            <FormGroup>
              <Button color="primary" block>Sign Up</Button>
            </FormGroup>
            <p>
              Already have an account? <Link to="/Login">Login</Link>.
            </p>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;