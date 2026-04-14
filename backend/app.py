from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt
from auth import auth_bp, db, bcrypt
from predict import predict

app = Flask(__name__)
CORS(app)

# Configurations
app.config['SECRET_KEY'] = 'stockify-secret-key-2024'
app.config['JWT_SECRET_KEY'] = 'stockify-jwt-secret-2024'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///stockify.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize extensions
db.init_app(app)
bcrypt.init_app(app)
jwt = JWTManager(app)

# Register auth blueprint
app.register_blueprint(auth_bp)

# Create database tables
with app.app_context():
    db.create_all()

@app.route('/api/predict', methods=['GET'])
@app.route('/api/predict', methods=['GET'])
def get_predictions():
    try:
        ticker = request.args.get('ticker', 'AAPL')
        start = request.args.get('start', '2015-01-01')
        end = request.args.get('end', '2024-01-01')

        print(f"Predicting for {ticker} from {start} to {end}")

        future_days = int(request.args.get('future_days', 30))

        predictions, y_test_actual, rmse, dates, future_prices, future_dates = predict(
            ticker, start, end, future_days
        )

        return jsonify({
            "status": "success",
            "ticker": ticker,
            "rmse": round(float(rmse), 4),

            "predictions": predictions.flatten().tolist(),
            "actual": y_test_actual.flatten().tolist(),
            "dates": dates,

            "future_prices": future_prices,
            "future_dates": future_dates
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
@app.route('/api/compare', methods=['GET'])
def compare_stocks():
    try:
        ticker1 = request.args.get('ticker1', 'AAPL')
        ticker2 = request.args.get('ticker2', 'TSLA')
        start = request.args.get('start', '2020-01-01')
        end = request.args.get('end', '2024-01-01')

        print(f"Comparing {ticker1} vs {ticker2}")

        pred1, actual1, rmse1, dates1, future1, fdates1 = predict(ticker1, start, end)
        pred2, actual2, rmse2, dates2, future2, fdates2 = predict(ticker2, start, end)

        return jsonify({
            "status": "success",
            "ticker1": ticker1,
            "ticker2": ticker2,
            "rmse1": round(float(rmse1), 4),
            "rmse2": round(float(rmse2), 4),
            "predictions1": pred1.flatten().tolist(),
            "predictions2": pred2.flatten().tolist(),
            "actual1": actual1.flatten().tolist(),
            "actual2": actual2.flatten().tolist(),
            "dates1": dates1,
            "dates2": dates2,
            "future1": future1,
            "future2": future2,
            "future_dates1": fdates1,
            "future_dates2": fdates2,
        })

    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)