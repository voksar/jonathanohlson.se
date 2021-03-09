from flask import Blueprint, make_response, request
from flask import jsonify


from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from flask_jwt_extended import get_jwt
from flask_jwt_extended import set_access_cookies
from flask_jwt_extended import unset_jwt_cookies

from datetime import datetime
from datetime import timedelta
from datetime import timezone

from app import bcrypt
from models import db
from models.user import User
import json

from utils.role_required import admin_required

admin = Blueprint('admin', __name__, url_prefix='/api/admin')

@admin.route('/create', methods=['PUT'])
@admin_required()
def create(**kwargs):
    req = request.get_json(force=True)
    username = req.get('username', None)
    password = req.get('password', None)
    role = req.get('roles', None)

    user = User.get_user(username)
    if user is None:

        db.session.add(User(
              username=username,
              password=bcrypt.generate_password_hash(password),
              roles=role
                ))
        db.session.commit()
        return {'msg':f'User {username} created'}, 200
    else:
        return {'msg': 'User already exists'}, 409

@admin.route('/dashboard/users', methods=['GET'])
@admin_required()
def dashboard_users(**kwargs):
    list_of_users = []
    #List all users
    for user in User.query.all():
        dictionary = {"id":user.id, "user":user.username, "roles":user.roles}
        list_of_users.append(dictionary)
    return_users = json.dumps(list_of_users)
    return return_users, 200
