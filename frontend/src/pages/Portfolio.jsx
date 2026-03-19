import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Legend
} from 'recharts';

const COLORS = ['#00d4ff', '#a855f7', '#00ff88', '#ff6b35', '#ff4444', '#ffd700'];

const Portfolio = () => {
  const [stocks, setStocks] = useState([]);
  const [ticker, setTicker] = useState('');
  const [quantity, setQuantity] = useState('');
  const [buyPrice, setBuyPrice] = useState('');
  const [currentPrice, setCurrentPrice] = useState('');
  const [error, setError] = useState('');

  const handleAdd = () => {
    if (!ticker || !quantity || !buyPrice || !currentPrice) {
      setError('Please fill all fields!');
      return;
    }
    setError('');
    const newStock = {
      ticker: ticker.toUpperCase(),
      quantity: parseFloat(quantity),
      buyPrice: parseFloat(buyPrice),
      currentPrice: parseFloat(currentPrice),
      totalInvested: parseFloat(quantity) * parseFloat(buyPrice),
      currentValue: parseFloat(quantity) * parseFloat(currentPrice),
      profit: (parseFloat(currentPrice) - parseFloat(buyPrice)) * parseFloat(quantity),
      profitPct: (((parseFloat(currentPrice) - parseFloat(buyPrice)) / parseFloat(buyPrice)) * 100).toFixed(2),
    };
    setStocks([...stocks, newStock]);
    setTicker('');
    setQuantity('');
    setBuyPrice('');
    setCurrentPrice('');
  };

  const handleDelete = (index) => {
    setStocks(stocks.filter((_, i) => i !== index));
  };

  const totalInvested = stocks.reduce((sum, s) => sum + s.totalInvested, 0);
  const totalValue = stocks.reduce((sum, s) => sum + s.currentValue, 0);
  const totalProfit = totalValue - totalInvested;
  const totalProfitPct = totalInvested > 0 ? ((totalProfit / totalInvested) * 100).toFixed(2) : 0;

  const pieData = stocks.map((s) => ({
    name: s.ticker,
    value: parseFloat(s.currentValue.toFixed(2)),
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
    fontSize: '14px',
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
          My{' '}
          <span style={{
            background: 'linear-gradient(135deg, #00d4ff, #a855f7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Portfolio
          </span>
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '18px' }}>
          Track your stock investments and monitor profit/loss
        </p>
      </motion.div>

      {/* Add Stock Card */}
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
        <h2 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '24px' }}>
          ➕ Add Stock
        </h2>

        {error && (
          <div style={{
            background: 'rgba(255,68,68,0.1)',
            border: '1px solid rgba(255,68,68,0.3)',
            borderRadius: '8px',
            padding: '12px',
            color: '#ff4444',
            marginBottom: '16px',
            fontSize: '14px',
          }}>
            ❌ {error}
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '16px', marginBottom: '20px' }}>
          <div>
            <label style={labelStyle}>📈 Ticker</label>
            <input
              type="text"
              value={ticker}
              onChange={(e) => setTicker(e.target.value.toUpperCase())}
              placeholder="e.g. AAPL"
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>🔢 Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="e.g. 10"
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>💰 Buy Price ($)</label>
            <input
              type="number"
              value={buyPrice}
              onChange={(e) => setBuyPrice(e.target.value)}
              placeholder="e.g. 150"
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>📊 Current Price ($)</label>
            <input
              type="number"
              value={currentPrice}
              onChange={(e) => setCurrentPrice(e.target.value)}
              placeholder="e.g. 180"
              style={inputStyle}
            />
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(0,212,255,0.4)' }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAdd}
          style={{
            padding: '12px 32px',
            background: 'linear-gradient(135deg, #00d4ff, #a855f7)',
            border: 'none',
            borderRadius: '10px',
            color: 'white',
            fontFamily: 'Poppins, sans-serif',
            fontWeight: '600',
            fontSize: '16px',
            cursor: 'pointer',
          }}
        >
          ➕ Add to Portfolio
        </motion.button>
      </motion.div>

      {/* Summary Cards */}
      {stocks.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '32px' }}>
            {[
              { label: 'Total Invested', value: `$${totalInvested.toFixed(2)}`, color: '#00d4ff' },
              { label: 'Current Value', value: `$${totalValue.toFixed(2)}`, color: '#a855f7' },
              { label: 'Total Profit/Loss', value: `$${totalProfit.toFixed(2)}`, color: totalProfit >= 0 ? '#00ff88' : '#ff4444' },
              { label: 'Return %', value: `${totalProfitPct}%`, color: totalProfitPct >= 0 ? '#00ff88' : '#ff4444' },
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
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', marginBottom: '8px' }}>{stat.label}</p>
                <p style={{ color: stat.color, fontSize: '24px', fontWeight: '700' }}>{stat.value}</p>
              </motion.div>
            ))}
          </div>

          {/* Portfolio Table */}
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
              overflowX: 'auto',
            }}
          >
            <h2 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '24px' }}>
              📋 Portfolio Holdings
            </h2>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'rgba(0,212,255,0.1)' }}>
                  {['Stock', 'Qty', 'Buy Price', 'Current Price', 'Invested', 'Current Value', 'Profit/Loss', 'Return %', 'Signal', 'Action'].map((h) => (
                    <th key={h} style={{
                      padding: '14px 16px',
                      color: '#00d4ff',
                      fontFamily: 'Poppins, sans-serif',
                      fontWeight: '600',
                      fontSize: '14px',
                      textAlign: 'left',
                      borderBottom: '1px solid rgba(0,212,255,0.2)',
                      whiteSpace: 'nowrap',
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {stocks.map((stock, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '14px 16px', color: '#00d4ff', fontSize: '15px', fontWeight: '700' }}>{stock.ticker}</td>
                    <td style={{ padding: '14px 16px', color: 'white', fontSize: '15px' }}>{stock.quantity}</td>
                    <td style={{ padding: '14px 16px', color: 'white', fontSize: '15px' }}>${stock.buyPrice}</td>
                    <td style={{ padding: '14px 16px', color: 'white', fontSize: '15px' }}>${stock.currentPrice}</td>
                    <td style={{ padding: '14px 16px', color: 'white', fontSize: '15px' }}>${stock.totalInvested.toFixed(2)}</td>
                    <td style={{ padding: '14px 16px', color: '#a855f7', fontSize: '15px' }}>${stock.currentValue.toFixed(2)}</td>
                    <td style={{ padding: '14px 16px', color: stock.profit >= 0 ? '#00ff88' : '#ff4444', fontSize: '15px', fontWeight: '600' }}>
                      {stock.profit >= 0 ? '+' : ''}${stock.profit.toFixed(2)}
                    </td>
                    <td style={{ padding: '14px 16px', color: parseFloat(stock.profitPct) >= 0 ? '#00ff88' : '#ff4444', fontSize: '15px', fontWeight: '600' }}>
                      {stock.profitPct}%
                    </td>
                    <td style={{ padding: '14px 16px', fontSize: '15px', fontWeight: '700' }}>
                      {parseFloat(stock.profitPct) >= 0
                        ? <span style={{ color: '#00ff88' }}>🟢 HOLD</span>
                        : <span style={{ color: '#ff4444' }}>🔴 SELL</span>
                      }
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDelete(i)}
                        style={{
                          padding: '6px 14px',
                          background: 'rgba(255,68,68,0.1)',
                          border: '1px solid rgba(255,68,68,0.3)',
                          borderRadius: '6px',
                          color: '#ff4444',
                          fontFamily: 'Poppins, sans-serif',
                          fontSize: '13px',
                          cursor: 'pointer',
                        }}
                      >
                        🗑️ Remove
                      </motion.button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          {/* Pie Chart */}
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
            <h2 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '24px' }}>
              🥧 Portfolio Distribution
            </h2>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={140}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: '#0a0e1a',
                    border: '1px solid rgba(0,212,255,0.3)',
                    borderRadius: '8px',
                    color: 'white',
                  }}
                  formatter={(value) => [`$${value}`, 'Value']}
                />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Profit/Loss Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(0,212,255,0.2)',
              borderRadius: '20px',
              padding: '32px',
            }}
          >
            <h2 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '24px' }}>
              📊 Profit/Loss per Stock
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={stocks.map((s) => ({ name: s.ticker, Profit: parseFloat(s.profit.toFixed(2)) }))}>
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
                <Legend />
                <Line type="monotone" dataKey="Profit" stroke="#00d4ff" strokeWidth={2} dot={{ fill: '#00d4ff', r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </motion.div>
      )}

      {/* Empty State */}
      {stocks.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            textAlign: 'center',
            padding: '80px',
            background: 'rgba(255,255,255,0.02)',
            border: '1px dashed rgba(0,212,255,0.2)',
            borderRadius: '20px',
          }}
        >
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>💼</div>
          <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '8px' }}>No stocks yet!</h3>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '16px' }}>
            Add your first stock above to start tracking!
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default Portfolio;
