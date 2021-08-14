import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../../redux/actions/cartActions";
import { Row, Col, Image, Button, Form, ListGroup } from "react-bootstrap";

const Cart = ({ match, history, location }) => {
  const dispatch = useDispatch();
  // location.search shows ?quantity=${quantity}
  //console.log(location.search)
  const quantity = location.search ? Number(location.search.split("=")[1]) : 1;
  //console.log(quantity)
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  //console.log(cartItems);

  useEffect(() => {
    if (match.params.id) {
      dispatch(addToCart(match.params.id, quantity));
    }
  }, [dispatch, match.params.id, quantity]);

  const removeFromCartHandler = (id) => {
    //console.log('remove')
    dispatch(removeFromCart(id));
  };

  const checkout = () => {
    console.log("checkout")
    history.push('/login?redirect=shipping')

  }
  return (
    <>
      <Col>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <>
            <h3>Your shopping cart is empty!&nbsp;&nbsp;</h3>
            <Link to="/">
              <Button>Back to shopping?</Button>
            </Link>
          </>
        ) : (
          <>
            <ListGroup>
              {cartItems.map((item) => (
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col>
                      <Image src={item.cover} alt={item.title} fluid rounded />
                    </Col>
                    <Col>
                      <Link to={`/products/${item.product}`}>{item.title}</Link>
                    </Col>
                    <Col>${item.price}</Col>
                    <Col>
                      <Form.Control
                        as="select"
                        value={item.quantity}
                        onChange={(e) =>
                          dispatch(
                            addToCart(item.product, Number(e.target.value))
                          )
                        }
                      >
                        {[...Array(item.stockCount).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col>
                      <Button
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        Remove
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
            <Col>
              <h2>
                Order Summary (
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)}) items
              </h2>
              <h3>
                Subtotal $
                {cartItems
                  .reduce((acc, item) => acc + item.quantity * item.price, 0)
                  .toFixed(2)}
              </h3>
              <Button disabled={cartItems.length === 0} onClick={checkout}>
                Proceed To Checkout
              </Button>
            </Col>
          </>
        )}
      </Col>
    </>
  );
};

export default Cart;
