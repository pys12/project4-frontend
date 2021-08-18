import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Row, Col, ListGroup, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetail, payOrder } from "../../redux/actions/orderActions";
import { PayPalButton } from "react-paypal-button-v2";
import { ORDER_PAY_RESET } from "../../redux/constants/orderConstants";
import "./Order.css";

const Order = ({ match }) => {
  const order_id = match.params.id;
  const dispatch = useDispatch();
  const [sdkReady, setSdkReady] = useState(false);
  const orderPay = useSelector((state) => state.orderPay);
  const { success: successPay } = orderPay;
  const { order, loading, error } = useSelector((state) => state.orderDetail);

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (!order || successPay || order._id !== order_id) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderDetail(order_id));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, order, order_id, successPay]);

  const paymentHandler = (paymentResult) => {
    dispatch(payOrder(order_id, paymentResult));
  };

  return (
    <>
      {loading ? (
        <div> Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <Row>
          <div className="confirm-num">Order Confirmation# {order_id}</div>
          <Col md={6}>
            <ListGroup>
              <ListGroup.Item className="order-detail">
                <h3 className="shipping-address">Shipping Address: </h3>
                <div className="address">
                  {" "}
                  <i className="fas fa-location-arrow"></i>{" "}
                  {order.shippingAddress.streetAddress},
                  {order.shippingAddress.city},{order.shippingAddress.state},
                  {order.shippingAddress.zipcode}
                </div>
              </ListGroup.Item>

              <ListGroup.Item className="order-detail">
                <h3 className="payment-info">Payment Information: </h3>
                <div className="payment-method">
                  <i className="far fa-credit-card"></i> {order.paymentMethod}
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={5}>
            <ListGroup className="order-summary">
              <ListGroup.Item>
                <h3>Order Summary</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <h5>Order Items</h5>
              </ListGroup.Item>
              {order.orderItems.map((item, index) => (
                <ListGroup.Item key={index}>
                  <Row>
                    <Col>
                      <Image
                        className="order-img"
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
                </ListGroup.Item>
              ))}

              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {!sdkReady ? (
                    <div>Loading...</div>
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={paymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )}
              {order.isPaid && (
                <ListGroup.Item className='ty-msg'>
                  <div><i className="far fa-check-circle"></i> Thank you for your payment!</div>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Col>
        </Row>
      )}
    </>
  );
};

export default Order;
