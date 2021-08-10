import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Image, Button } from "react-bootstrap";
import { listProductDetail } from "../../actions/productActions";

const ProductDetail = ({ match }) => {
  const dispatch = useDispatch();
  const productDetail = useSelector((state) => state.productDetail);
  const { loading, product, error } = productDetail;

  useEffect(() => {
    dispatch(listProductDetail(match.params.id));
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
              {product.tracklist.map((track) => (
                <li>{track}</li>
              ))}
            </ul>
            <div>Release Date: {product.releaseDate}</div>
            <div>Price: ${product.price}</div>
            <div>Stock: {product.stockCount}</div>
            <Row>
              <Col>Status: 
              {product.stockCount > 0 ? "In Stock" : "Out Of Stock"}</Col>
            </Row>
            <Button
              className="btn-block"
              type="button"
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
