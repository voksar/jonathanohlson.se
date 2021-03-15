class Error(Exception):
    pass

class UserCantBeDeleted(Error):
    def __init__(self, message='User cant be deleted', code=403):
        self.msg = message
        self.code = code