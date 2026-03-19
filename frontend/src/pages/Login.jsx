import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEnvelope, FaLock, FaUser, FaChartLine } from 'react-icons/fa';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ username: '', email: '', password: '', confirm: '' });

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.post('http://127.0.0.1:5000/api/login', loginData);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('username', res.data.username);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed!');
    }
    setLoading(false);
  };

  const handleRegister = async () => {
    setLoading(true);
    setError('');
    if (registerData.password !== registerData.confirm) {
      setError('Passwords do not match!');
      setLoading(false);
      return;
    }
    try {
      await axios.post('http://127.0.0.1:5000/api/register', registerData);
      setSuccess('Account created! Please login.');
      setIsLogin(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed!');
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0a0e1a',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Poppins, sans-serif',
      padding: '24px',
    }}>

      {/* Grid Background */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', opacity: 0.2 }}>
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
        position: 'fixed', top: '20%', left: '-8rem',
        width: '24rem', height: '24rem',
        background: 'rgba(0,212,255,0.15)',
        borderRadius: '50%', filter: 'blur(80px)',
      }} />
      <div style={{
        position: 'fixed', bottom: '20%', right: '-8rem',
        width: '24rem', height: '24rem',
        background: 'rgba(168,85,247,0.15)',
        borderRadius: '50%', filter: 'blur(80px)',
      }} />

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          width: '100%',
          maxWidth: '580px',
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(0,212,255,0.2)',
          borderRadius: '24px',
          padding: '28px',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <FaChartLine style={{ color: '#00d4ff', fontSize: '40px', marginBottom: '12px' }} />
          <h1 style={{
            fontSize: '38px', fontWeight: '800',
            background: 'linear-gradient(135deg, #00d4ff, #a855f7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>Stockify</h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '18px', marginTop: '4px' }}>
            {isLogin ? 'Welcome back! Please login.' : 'Create your account!'}
          </p>
        </div>

        {/* Toggle Buttons */}
        <div style={{
          display: 'flex',
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '12px',
          padding: '4px',
          marginBottom: '28px',
        }}>
          {['Login', 'Register'].map((tab) => (
            <button
              key={tab}
              onClick={() => { setIsLogin(tab === 'Login'); setError(''); setSuccess(''); }}
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: '10px',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'Poppins, sans-serif',
                fontWeight: '600',
                fontSize: '14px',
                transition: 'all 0.3s ease',
                background: (isLogin && tab === 'Login') || (!isLogin && tab === 'Register')
                  ? 'linear-gradient(135deg, #00d4ff, #a855f7)'
                  : 'transparent',
                color: 'white',
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Error/Success Messages */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              background: 'rgba(255,68,68,0.1)',
              border: '1px solid rgba(255,68,68,0.3)',
              borderRadius: '8px',
              padding: '12px',
              color: '#ff4444',
              fontSize: '14px',
              marginBottom: '16px',
              textAlign: 'center',
            }}
          >
            {error}
          </motion.div>
        )}

        {success && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              background: 'rgba(0,255,136,0.1)',
              border: '1px solid rgba(0,255,136,0.3)',
              borderRadius: '8px',
              padding: '12px',
              color: '#00ff88',
              fontSize: '14px',
              marginBottom: '16px',
              textAlign: 'center',
            }}
          >
            {success}
          </motion.div>
        )}

        {/* Login Form */}
        <AnimatePresence mode="wait">
          {isLogin ? (
            <motion.div
              key="login"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Email */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', marginBottom: '8px', display: 'block' }}>
                  Email
                </label>
                <div style={{ position: 'relative' }}>
                  <FaEnvelope style={{
                    position: 'absolute', left: '14px', top: '50%',
                    transform: 'translateY(-50%)', color: '#00d4ff', fontSize: '14px'
                  }} />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    style={{
                      width: '100%', padding: '12px 12px 12px 40px',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(0,212,255,0.2)',
                      borderRadius: '10px', color: 'white',
                      fontFamily: 'Poppins, sans-serif', fontSize: '14px',
                      outline: 'none', boxSizing: 'border-box',
                    }}
                  />
                </div>
              </div>

              {/* Password */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', marginBottom: '8px', display: 'block' }}>
                  Password
                </label>
                <div style={{ position: 'relative' }}>
                  <FaLock style={{
                    position: 'absolute', left: '14px', top: '50%',
                    transform: 'translateY(-50%)', color: '#00d4ff', fontSize: '14px'
                  }} />
                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    style={{
                      width: '100%', padding: '12px 12px 12px 40px',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(0,212,255,0.2)',
                      borderRadius: '10px', color: 'white',
                      fontFamily: 'Poppins, sans-serif', fontSize: '14px',
                      outline: 'none', boxSizing: 'border-box',
                    }}
                  />
                </div>
              </div>

              {/* Login Button */}
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: '0 0 25px rgba(0,212,255,0.4)' }}
                whileTap={{ scale: 0.98 }}
                onClick={handleLogin}
                disabled={loading}
                style={{
                  width: '100%', padding: '14px',
                  background: 'linear-gradient(135deg, #00d4ff, #a855f7)',
                  border: 'none', borderRadius: '10px',
                  color: 'white', fontFamily: 'Poppins, sans-serif',
                  fontWeight: '600', fontSize: '16px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.7 : 1,
                }}
              >
                {loading ? 'Logging in...' : '🚀 Login'}
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="register"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Username */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', marginBottom: '8px', display: 'block' }}>
                  Username
                </label>
                <div style={{ position: 'relative' }}>
                  <FaUser style={{
                    position: 'absolute', left: '14px', top: '50%',
                    transform: 'translateY(-50%)', color: '#00d4ff', fontSize: '14px'
                  }} />
                  <input
                    type="text"
                    placeholder="Choose a username"
                    value={registerData.username}
                    onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
                    style={{
                      width: '100%', padding: '12px 12px 12px 40px',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(0,212,255,0.2)',
                      borderRadius: '10px', color: 'white',
                      fontFamily: 'Poppins, sans-serif', fontSize: '16px',
                      outline: 'none', boxSizing: 'border-box',
                    }}
                  />
                </div>
              </div>

              {/* Email */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '16px', marginBottom: '8px', display: 'block' }}>
                  Email
                </label>
                <div style={{ position: 'relative' }}>
                  <FaEnvelope style={{
                    position: 'absolute', left: '14px', top: '50%',
                    transform: 'translateY(-50%)', color: '#00d4ff', fontSize: '14px'
                  }} />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={registerData.email}
                    onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                    style={{
                      width: '100%', padding: '12px 12px 12px 40px',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(0,212,255,0.2)',
                      borderRadius: '10px', color: 'white',
                      fontFamily: 'Poppins, sans-serif', fontSize: '14px',
                      outline: 'none', boxSizing: 'border-box',
                    }}
                  />

                </div>
              </div>

              {/* Password */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '16px', marginBottom: '8px', display: 'block' }}>
                  Password
                </label>
                <div style={{ position: 'relative' }}>
                  <FaLock style={{
                    position: 'absolute', left: '14px', top: '50%',
                    transform: 'translateY(-50%)', color: '#00d4ff', fontSize: '14px'
                  }} />
                  <input
                    type="password"
                    placeholder="Create a password"
                    value={registerData.password}
                    onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                    style={{
                      width: '100%', padding: '12px 12px 12px 40px',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(0,212,255,0.2)',
                      borderRadius: '10px', color: 'white',
                      fontFamily: 'Poppins, sans-serif', fontSize: '14px',
                      outline: 'none', boxSizing: 'border-box',
                    }}
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', marginBottom: '8px', display: 'block' }}>
                  Confirm Password
                </label>
                <div style={{ position: 'relative' }}>
                  <FaLock style={{
                    position: 'absolute', left: '14px', top: '50%',
                    transform: 'translateY(-50%)', color: '#00d4ff', fontSize: '14px'
                  }} />
                  <input
                    type="password"
                    placeholder="Confirm your password"
                    value={registerData.confirm}
                    onChange={(e) => setRegisterData({ ...registerData, confirm: e.target.value })}
                    style={{
                      width: '100%', padding: '12px 12px 12px 40px',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(0,212,255,0.2)',
                      borderRadius: '10px', color: 'white',
                      fontFamily: 'Poppins, sans-serif', fontSize: '14px',
                      outline: 'none', boxSizing: 'border-box',
                    }}
                  />
                </div>
              </div>

              {/* Register Button */}
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: '0 0 25px rgba(0,212,255,0.4)' }}
                whileTap={{ scale: 0.98 }}
                onClick={handleRegister}
                disabled={loading}
                style={{
                  width: '100%', padding: '14px',
                  background: 'linear-gradient(135deg, #00d4ff, #a855f7)',
                  border: 'none', borderRadius: '10px',
                  color: 'white', fontFamily: 'Poppins, sans-serif',
                  fontWeight: '600', fontSize: '18px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.7 : 1,
                }}
              >
                {loading ? 'Creating account...' : '✨ Create Account'}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Login;