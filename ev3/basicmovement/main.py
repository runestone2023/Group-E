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
# from server import app
import time


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
glassbilen = ["G/8","C/8","E/8","C/8","G/8", "G/8", "C/8", "E/8","C/8","G/8","F/8","F/8","D/8","D/8","C/8"]

while drive:
    # Play low putched tone to indicate no object is detected
    # ev3.speaker.play_notes(notes=glassbilen)
    # # Spin the sensor back and forth
    ev3.speaker.beep(300, -5)
    print(spinning_motor.angle())
    spinning_motor.run(speed=speed)
    if spinning_motor.angle() <= -90:
         print("Change direction")
         speed = 200
    if spinning_motor.angle() >= 90:
        print("Change direction")
        speed = -200
    robot.drive(speed=-100, turn_rate=0)

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
            time.sleep(0.2)
            ev3.speaker.beep(800, 200)
            robot.straight(-200)
            robot.turn(-120)
        continue
    else:
         continue

