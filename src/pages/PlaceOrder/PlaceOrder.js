import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Row, Col, ListGroup, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { createOrder } from "../../redux/actions/orderActions";
import "./PlaceOrder.css";

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
    <div className="place-order-page">
      <Row>
        <Col md={5}>
          <ListGroup>
            <ListGroup.Item className="order-detail">
              <h3 className="shipping-address">Shipping Address: </h3>
              <div className="address">
                <i className="fas fa-location-arrow"></i>{" "}
                {cart.shippingAddress.streetAddress},{" "}
                {cart.shippingAddress.city}, {cart.shippingAddress.state},{" "}
                {cart.shippingAddress.zipcode}
              </div>
            </ListGroup.Item>

            <ListGroup.Item className="order-detail">
              <h3 className="payment-info">Payment Information: </h3>
              <div className="payment-method">
                <i className="far fa-credit-card"></i> {cart.paymentMethod}
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={6}>
          <ListGroup>
            <ListGroup.Item>
              <h3>Order Summary</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <h5>Order Items</h5>
            </ListGroup.Item>
            <ListGroup.Item>
              {cart.cartItems.map((item, index) => (
                <Row>
                  <Col>
                    <Image
                      className="cart-img"
                      src={item.cover}
                      alt={item.title}
                      fluid
                    />
                  </Col>
                  <Col>
                    <Link to={`/products/${item.product}`}>{item.title}</Link>
                  </Col>
                  <Col>
                    {item.quantity} x ${item.price} = $
                    {item.quantity * item.price}
                  </Col>
                </Row>
              ))}
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Shipping:</Col>
                <Col>$0.00</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Tax:</Col>
                <Col>$0.00</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Total:</Col>
                <Col>${cart.totalPrice}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item className="place-order-btn">
              <Button
                disabled={cart.cartItems === 0}
                onClick={placeOrderHandler}
              >
                Place Order
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </div>
  );
};

export default PlaceOrder;
