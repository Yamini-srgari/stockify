
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, BarChart, Bar
} from 'recharts';

const Compare = () => {
  const [ticker1, setTicker1] = useState('AAPL');
  const [ticker2, setTicker2] = useState('TSLA');
  const [start, setStart] = useState('2020-01-01');
  const [end, setEnd] = useState('2024-01-01');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleCompare = async () => {
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const res = await axios.get('http://127.0.0.1:5000/api/compare', {
        params: { ticker1, ticker2, start, end }
      });
      setResult(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Comparison failed!');
    }
    setLoading(false);
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(0,212,255,0.2)',
    borderRadius: '10px',
    color: 'white',
    fontFamily: 'Poppins, sans-serif',
    fontSize: '16px',
    outline: 'none',
    boxSizing: 'border-box',
  };

  const labelStyle = {
    color: 'rgba(255,255,255,0.7)',
    fontSize: '16px',
    marginBottom: '8px',
    display: 'block',
    fontFamily: 'Poppins, sans-serif',
  };

  // Prepare comparison chart data
  const comparisonData = result ? result.actual1.map((val, i) => ({
    index: i,
    [`${result.ticker1} Actual`]: parseFloat(val.toFixed(2)),
    [`${result.ticker1} Predicted`]: parseFloat(result.predictions1[i].toFixed(2)),
  })) : [];

  const comparisonData2 = result ? result.actual2.map((val, i) => ({
    index: i,
    [`${result.ticker2} Actual`]: parseFloat(val.toFixed(2)),
    [`${result.ticker2} Predicted`]: parseFloat(result.predictions2[i].toFixed(2)),
  })) : [];

  // RMSE comparison data
  const rmseData = result ? [
    { name: result.ticker1, RMSE: result.rmse1 },
    { name: result.ticker2, RMSE: result.rmse2 },
  ] : [];

  return (
    <div style={{ paddingTop: '90px', padding: '90px 24px 40px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'Poppins, sans-serif' }}>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ marginBottom: '40px' }}
      >
        <h1 style={{ fontSize: '42px', fontWeight: '800', marginBottom: '8px' }}>
          Stock{' '}
          <span style={{
            background: 'linear-gradient(135deg, #00d4ff, #a855f7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Comparison
          </span>
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '18px' }}>
          Compare two stocks side by side with AI predictions
        </p>
      </motion.div>

      {/* Input Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        style={{
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(0,212,255,0.2)',
          borderRadius: '20px',
          padding: '32px',
          marginBottom: '32px',
        }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '24px', marginBottom: '24px' }}>

          {/* Ticker 1 */}
          <div>
            <label style={{ ...labelStyle, color: '#00d4ff' }}>📈 Stock 1</label>
            <input
              type="text"
              value={ticker1}
              onChange={(e) => setTicker1(e.target.value.toUpperCase())}
              placeholder="e.g. AAPL"
              style={{ ...inputStyle, border: '1px solid rgba(0,212,255,0.4)' }}
            />
          </div>

          {/* Ticker 2 */}
          <div>
            <label style={{ ...labelStyle, color: '#a855f7' }}>📈 Stock 2</label>
            <input
              type="text"
              value={ticker2}
              onChange={(e) => setTicker2(e.target.value.toUpperCase())}
              placeholder="e.g. TSLA"
              style={{ ...inputStyle, border: '1px solid rgba(168,85,247,0.4)' }}
            />
          </div>

          {/* Start Date */}
          <div>
            <label style={labelStyle}>📅 Start Date</label>
            <input
              type="date"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              style={inputStyle}
            />
          </div>

          {/* End Date */}
          <div>
            <label style={labelStyle}>📅 End Date</label>
            <input
              type="date"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              style={inputStyle}
            />
          </div>
        </div>

        {/* Compare Button */}
        <motion.button
          whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(0,212,255,0.4)' }}
          whileTap={{ scale: 0.98 }}
          onClick={handleCompare}
          disabled={loading}
          style={{
            padding: '14px 40px',
            background: 'linear-gradient(135deg, #00d4ff, #a855f7)',
            border: 'none',
            borderRadius: '10px',
            color: 'white',
            fontFamily: 'Poppins, sans-serif',
            fontWeight: '600',
            fontSize: '18px',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? '⏳ Comparing...' : '⚡ Compare Now'}
        </motion.button>
      </motion.div>

      {/* Error */}
      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            background: 'rgba(255,68,68,0.1)',
            border: '1px solid rgba(255,68,68,0.3)',
            borderRadius: '12px',
            padding: '16px',
            color: '#ff4444',
            marginBottom: '24px',
            textAlign: 'center',
            fontSize: '16px',
          }}
        >
          ❌ {error}
        </motion.div>
      )}

      {/* Loading */}
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            background: 'rgba(0,212,255,0.05)',
            border: '1px solid rgba(0,212,255,0.2)',
            borderRadius: '12px',
            padding: '40px',
            textAlign: 'center',
            marginBottom: '24px',
          }}
        >
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚡</div>
          <p style={{ color: '#00d4ff', fontSize: '20px', fontWeight: '600' }}>
            Comparing {ticker1} vs {ticker2}...
          </p>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '16px', marginTop: '8px' }}>
            Training 2 models. This may take 5-6 minutes!
          </p>
        </motion.div>
      )}

      {/* Results */}
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Stats Comparison */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
            {[
              { ticker: result.ticker1, rmse: result.rmse1, points: result.actual1.length, color: '#00d4ff' },
              { ticker: result.ticker2, rmse: result.rmse2, points: result.actual2.length, color: '#a855f7' },
            ].map((stock, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: `1px solid ${stock.color}33`,
                  borderRadius: '16px',
                  padding: '24px',
                }}
              >
                <h3 style={{ color: stock.color, fontSize: '28px', fontWeight: '800', marginBottom: '16px' }}>
                  {stock.ticker}
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  {[
                    { label: 'RMSE Score', value: stock.rmse },
                    { label: 'Data Points', value: stock.points },
                    { label: 'Accuracy', value: `${(100 - (stock.rmse / 10)).toFixed(1)}%` },
                    { label: 'Status', value: stock.rmse < 15 ? '✅ Good' : '⚠️ High' },
                  ].map((item, j) => (
                    <div key={j} style={{
                      background: 'rgba(255,255,255,0.03)',
                      borderRadius: '8px',
                      padding: '12px',
                    }}>
                      <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', marginBottom: '4px' }}>{item.label}</p>
                      <p style={{ color: 'white', fontSize: '18px', fontWeight: '600' }}>{item.value}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
          {/* Recommendation Banner */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.15 }}
  style={{
    background: 'linear-gradient(135deg, rgba(0,212,255,0.1), rgba(168,85,247,0.1))',
    border: '1px solid rgba(0,212,255,0.3)',
    borderRadius: '20px',
    padding: '32px',
    marginBottom: '32px',
    textAlign: 'center',
  }}
>
  <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '24px' }}>
    🤖 AI Recommendation
  </h2>
  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
    {[
      {
        ticker: result.ticker1,
        future: result.future1,
        color: '#00d4ff',
      },
      {
        ticker: result.ticker2,
        future: result.future2,
        color: '#a855f7',
      },
    ].map((stock, i) => {
      const isBuy = stock.future[stock.future.length - 1] > stock.future[0];
      const change = ((stock.future[stock.future.length - 1] - stock.future[0]) / stock.future[0] * 100).toFixed(2);
      return (
        <div key={i} style={{
          background: isBuy ? 'rgba(0,255,136,0.1)' : 'rgba(255,68,68,0.1)',
          border: `1px solid ${isBuy ? 'rgba(0,255,136,0.3)' : 'rgba(255,68,68,0.3)'}`,
          borderRadius: '16px',
          padding: '24px',
        }}>
          <h3 style={{ color: stock.color, fontSize: '24px', fontWeight: '800', marginBottom: '8px' }}>
            {stock.ticker}
          </h3>
          <div style={{
            fontSize: '48px',
            marginBottom: '8px',
          }}>
            {isBuy ? '🟢' : '🔴'}
          </div>
          <p style={{
            fontSize: '28px',
            fontWeight: '800',
            color: isBuy ? '#00ff88' : '#ff4444',
            marginBottom: '8px',
          }}>
            {isBuy ? 'BUY' : 'SELL'}
          </p>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px' }}>
            Expected change: {isBuy ? '+' : ''}{change}%
          </p>
        </div>
      );
    })}
  </div>
</motion.div>

          {/* RMSE Comparison Bar Chart */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(0,212,255,0.2)',
              borderRadius: '20px',
              padding: '32px',
              marginBottom: '32px',
            }}
          >
            <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '24px' }}>
              📊 RMSE Comparison
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={rmseData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" tick={{ fill: 'white', fontSize: 14 }} />
                <YAxis stroke="rgba(255,255,255,0.5)" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    background: '#0a0e1a',
                    border: '1px solid rgba(0,212,255,0.3)',
                    borderRadius: '8px',
                    color: 'white',
                  }}
                />
                <Bar dataKey="RMSE" fill="url(#colorGradient)" radius={[8, 8, 0, 0]} />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00d4ff" />
                    <stop offset="100%" stopColor="#a855f7" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Stock 1 Chart */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(0,212,255,0.2)',
              borderRadius: '20px',
              padding: '32px',
              marginBottom: '32px',
            }}
          >
            <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '24px', color: '#00d4ff' }}>
              📈 {result.ticker1} - Actual vs Predicted
            </h2>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={comparisonData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="index" stroke="rgba(255,255,255,0.5)" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }} />
                <YAxis stroke="rgba(255,255,255,0.5)" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }} />
                <Tooltip contentStyle={{ background: '#0a0e1a', border: '1px solid rgba(0,212,255,0.3)', borderRadius: '8px', color: 'white' }} />
                <Legend />
                <Line type="monotone" dataKey={`${result.ticker1} Actual`} stroke="#00ff88" dot={false} strokeWidth={2} />
                <Line type="monotone" dataKey={`${result.ticker1} Predicted`} stroke="#00d4ff" dot={false} strokeWidth={2} strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Stock 2 Chart */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(168,85,247,0.2)',
              borderRadius: '20px',
              padding: '32px',
              marginBottom: '32px',
            }}
          >
            <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '24px', color: '#a855f7' }}>
              📈 {result.ticker2} - Actual vs Predicted
            </h2>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={comparisonData2}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="index" stroke="rgba(255,255,255,0.5)" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }} />
                <YAxis stroke="rgba(255,255,255,0.5)" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }} />
                <Tooltip contentStyle={{ background: '#0a0e1a', border: '1px solid rgba(168,85,247,0.3)', borderRadius: '8px', color: 'white' }} />
                <Legend />
                <Line type="monotone" dataKey={`${result.ticker2} Actual`} stroke="#ff6b35" dot={false} strokeWidth={2} />
                <Line type="monotone" dataKey={`${result.ticker2} Predicted`} stroke="#a855f7" dot={false} strokeWidth={2} strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Comparison Table */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(0,212,255,0.2)',
              borderRadius: '20px',
              padding: '32px',
              overflowX: 'auto',
            }}
          >
            <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '24px' }}>
              📋 Side by Side Comparison
            </h2>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'rgba(0,212,255,0.1)' }}>
                  {['Metric', result.ticker1, result.ticker2, 'Winner'].map((h) => (
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
  {
    metric: 'RMSE Score',
    val1: result.rmse1,
    val2: result.rmse2,
    winner: result.rmse1 < result.rmse2 ? result.ticker1 : result.ticker2,
  },
  {
    metric: 'Data Points',
    val1: result.actual1.length,
    val2: result.actual2.length,
    winner: result.actual1.length > result.actual2.length ? result.ticker1 : result.ticker2,
  },
  {
    metric: 'Accuracy %',
    val1: `${(100 - (result.rmse1 / 10)).toFixed(1)}%`,
    val2: `${(100 - (result.rmse2 / 10)).toFixed(1)}%`,
    winner: result.rmse1 < result.rmse2 ? result.ticker1 : result.ticker2,
  },
  {
    metric: 'Future Trend',
    val1: result.future1[result.future1.length-1] > result.future1[0] ? '📈 Uptrend' : '📉 Downtrend',
    val2: result.future2[result.future2.length-1] > result.future2[0] ? '📈 Uptrend' : '📉 Downtrend',
    winner: result.future1[result.future1.length-1] > result.future1[0] ? result.ticker1 : result.ticker2,
  },
  {
    metric: 'Recommendation',
    val1: result.future1[result.future1.length-1] > result.future1[0] ? '🟢 BUY' : '🔴 SELL',
    val2: result.future2[result.future2.length-1] > result.future2[0] ? '🟢 BUY' : '🔴 SELL',
    winner: result.future1[result.future1.length-1] > result.future1[0] ? result.ticker1 : result.ticker2,
  },
].map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '14px 16px', color: 'rgba(255,255,255,0.7)', fontSize: '15px', fontWeight: '600' }}>{row.metric}</td>
                    <td style={{ padding: '14px 16px', color: '#00d4ff', fontSize: '15px' }}>{row.val1}</td>
                    <td style={{ padding: '14px 16px', color: '#a855f7', fontSize: '15px' }}>{row.val2}</td>
                    <td style={{ padding: '14px 16px', fontSize: '15px', fontWeight: '600', color: '#00ff88' }}>
                      🏆 {row.winner}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Compare;