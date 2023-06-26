import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import { signupUser } from './LoginSlice';

export default function SignupForm(props){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [admin, setAdmin] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const { handleSubmit, errors } = useForm();

    const signup = () => {
        let payload = {
            username: username,
            password: password,
            admin: admin,
        };
        console.log(payload);
        dispatch(signupUser(payload))
            .unwrap().then(() => {
                navigate("/");
            });
    };
            
    return(
        <div>
            <h1>Signup</h1>

            <Form onSubmit={handleSubmit(signup)}>
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
                
                <Form.Group controlId="admin">
                    <Form.Label>Admin:</Form.Label>
                    <Form.Check
                        name="admin"
                        value={admin}
                        onChange={(event) => setAdmin(event.target.value)}
                    />
                </Form.Group>

                <Button variant="primary" type="submit" style={{ marginRight: "20px" }}>
                Signup
                </Button>
                <Button variant="success" as={Link} to="/">
                Login
                </Button>
            </Form>
        </div>
    );
}