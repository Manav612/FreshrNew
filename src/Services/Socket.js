import io from 'socket.io-client';

// const SOCKET_URL = 'ws://unified-profound-koala.ngrok-free.app'
const SOCKET_URL = 'ws://api-development.freshr.ca'



class WSService {
    initializeSocket = async (authToken) => {
        try {
            this.socket = io(SOCKET_URL, {
                transports: ['websocket'],
                auth: {
                    token: authToken
                }
            })
            console.log("initializing ======================socket", this.socket);
            this.socket.on("connect", (data) => {
                console.log("===connecteddd");
            })
            this.socket.on("disconnect", (data) => {
                console.log("===disconnecteddd");
            })
            this.socket.on("error", (data) => {
                console.log("===error", data);
            })
        } catch (error) {
            console.log("not initialised");
        }
    }
    emit(event, data = {}) {
        this.socket.emit(event, data)
    }
    on(event, cb) {
        this.socket.on(event, cb)
    }
    removeListener(listenerName) {
        this.socket.removeListener(listenerName)
    }
}
const socketServices = new WSService()
export default socketServices;