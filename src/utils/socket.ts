import io from "socket.io-client";

const socket: SocketIOClient.Socket = io(window.location.origin.replace("3000", "5000"));


export default socket;
