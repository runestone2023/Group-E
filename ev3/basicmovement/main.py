#!/usr/bin/env pybricks-micropython

"""
Example LEGO® MINDSTORMS® EV3 Robot Educator Driving Base Program
-----------------------------------------------------------------

This program requires LEGO® EV3 MicroPython v2.0.
Download: https://education.lego.com/en-us/support/mindstorms-ev3/python-for-ev3

Building instructions can be found at:
https://education.lego.com/en-us/support/mindstorms-ev3/building-instructions#robot
"""

from pybricks.hubs import EV3Brick
from pybricks.ev3devices import Motor, UltrasonicSensor
from pybricks.parameters import Port
from pybricks.robotics import DriveBase
from server import app


# Initialize the EV3 Brick.
ev3 = EV3Brick()
#Initialize the distance sensor

sensor1 = UltrasonicSensor(Port.S1)

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

