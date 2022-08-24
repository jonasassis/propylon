import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import photo from '../img/file.png';

function FormFile({ file }) {
  return (
    <Card key='card' className="my-2 p-2 rounded">

      <Card.Text key='card-file' className="text-center" as="h5">
        {file.filename}
      </Card.Text>

      <Link key='link-image' to={`/file/${file.id}`}>
        <Card.Img key='image' width="150" className="img-thumbnail rounded mx-auto d-block"  src={photo} />
      </Link>
    </Card>
  )
}

export default FormFile