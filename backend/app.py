from flask import Flask, jsonify
from flask_cors import CORS
from predict import predict

app = Flask(__name__)
CORS(app)  # Allow React frontend to connect

@app.route('/api/predict', methods=['GET'])
def get_predictions():
    try:
        # Get predictions
        predictions, y_test_actual, rmse = predict()

        # Convert numpy arrays to lists for JSON
        return jsonify({
            "status": "success",
            "rmse": round(float(rmse), 4),
            "predictions": predictions.flatten().tolist(),
            "actual": y_test_actual.flatten().tolist()
        })

    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        "status": "Backend is running!"
    })

if __name__ == "__main__":
    app.run(debug=True, port=5000)