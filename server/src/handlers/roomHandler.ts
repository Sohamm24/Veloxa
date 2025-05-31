import { Socket } from "socket.io/dist";
import {v4 as UUIDv4} from "uuid"

const roomHandler = (socket: Socket) => {
    const createRoom = () => {
     const roomId = UUIDv4()
     socket.join(roomId)
     socket.emit("room-created",{roomId})
     console.log("Room created with roomId: ",roomId)
    } 
    const joinRoom = () => {
        console.log("New room joined")
    }

    socket.on("create-room", createRoom)
    socket.on("join-room",joinRoom)
}

export default roomHandler