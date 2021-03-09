from functools import wraps
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.user import User


def admin_required():
    def wrapper(fn):
        @wraps(fn)
        @jwt_required()
        def decorator(*args, **kwargs):
            username = get_jwt_identity()
            user = User.get_user(username)
            if user and user.roles == 'admin':
                kwargs['user'] = user
                return fn(*args, **kwargs)
            else:
                return {'msg' : 'User is not a admin'}, 401
        return decorator
    return wrapper
            

