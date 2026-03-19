import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaChartLine, FaRobot, FaBolt } from 'react-icons/fa';

const Home = () => {
  return (
    <div style={{ paddingTop: '70px', fontFamily: 'Poppins, sans-serif' }}>

      {/* Hero Section */}
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '0 24px',
        background: 'radial-gradient(ellipse at center, rgba(0,212,255,0.05) 0%, transparent 70%)',
      }}>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            background: 'rgba(0, 212, 255, 0.1)',
            border: '1px solid rgba(0, 212, 255, 0.3)',
            borderRadius: '50px',
            padding: '6px 20px',
            color: '#00d4ff',
            fontSize: '13px',
            fontWeight: '500',
            marginBottom: '24px',
          }}
        >
          🤖 AI Powered Stock Prediction
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            fontSize: '80px',
            fontWeight: '800',
            lineHeight: '1.1',
            marginBottom: '24px',
            maxWidth: '800px',
          }}
        >
          Predict Stock Prices{' '}
          <span style={{
            background: 'linear-gradient(135deg, #00d4ff, #a855f7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            with AI
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            fontSize: '22px',
            color: 'rgba(255,255,255,0.6)',
            maxWidth: '600px',
            lineHeight: '1.7',
            marginBottom: '40px',
          }}
        >
          Using advanced Bidirectional GRU neural networks to predict 
          stock prices with high accuracy. Compare stocks, track your 
          portfolio and make smarter investment decisions.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}
        >
          <Link to="/predict" style={{ textDecoration: 'none' }}>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0,212,255,0.5)' }}
              whileTap={{ scale: 0.95 }}
              className="btn-gradient"
              style={{ padding: '14px 32px', fontSize: '16px', fontWeight: '600', fontFamily: 'Poppins' }}
            >
              🚀 Start Predicting
            </motion.button>
          </Link>
          <Link to="/compare" style={{ textDecoration: 'none' }}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: '14px 32px',
                fontSize: '16px',
                fontWeight: '600',
                fontFamily: 'Poppins',
                background: 'transparent',
                border: '1px solid rgba(0,212,255,0.4)',
                borderRadius: '8px',
                color: '#00d4ff',
                cursor: 'pointer',
              }}
            >
              📊 Compare Stocks
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* Features Section */}
      <div style={{
        padding: '80px 24px',
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            textAlign: 'center',
            fontSize: '50px',
            fontWeight: '700',
            marginBottom: '16px',
          }}
        >
          Why{' '}
          <span style={{
            background: 'linear-gradient(135deg, #00d4ff, #a855f7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Stockify?
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            textAlign: 'center',
            color: 'rgba(255,255,255,0.5)',
            marginBottom: '60px',
            fontSize: '16px',
          }}
        >
          Built with cutting-edge AI technology for accurate predictions
        </motion.p>

        {/* Feature Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          {[
            {
              icon: <FaRobot style={{ fontSize: '32px', color: '#00d4ff' }} />,
              title: 'AI Powered',
              desc: 'Bidirectional GRU neural network trained on years of stock market data for accurate predictions.',
              color: '#00d4ff',
            },
            {
              icon: <FaChartLine style={{ fontSize: '32px', color: '#a855f7' }} />,
              title: 'Real Time Data',
              desc: 'Fetches real stock data from Yahoo Finance and provides instant predictions with beautiful charts.',
              color: '#a855f7',
            },
            {
              icon: <FaBolt style={{ fontSize: '32px', color: '#00ff88' }} />,
              title: 'Compare Stocks',
              desc: 'Compare two stocks side by side with detailed analysis, charts and performance metrics.',
              color: '#00ff88',
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.03, boxShadow: `0 0 30px ${feature.color}22` }}
              className="glass"
              style={{ padding: '32px', cursor: 'pointer' }}
            >
              <div style={{ marginBottom: '16px' }}>{feature.icon}</div>
              <h3 style={{ fontSize: '26px', fontWeight: '600', marginBottom: '12px' }}>
                {feature.title}
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: '1.7', fontSize: '18px' }}>
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* How it works Section */}
      <div style={{
        padding: '80px 24px',
        background: 'rgba(0,212,255,0.02)',
        borderTop: '1px solid rgba(0,212,255,0.1)',
        borderBottom: '1px solid rgba(0,212,255,0.1)',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ textAlign: 'center', fontSize: '40px', fontWeight: '700', marginBottom: '60px' }}
          >
            How It{' '}
            <span style={{
              background: 'linear-gradient(135deg, #00d4ff, #a855f7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Works
            </span>
          </motion.h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {[
              { step: '01', title: 'Enter Stock Ticker', desc: 'Type any stock symbol like AAPL, TSLA, GOOGL and select your date range.' },
              { step: '02', title: 'AI Analyzes Data', desc: 'Our GRU model processes historical data and learns patterns to make predictions.' },
              { step: '03', title: 'View Results', desc: 'See beautiful charts comparing actual vs predicted prices with accuracy metrics.' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                style={{ textAlign: 'center', padding: '32px' }}
              >
                <div style={{
                  fontSize: '48px',
                  fontWeight: '800',
                  background: 'linear-gradient(135deg, #00d4ff, #a855f7)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '16px',
                }}>
                  {item.step}
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px' }}>{item.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: '1.7', fontSize: '14px' }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div style={{ padding: '80px 24px', textAlign: 'center' }}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ fontSize: '40px', fontWeight: '700', marginBottom: '16px' }}
        >
          Ready to Predict? 🚀
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '32px', fontSize: '16px' }}
        >
          Start predicting stock prices with AI today!
        </motion.p>
        <Link to="/predict" style={{ textDecoration: 'none' }}>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0,212,255,0.5)' }}
            whileTap={{ scale: 0.95 }}
            className="btn-gradient"
            style={{ padding: '16px 40px', fontSize: '18px', fontWeight: '600', fontFamily: 'Poppins' }}
          >
            🚀 Get Started Now
          </motion.button>
        </Link>
      </div>

    </div>
  );
};

export default Home;