
from typing import Union

from fastapi import FastAPI

app = FastAPI()


@app.get("/")
async def read_root():
    return {"Hello": "World"}


@app.get("/connect")
async def connect(id: int = 0):
    return {"message": f"Connected to {id}"}
    
@app.get("/hello")
def hello(name: str = ""):
    return {"message": f"Hello {name}"}



""" async def read_body(receive):
    body = b''
    more_body = True

    while more_body:
        message = await receive()
        body += message.get('body', b'')
        more_body = message.get('more_body', False)
    return body


async def app(scope, receive, send):
    body = await read_body(receive)
    await send({
        'type': 'http.response.start',
        'status': 200,
        'headers': [
            (b'content-type', b'text/plain'),
            (b'content-length', str(len(body)).encode())
        ]
    })
    if body == "connect":
        return 0
    elif body == "disconnect":
        return 1
    elif body == "start":
        return 2
    elif body == "pause":
        return 3
    elif body == "stop":
        return 4
    else:
        await send({
            'type': 'http.response.body',
            'status': 400
        }) """
