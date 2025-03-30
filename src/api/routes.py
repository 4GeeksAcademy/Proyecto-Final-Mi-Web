"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

@api.route('/singup', methods=['POST'])
def singup():

    body = request.get_json()

    new_user = User(email=body['email'], password=body['password'])
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'msg': 'Usuario creado con éxito'}), 201

@api.route('/login', methods= ['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"message": "El email y el password son requeridos"}), 400
    
    user = User.query.filter_by(email=email, password=password).first()

    if not user:
        return jsonify({"message": "No existe ese usuario"}), 404
    
    token = create_access_token(identity=user.email)
    return jsonify({"token": token})

@api.route('/private', methods= ['GET'])
@jwt_required()
def pago():
    current_user = get_jwt_identity()

    return jsonify({"ok": current_user})