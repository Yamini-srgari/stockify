
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import GRU, Dense, Dropout, Input, Bidirectional, BatchNormalization

def build_model(input_shape):
    model = Sequential()

    # Input layer
    model.add(Input(shape=input_shape))

    # First Bidirectional GRU layer
    model.add(Bidirectional(GRU(128, return_sequences=True)))
    model.add(BatchNormalization())
    model.add(Dropout(0.3))

    # Second Bidirectional GRU layer
    model.add(Bidirectional(GRU(64, return_sequences=True)))
    model.add(BatchNormalization())
    model.add(Dropout(0.2))

    # Third GRU layer
    model.add(GRU(32))
    model.add(Dropout(0.2))

    # Output layer
    model.add(Dense(1))

    # Compile model
    model.compile(
        optimizer=tf.keras.optimizers.Adam(learning_rate=0.001),
        loss='mean_squared_error'
    )

    print("Model built successfully!")
    model.summary()

    return model