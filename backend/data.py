import numpy as np
import pandas as pd
import yfinance as yf
from sklearn.preprocessing import MinMaxScaler

def load_data(ticker="AAPL", start="2015-01-01", end="2024-01-01"):
    # Download stock data
    data = yf.download(ticker, start=start, end=end)

    # Keep useful columns
    data = data[['Close', 'Volume']]

    # Add Moving Averages
    data['MA20'] = data['Close'].rolling(20).mean()
    data['MA50'] = data['Close'].rolling(50).mean()

    # Add Percentage Change
    data['Pct_Change'] = data['Close'].pct_change()

    # Remove missing rows
    data = data.dropna()

    print("Data loaded successfully!")
    print(data.head())

    return data

def preprocess_data(data, window=60):
    # Scale data between 0 and 1
    scaler = MinMaxScaler(feature_range=(0, 1))
    scaled_data = scaler.fit_transform(data)

    X = []
    y = []

    # Create 60-day windows
    for i in range(window, len(scaled_data)):
        X.append(scaled_data[i-window:i])
        y.append(scaled_data[i, 0])  # Predicting Close price

    X = np.array(X)
    y = np.array(y)

    # Train-test split (80/20)
    split = int(len(X) * 0.8)

    X_train = X[:split]
    X_test  = X[split:]
    y_train = y[:split]
    y_test  = y[split:]

    print("Train shape:", X_train.shape)
    print("Test shape:", X_test.shape)

    return X_train, X_test, y_train, y_test, scaler