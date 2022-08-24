import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { useCookies } from 'react-cookie';
import APIService from '../components/APIService';
import Message from '../components/Message'

function LoginScreen() {
    const [username, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [token, setToken] = useCookies(['access_token'])

    const navigate = useNavigate();

    useEffect(() => {
        const goToHomePage = () => navigate('/');
        if(token['access_token'] && token['access_token'] !== 'undefined') {
            goToHomePage();
        };
    }, [token])

    const loginBtn = () => {
        APIService.LoginUser({username, password})
        .then(response => {
            console.log(response)
            if (response.token){
                setToken('access_token', response.token)
            }
            if (response.detail){
                setError(response.detail)
            }      
        })
    }

    return (
        <FormContainer>
            {error ? <Message variant='danger'>{error}</Message> : null}
            <h1>Sign In</h1>
            <Form>

                <Form.Group controlId='username'>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type='username'
                        placeholder='Enter username'
                        value={username}
                        onChange={(e) => setEmail(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>


                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <div>&nbsp;</div>
                <Button onClick = {loginBtn} variant='primary'>
                    Sign In
                </Button>
            </Form>

            <Row className='py-3'>
                <Col>
                    New Customer? <Link
                        to={'/register'}>
                        Register
                        </Link>
                </Col>
            </Row>

        </FormContainer>
    )
}

export default LoginScreen
