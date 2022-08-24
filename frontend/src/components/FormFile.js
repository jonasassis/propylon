import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import photo from '../img/file.png';

function FormFile({ file }) {
  return (
    <Card className="my-2 p-2 rounded">

      <Card.Text class="text-center" as="h5">
        {file.filename}
      </Card.Text>

      <Link to={`/file/${file.id}`}>
        <Card.Img width="150" class="img-thumbnail rounded mx-auto d-block"  src={photo} />
      </Link>
    </Card>
  )
}

export default FormFile