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
            <h5>{product.title}</h5>
            <div>{product.artist}</div>
            </Card.Title>
          <Card.Text>${product.price}</Card.Text>
        </Card.Body>
      </Card>
    )
}

export default Product
