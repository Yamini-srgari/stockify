import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaPython, FaReact, FaDatabase } from 'react-icons/fa';
import { SiTensorflow, SiFlask, SiScikitlearn } from 'react-icons/si';

const About = () => {
  return (
    <div style={{ paddingTop: '90px', padding: '90px 24px 40px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'Poppins, sans-serif' }}>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ marginBottom: '60px', textAlign: 'center' }}
      >
        <h1 style={{ fontSize: '48px', fontWeight: '800', marginBottom: '16px' }}>
          About{' '}
          <span style={{
            background: 'linear-gradient(135deg, #00d4ff, #a855f7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Stockify
          </span>
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '20px', maxWidth: '600px', margin: '0 auto' }}>
          An AI powered stock price prediction platform built with cutting edge deep learning technology
        </p>
      </motion.div>

      {/* Project Description */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        style={{
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(0,212,255,0.2)',
          borderRadius: '20px',
          padding: '40px',
          marginBottom: '32px',
        }}
      >
        <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '20px' }}>
          🚀 About the Project
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '18px', lineHeight: '1.8', marginBottom: '16px' }}>
          Stockify is an AI powered stock price prediction platform that uses a
          Bidirectional GRU (Gated Recurrent Unit) neural network to predict
          stock prices with high accuracy.
        </p>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '18px', lineHeight: '1.8', marginBottom: '16px' }}>
          The platform allows users to predict prices for any stock, compare
          two stocks side by side, track their portfolio and visualize future
          price trends with beautiful interactive charts.
        </p>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '18px', lineHeight: '1.8' }}>
          Built with React frontend, Flask backend and TensorFlow deep learning
          framework, Stockify provides a professional grade stock analysis
          experience.
        </p>
      </motion.div>

      {/* Model Architecture */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        style={{
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(0,212,255,0.2)',
          borderRadius: '20px',
          padding: '40px',
          marginBottom: '32px',
        }}
      >
        <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '24px' }}>
          🤖 Model Architecture
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
          <div>
            <h3 style={{ color: '#00d4ff', fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>
              Neural Network Layers
            </h3>
            {[
              { layer: 'Input Layer', desc: '60 days × 5 features' },
              { layer: 'Bidirectional GRU (128)', desc: 'Learns forward & backward patterns' },
              { layer: 'BatchNormalization', desc: 'Stabilizes training' },
              { layer: 'Dropout (0.3)', desc: 'Prevents overfitting' },
              { layer: 'Bidirectional GRU (64)', desc: 'Deeper pattern extraction' },
              { layer: 'GRU (32)', desc: 'Final pattern learning' },
              { layer: 'Dense (1)', desc: 'Outputs predicted price' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '12px',
                  padding: '12px',
                  background: 'rgba(0,212,255,0.05)',
                  borderRadius: '8px',
                  border: '1px solid rgba(0,212,255,0.1)',
                }}
              >
                <div style={{
                  width: '8px', height: '8px',
                  borderRadius: '50%',
                  background: '#00d4ff',
                  flexShrink: 0,
                }} />
                <div>
                  <p style={{ color: '#00d4ff', fontSize: '14px', fontWeight: '600' }}>{item.layer}</p>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px' }}>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div>
            <h3 style={{ color: '#a855f7', fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>
              Input Features
            </h3>
            {[
              { feature: 'Close Price', desc: 'Daily closing stock price' },
              { feature: 'Volume', desc: 'Number of shares traded' },
              { feature: 'MA20', desc: '20-day moving average' },
              { feature: 'MA50', desc: '50-day moving average' },
              { feature: 'Pct Change', desc: 'Daily % price change' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '12px',
                  padding: '12px',
                  background: 'rgba(168,85,247,0.05)',
                  borderRadius: '8px',
                  border: '1px solid rgba(168,85,247,0.1)',
                }}
              >
                <div style={{
                  width: '8px', height: '8px',
                  borderRadius: '50%',
                  background: '#a855f7',
                  flexShrink: 0,
                }} />
                <div>
                  <p style={{ color: '#a855f7', fontSize: '14px', fontWeight: '600' }}>{item.feature}</p>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px' }}>{item.desc}</p>
                </div>
              </motion.div>
            ))}

            <h3 style={{ color: '#00ff88', fontSize: '20px', fontWeight: '600', marginBottom: '16px', marginTop: '24px' }}>
              Training Settings
            </h3>
            {[
              { label: 'Window Size', value: '60 days' },
              { label: 'Epochs', value: '100' },
              { label: 'Batch Size', value: '16' },
              { label: 'Optimizer', value: 'Adam' },
              { label: 'Loss Function', value: 'MSE' },
              { label: 'Early Stopping', value: 'Patience 10' },
            ].map((item, i) => (
              <div key={i} style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '10px 12px',
                background: 'rgba(0,255,136,0.05)',
                borderRadius: '8px',
                border: '1px solid rgba(0,255,136,0.1)',
                marginBottom: '8px',
              }}>
                <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>{item.label}</span>
                <span style={{ color: '#00ff88', fontSize: '14px', fontWeight: '600' }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Tech Stack */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        style={{
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(0,212,255,0.2)',
          borderRadius: '20px',
          padding: '40px',
          marginBottom: '32px',
        }}
      >
        <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '24px' }}>
          🛠️ Tech Stack
        </h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'rgba(0,212,255,0.1)' }}>
              {['Technology', 'Purpose', 'Version'].map((h) => (
                <th key={h} style={{
                  padding: '14px 16px',
                  color: '#00d4ff',
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: '600',
                  fontSize: '16px',
                  textAlign: 'left',
                  borderBottom: '1px solid rgba(0,212,255,0.2)',
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { tech: '⚛️ React', purpose: 'Frontend UI', version: '18.x' },
              { tech: '🐍 Python', purpose: 'Backend Language', version: '3.13' },
              { tech: '🌶️ Flask', purpose: 'REST API Backend', version: '3.x' },
              { tech: '🧠 TensorFlow', purpose: 'Deep Learning Model', version: '2.x' },
              { tech: '📊 Recharts', purpose: 'Data Visualization', version: '2.x' },
              { tech: '✨ Framer Motion', purpose: 'Animations', version: '11.x' },
              { tech: '🗄️ SQLite', purpose: 'User Database', version: '3.x' },
              { tech: '🔐 JWT', purpose: 'Authentication', version: 'Latest' },
              { tech: '🔒 Bcrypt', purpose: 'Password Hashing', version: 'Latest' },
              { tech: '📈 yFinance', purpose: 'Stock Data API', version: 'Latest' },
              { tech: '🔢 NumPy', purpose: 'Numerical Computing', version: 'Latest' },
              { tech: '🐼 Pandas', purpose: 'Data Processing', version: 'Latest' },
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '14px 16px', color: 'white', fontSize: '15px', fontWeight: '600' }}>{row.tech}</td>
                <td style={{ padding: '14px 16px', color: 'rgba(255,255,255,0.7)', fontSize: '15px' }}>{row.purpose}</td>
                <td style={{ padding: '14px 16px', color: '#a855f7', fontSize: '15px' }}>{row.version}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {/* Performance Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        style={{
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(0,212,255,0.2)',
          borderRadius: '20px',
          padding: '40px',
          marginBottom: '32px',
        }}
      >
        <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '24px' }}>
          🏆 Model Performance
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          {[
            { stock: 'AAPL', rmse: '12.45', accuracy: '98.8%', error: '0.4%', color: '#00d4ff' },
            { stock: 'TSLA', rmse: '11.03', accuracy: '98.9%', error: '2.5%', color: '#a855f7' },
            { stock: 'META', rmse: '13.20', accuracy: '98.7%', error: '2.1%', color: '#00ff88' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: `1px solid ${item.color}33`,
                borderRadius: '16px',
                padding: '24px',
                textAlign: 'center',
              }}
            >
              <h3 style={{ color: item.color, fontSize: '28px', fontWeight: '800', marginBottom: '16px' }}>
                {item.stock}
              </h3>
              {[
                { label: 'RMSE', value: item.rmse },
                { label: 'Accuracy', value: item.accuracy },
                { label: 'Avg Error', value: item.error },
              ].map((m, j) => (
                <div key={j} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '8px 0',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                }}>
                  <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>{m.label}</span>
                  <span style={{ color: 'white', fontSize: '14px', fontWeight: '600' }}>{m.value}</span>
                </div>
              ))}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Developer Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        style={{
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(0,212,255,0.2)',
          borderRadius: '20px',
          padding: '40px',
          textAlign: 'center',
        }}
      >
        <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '24px' }}>
          👩‍💻 Developer
        </h2>
        <div style={{
          width: '80px', height: '80px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #00d4ff, #a855f7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '36px',
          margin: '0 auto 16px',
        }}>
          👩
        </div>
        <h3 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '8px' }}>Ashokite</h3>
<p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '16px', marginBottom: '24px' }}>
  AI & Machine Learning Developer
</p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <motion.a
            href="#"
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.1 }}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '10px 20px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              color: 'white',
              textDecoration: 'none',
              fontSize: '16px',
            }}
          >
            <FaGithub /> GitHub
          </motion.a>
          <motion.a
            href="mailto:abc@gmail.com"
            whileHover={{ scale: 1.1 }}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '10px 20px',
              background: 'rgba(0,212,255,0.1)',
              border: '1px solid rgba(0,212,255,0.3)',
              borderRadius: '8px',
              color: '#00d4ff',
              textDecoration: 'none',
              fontSize: '16px',
            }}
          >
            <FaEnvelope /> Email
          </motion.a>
        </div>
      </motion.div>

    </div>
  );
};

export default About;