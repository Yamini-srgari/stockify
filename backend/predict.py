import numpy as np
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics import mean_squared_error
from tensorflow.keras.models import load_model
from data import load_data, preprocess_data

def predict():
    # Step 1: Load and preprocess data
    data = load_data()
    X_train, X_test, y_train, y_test, scaler = preprocess_data(data)

    # Step 2: Load saved model
    model = load_model("stock_model.keras")
    print("Model loaded successfully!")

    # Step 3: Make predictions
    predictions = model.predict(X_test)

    # Step 4: Reverse scaling (only for Close price)
    close_scaler = MinMaxScaler()
    close_scaler.fit(data[['Close']])

    predictions = close_scaler.inverse_transform(predictions)
    y_test_actual = close_scaler.inverse_transform(y_test.reshape(-1, 1))

    # Step 5: Calculate RMSE
    rmse = np.sqrt(mean_squared_error(y_test_actual, predictions))
    print(f"RMSE: {rmse}")

    return predictions, y_test_actual, rmse

if __name__ == "__main__":
    predictions, y_test_actual, rmse = predict()