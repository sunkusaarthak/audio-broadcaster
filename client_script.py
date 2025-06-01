import socketio
import uuid

sio = socketio.Client()

@sio.event
def disconnect(reason):
    print('disconnected from server, reason:', reason)

@sio.event
def connect():
    print('connected to server')

@sio.on('heartbeat')
def on_heartbeat(data):
    print("Just got an Heartbeat: ", data)

@sio.on('receive_data')
def receive_data(data):
    print(data)

def start_sending_messages():
    while True:
        data = input()
        sio.emit('broadcast_data', data)

if __name__ == "__main__":
    sio.connect('http://localhost:5000')
    val = input("Options: \n1. Create Room\n2. Join Room\nEnter a choice: ")
    if val == "1":
        unique_room_id = str(uuid.uuid4())[:6]
        sio.emit("create_room", unique_room_id)
        print("Creating room with Id: ", unique_room_id)
        start_sending_messages()
        sio.wait()
    elif val == "2":
        room_id = input("Enter room id to join: ")
        sio.emit("join_room", room_id)
        sio.wait()
    else:
        print("Enter a valid option")