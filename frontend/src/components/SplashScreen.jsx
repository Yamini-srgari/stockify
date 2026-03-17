
import React, { useEffect, useState } from 'react';

const SplashScreen = ({ onFinish }) => {
  const [showLetters, setShowLetters] = useState(false);
  const [coinReachedCenter, setCoinReachedCenter] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const coinTimer = setTimeout(() => setCoinReachedCenter(true), 3500);
    const lettersTimer = setTimeout(() => setShowLetters(true), 3700);
    const fadeTimer = setTimeout(() => setFadeOut(true), 5500);
    const finishTimer = setTimeout(() => onFinish(), 6000);

    return () => {
      clearTimeout(coinTimer);
      clearTimeout(lettersTimer);
      clearTimeout(fadeTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: '#0a0e1a',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      opacity: fadeOut ? 0 : 1,
      transition: 'opacity 0.5s ease',
    }}>

      {/* Grid Background */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', opacity: 0.3 }}>
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#00d4ff" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Glow Blobs */}
      <div style={{
        position: 'fixed', top: '25%', left: '-8rem',
        width: '24rem', height: '24rem',
        background: 'rgba(0,212,255,0.2)',
        borderRadius: '50%', filter: 'blur(60px)',
        animation: 'pulse 2s infinite',
      }} />
      <div style={{
        position: 'fixed', bottom: '25%', right: '-8rem',
        width: '24rem', height: '24rem',
        background: 'rgba(168,85,247,0.2)',
        borderRadius: '50%', filter: 'blur(60px)',
        animation: 'pulse 2s infinite',
      }} />

      {/* Main Content */}
      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>

        {/* St[coin]ckify Letters */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

          {/* S */}
          <span style={{
            fontSize: '120px', fontWeight: '900',
            color: 'white', fontFamily: 'Poppins, sans-serif',
            animation: showLetters ? 'fadeInUp 0.6s ease-out 0.1s forwards' : 'none',
            opacity: showLetters ? 1 : 0,
          }}>S</span>

          {/* t */}
          <span style={{
            fontSize: '120px', fontWeight: '900',
            color: 'white', fontFamily: 'Poppins, sans-serif',
            animation: showLetters ? 'fadeInUp 0.6s ease-out 0.2s forwards' : 'none',
            opacity: showLetters ? 1 : 0,
          }}>t</span>

          {/* Coin */}
          <div style={{
            width: '120px', height: '120px',
            margin: '0 8px', position: 'relative', top: '4px',
            perspective: '1000px', flexShrink: 0,
          }}>
            <div style={{
              width: '100%', height: '100%',
              transformStyle: 'preserve-3d',
              animation: !coinReachedCenter
                ? 'rollInFromRight 3.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards'
                : 'none',
            }}>
              <div style={{
                width: '100%', height: '100%',
                transformStyle: 'preserve-3d',
                animation: !coinReachedCenter ? 'spinCoin 3.5s linear' : 'none',
              }}>
                {/* Coin Front */}
                <div style={{
                  position: 'absolute', inset: 0,
                  borderRadius: '50%', overflow: 'hidden',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'linear-gradient(135deg, #00d4ff, #a855f7)',
                  boxShadow: '0 0 60px rgba(0,212,255,0.8), 0 0 100px rgba(0,212,255,0.4)',
                  backfaceVisibility: 'hidden',
                }}>
                  <img src="/coin.jpg" alt="coin"
                    style={{ width: '100%', height: '100%',
                    borderRadius: '50%', objectFit: 'cover' }} />
                </div>

                {/* Coin Back */}
                <div style={{
                  position: 'absolute', inset: 0,
                  borderRadius: '50%', overflow: 'hidden',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'linear-gradient(135deg, #a855f7, #00d4ff)',
                  boxShadow: '0 0 60px rgba(168,85,247,0.8)',
                  transform: 'rotateY(180deg)',
                  backfaceVisibility: 'hidden',
                }}>
                  <img src="/coin.jpg" alt="coin"
                    style={{ width: '100%', height: '100%',
                    borderRadius: '50%', objectFit: 'cover' }} />
                </div>
              </div>
            </div>
          </div>

          {/* ckify */}
          {['c', 'k', 'i', 'f', 'y'].map((letter, i) => (
            <span key={i} style={{
              fontSize: '120px', fontWeight: '900',
              color: 'white', fontFamily: 'Poppins, sans-serif',
              animation: showLetters ? `fadeInUp 0.6s ease-out ${0.3 + i * 0.1}s forwards` : 'none',
              opacity: showLetters ? 1 : 0,
            }}>{letter}</span>
          ))}
        </div>

        {/* Sweep Effect */}
        <div style={{
          width: '100%', height: '4px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(0,212,255,0.8) 50%, transparent 100%)',
          animation: showLetters ? 'sweepEffect 1.5s ease-in-out 3.7s forwards' : 'none',
          opacity: 0,
          filter: 'blur(4px)',
          marginTop: '8px',
        }} />

        {/* Subtitle */}
        <p style={{
          color: 'rgba(255,255,255,0.7)',
          fontSize: '26px',
          fontFamily: 'Poppins, sans-serif',
          fontWeight: '300',
          letterSpacing: '6px',
          marginTop: '24px',
          animation: showLetters ? 'fadeInUp 0.8s ease-out 0.9s forwards' : 'none',
          opacity: showLetters ? 1 : 0,
        }}>
          Predict. Trade. Profit.
        </p>

        {/* Loading Bar */}
        <div style={{
          width: '300px',
          height: '4px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '3px',
          margin: '40px auto 0',
          overflow: 'hidden',
          animation: showLetters ? 'fadeInUp 0.8s ease-out 1.1s forwards' : 'none',
          opacity: showLetters ? 1 : 0,
        }}>
          <div style={{
            height: '100%',
            background: 'linear-gradient(90deg, #00d4ff, #a855f7)',
            borderRadius: '3px',
            animation: 'loadingBar 2s ease-in-out 4s forwards',
            width: '0%',
          }} />
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes rollInFromRight {
          0% { transform: translateX(200vw) rotateY(0deg); }
          100% { transform: translateX(0) rotateY(720deg); }
        }
        @keyframes spinCoin {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(720deg); }
        }
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes sweepEffect {
          0% { transform: translateX(-200%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(200%); opacity: 0; }
        }
        @keyframes loadingBar {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;