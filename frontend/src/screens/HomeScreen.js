import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Card } from 'react-bootstrap'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom'
import APIService from '../components/APIService';
import Message from '../components/Message'
import FormFile from '../components/FormFile'



function HomeScreen() {
  const [allfiles, setFiles] = useState([])
  const [urls, setUrls] = useState([])
  const [upload, setUpload] = useState(null)
  const [url, setUrl] = useState('')
  const [token] = useCookies(['access_token'])
  const [error, setError] = useState('')


  const navigate = useNavigate();

  useEffect(() => {
    const goToHomePage = () => navigate('/login');
    if (!token['access_token'] || token['access_token'] === 'undefined') {
      goToHomePage();
    };
  }, [token, navigate])


  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/files/', {
      'method': 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token['access_token']}`
      }
    })
      .then(resp => resp.json())
      .then(resp => setFiles(resp))
      .catch(error => console.log(error))

  }, [token])

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/files/urls/', {
      'method': 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token['access_token']}`
      }
    })
      .then(resp => resp.json())
      .then(resp => setUrls(resp))
      .catch(error => console.log(error))

  }, [token])

  const uploadFileHandler = (e) => {
    const upload = e.target.files[0]
    console.log(upload.path)
    setUpload(upload)
  }

  const RegisterBtn = () => {

    const formData = new FormData()
    formData.append('file', upload)
    formData.append('url', url)

    APIService.RegisterFile(formData, token['access_token'])
      .then(response => {
        if (response.status === 201) {
          window.location.reload()
        }
        if (response.detail) {
          setError(response.detail)
        }
      })

  }

  return (
    <div>
      {error ? <Message variant='danger'>{error}</Message> : null}
      <h1>New File</h1>
      <Row>
        <Form>
          <Form.Group controlId="file" className="mb-3">
            <Form.Label>File</Form.Label>

            <Form.Control
              type='file'
              label='Choose File'
              onChange={uploadFileHandler} />

          </Form.Group>
          <Form.Group controlId='url'>
            <Form.Label>URL</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter URL'
              value={url}
              onChange={(e) => setUrl(e.target.value)}>
            </Form.Control>
          </Form.Group>
          <div>&nbsp;</div>
          <Button onClick={RegisterBtn} variant='primary'>
            Insert File
          </Button>
        </Form>
      </Row>
      <div>&nbsp;</div>
      <h1>Your Files</h1>


      {urls.map(uniqueurl => (
        <Row style={{ paddingBottom: '2rem' }}>
          <Card border="primary">
            <Card.Header as={'h3'}>Location: {uniqueurl.url}</Card.Header>
            <Card.Body>
              <Row>
                {allfiles.filter(url => url.url === uniqueurl.url).map(fl => (
                  <Col key={fl._id} sm={12} md={6} lg={4} xl={3}>
                    <FormFile file={fl} />
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </Row>
      ))}
    </div>
  )
}


export default HomeScreen