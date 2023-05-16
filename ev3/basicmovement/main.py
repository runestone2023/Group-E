#!/usr/bin/env pybricks-micropython

from pybricks.hubs import EV3Brick
from pybricks.ev3devices import Motor, UltrasonicSensor
from pybricks.parameters import Port
from pybricks.robotics import DriveBase
import asyncio
from pydantic import BaseModel
from websockets.sync.client import connect
import websockets

message = ""
async def handler(websocket):
    while True:
        try:
            message = await websocket.recv()
        except websockets.ConnectionClosedOK:
            break

async def main():
    async with websockets.serve(handler,"",8001):
        await asyncio.Future()
    # Initialize the EV3 Brick.
    ev3 = EV3Brick()
    #Initialize the distance sensor
    sensor1 = UltrasonicSensor(Port.S1)
    #Connect to the server and return the id of the device
    id = ev3.info()["id"]
    message = ""
    body = {"username" : "Douglas" , "password" : "1234", "device_id" : {id}}
    
    user_id = r.content()["id"]


    connected = { "$set": { "current_status": "connected" , "device_id": {id} }}
    await websockets.send(connected)
    r = requests.post(f'http://localhost:8000/connect/?id={user_id}/{connected}')
    r = requests.get(f'http://localhost:8000/beep/?id={user_id}')
    # Initialize the motors.
    left_motor = Motor(Port.B)
    right_motor = Motor(Port.C)
    spinning_motor = Motor(Port.D)

    # Initialize the drive base.
    robot = DriveBase(left_motor, right_motor, wheel_diameter=55.5, axle_track=104)
    drive = True
    speed = -100

    while drive:
        # Spin the sensor back and forth
        print(spinning_motor.angle())
        spinning_motor.run(speed=speed)
        if spinning_motor.angle() <= -90:
            print("Change direction")
            speed = 40
        if spinning_motor.angle() >= 90:
            print("Change direction")
            speed = -40
        robot.drive(speed=-100, turn_rate=0)

        # Handle object detection
        if sensor1.distance() < 200:
            #beep the horn
            ev3.speaker.beep()
            #stop and turn left travel for 30cm and then turn right again
            robot.stop()
            robot.straight(100)
            robot.turn(90)
            robot.straight(-300)
            robot.turn(-90)
            continue
        else:
            continue


if __name__ == "__main__":
    asyncio.run(main())