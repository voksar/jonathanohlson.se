import json
import os


def Json_Key():
    with open(os.getcwd() + "/config.json", "r") as json_file:
        json_data = json.load(json_file)
    return str(json_data['SECRET_KEY'])