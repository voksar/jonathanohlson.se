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
from models.tasks import Tasks
import json

from utils.role_required import admin_required

admin = Blueprint('admin', __name__, url_prefix='/api/admin')

@admin.route('/create', methods=['PUT'])
@admin_required()
def create():
    req = request.get_json(force=True)
    username = req.get('username', None)
    password = req.get('password', None)
    role = req.get('role', None)

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

@admin.route('/dashboard', methods=['GET'])
@admin_required()
def dashboard_users():
    list_of_users = []
    #List all users
    for user in User.query.all():
        dictionary = {"id":user.id, "username":user.username, "role":user.roles}
        list_of_users.append(dictionary)
    return_users = json.dumps(list_of_users)
    json_return = {'count': len(list_of_users), 'users': return_users}
    return json_return, 200


#Deletes a user and all its tasks
@admin.route('/delete/<int:id>', methods=['DELETE'])
@admin_required()
def delete_users(id):
    tasks = Tasks.get_tasks(id)
    for task in tasks:
        Task.delete_task(task.id)
    response = User.delete_user(id)
    return response


@admin.route('/edit', methods=['PUT'])
@admin_required()
def edit_user():
    req = request.get_json(force=True)
    username = req.get('username', None)
    return {'msg':'yes'}, 200