import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Image, Button, Form } from "react-bootstrap";
import { getProductDetail } from "../../redux/actions/productActions";

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
    <>
      {loading ? (
        <div> Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <Row>
          <Col>
            <Image src={product.cover} />
          </Col>
          <Col>
            <div>Artist: {product.artist}</div>
            <div>Title: {product.title}</div>
            <ul>
              Tracklist:
              {product.tracklist.map((track,index) => (
                <li key={index}>{track}</li>
              ))}
            </ul>
            <div>Release Date: {new Date(product.releaseDate).toLocaleDateString().replaceAll('/','-')}</div>
            <div>Price: ${product.price}</div>
            <div>Stock: {product.stockCount}</div>
          </Col>
          <Col>
            Status:
            {product.stockCount > 0 ? "In Stock" : "Out Of Stock"}
            {product.stockCount > 0 && (
              <>
                <Col>Quantity</Col>
                <Col>
                  <Form.Control
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
              </>
            )}
            <Button
              className="btn-block"
              type="button"
              onClick={addToCartHandler}
              disabled={product.stockCount === 0}
            >
              Add To Cart
            </Button>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductDetail;
