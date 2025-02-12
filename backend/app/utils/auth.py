import jwt
SECRET = "JSS_SECRET"

def create_token(payload):
    token = jwt.encode(payload, SECRET, algorithm="HS256")
    return token

def verify_token(token):
    try:
        payload = jwt.decode(token, SECRET, algorithms="HS256")
        return payload
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None



