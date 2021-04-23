def ok(obj: object):
    return obj, 200

def already_exists(obj: object):
    return obj, 409

def not_authorized(obj: object):
    return obj, 401

