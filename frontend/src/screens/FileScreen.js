import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router-dom'

import FormFileByID from '../components/FormFileByID'

function FileScreen() {

  const {id} = useParams();
  const [allfiles, setFiles] = useState([])
  const [token] = useCookies(['access_token'])


  const navigate = useNavigate();

  useEffect(() => {
    const goToHomePage = () => navigate('/login');
    if (!token['access_token'] || token['access_token'] == 'undefined') {
      goToHomePage();
    };
  }, [token])

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/files/${id}/`, {
      'method': 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token['access_token']}`
      }
    })
      .then(resp => resp.json())
      .then(resp => setFiles(resp))
      .catch(error => console.log(error))

  }, [])

  return (
    <div>
      <h1>VERSION FILES</h1>
      <Row>
        {allfiles.map(fl => (
          <Col key={fl._id} sm={12} md={6} lg={4} xl={3}>
            <FormFileByID file={fl} />
          </Col>
          
        ))}
      </Row>
    </div>
  )
}


export default FileScreen