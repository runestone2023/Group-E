
from typing import Union
from fastapi import FastAPI, WebSocket
from pymongo import MongoClient
import os
from fastapi import FastAPI, Body, HTTPException, status
from fastapi.responses import Response, JSONResponse
from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel, Field, EmailStr
from bson import ObjectId
from typing import Optional, List
import motor.motor_asyncio

app = FastAPI()
db_connection = MongoClient("mongodb://localhost:27017")
db = db_connection.devices
collection = db["devices"]


class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid objectid")
        return ObjectId(v)

    @classmethod
    def __modify_schema__(cls, field_schema):
        field_schema.update(type="string")

class UserModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    username: str = Field()
    password: str = Field()
    device_id: int | None = Field()
    current_status: str | None = Field()
    language: str = Field()
    location: str = Field()

    class Config:
        allow_population_by_field_name: True
        jsonable_encoder = {ObjectId: str}
        schema_extra = {
            "example": {
                "username": "douglas",
                "password": "1234",
                "device_id": "2",
                "current_status": "start"
            }
        }

class UpdateUserModel(BaseModel):
    device_id: Optional[int]
    current_status: Optional[str]
    location: Optional[str]

    class Config:
        allow_population_by_field_name: True
        jsonable_encoder = {ObjectId: str}
        schema_extra = {
            "example": {
                "username": "douglas",
                "password": "1234",
                "device_id": "2",
                "current_status": "start"
            }
        }


@app.websocket('/ws')
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        data = await websocket.receive_text()
        await websocket.send_text(f"Recieved message with the context: {data}")



@app.post("/", response_description="Added a new device", response_model=UserModel)
async def create_user(user: UserModel = Body()):
    user = jsonable_encoder(user)
    new_user = await db["devices"].insert_one(user)
    created_user = await db["devices"].find_one({"_id": new_user.inserted_id})
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=created_user)

@app.get("/", response_description="List all users", response_model=List[UserModel]
)
async def list_users():
    students = await db["students"].find().to_list(1000)
    return students

@app.get(
    "/{id}", response_description="Get a single user", response_model=UserModel
)
async def show_user(id: str):
    if (user := await db["devices"].find_one({"_id": id})) is not None:
        return user

    raise HTTPException(status_code=404, detail=f"User {id} not found")

@app.post("/{id}", response_description="Updates the device id, the current status or the robot location", response_model= UpdateUserModel)
async def update_user(id: str, user: UpdateUserModel = Body()):
    user = {k: v for k, v in user.dict().items() if v is not None}

    if len(user) >=1:
        update_result = await db["devices"].update_one({"_id": id}, {"$set" : user})
        if update_result.modified_count == 1:
            if (
                updated_user := await db["devices"].find_one({"_id": id})

            ) is not None:
                return update_user
        
    if (existing_user := await db["devices"].find_one({"_id": id})) is not None:
        return existing_user
    
    raise HTTPException(status_code=404, detail=f"User with {id} not found")

@app.post("/beep/{id}", response_description="Beeps the robot to test the sound", response_model=UserModel)
async def beep(id: str, user : UpdateUserModel = Body()):
    return JSONResponse(status_code=status.HTTP_200_OK, content= {'Beep'})


# @app.get("/")
# async def read_root():
#     return {"Hello": "World"}

# @app.get("/connect")
# async def connect(id: int = 0):
#     return {"message": f"Connected to {id}"}
    
# @app.get("/start")
# async def start():
#     app.post()

#  async def read_body(receive):
#     body = b''
#     more_body = True

#     while more_body:
#         message = await receive()
#         body += message.get('body', b'')
#         more_body = message.get('more_body', False)
#     return body


# async def app(scope, receive, send):
#     body = await read_body(receive)
#     await send({
#         'type': 'http.response.start',
#         'status': 200,
#         'headers': [
#             (b'content-type', b'text/plain'),
#             (b'content-length', str(len(body)).encode())
#         ]
#     })
#     if body == "connect":
#         return 0
#     elif body == "disconnect":
#         return 1
#     elif body == "start":
#         return 2
#     elif body == "pause":
#         return 3
#     elif body == "stop":
#         return 4
#     else:
#         await send({
#             'type': 'http.response.body',
#             'status': 400
#         })
