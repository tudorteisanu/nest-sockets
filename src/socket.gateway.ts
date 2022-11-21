import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { SocketEvents } from './enum';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketGateway {
  @WebSocketServer() server;

  @SubscribeMessage(SocketEvents.Connection)
  handleConnection(client: any) {
    client.join();
  }
}
