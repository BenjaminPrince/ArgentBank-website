import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Pour vérifier l'état d'authentification
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/features';
import SignIn from './components/SignIn';
import User from './components/User';
import Footer from './components/Footer';
import '../src/assets/css/main.css';

// Composant pour les routes protégées
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Vérifie si l'utilisateur est connecté
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/'); // Redirige vers la page d'accueil si non authentifié
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? children : null; // Rend le composant enfant si authentifié, sinon renvoie null
};

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        {/* Route de la page d'accueil */}
        <Route 
          path="/" 
          element={
            <>
              <Hero />
              <Features />
            </>
          } 
        />
        
        {/* Route pour la page de connexion */}
        <Route path="/sign-in" element={<SignIn />} />
        
        {/* Route protégée pour l'utilisateur authentifié */}
        <Route 
          path="/user" 
          element={
            <ProtectedRoute>
              <User />
            </ProtectedRoute>
          } 
        />

        {/* Redirige toute URL incorrecte vers la page d'accueil complète */}
        <Route 
          path="*" 
          element={
            <>
              <Hero />
              <Features />
            </>
          } 
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
