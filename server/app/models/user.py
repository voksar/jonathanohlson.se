from . import db
#from .tasks import Tasks
from app import bcrypt
import models.tasks as tasks

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(255), unique=True)
    password = db.Column(db.String(255))
    roles = db.Column(db.String(255))
    is_active = db.Column(db.Boolean, default=True)
    tasks = db.relationship('Tasks')

    @staticmethod
    def hashed_password(password:str):
        return bcrypt.generate_password_hash(password).decode("utf-8")
    
    @staticmethod
    def user_check(username, password):
        user = User.query.filter_by(username=username).first()
        if user and bcrypt.check_password_hash(user.password, password):
            return user
        else:
            return None

    @staticmethod
    def get_user(username = None, id = None):
        if username is None and id is None:
            return Exception("You need to call with username or id")
        if username:
            user = User.query.filter_by(username=username).first()
            if user:
                return user
            else:
                return None
        elif id:
            user = User.query.filter_by(id==id).first()
            if user:
                return user
            else:
                return None
            
        return None
        
