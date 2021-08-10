import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import ProductDetail from "./pages/ProductDetail/ProductDetail";


function App() {
  return (
    <Router>
      <Header />
      <main>
        <Container>
          <Route path='/' component={Home} exact />
          <Route path='/products/:id' component={ProductDetail} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
