import SocketIoClient from "socket.io-client"
import { createContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {v4 as UUIDv4} from "uuid"
import Peer from "peerjs"

const WS_Server ="http://localhost:5500"
export const SocketContext =createContext<any | null>(null)

const socket= SocketIoClient (WS_Server ,{
    withCredentials : false,
    transports : ["polling","websockets"]
})

interface Props {
    children : React.ReactNode
}

    export const SocketProvider : React.FC<Props> = ({children}) => {

    const navigate = useNavigate()

    const [user,setUser]= useState<Peer>()
    const [stream, setStream]=useState<MediaStream>()

    const fetchUserFeed = async () => {
       const stream =  await navigator.mediaDevices.getUserMedia({video : true , audio : true})
       setStream(stream)
    }

    useEffect(()=>{

        const userId = UUIDv4()
        const newPeer = new Peer(userId)

        setUser(newPeer)

        fetchUserFeed()

        const enterRoom =({roomId}: {roomId : String}) =>{
            navigate(`/room/${roomId}`)
        }

        socket.on("room-created",enterRoom)
        
    },[])

    return(
        <SocketContext.Provider value ={{ socket,user,stream }}>
        {children}
        </SocketContext.Provider>
    )
}