import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SplashScreen from './components/SplashScreen';
import Home from './pages/Home';
import Predict from './pages/Predict';
import Compare from './pages/Compare';
import Portfolio from './pages/Portfolio';
import About from './pages/About';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}
      {!showSplash && (
        <Router>
          <div className="min-h-screen" style={{ backgroundColor: '#0a0e1a' }}>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/predict" element={<Predict />} />
              <Route path="/compare" element={<Compare />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </div>
        </Router>
      )}
    </>
  );
}

export default App;