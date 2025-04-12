from flask import request, jsonify, Blueprint
from api.models import db, User
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

@api.route('/signup', methods=['POST'])
def signup():
    body = request.get_json()

    if not body:
        return jsonify({'error': 'No se enviaron datos'}), 400
    
    email = body.get('email')
    password = body.get('password')
    name = body.get('fname')
    lastname = body.get('lname')
    birthdate = body.get('birthdate')

    if not email or not password or not name or not lastname or not birthdate:
        return jsonify({'error': 'Todos los campos son obligatorios'}), 400

    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({'error': 'Ya existe un usuario con ese email'}), 409

    try:
        new_user = User(
            email=email,
            password=password,
            name=name,
            lastname=lastname,
            birthdate=birthdate
        )
        db.session.add(new_user)
        db.session.commit()

        token = create_access_token(identity=email)
        return jsonify({'msg': 'Usuario creado con éxito', 'token': token}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Error en el servidor: {str(e)}'}), 500

@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"message": "El email y el password son requeridos"}), 400

    user = User.query.filter_by(email=email, password=password).first()

    if not user:
        return jsonify({"message": "No existe ese usuario"}), 404

    token = create_access_token(identity=user.email)
    return jsonify({"token": token})

@api.route('/private', methods=['GET'])
@jwt_required()
def private_route():
    current_user = get_jwt_identity()
    return jsonify({"ok": current_user})
