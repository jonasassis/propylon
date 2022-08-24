import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import photo from '../img/file.png';

function FormFileByID({ file }) {
  return (
    <Card className="my-2 p-2 rounded">

      <Card.Text key='filename' className="text-center" as="h5">
        {file.filename}
      </Card.Text>

      <Link key='linkfile' to={`/file/${file.id}`}>
        <Card.Img width="150" className="img-thumbnail rounded mx-auto d-block"  src={photo} />
      </Link>

      <Card.Text key='revision' className="text-center" as="h4">
        version: {file.revision}
      </Card.Text>

      <Button key='button' target="_blank" href={`http://localhost:8000${file.file}`} className='btn btn-primary btn-success'>Download</Button>
    </Card>
  )
}

export default FormFileByID