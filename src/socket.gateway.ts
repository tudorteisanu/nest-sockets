import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { SocketEvents } from './enum';

@WebSocketGateway()
export class SocketGateway {
  @WebSocketServer() server;

  @SubscribeMessage(SocketEvents.Message)
  handleMessage(client: any, payload: any): WsResponse<unknown> {
    return payload;
  }

  @SubscribeMessage(SocketEvents.Connection)
  handleConnection(client: any) {
    client.join();
  }

  @SubscribeMessage(SocketEvents.NewCall)
  newCall(client: any, data: any): WsResponse<unknown> {
    return data;
  }
}
