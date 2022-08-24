import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

function Header() {
  return (
    <div>
        <footer>
            <Container>
              <Row>
                <Col className="text-center py-3">Copyright &copy; Jonas</Col>
              </Row>
            </Container>
        </footer>
    </div>
  )
}

export default Header