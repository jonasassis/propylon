import React from 'react'
import { Navbar, Nav, Container, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useCookies } from 'react-cookie';


function Header() {

  const [ token, removeCookie ] = useCookies(['access_token'])
  
  const logoutBtn = () => {
    removeCookie('access_token')
  }

  return (
    <header>
        <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
            <Container>
                <LinkContainer to='/'>
                  <Navbar.Brand>Propylon</Navbar.Brand>
                </LinkContainer>
                
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className='ml-auto'>
                      <LinkContainer to="/">
                        <Nav.Link ><i className='fa-solid fa-file'></i> Files</Nav.Link>
                      </LinkContainer>
                    </Nav>
                  
                </Navbar.Collapse>
                {token['access_token'] && token['access_token'] !== 'undefined'  ? 
                  <Button onClick = {logoutBtn}>Logout</Button>
                      : 
                      <Button href='/login' className='btn btn-primary btn-success'>Login</Button>
                      }
            </Container>
        </Navbar>
    </header>
  )
}

export default Header