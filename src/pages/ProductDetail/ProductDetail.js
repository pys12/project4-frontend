import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Image, Button, Form } from "react-bootstrap";
import { getProductDetail } from "../../redux/actions/productActions";
import './ProductDetail.css'

const ProductDetail = ({ match, history }) => {

  const dispatch = useDispatch();
  const productDetail = useSelector((state) => state.productDetail);

  const { loading, product, error } = productDetail;
  const [quantity, setQuantity] = useState(1);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?quantity=${quantity}`);
  };

  useEffect(() => {
    dispatch(getProductDetail(match.params.id));
  }, [dispatch, match]);

  return (
    <div className='product-detail'>
      {loading ? (
        <div> Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <Row>
          <Col md={7} >
            <Image className="cover-img" src={product.cover} />
          </Col>
          <Col className="p-5" md={5}>
            <div className='artist'>{product.artist}</div>
            <div className='title'>Title: {product.title}</div>
            
            <div>Release Date: {new Date(product.releaseDate).toLocaleDateString().replaceAll('/','-')}</div>
            <>Status: 
            {product.stockCount > 0 ? " In Stock" : <span className='out-of-stock'> Out Of Stock</span>}</>
            <div>Stock: {product.stockCount}</div>
            <div className='price'>Price: ${product.price}</div>
            {product.stockCount > 0 && (
              <Col>
                Quantity:
                  <Form.Control className='quantity-select'
                    as="select"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  >
                    {[...Array(product.stockCount).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </Form.Control>
                  
              </Col>
            )}
            <Button
              className="btn"
              type="button"
              onClick={addToCartHandler}
              disabled={product.stockCount === 0}
              >
              Add To Cart
                </Button>
                <div className='detail'>
                <div>Tracklist:</div>
                <ul>
               {product.tracklist.map((track,index) => (
                   <li key={index}>{track}</li>
                ))}
                  </ul>
                  </div>
              </Col>
        
          
        </Row>
      )}
    </div>
  );
};

export default ProductDetail;
