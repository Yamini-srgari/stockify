import os
import numpy as np
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics import mean_squared_error
from tensorflow.keras.models import load_model
from data import load_data, preprocess_data
from model import build_model
from tensorflow.keras.callbacks import EarlyStopping
from datetime import datetime, timedelta

def predict(ticker="AAPL", start="2015-01-01", end="2024-01-01", future_days=30):
    # Step 1: Load and preprocess data
    data = load_data(ticker, start, end)
    X_train, X_test, y_train, y_test, scaler = preprocess_data(data)

    # Step 2: Check if model already exists for this ticker
    model_path = f"models/{ticker}_model.keras"
    os.makedirs("models", exist_ok=True)

    if os.path.exists(model_path):
        print(f"Loading saved model for {ticker}...")
        model = load_model(model_path)
    else:
        print(f"Training new model for {ticker}...")
        model = build_model(input_shape=(X_train.shape[1], X_train.shape[2]))

        early_stop = EarlyStopping(
            monitor='val_loss',
            patience=10,
            restore_best_weights=True
        )

        model.fit(
            X_train, y_train,
            epochs=100,
            batch_size=16,
            validation_data=(X_test, y_test),
            callbacks=[early_stop],
            verbose=1
        )

        # Save model for future use
        model.save(model_path)
        print(f"Model saved for {ticker}!")

    # Step 3: Make predictions on test data
    predictions = model.predict(X_test)

    # Step 4: Reverse scaling
    close_scaler = MinMaxScaler()
    close_scaler.fit(data[['Close']])

    predictions = close_scaler.inverse_transform(predictions)
    y_test_actual = close_scaler.inverse_transform(y_test.reshape(-1, 1))

    # Step 5: Get dates for test period
    split = int(len(data) * 0.8)
    dates = data.index[split + 60:].strftime('%Y-%m-%d').tolist()

    # Step 6: Calculate RMSE
    rmse = np.sqrt(mean_squared_error(y_test_actual, predictions))
    print(f"RMSE for {ticker}: {rmse}")

    # Step 7: Future predictions
    from datetime import date
    today = date.today().strftime('%Y-%m-%d')
    latest_data = load_data(ticker, start, today)
    latest_scaled = scaler.transform(latest_data)
    last_60_days = latest_scaled[-60:]
    future_predictions = []
    current_batch = last_60_days.reshape(1, 60, data.shape[1])

    for i in range(future_days):
        future_pred = model.predict(current_batch, verbose=0)
        future_predictions.append(future_pred[0, 0])

        # Create new row with predicted close and last known other features
        new_row = current_batch[0, -1, :].copy()
        new_row[0] = future_pred[0, 0]
        current_batch = np.append(current_batch[:, 1:, :], [[new_row]], axis=1)

    # Inverse transform future predictions
    future_predictions = np.array(future_predictions).reshape(-1, 1)
    future_dummy = np.zeros((future_days, data.shape[1]))
    future_dummy[:, 0] = future_predictions[:, 0]
    future_prices = close_scaler.inverse_transform(future_predictions)

    # Generate future dates
    last_date = latest_data.index[-1]
    future_dates = []
    current_date = last_date
    for i in range(future_days):
        current_date = current_date + timedelta(days=1)
        while current_date.weekday() >= 5:
            current_date = current_date + timedelta(days=1)
        future_dates.append(current_date.strftime('%Y-%m-%d'))

    return predictions, y_test_actual, rmse, dates, future_prices.flatten().tolist(), future_dates