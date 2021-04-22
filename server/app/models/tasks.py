from . import db
from datetime import datetime

from flask import jsonify

from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import get_jwt

from sqlalchemy.exc import SQLAlchemyError

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
        try:
            tasks = Tasks.query.filter_by(user_id=id)
            """list_of_tasks = []
            for task in tasks:
                dictionary = {'id': task.id, 'text': task.text, 'created': task.created}
                list_of_tasks.append(dictionary)
            
            return jsonify(list_of_tasks), 200"""

            return tasks
        except SQLAlchemyError as e:
            return {'msg': e._message}, 500
    
    @staticmethod
    def delete_task(task_id):
        
        try:
            task = db.session.query(Tasks).filter(Tasks.id==task_id).first()
            db.session.delete(task)
            db.session.commit()
            resp = {'msg': 'Task deleted successfully'}, 200
        except SQLAlchemyError as e:
            resp = { 'msg': e._message }, 500
        
        return resp
    
    @staticmethod
    def add_task(text, username):
        try:
            _user = db.session.query(user.User).filter(user.User.username==username).first()

            task = Tasks(text=text, created=datetime.now(), user_id=_user.id)

            db.session.add(task)
            db.session.flush()
            resp = {'id': task.id, 'created': task.created}, 200

            db.session.commit()
        except SQLAlchemyError as e:
            resp =  {'msg': e._message}, 500
        
        return resp