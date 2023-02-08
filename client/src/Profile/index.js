import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { setLogin } from "../State";
import axios from 'axios';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import 'admin-lte/dist/css/adminlte.min.css';
const MySwal = withReactContent(Swal)

const Profile = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    axios.post('http://localhost:3001/auth/login',{ email: email, password: password, })
    .then(response => {
      if(response) {
        dispatch(
          setLogin({
            user: response.data.user,
            token: response.data.token,
          })
        );
        navigate("../Home");
      }
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
            <p className="login-box-msg">Sign in to start your session</p>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Button color="primary" block>Sign In</Button>
              </FormGroup>
              <p>
              Don't have an account? <Link to="/signup">Sign up here</Link>.
              </p>
            </Form>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Profile;
