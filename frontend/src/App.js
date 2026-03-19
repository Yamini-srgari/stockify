import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import SplashScreen from './components/SplashScreen';
import Home from './pages/Home';
import Predict from './pages/Predict';
import Compare from './pages/Compare';
import Portfolio from './pages/Portfolio';
import About from './pages/About';
import Login from './pages/Login';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" />;
  }
  return children;
};

function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}
      {!showSplash && (
        <Router>
          <div className="min-h-screen" style={{ backgroundColor: '#0a0e1a' }}>
            <Routes>
              {/* Public Route */}
              <Route path="/login" element={<Login />} />

              {/* Protected Routes */}
              <Route path="/" element={
                <ProtectedRoute>
                  <Navbar />
                  <Home />
                </ProtectedRoute>
              } />
              <Route path="/predict" element={
                <ProtectedRoute>
                  <Navbar />
                  <Predict />
                </ProtectedRoute>
              } />
              <Route path="/compare" element={
                <ProtectedRoute>
                  <Navbar />
                  <Compare />
                </ProtectedRoute>
              } />
              <Route path="/portfolio" element={
                <ProtectedRoute>
                  <Navbar />
                  <Portfolio />
                </ProtectedRoute>
              } />
              <Route path="/about" element={
                <ProtectedRoute>
                  <Navbar />
                  <About />
                </ProtectedRoute>
              } />
            </Routes>
          </div>
        </Router>
      )}
    </>
  );
}

export default App;