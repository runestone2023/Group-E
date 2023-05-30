#!/usr/bin/env pybricks-micropython

from pybricks.hubs import EV3Brick
from pybricks.ev3devices import Motor, UltrasonicSensor
from pybricks.parameters import Port
from pybricks.robotics import DriveBase
from pybricks.tools import wait
from uselect import poll
import sys
# from typing import Union

#from usys import stdin
#import time
#import usocket as socket
import socket
def stop_robot(ev3, left_motor, right_motor, sensor1, spinning_motor):
    robot.stop()
    left_motor.stop()
    right_motor.stop()
    spinning_motor.stop()
    ev3.speaker.set_volume(0)
    

def go_straight(ev3, left_motor, right_motor, sensor, spinning_motor):
    # Play low putched tone to indicate no object is detected
    # # Spin the sensor back and forth
        ev3 = EV3Brick()
        speed = -100
        ev3.speaker.beep(300, -5)
        print(spinning_motor.angle())
        spinning_motor.run(speed=speed)
        if spinning_motor.angle() <= -90:
            print("Change direction")
            speed = 200
        if spinning_motor.angle() >= 90:
            print("Change direction")
            speed = -200
        robot.drive(speed=speed, turn_rate=0)
        # Handle object detection
        if sensor1.distance() < 300:
            # Play high pitched sound to indicate that an object is detected
            ev3.speaker.beep(500, 500)
            # Stop and turn left travel for 30cm and then turn right again
            spinning_motor.stop()
            spinning_motor.run_target(speed=500, target_angle=0)
            robot.stop()
            if spinning_motor.angle() > 0 :
                robot.straight(150)
                robot.turn(-120)
                ev3.speaker.beep(800, 200)
                robot.straight(-200)
                robot.turn(120)
            
            else:
                robot.straight(150)
                robot.turn(120)
                ev3.speaker.beep(800, 200)
                #time.sleep(0.2)
                ev3.speaker.beep(800, 200)
                robot.straight(-200)
                robot.turn(-120)
                return
        else:
                return


# s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
# s.connect((, 5000))
# HOST = "127.0.0.1"  # Address of server running backend API

HOST = '130.243.212.230'
PORT = 1241


# sock = socket.socket()
# sock.connect((HOST, PORT))

# Initialize the EV3 Brick.
ev3 = EV3Brick()

keyboard = poll()
keyboard.register(sys.stdin)
# Write your program here.

addr = socket.getaddrinfo(HOST, PORT)[0][-1]

sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
sock.connect(addr)

#Initialize the distance sensor
sensor1 = UltrasonicSensor(Port.S1)
left_motor = Motor(Port.B)
right_motor = Motor(Port.C)
spinning_motor = Motor(Port.D)

# Initialize the drive base.
robot = DriveBase(left_motor, right_motor, wheel_diameter=55.5, axle_track=104)

ev3.speaker.beep()
drive = False

while True:
    data = sock.recv(1024).decode()
    if len(data) == 0:
        break
    datastr = str(data, 'utf8')
    #print(datastr)
    while len(datastr) != 0:
        command = datastr[:4]
        print(command)
        if command == 'star':
            go_straight(ev3, left_motor, right_motor, sensor1, spinning_motor)
        elif command == 'stop':
            break
        else:
            print("Invalid command: " + datastr)
        datastr = datastr[4:]






#     print(str(data, 'utf8)'))
# #    datastr = str(data, 'utf8')
# #    while len(datastr) != 0:
#     if data == 'start':
#         drive = True
#     if data == 'stopp':
#         stop_robot(ev3, left_motor, right_motor, sensor1, spinning_motor)
#         drive = False
#         break
#     else:
#         sock.send("Recieved unknown command")
#     if drive:
#         go_straight(ev3, left_motor, right_motor, sensor1, spinning_motor)

