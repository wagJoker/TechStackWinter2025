import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class WebsocketsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server!: Server;

    handleConnection(client: Socket) {
        console.log('Client connected:', client.id);
    }

    handleDisconnect(client: Socket) {
        console.log('Client disconnected:', client.id);
    }

    @SubscribeMessage('message')
    handleMessage(client: Socket, payload: any): string {
        return 'Hello world!';
    }
}