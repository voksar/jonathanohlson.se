import shutil
import os


def copy_and_overwrite(from_path, to_path):
    if os.path.exists(to_path):
        shutil.rmtree(to_path)
    shutil.copytree(from_path, to_path)
    os.remove(to_path + "/.flaskenv")
    

copy_and_overwrite(str(os.getcwd()) + "/app/", os.getcwd() + "/build")