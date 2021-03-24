from flask import Blueprint
from flask import jsonify
from flask import request

from datetime import datetime
from datetime import timedelta
from datetime import timezone

from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import get_jwt
from flask_jwt_extended import verify_jwt_in_request
from flask_jwt_extended import create_access_token
from flask_jwt_extended import set_access_cookies

from models import db
from models.user import User
from models.tasks import Tasks


user = Blueprint('user', __name__, url_prefix='/api/user')


@user.after_request
def refresh_expiring_jwt(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))

        if target_timestamp > exp_timestamp:
            print("refreshing token")
            access_token = create_access_token(identity=get_jwt_identity())
            set_access_cookies(response, access_token)
        return response
    except(RuntimeError, KeyError):
        return response


@user.route('/profile', methods=['GET'])
@jwt_required()
def profile():
    username = get_jwt_identity()
    user = User.get_user(username=username)
    user_obj = jsonify({
        'id': user.id,
        'username': user.username,
        'roles': user.roles
    })
    return user_obj, 200


@user.route('/tasks', methods=['GET'])
@jwt_required()
def tasks():
    username = get_jwt_identity()
    user = User.get_user(username=username)

    resp = Tasks.get_tasks(user.id)
    
    return resp

@user.route('/tasks/delete/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_task(id):
    resp = Tasks.delete_task(id)
    return resp

@user.route('/tasks/add', methods=['POST'])
@jwt_required()
def add_task():
    req = request.get_json(force=True)
    text = req.get('text', None)
    user = get_jwt_identity()
    resp = Tasks.add_task(text, user)
    return resp
