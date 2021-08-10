import React, { useEffect } from "react";
import Product from '../../components/Product/Product'
import { Row, Col } from "react-bootstrap";
import { listProducts } from "../../actions/productActions";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {

    const dispatch = useDispatch();
    const productList = useSelector(state => state.productList)
    const { loading, products, error } = productList
    
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <div> Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default Home;
