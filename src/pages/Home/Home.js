import React from 'react'
import { Row, Col } from 'react-bootstrap'
import Albums from '../../components/Products/Albums/Albums'
const Home = () => {
    return (
        <>
            <Row>
                <Col sm={12} md={6} lg={4} xl={3}>
                    products home<Albums />
                </Col>
        </Row>
        </>
    )
}

export default Home
