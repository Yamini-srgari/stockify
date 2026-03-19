import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const Predict = () => {
  const [ticker, setTicker] = useState('AAPL');
  const [start, setStart] = useState('2015-01-01');
  const [end, setEnd] = useState('2024-01-01');
  const [futureDays, setFutureDays] = useState(30);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handlePredict = async () => {
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const res = await axios.get('http://127.0.0.1:5000/api/predict', {
        params: { ticker, start, end, future_days: futureDays }
      });
      setResult(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Prediction failed!');
    }
    setLoading(false);
  };

  const chartData = result ? result.actual.map((val, i) => ({
    date: result.dates[i],
    Actual: parseFloat(val.toFixed(2)),
    Predicted: parseFloat(result.predictions[i].toFixed(2)),
  })) : [];

  const tableData = chartData.slice(-10).map((row) => ({
    ...row,
    error: (((row.Predicted - row.Actual) / row.Actual) * 100).toFixed(2),
  }));

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
            Prediction
          </span>
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '18px' }}>
          Enter a stock ticker and date range to get AI predictions
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

          {/* Ticker */}
          <div>
            <label style={labelStyle}>📈 Stock Ticker</label>
            <input
              type="text"
              value={ticker}
              onChange={(e) => setTicker(e.target.value.toUpperCase())}
              placeholder="e.g. AAPL, TSLA"
              style={inputStyle}
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

          {/* Future Days */}
          <div>
            <label style={labelStyle}>🔮 Future Days</label>
            <select
              value={futureDays}
              onChange={(e) => setFutureDays(e.target.value)}
              style={inputStyle}
            >
              <option value={7}>7 Days</option>
              <option value={14}>14 Days</option>
              <option value={30}>30 Days</option>
              <option value={60}>60 Days</option>
              <option value={90}>90 Days</option>
            </select>
          </div>
        </div>

        {/* Predict Button */}
        <motion.button
          whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(0,212,255,0.4)' }}
          whileTap={{ scale: 0.98 }}
          onClick={handlePredict}
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
          {loading ? '⏳ Predicting...' : '🚀 Predict Now'}
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
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>⏳</div>
          <p style={{ color: '#00d4ff', fontSize: '20px', fontWeight: '600' }}>
            Training AI model for {ticker}...
          </p>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '16px', marginTop: '8px' }}>
            This may take 2-3 minutes. Please wait!
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
          {/* Stats Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '32px' }}>
            {[
              { label: 'Ticker', value: result.ticker, color: '#00d4ff' },
              { label: 'RMSE Score', value: result.rmse, color: '#a855f7' },
              { label: 'Data Points', value: result.actual.length, color: '#00ff88' },
              { label: 'Future Days', value: futureDays, color: '#ff6b35' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: `1px solid ${stat.color}33`,
                  borderRadius: '16px',
                  padding: '24px',
                  textAlign: 'center',
                }}
              >
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '16px', marginBottom: '8px' }}>{stat.label}</p>
                <p style={{ color: stat.color, fontSize: '32px', fontWeight: '700' }}>{stat.value}</p>
              </motion.div>
            ))}
          </div>

          {/* Actual vs Predicted Chart */}
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
            <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '24px' }}>
              📊 Actual vs Predicted Price
            </h2>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis
                  dataKey="date"
                  stroke="rgba(255,255,255,0.5)"
                  tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }}
                  tickFormatter={(val) => val?.slice(0, 7)}
                />
                <YAxis
                  stroke="rgba(255,255,255,0.5)"
                  tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    background: '#0a0e1a',
                    border: '1px solid rgba(0,212,255,0.3)',
                    borderRadius: '8px',
                    color: 'white',
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="Actual" stroke="#00ff88" dot={false} strokeWidth={2} />
                <Line type="monotone" dataKey="Predicted" stroke="#00d4ff" dot={false} strokeWidth={2} strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Future Predictions Chart */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(168,85,247,0.3)',
              borderRadius: '20px',
              padding: '32px',
              marginBottom: '32px',
            }}
          >
            <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '8px' }}>
              🔮 Future Price Prediction
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '16px', marginBottom: '24px' }}>
              Next {futureDays} days predicted prices for {result.ticker}
            </p>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={result.future_dates.map((date, i) => ({
                date,
                'Predicted Price': parseFloat(result.future_prices[i].toFixed(2)),
              }))}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis
                  dataKey="date"
                  stroke="rgba(255,255,255,0.5)"
                  tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }}
                  tickFormatter={(val) => val?.slice(5)}
                />
                <YAxis
                  stroke="rgba(255,255,255,0.5)"
                  tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    background: '#0a0e1a',
                    border: '1px solid rgba(168,85,247,0.3)',
                    borderRadius: '8px',
                    color: 'white',
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="Predicted Price"
                  stroke="#a855f7"
                  dot={true}
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>

            {/* Future Prices Table */}
            <div style={{ marginTop: '24px', overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: 'rgba(168,85,247,0.1)' }}>
                    {['Day', 'Date', 'Predicted Price'].map((h) => (
                      <th key={h} style={{
                        padding: '14px 16px',
                        color: '#a855f7',
                        fontFamily: 'Poppins, sans-serif',
                        fontWeight: '600',
                        fontSize: '16px',
                        textAlign: 'left',
                        borderBottom: '1px solid rgba(168,85,247,0.2)',
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {result.future_dates.map((date, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '14px 16px', color: 'rgba(255,255,255,0.5)', fontSize: '15px' }}>Day {i + 1}</td>
                      <td style={{ padding: '14px 16px', color: 'rgba(255,255,255,0.8)', fontSize: '15px' }}>{date}</td>
                      <td style={{ padding: '14px 16px', color: '#a855f7', fontSize: '15px', fontWeight: '600' }}>
                        ${parseFloat(result.future_prices[i].toFixed(2))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Prediction Results Table */}
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
              📋 Prediction Results (Last 10)
            </h2>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'rgba(0,212,255,0.1)' }}>
                  {['Date', 'Actual Price', 'Predicted Price', 'Error %'].map((h) => (
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
                {tableData.map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '14px 16px', color: 'rgba(255,255,255,0.8)', fontSize: '15px' }}>{row.date}</td>
                    <td style={{ padding: '14px 16px', color: '#00ff88', fontSize: '15px' }}>${row.Actual}</td>
                    <td style={{ padding: '14px 16px', color: '#00d4ff', fontSize: '15px' }}>${row.Predicted}</td>
                    <td style={{
                      padding: '14px 16px',
                      color: parseFloat(row.error) >= 0 ? '#00ff88' : '#ff4444',
                      fontSize: '15px',
                      fontWeight: '600',
                    }}>
                      {row.error}%
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

export default Predict;