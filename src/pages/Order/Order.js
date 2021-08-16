import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetail } from "../../redux/actions/orderActions";

const Order = ({ match }) => {

  const order_id = match.params.id;
  const dispatch = useDispatch();

  const { order, loading, error } = useSelector((state) => state.orderDetail);
  
  useEffect(() => {
    if (!order || order._id !== order_id) {
      dispatch(getOrderDetail(order_id));
    }
  }, [order, order_id]);

  return (
    <>
      {loading ? (
        <div> Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <Row>
          <h1>Order #{order_id}</h1>
          <Col>
            <ListGroup>
              <ListGroup.Item>
                <h3>Shipping Address: </h3>
                <>
                  {order.shippingAddress.streetAddress},
                  {order.shippingAddress.city},{order.shippingAddress.state},
                  {order.shippingAddress.zipcode}
                </>
              </ListGroup.Item>

              <ListGroup.Item>
                <h3>Payment Information: </h3>
                <>{order.paymentMethod}</>
              </ListGroup.Item>

              <ListGroup.Item>
                <h3>Order Items</h3>
                {order.orderItems.length === 0 ? (
                  <>Your cart is empty!</>
                ) : (
                  <ListGroup>
                    {order.orderItems.map((item, index) => (
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
                    <Col>${order.totalPrice}</Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default Order;
