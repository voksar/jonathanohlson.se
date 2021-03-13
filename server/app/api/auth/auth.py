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
from models.user import User

from utils.role_required import admin_required

import os

auth = Blueprint('auth', __name__, url_prefix='/api/auth')

@auth.after_request
def refresh_expiring_jwt(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))

        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            set_access_cookies(response, access_token, max_age=60 * 60 * 24 * 30)
        return response
    except(RuntimeError, KeyError):
        return response

@auth.route('/login', methods=['POST'])
def login():
    req = request.get_json(force=True)
    username = req.get('username', None)
    password = req.get('password', None)

    user = User.user_check(username, password)

    if user is not None:
        resp = jsonify({'msg': 'Login Successful'})
        access_token = create_access_token(identity=user.username)
        set_access_cookies(resp, access_token, max_age=60 * 60 * 24 * 30)
        return resp, 200
    else:
        resp = jsonify({'msg': 'The username or password is incorrect'})
        return resp, 401

@auth.route('/logout', methods=['GET'])
@jwt_required()
def logout():
    response = jsonify({'msg': 'Logout Successful'})
    unset_jwt_cookies(response)
    return response

@auth.route('/valid', methods=['GET'])
@jwt_required()
def check_valid():
    return {'msg': 'Valid!'}


@auth.route('/admin', methods=['GET'])
@admin_required()
def check_admin():
    return {'msg': 'User is admin!', 'admin': True}, 200