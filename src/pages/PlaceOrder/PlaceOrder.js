import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { createOrder } from "../../redux/actions/orderActions";

const PlaceOrder = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { order, success, error } = useSelector((state) => state.createOrder);
  //assume shipping and tax are 0
  //cart.taxPrice = 0.00
  //cart.shippingPrice =0.00
  cart.totalPrice = cart.cartItems
    .reduce((acc, item) => acc + item.quantity * item.price, 0)
    .toFixed(2);

  const placeOrderHandler = () => {
    //console.log("place your order");
    dispatch(
      createOrder({
        ...cart,
        orderItems: cart.cartItems,
      })
    );
  };
  useEffect(() => {
    if (success) {
      history.push(`/orders/${order._id}`);
    }
  });

  return (
    <Row>
      <Col>
        <ListGroup>
          <ListGroup.Item>
            <h3>Shipping Address: </h3>
            <>
              {cart.shippingAddress.streetAddress},{cart.shippingAddress.city},
              {cart.shippingAddress.state},{cart.shippingAddress.zipcode}
            </>
          </ListGroup.Item>

          <ListGroup.Item>
            <h3>Payment Information: </h3>
            <>{cart.paymentMethod}</>
          </ListGroup.Item>

          <ListGroup.Item>
            <h3>Order Items</h3>
            {cart.cartItems.length === 0 ? (
              <>Your cart is empty!</>
            ) : (
              <ListGroup>
                {cart.cartItems.map((item, index) => (
                  <ListGroup.Item key={index}>
                    <Row>
                      <Col>
                        <Image src={item.cover} alt={item.title} fluid />
                      </Col>
                      <Col>
                        <Link to={`/products/${item.product}`}>
                          {item.title}
                        </Link>
                      </Col>
                      <Col>
                        {item.quantity} x ${item.price} = $
                        {item.quantity * item.price}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </ListGroup.Item>
        </ListGroup>
      </Col>
      <Col>
        <Card>
          <ListGroup>
            <ListGroup.Item>
              <h3>Order Summary</h3>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Total</Col>
                <Col>${cart.totalPrice}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Button
                disabled={cart.cartItems === 0}
                onClick={placeOrderHandler}
              >
                Place Order
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default PlaceOrder;
