import { Socket } from 'socket.io';
import { v4 as UUIDv4 } from 'uuid';

const rooms: Record<string, string[]> = {};
const socketToRoom: Record<string, { roomId: string; peerId: string }> = {};

const roomHandler = (socket: Socket) => {

    const createRoom = () => {
        const roomId = UUIDv4();
        socket.join(roomId);
        rooms[roomId] = [];
        socket.emit('room-created', { roomId });
        console.log('Room created with roomId: ', roomId);
    };

    const joinedRoom = ({ roomId, peerId }: { roomId: string; peerId: string }) => {
        if (!rooms[roomId]) {
            // Auto-initialize if joining an existing share link
            rooms[roomId] = [];
        }

        if (!rooms[roomId].includes(peerId)) {
            rooms[roomId].push(peerId);
        }

        socketToRoom[socket.id] = { roomId, peerId };
        socket.join(roomId);

        console.log(`User ${peerId} joined room ${roomId}. Active peers:`, rooms[roomId]);

        socket.to(roomId).emit('user-joined', { peerId });

        socket.emit('get-users', {
            roomId,
            participants: rooms[roomId]
        });
    };

    const leaveRoom = () => {
        const data = socketToRoom[socket.id];
        if (data) {
            const { roomId, peerId } = data;
            if (rooms[roomId]) {
                rooms[roomId] = rooms[roomId].filter((id) => id !== peerId);
                if (rooms[roomId].length === 0) {
                    delete rooms[roomId];
                }
            }
            delete socketToRoom[socket.id];
            socket.to(roomId).emit('user-disconnected', { peerId });
            console.log(`User ${peerId} left room ${roomId}`);
        }
    };

    socket.on('create-room', createRoom);
    socket.on('joined-room', joinedRoom);
    socket.on('leave-room', leaveRoom);
    socket.on('disconnect', leaveRoom);
};

export default roomHandler;
