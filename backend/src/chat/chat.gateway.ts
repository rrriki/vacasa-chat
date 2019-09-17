import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway, WebSocketServer,
} from '@nestjs/websockets';
import {Configuration} from '../configuration';
import {Logger} from '@nestjs/common';
import {Client, Server, Socket} from 'socket.io';
import {Message} from '../../../typing/message.interface';

const logger = new Logger('ChatGateway');
const wssConfig = Configuration.getWSSConfig();

@WebSocketGateway(wssConfig.port)
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer()
    server: Server;

    afterInit(server): any {
        logger.log(`Chat Gateway initialized on port: ${wssConfig.port}`);
    }

    handleConnection(client: Client, ...args): any {
        logger.log(`Connected, ClientID: ${client.id}`);
        this.server.emit('connect', client.id);
    }

    handleDisconnect(client: Client): any {
        logger.log(`Disconnect, ClientID: ${client.id}`);
        this.server.emit('disconnect', client.id);
    }

    @SubscribeMessage('room')
    createOrJoinRoom(socket: Socket, room: string): string {
        logger.log(`Received request to create or join room: ${room}`);
        const {rooms} = socket.adapter;
        const clientsInRoom = rooms[room];
        const numClients = clientsInRoom ? clientsInRoom.length : 0;

        if (numClients === 0) {
            logger.log(`ClientID: ${socket.id} created room: ${room}`);
            socket.join(room);
            return 'created';

        }
        // No room limit
        logger.log(`ClientID: ${socket.id} joined room ${room}`);
        socket.join(room);
        socket.emit('room-joined', socket.id);
        this.server.sockets.in(room).emit('room-ready');
        return 'joined';
    }

    @SubscribeMessage('message')
    handleMessage(socket: Socket, message: Message): string {
        logger.log(`Received message from userId: ${message.user._id}`);
        socket.emit('message', message);
        return 'message-sent';
    }
}
