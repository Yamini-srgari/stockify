import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaChartLine } from 'react-icons/fa';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Predict', path: '/predict' },
    { name: 'Compare', path: '/compare' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'About', path: '/about' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        background: scrolled
          ? 'rgba(10, 14, 26, 0.95)'
          : 'rgba(10, 14, 26, 0.7)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(0, 212, 255, 0.1)',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: 'all 0.3s ease',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '70px' }}>
          
          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none' }}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
            >
              <FaChartLine style={{ color: '#00d4ff', fontSize: '24px' }} />
              <span style={{
                fontSize: '22px',
                fontWeight: '700',
                background: 'linear-gradient(135deg, #00d4ff, #a855f7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontFamily: 'Poppins, sans-serif',
              }}>
                Stockify
              </span>
            </motion.div>
          </Link>

          {/* Desktop Links */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} style={{ textDecoration: 'none' }}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    color: location.pathname === link.path ? '#00d4ff' : 'rgba(255,255,255,0.7)',
                    background: location.pathname === link.path
                      ? 'rgba(0, 212, 255, 0.1)'
                      : 'transparent',
                    border: location.pathname === link.path
                      ? '1px solid rgba(0, 212, 255, 0.3)'
                      : '1px solid transparent',
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: '500',
                    fontSize: '20px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {link.name}
                </motion.div>
              </Link>
            ))}

           {/* Username */}
<span style={{
  color: '#00d4ff',
  fontFamily: 'Poppins, sans-serif',
  fontWeight: '600',
  fontSize: '14px',
  marginLeft: '8px',
}}>
  👤 {localStorage.getItem('username')}
</span>

{/* Logout Button */}
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  onClick={() => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    window.location.href = '/login';
  }}
  style={{
    padding: '8px 20px',
    fontFamily: 'Poppins, sans-serif',
    fontWeight: '600',
    fontSize: '14px',
    marginLeft: '8px',
    background: 'rgba(255,68,68,0.1)',
    border: '1px solid rgba(255,68,68,0.3)',
    borderRadius: '8px',
    color: '#ff4444',
    cursor: 'pointer',
  }}
>
  🚪 Logout
</motion.button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;