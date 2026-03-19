from flask import Blueprint, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

db = SQLAlchemy()
bcrypt = Bcrypt()

auth_bp = Blueprint('auth', __name__)

# User Model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)

# Register Route
@auth_bp.route('/api/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')

        # Check if user exists
        if User.query.filter_by(email=email).first():
            return jsonify({"status": "error", "message": "Email already exists!"}), 400

        if User.query.filter_by(username=username).first():
            return jsonify({"status": "error", "message": "Username already exists!"}), 400

        # Hash password
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

        # Create user
        new_user = User(username=username, email=email, password=hashed_password)
        db.session.add(new_user)
        db.session.commit()

        return jsonify({"status": "success", "message": "Account created successfully!"}), 201

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

# Login Route
@auth_bp.route('/api/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        # Find user
        user = User.query.filter_by(email=email).first()

        if not user or not bcrypt.check_password_hash(user.password, password):
            return jsonify({"status": "error", "message": "Invalid email or password!"}), 401

        # Create JWT token
        access_token = create_access_token(identity={"id": user.id, "username": user.username, "email": user.email})

        return jsonify({
            "status": "success",
            "message": "Login successful!",
            "token": access_token,
            "username": user.username
        }), 200

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

# Get current user
@auth_bp.route('/api/me', methods=['GET'])
@jwt_required()
def me():
    current_user = get_jwt_identity()
    return jsonify({"status": "success", "user": current_user}), 200