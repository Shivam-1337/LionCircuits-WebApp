import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Alert } from 'reactstrap';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');
  let navigate = useNavigate();


  // Define API URL
  const api = 'http://127.0.0.1:8000/login/';

  const loginUser = (event) => {
    event.preventDefault()
    console.log('Button clicked');
    const requestData = {
      username: username,
      password: password,
    };

    axios
      .post(api, requestData)
      .then(response => {
        console.log(response.data['token']);
        const token = response.data['token']
        const user = response.data['username']
        localStorage.setItem('token', token);
        localStorage.setItem('user', user);
        setStatus('Logged In');
        navigate('/')
        window.location.reload();
      })
      .catch(error => {
        setStatus('Invalid Username or Password');
        console.log(error);
      });
  };

  return (
    <div className="container-fluid p-0">
      <h2 className="text-center alert alert-success mt-0">Login Page</h2>
      <div className="row">
        <div className="col-md-4 mx-auto">
          <form action='/'>
            <div className="form-group">
              <label htmlFor="username" className="float-left">
                Enter Username
              </label>
              <input
                type="text"
                id="username"
                className="form-control"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="float-left">
                Enter Password
              </label>
              <input
                type="password"
                id="password"
                className="form-control"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <button
              type="button"
              onClick={loginUser}
              className="btn btn-primary float-left mt-2"
            >
              Login
            </button>
            <br />
            <br />
            {status ? <Alert color="primary">{status}</Alert> : null}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
