# Handle Websockets  
In this workshop, we're using Nest.js CLI to implement a Websocket Server.  
  
 **1. Change your current branch** to `feature/handle-websockets` where this functionality has been removed, to code along.  
  
```sh  
git checkout feature/handle-websockets  
```  
  **2. Change your working directory** to the backend folder  
```sh  
cd backend  
```  
  
  **3. Create a module to handle Chat** functionality, then add a gateway to that module  
  
```  
nest g module chat  
nest g gateway chat/chat  
```  
These commands create the module and the class to start a websocket server, and automatically imports and binds it to the app module.  

    
  **4. Implement the lifecycle interfaces to the class**  
  `OnGatewayInit` , `OnGatewayConnection` `OnGatewayDisconnect`   
```ts  
@WebSocketGateway(wssConfig.port) export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{    
    
  afterInit(server: any): any {    
    logger.log('afterInit is called when the ws server starts');    
  }    
    
  handleConnection(client: any, ...args): any {    
    logger.log('handleConnection is called when a new socket client connects to the server');    
  }    
    
  handleDisconnect(client: any): any {    
    logger.log('handleDisconnect is called when a client disconnects the server');    
  }  
```  
  
  **5. Implement a function to handle clients wanting to "join" a chatroom**  
Using the `@SubscribeMessage` decorator, we can handle different messages.  
  
```ts  
@SubscribeMessage('room') createOrJoinRoom(socket: Socket, room: string): string {    
  logger.log(`Received request to create or join room: ${room}`);    
  const {rooms} = socket.adapter;    
  const clientsInRoom = rooms[room];    
  const numClients = clientsInRoom ? clientsInRoom.length : 0;    
    
  if (numClients === 0) {    
    logger.log(`ClientID: ${socket.id} created room: ${room}`);  
 socket.join(room); return 'created';  }    
  // No room limit    
  socket.join(room);    
  logger.log(`ClientID: ${socket.id} joined room ${room}`);    
  socket.emit('room-joined', socket.id);    
  this.server.sockets.in(room).emit('room-ready');    
return 'joined'; }  
```  
  
**6. Implement a function too handle clients wanting to send messages to the chatroom**  
  
Using `server.emit` you can forward the message to all connected clients (including the sender)  
```ts  
@SubscribeMessage('message') handleMessage(socket: Socket, message: Message): string {    
  logger.log(`Received message from userId: ${message.user._id}`);    
  this.server.emit('message', message);    
return 'message-sent'; }  
```
