import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import APIService from '../components/APIService';
import Message from '../components/Message'

function RegisterScreen() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const navigate = useNavigate();

    const RegisterBtn = () => {
        APIService.RegisterUser({name, email, password})
        .then(response => {
            if (response.token){
                setSuccess('User created')
                navigate("/login")
            }
            if (response.detail){
                setError(response.detail)
            }      
        })
    }

    return (
        <FormContainer>
            {error ? <Message variant='danger'>{error}</Message> : null}
            {success ? <Message variant='success'>{success}</Message> : null}
            <h1>New User</h1>
            <Form>

                <Form.Group controlId='name'>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        required
                        type='name'
                        placeholder='Enter username'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        required
                        type='email'
                        placeholder='Enter Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        required
                        type='password'
                        placeholder='Enter Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='passwordConfirm'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        required
                        type='password'
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <div>&nbsp;</div>
                <Button onClick = {RegisterBtn} variant='primary'>
                    Register
                </Button>

            </Form>

            <Row className='py-3'>
                <Col>
                    Have an Account? <Link
                        to={'/login'}>
                        Sign In
                        </Link>
                </Col>
            </Row>
        </FormContainer >
    )
}

export default RegisterScreen
