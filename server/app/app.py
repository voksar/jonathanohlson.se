from main import app, bcrypt, cors

import os

from models import db
from models.user import User
from models.tasks import Tasks

from api.auth.auth import auth
from api.user.user import user
from api.admin.admin import admin

from flask_jwt_extended import JWTManager




environment = os.environ.get('FLASK_ENV')

if environment == 'Production':
    app.config.from_object('config.ConfigProduction')
elif environment == 'Development':
    app.config.from_object('config.ConfigDevelopment')


jwt_manager = JWTManager(app)

app.register_blueprint(auth)
app.register_blueprint(user)
app.register_blueprint(admin)




db.init_app(app)
cors.init_app(app)
bcrypt.init_app(app)

#if environment == 'Development':
with app.app_context():
    db.create_all()
    if db.session.query(User).filter_by(username='voksar').count() < 1:
        db.session.add(User(
          username='voksar',
          password=bcrypt.generate_password_hash("123"),
          roles='admin'
            ))
    db.session.commit()