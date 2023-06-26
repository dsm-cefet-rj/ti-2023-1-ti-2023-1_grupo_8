import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import { loginServer } from './LoginSlice';

export default function LoginForm(props){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const status = useSelector(state => state.login.status);
    
    const { handleSubmit, errors } = useForm();

    const login = () => {
        let payload = {
            username: username,
            password: password,
        };
        dispatch(loginServer(payload))
            .unwrap().then(() => {
                navigate("/home");
            });
    }
    
    // useEffect(() => {
    //     if (status === 'logged_in' ) {
    //         navigate('/home');
    //     }
    // }, [navigate, status])
            
    return(
        <div>
            <h1>Login</h1>
            {/* <form onSubmit={handleSubmit(onSubmit)}>
                <label>
                    Login:
                    <input type="text" id="username" {...register('username', {required: true})} />
                    &nbsp;<span id="username_err_msg">{errors?.login?.message}</span>
                </label>
                <br/>
                <label>
                    Senha:
                    <input type="password" id="password" {...register('password', {required: true})} />
                    &nbsp;<span id="password_err_msg">{errors?.password?.message}</span>
                </label>
                <br/>
                <br/>   
                <button type="submit" id="Login" name="btn_login" variant="contained" color="primary">Login</button>
                <button type="button" id="Signup" name="btn_signup" variant="contained" color="secondary" onClick={goToSignup()} >Signup</button>
            </form> */}

            <Form onSubmit={handleSubmit(login)}>
                <Form.Group controlId="username">
                    <Form.Label>Login:</Form.Label>
                    <Form.Control
                        type="text"
                        name="username"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </Form.Group>
                
                <Form.Group controlId="password">
                    <Form.Label>Senha:</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </Form.Group>

                <Button variant="primary" type="submit" style={{ marginRight: "20px" }}>
                Login
                </Button>
                <Button variant="success" as={Link} to="/signup">
                Signup
                </Button>
            </Form>
        </div>
    );
}