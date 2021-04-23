from functools import wraps
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.user import User

from .return_codes import not_authorized


def admin_required():
    def wrapper(fn):
        @wraps(fn)
        @jwt_required()
        def decorator(*args, **kwargs):
            username = get_jwt_identity()
            user = User.get_user(username)
            if user and user.roles == 'admin':
                return fn(*args, **kwargs)
            else:
                msg = {'msg' : 'User is not allowed'}
                return not_authorized(msg)
        return decorator
    return wrapper
            

