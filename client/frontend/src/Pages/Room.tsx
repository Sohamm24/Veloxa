import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { SocketContext } from "../context/SocketContext"

const Room: React.FC = () => {

    const { id } = useParams()
    const { socket,user } = useContext(SocketContext)
    const [clients, setClients] = useState<string[]>([]);

    const fetchParticpantList = ({roomId , participants}:{roomId:string , participants : string[]}) =>{
       console.log("Fetched room participants") 
       setClients(participants)
    }

    useEffect(()=>{
        if(user){
            console.log("New user with id", user._id,"has joined room")
            socket.emit("joined-room",{roomId:id,peerId:user._id})
             socket.on("get-users",fetchParticpantList)
        }
    },[user, id, socket])

    return(
        <div>
            <a>Room : {id}</a>
            <br/>
            <a>Participants : {clients}</a>
        </div>
    )  
}

export default Room