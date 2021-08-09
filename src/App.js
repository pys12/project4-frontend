import React,{useState, useEffect} from "react";
import './App.css';
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Albums from './components/Products/Albums/Albums';
function App() {
  return (
    <div className="App">
      <Header />
      <Albums />
      <Footer />
    </div>
  );
}

export default App;
