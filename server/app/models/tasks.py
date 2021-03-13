from . import db
from datetime import datetime

from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import get_jwt

import models.user as user


class Tasks(db.Model):
    __tablename__ = 'tasks'
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(255))
    created = db.Column(db.DateTime, default=datetime.now())
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)   

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)


    @staticmethod
    def get_tasks(id):
        tasks = Tasks.query.filter_by(user_id=id)
        if tasks:
            return tasks
        else: 
            return None
    
    @staticmethod
    def delete_task(task_id):
        task = db.session.query(Tasks).filter(Tasks.id==task_id).first()
        db.session.delete(task)
        db.session.commit()
    
    @staticmethod
    def add_task(text, username):
        _user = db.session.query(user.User).filter(user.User.username==username).first()

        task = Tasks(text=text, created=datetime.now(), user_id=_user.id)

        db.session.add(task)
        db.session.flush()
        resp = {'id': task.id, 'created':task.created}

        db.session.commit()
        
        return resp