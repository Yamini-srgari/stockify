
import numpy as np
import random
import joblib
import tensorflow as tf
from tensorflow.keras.callbacks import EarlyStopping, ReduceLROnPlateau, ModelCheckpoint
from data import load_data, preprocess_data
from model import build_model

# ── Reproducibility ──────────────────────────────────────────────────
np.random.seed(42)
tf.random.set_seed(42)
random.seed(42)


def train(ticker="AAPL", start="2015-01-01", end="2024-01-01"):
    print(f"\n📈 Training for: {ticker}")

    # ── Step 1: Load & preprocess ────────────────────────────────────
    data = load_data(ticker, start=start, end=end)

    # Now returns 8 values — val set is separate from test (no leakage)
    X_train, X_val, X_test, \
    y_train, y_val, y_test, \
    scaler, close_scaler = preprocess_data(data)

    # ── Step 2: Build model ──────────────────────────────────────────
    model = build_model(input_shape=(X_train.shape[1], X_train.shape[2]))

    # ── Step 3: Callbacks ────────────────────────────────────────────
    callbacks = [
        # patience=20 (was 5) — gives model room to improve
        EarlyStopping(
            monitor='val_loss',
            patience=20,
            restore_best_weights=True,
            verbose=1
        ),
        # Halves LR when stuck — key fix for escaping loss plateaus
        ReduceLROnPlateau(
            monitor='val_loss',
            factor=0.5,
            patience=8,
            min_lr=1e-6,
            verbose=1
        ),
        # Saves only the best epoch weights
        ModelCheckpoint(
            filepath=f"{ticker}_best.keras",
            monitor='val_loss',
            save_best_only=True,
            verbose=1
        )
    ]

    # ── Step 4: Train ────────────────────────────────────────────────
    history = model.fit(
        X_train, y_train,
        epochs=200,                         # was 50, early stopping cuts it
        batch_size=32,
        validation_data=(X_val, y_val),     # FIXED: val set not test set
        callbacks=callbacks,
        shuffle=False,                      # NEVER shuffle time-series data
        verbose=1
    )

    # ── Step 5: Evaluate on real $ price scale ───────────────────────
    print("\n📊 Test set evaluation:")
    y_pred_scaled = model.predict(X_test)

    # Inverse transform using close_scaler (trained on train only)
    y_pred = close_scaler.inverse_transform(y_pred_scaled.reshape(-1, 1))
    y_true = close_scaler.inverse_transform(y_test.reshape(-1, 1))

    rmse = np.sqrt(np.mean((y_pred - y_true) ** 2))
    mae  = np.mean(np.abs(y_pred - y_true))
    mape = np.mean(np.abs((y_true - y_pred) / (y_true + 1e-10))) * 100

    print(f"  RMSE : ${rmse:.2f}   ← target: under $5 for large caps")
    print(f"  MAE  : ${mae:.2f}")
    print(f"  MAPE : {mape:.2f}%  ← target: under 3%")

    # ── Step 6: Save model + scalers ─────────────────────────────────
    model.save("stock_model.keras")
    joblib.dump(scaler,       "scaler.pkl")
    joblib.dump(close_scaler, "close_scaler.pkl")

    print(f"\n✅ Model  → stock_model.keras")
    print(f"✅ Scaler → scaler.pkl")
    print(f"✅ Close scaler → close_scaler.pkl")

    return model, scaler, close_scaler, history


if __name__ == "__main__":
    # Change ticker, start, end to predict any stock
    train(ticker="AAPL", start="2015-01-01", end="2024-01-01")