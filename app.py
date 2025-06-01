from flask import Flask, request, render_template, redirect, url_for
import socketio
import threading
import uuid
import eventlet

app = Flask(__name__)
sio = socketio.Server(cors_allowed_origins="*")
app.wsgi_app = socketio.WSGIApp(sio, app.wsgi_app)

clients_info = {}
rooms = {}
room_owners = {}

@app.route('/', methods=['GET', 'POST'])
def home():
    if request.method == 'POST':
        action = request.form.get('action')
        room_id = request.form.get('room_id')
        if action == 'join' and room_id:
            return redirect(url_for('join_room', room_id=room_id))
        elif action == 'admin':
            unique_room_id = str(uuid.uuid4())[:6]
            return redirect(url_for('create_room', room_id=unique_room_id))
    return render_template('home.html')

@app.route('/admin/<room_id>')
def create_room(room_id):
    return render_template('create_room.html', room_id=room_id)

@app.route('/join/<room_id>')
def join_room(room_id):
    return render_template('join_room.html', room_id=room_id)

@sio.event
def connect(sid, environ, auth):
    if sid not in clients_info:
        clients_info[sid] = []
    print('connect ', sid)

@sio.event
def disconnect(sid, reason):
    for room in clients_info[sid]:
        rooms[room].remove(sid)
        if not rooms[room]:
            rooms.pop(room)

    clients_info.pop(sid)
    print('disconnect ', sid, reason)

@sio.on('join_room')
def join_room_event(sid, data):
    print(sid, " wants to join room id ", data)
    if data not in rooms:
        rooms[data] = []
    rooms[data].append(sid)
    clients_info[sid].append(data)

@sio.on('create_room')
def create_room_event(sid, unique_room_id):
    print(sid, " wants to create a room ", unique_room_id)
    room_owners[sid] = unique_room_id

@sio.on('broadcast_data')
def broadcast_data(sid, data):
    if sid in room_owners:
        room_id = room_owners[sid]
        sio.emit("receive_data", data, to=rooms[room_id])

def start_heartbeat():
    message = 1
    for key, value_list in rooms.items():
        print("room - ", key, " sending heartbeat to ", value_list)
        sio.emit("heartbeat", {"message": "heartbeat " + str(message)}, to=value_list)
        message += 1
    threading.Timer(2.0, start_heartbeat).start()

if __name__ == '__main__':
    eventlet.wsgi.server(eventlet.listen(('0.0.0.0', 5000)), app)