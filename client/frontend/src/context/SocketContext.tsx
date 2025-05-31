import SocketIoClient from "socket.io-client"
import { createContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"

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
    useEffect(()=>{
        const enterRoom =({roomId}: {roomId : String}) =>{
              console.log("✅ Received room-created event with roomId:", roomId);
            navigate(`/room/${roomId}`)
        }
        console.log("📡 Socket connected:", socket.connected);
        socket.on("room-created",enterRoom)
    },[])

    return(
        <SocketContext.Provider value ={{ socket }}>

        {children}

        </SocketContext.Provider>
    )
}