import numpy as np
import random
import tensorflow as tf
from tensorflow.keras.callbacks import EarlyStopping
from data import load_data, preprocess_data
from model import build_model

# Fix randomness for stable results
np.random.seed(42)
tf.random.set_seed(42)
random.seed(42)

def train():
    # Step 1: Load and preprocess data
    data = load_data()
    X_train, X_test, y_train, y_test, scaler = preprocess_data(data)

    # Step 2: Build model
    model = build_model(input_shape=(X_train.shape[1], X_train.shape[2]))

    # Step 3: Early stopping
    early_stop = EarlyStopping(
        monitor='val_loss',
        patience=5,
        restore_best_weights=True
    )

    # Step 4: Train model
    history = model.fit(
        X_train,
        y_train,
        epochs=50,
        batch_size=32,
        validation_data=(X_test, y_test),
        callbacks=[early_stop]
    )

    # Step 5: Save model
    model.save("stock_model.keras")
    print("Model saved as stock_model.keras!")

    return model, scaler

if __name__ == "__main__":
    train()