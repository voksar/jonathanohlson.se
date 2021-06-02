import json
import os
from datetime import timedelta

#config for prod
class ConfigProduction(object):

    DEVELOPMENT = False
    DEBUG = False
    SECRET_KEY = os.environ.get('SECRET_KEY')
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://{}:{}@192.168.1.206:3306/JONWEBDB'.format(os.environ.get('DB_USERNAME'), os.environ.get('DB_PASSWORD'))
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    
    #JWT Variables
    JWT_TOKEN_LOCATION = ["cookies"]
    JWT_COOKIE_SECURE = True
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=24)

class ConfigDevelopment(object):
    
    DEVELOPMENT = True
    DEBUG = True
    SECRET_KEY = "DEV123"
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://{}:{}@{}/{}'.format(os.environ.get('DB_USERNAME'), os.environ.get('DB_PASSWORD'), os.environ.get('DB_HOST'), os.environ.get('DB_INSTANCE'))
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    CORS_HEADERS = 'Content-Type'

    #JWT Variables
    JWT_TOKEN_LOCATION = ["cookies"]
    JWT_SECRET_KEY = "DEV123"
    JWT_COOKIE_SECURE = False
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)