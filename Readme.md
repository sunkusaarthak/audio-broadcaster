# Console Chat Streamer

Console Chat Streamer is a real-time chat broadcasting application. It allows an admin to create a chat room and multiple listeners to join the room using a unique Room ID. The chat can be accessed either through a web-based UI or by running the provided Python client script.

## Features

- **Admin Room Creation**: Admins can create a unique chat room with a Room ID.
- **Join Room**: Listeners can join an existing chat room using the Room ID.
- **Real-Time Messaging**: Messages are broadcasted in real-time to all participants in the room.
- **Web-Based UI**: Users can create or join rooms via a user-friendly web interface.
- **Command-Line Client**: Users can also interact with the chat system using the `client_script.py`.
- **Heartbeat Monitoring**: Periodic heartbeat messages are sent to ensure active connections.

## Setup Instructions

Follow these steps to set up the project locally:

### Prerequisites

- Python 3.8 or higher
- A virtual environment (optional but recommended)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/sunkusaarthak/chat-broadcaster.git
   cd Console Chat Streamer
   ```

2. Create and activate a virtual environment (optional):
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install the required dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run the Flask server:
   ```bash
   python app.py
   ```

5. Open your browser and navigate to `http://localhost:5000`.

## Usage

### Web-Based UI

1. **Home Page**: 
   - Enter the Room ID to join an existing room.
   - Click "Create Room" to generate a new room as an admin.

2. **Create Room**:
   - A unique Room ID will be displayed.
   - Share this Room ID with listeners to allow them to join.

3. **Join Room**:
   - Enter the Room ID to join the chat room.
   - Messages sent by the admin will be displayed in real-time.

### Command-Line Client

1. Run the `client_script.py`:
   ```bash
   python client_script.py
   ```

2. Choose an option:
   - **Create Room**: Generates a unique Room ID and starts broadcasting messages.
   - **Join Room**: Enter the Room ID to join an existing chat room.

3. Start typing messages to broadcast them in the chat room.

## Project Structure

```
Console Chat Streamer/
├── templates/
│   ├── home.html          # Home page for creating/joining rooms
│   ├── create_room.html   # Admin's room creation page
│   ├── join_room.html     # Listener's room joining page
├── static/
│   ├── css/
│       └── styles.css     # Styling for the web pages
├── app.py                 # Flask application and Socket.IO server
├── client_script.py       # Command-line client for chat interaction
├── requirements.txt       # Python dependencies
└── README.md              # Project documentation
```

## Features in Detail

- **Admin Functionality**:
  - Admins can create a room and broadcast messages to all listeners.
  - Admins can use the web UI or the command-line client.

- **Listener Functionality**:
  - Listeners can join a room using the Room ID.
  - Messages are displayed in real-time.

- **Heartbeat**:
  - The server sends periodic heartbeat messages to all connected clients to ensure active connections.

## Key Components

### Flask Server (`app.py`)
- Handles HTTP routes for the web-based UI.
- Manages WebSocket connections using Socket.IO.
- Supports real-time message broadcasting between Admin and Listeners.

### Command-Line Client (`client_script.py`)
- Provides a simple CLI for creating and joining chat rooms.
- Uses Socket.IO for real-time communication.

### Web-Based UI
- **Home Page**: Allows users to create or join chat rooms.
- **Admin Page**: Displays the Room ID and a chat box for broadcasting messages.
- **Listener Page**: Displays messages broadcasted by the Admin in real-time.

## Example Usage

### Creating a Room (Admin)
1. Open the web-based UI or run `client_script.py`.
2. Create a room to generate a unique Room ID.
3. Share the Room ID with Listeners.

### Joining a Room (Listener)
1. Open the web-based UI or run `client_script.py`.
2. Enter the Room ID to join the chat room.
3. View all messages broadcasted by the Admin.

## Technologies Used
- **Backend**: Flask, Flask-SocketIO
- **Frontend**: HTML, CSS (Minimalistic design inspired by Apple)
- **Real-Time Communication**: Socket.IO
- **Python Libraries**: `eventlet`, `uuid`

## Contributing

Contributions are welcome! If you'd like to contribute, please fork the repository and submit a pull request.

## Contact

For any questions or feedback, feel free to reach out:

- **Email**: sunkusaarthak@gmail.com
- **GitHub**: [sunkusaarthak](https://github.com/sunkusaarthak)

## Future Enhancements

- Add user authentication for secure room access.
- Implement message history storage.
- Enhance UI for better user experience.

## License

This project is licensed under the MIT License. Feel free to use and modify it as needed.