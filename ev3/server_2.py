import socket
import time
from typing import Union

from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from pydantic import BaseModel
HEADERSIZE = 10

import urllib.request

external_ip = urllib.request.urlopen('https://ident.me').read().decode('utf8')

print('external IP',external_ip)


s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.bind(('', 1241))
s.listen(5)
# now our endpoint knows about the OTHER endpoint.
clientsocket, address = s.accept()
print(f"Connection from {address} has been established.")

# while True:
#     conn, addr = s.accept()
#     print(f"Connected by {addr}")
#     break
#     command = "star"
#     clientsocket.send(bytes(command,"utf-8"))
#     # msg3 = "stopp"
#     # clientsocket.send(bytes(msg3,"utf-8"))
#     #time.sleep(30)# 

app = FastAPI()
@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.post("/start")
def start():
    print("START")
    clientsocket.sendall(b"star")
    return {"Start": "now"}

@app.post("/stop")
def stop():
    print("STOP")
    clientsocket.sendall(b"stop")
    return {"Stop": "now"}

