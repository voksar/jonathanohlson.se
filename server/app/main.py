from flask import Flask
from flask_cors import CORS
from flask_bcrypt import Bcrypt
app = Flask(__name__)
bcrypt = Bcrypt()
cors = CORS()