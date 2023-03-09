import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { signIn } = useContext(AuthContext);

    const [userInfo, setUserInfo] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({
        emailError: '',
        passwordError: '',
        generalError: ''
    });


    const from = location?.state?.from?.pathname || '/';

    const handleEmailInput = (event) => {
        const emailRegex = /^\S+@\S+\.\S+$/;
        const validEmail = emailRegex.test(event.target.value);

        if (validEmail) {
            setUserInfo({ ...userInfo, email: event.target.value });
            setErrors({ ...errors, emailError: '' });
        }
        else {
            setErrors({ ...errors, emailError: 'Please provide a valid email addess' });
            setUserInfo({ ...userInfo, email: '' });
        }
    }

    const handlePasswordInput = (event) => {
        const passwordRegex = /.{6,}/;
        const validPassword = passwordRegex.test(event.target.value);

        if (validPassword) {
            setUserInfo({ ...userInfo, password: event.target.value });
            setErrors({ ...errors, passwordError: '' });
        } else {
            setErrors({ ...errors, passwordError: 'Password includes minimum 6 character' });
            setUserInfo({ ...userInfo, password: '' });
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        signIn(userInfo.email, userInfo.password)
            .then(result => {
                const user = result.user;
                if (user) {
                    event.target.reset();
                    toast.success('Successfully Login');
                    setErrors({ emailError: '', passwordError: '', generalError: '' });
                    navigate(from, { replace: true });
                }
            })
            .catch(error => {
                const errorCode = error.code;
                console.log(errorCode)
                if (errorCode) {
                    switch (errorCode) {
                        case 'auth/user-not-found':
                            setErrors({ ...errors, generalError: 'User not founded' });
                            break;
                        case 'auth/invalid-email':
                            setErrors({ ...errors, generalError: 'Invalid email provided, please provide a valid email' })
                            break;

                        case 'auth/wrong-password':
                            setErrors({ ...errors, generalError: 'Wrong password' });
                            break;

                        default:
                            setErrors({ ...errors, generalError: 'Something is wrong' });
                    }
                }
            });
    }



    return (
        <section className="w-50 mx-auto">
            <h1>Login</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        onBlur={handleEmailInput}
                        defaultValue={userInfo.email}
                        name="email" type="email" placeholder="Enter email" />
                    <Form.Text className="text-danger">
                        {errors?.emailError && errors?.emailError}
                        {errors?.generalError && errors?.generalError}
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        onBlur={handlePasswordInput}
                        name="password" type="password" placeholder="Password" />
                    <Form.Text className="text-danger">
                        {errors?.passwordError && errors?.passwordError}
                        {errors?.generalError && errors?.generalError}
                    </Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
        </section>
    )
}

export default Login;
