import React, { useContext, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';

const Register = () => {
    const navigate = useNavigate();
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const [userInfo, setUserInfo] = useState({
        displayName: '',
        photoURL: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({
        emailError: '',
        passwordError: '',
        confirmPasswordError: '',
        generalError: ''
    });

    const handleNameInput = (event) => {
        setUserInfo({ ...userInfo, displayName: event.target.value });
    }
    const handlePhotoURLInput = (event) => {
        setUserInfo({ ...userInfo, photoURL: event.target.value });
    }

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
    const handleConfirmPasswordInput = (event) => {
        const validPassword = userInfo.password;

        if (validPassword === event.target.value) {
            setUserInfo({ ...userInfo, confirmPassword: event.target.value });
            setErrors({ ...errors, confirmPasswordError: '' });
        } else {
            setErrors({ ...errors, confirmPasswordError: 'Password did not match' });
            setUserInfo({ ...userInfo, confirmPassword: '' });
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        createUser(userInfo.email, userInfo.password)
            .then(result => {
                const user = result.user;
                if (user) {
                    event.target.reset();
                    handleUpdateUserProfile(userInfo.displayName, userInfo.photoURL)
                    toast.success('Successfully create Account');
                    navigate("/");
                }
            })
            .catch(error => {
                const errorCode = error.code;
                console.log(errorCode)
                if (errorCode) {
                    switch (errorCode) {
                        case 'auth/email-already-in-use':
                            setErrors({ ...errors, generalError: 'user Already exist' })
                            break;

                        default:
                            setErrors({ ...errors, generalError: 'Something is wrong' });
                    }
                }
            });

        const handleUpdateUserProfile = (name, photoURL) => {
            const profile = {
                displayName: name,
                photoURL: photoURL
            };

            updateUserProfile(profile)
                .then(() => { })
                .catch(error => { });
        }
    }


    return (
        <section className="w-50 mx-auto">
            <h1>Register</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        onBlur={handleNameInput}
                        name="name" type="text" placeholder="Enter Name" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPhotoURL">
                    <Form.Label>Photo URL</Form.Label>
                    <Form.Control
                        onBlur={handlePhotoURLInput}
                        name="name" type="text" placeholder="Enter Photo URl" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        onBlur={handleEmailInput}
                        name="email" type="text" placeholder="Enter email" />
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

                <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        onBlur={handleConfirmPasswordInput}
                        name="confirmPassword" type="password" placeholder="Confirm Password" />
                    <Form.Text className="text-danger">
                        {errors?.confirmPasswordError && errors?.confirmPasswordError}
                        {errors?.generalError && errors?.generalError}
                    </Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Register
                </Button>
            </Form>
        </section>
    )
}

export default Register;
