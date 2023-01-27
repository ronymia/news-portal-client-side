import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';

const Login = () => {
    const { signIn } = useContext(AuthContext);
    const [userInfo, setUserInfo] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState({
        emailError: '',
        passwordError: '',
        generalError: ''
    });

    const handleInputBlur = (event) => {
        setUserInfo({ ...userInfo, [event.target.name]: event.target.value });
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        signIn(userInfo.email, userInfo.password)
            .then(result => {
                const user = result.user;
                if (user) {
                    event.target.reset();
                    toast.success('Successfully Login');
                }
            })
            .catch(error => { console.error(error.message) });
    }
    return (
        <section className="w-50 mx-auto">
            <h1>Login</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        onBlur={handleInputBlur}
                        name="email" type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        onBlur={handleInputBlur}
                        name="password" type="password" placeholder="Password" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
        </section>
    )
}

export default Login;
