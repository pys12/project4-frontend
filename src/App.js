import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import Cart from './pages/Cart/Cart'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Shipping from "./pages/Shipping/Shipping";
import Payment from "./pages/Payment/Payment";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Container>
          <Route path='/payment' component={Payment} />
          <Route path='/shipping' component={Shipping} />
          <Route path='/register' component={Register} />
          <Route path='/login' component={Login} />
          <Route path='/cart/:id?' component={Cart} />
          <Route path='/products/:id' component={ProductDetail} />
          <Route path='/' component={Home} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
