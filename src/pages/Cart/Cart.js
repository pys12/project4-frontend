import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../../redux/actions/cartActions";
import { Row, Col, Image, Button, Form, ListGroup } from "react-bootstrap";
import './Cart.css'

const Cart = ({ match, history, location }) => {
  const dispatch = useDispatch();
  const quantity = location.search ? Number(location.search.split("=")[1]) : 1;
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (match.params.id) {
      dispatch(addToCart(match.params.id, quantity));
    }
  }, [dispatch, match.params.id, quantity]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkout = () => {
    history.push('/login?redirect=shipping')

  }
  return (
    <div className='cart-page'>
      <Col >
        <h2 className='cart-title'>Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <>
            <div><i class="far fa-frown-open sad-face"></i></div>
            <div className='empty-msg'>Your shopping cart is empty!&nbsp;&nbsp;</div>
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
                    <Col className='cart-item-info'>
                      <Link to={`/products/${item.product}`}>{item.title}</Link>
                    </Col>
                    <Col className='cart-item-info'>${item.price}</Col>
                    <Col className='cart-item-info'>
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
              
              
            <ListGroup className='order-total'>
              <ListGroup.Item className='order-total'>
                Order Summary: (
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)}) items
              </ListGroup.Item>
              <ListGroup.Item className='order-total'>
                Subtotal: $
                {cartItems
                  .reduce((acc, item) => acc + item.quantity * item.price, 0)
                  .toFixed(2)}
                </ListGroup.Item>
                <ListGroup.Item className='order-total'>

              <Button disabled={cartItems.length === 0} onClick={checkout}>
                Proceed To Checkout
              </Button>
                </ListGroup.Item>
                </ListGroup>
                
          </>
        )}
      </Col>
    </div>
  );
};

export default Cart;
