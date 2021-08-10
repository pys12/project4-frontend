import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'

const Product = ({product}) => {
    return (
        <Card style={{ width: '18rem' }}>
        <Link to={`/products/${product._id}`}>
          <Card.Img src={product.cover} variant='top' />
        </Link>
        <Card.Body>
            <Card.Title as='div'>
              <div>{product.title}</div>
            </Card.Title>
          <Card.Text as='h5'>${product.price}</Card.Text>
        </Card.Body>
      </Card>
    )
}

export default Product
