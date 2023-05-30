#!/usr/bin/env pybricks-micropython
import socket

# Write your program here.

# CHANGE TO EXTERNAL IP-ADDRESS
HOST = "127.0.0.1"  #Address of server running backend API

PORT = 1241  # Port to listen on (non-privileged ports are > 1023)

addr = socket.getaddrinfo(HOST, PORT)[0][-1]
sock = socket.socket()
sock.connect(addr)
print("connected")
# ev3.speaker.beep()

# Initialize the gripper.
# gripping_motor.run_until_stalled(grabspeed, Stop.COAST, 30)
# gripping_motor.reset_angle(0)
# gripping_motor.run_time(-grabspeed, 3000)

while True:
    data = sock.recv(1024)
    if len(data) == 0:
        break
    datastr = str(data, 'utf8')
    print(datastr)
    while len(datastr) != 0:
        command = datastr[:4]
        if datastr == 'star':
            print("star")
        elif datastr == 'stop':
            print("stopping")
            break
        else:
            print("Invalid command: " + datastr)
        datastr = datastr[4:]