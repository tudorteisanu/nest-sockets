import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { SocketEvents } from './enum';

@WebSocketGateway()
export class SocketGateway {
  @WebSocketServer() server;

  @SubscribeMessage(SocketEvents.Connection)
  handleConnection(client: any) {
    client.join();
  }
}
