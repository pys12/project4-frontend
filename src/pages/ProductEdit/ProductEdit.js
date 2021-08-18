import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductDetail,
  updateProduct,
} from "../../redux/actions/productActions";
import { UPDATE_PRODUCT_RESET } from "../../redux/constants/productConstants";
import './ProductEdit.css'

const ProductEdit = ({ match, history }) => {
  const product_id = match.params.id;
  const [artist, setArtist] = useState("");
  const [title, setTitle] = useState("");
  const [cover, setCover] = useState("");
  const [tracklist, setTracklist] = useState([]);
  const [releaseDate, setReleaseDate] = useState(Date);
  const [price, setPrice] = useState(Number);
  const [stockCount, setStockCount] = useState(Number);

  const dispatch = useDispatch();

  const { loading, error, product } = useSelector(
    (state) => state.productDetail
  );
  const { loading:updating,error:updateFail,success: updated } = useSelector((state) => state.updateProduct);

  useEffect(() => {
    if (updated) {
      dispatch({ type: UPDATE_PRODUCT_RESET });
      history.push("/admin/products");
    } else {
      if (!product.title || product._id !== product_id) {
        dispatch(getProductDetail(product_id));
      } else {
        setArtist(product.artist);
        setTitle(product.title);
        setCover(product.cover);
        setTracklist(product.tracklist);
        setReleaseDate(product.releaseDate);
        setPrice(product.price);
        setStockCount(product.stockCount);
      }
    }
  }, [dispatch, history, product_id, product, updated]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateProduct({
        _id: product_id,
        artist,
        title,
        cover,
        tracklist,
        releaseDate,
        price,
        stockCount,
      })
    );
  };

  return (
      <>
        {updating && <div>loading...</div>}
        {updateFail && {error}}
      <Link to="/admin/products" >
      <i className="fas fa-arrow-alt-circle-left back-arrow"></i>
      </Link>
      <Container>
        <Row className="justify-content-md-center">
          <Col xs={12} md={6}>
            <h1>Edit Product</h1>
            {loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div>{error}</div>
            ) : (
              <Form onSubmit={submitHandler}>
                <Form.Group controlId="artist">
                  <Form.Label>Artist</Form.Label>
                  <Form.Control
                    type="text"
                    value={artist}
                    onChange={(e) => setArtist(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="title">
                  <Form.Label>title</Form.Label>
                  <Form.Control
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="cover">
                  <Form.Label>Cover</Form.Label>
                  <Form.Control
                    type="text"
                    value={cover}
                    onChange={(e) => setCover(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="tracklist">
                  <Form.Label>Track List</Form.Label>
                  <Form.Control
                    type="text"
                    value={tracklist}
                    onChange={(e) => setTracklist(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="releaseDate">
                  <Form.Label>Release Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={releaseDate}
                    onChange={(e) => setReleaseDate(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="price">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                        type="number"
                        min='0.01'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="stockCount">
                  <Form.Label>Stock Count</Form.Label>
                  <Form.Control
                        type="number"
                        min='1'
                    value={stockCount}
                    onChange={(e) => setStockCount(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Button type="submit" variant="primary">
                  Save
                </Button>
              </Form>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProductEdit;
