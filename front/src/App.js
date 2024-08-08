import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/features';
import SignIn from './components/SignIn';
import User from './components/User';
import Footer from './components/Footer';
import '../src/assets/css/main.css';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<>
            <Hero />
            <Features />
          </>} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/user" element={<User />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
