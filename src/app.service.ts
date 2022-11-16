import { Injectable } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { SocketEvents } from './enum';
import { NewCallDto } from './new-call.dto';

@Injectable()
export class AppService {
  constructor(private webSocket: SocketGateway) {}

  makeCall(data: NewCallDto, card: string): any {
    const payload = { ...data, card };
    this.webSocket.server.emit(SocketEvents.NewCall, payload);

    return payload;
  }

  endCall(card: string): any {
    this.webSocket.server.emit(SocketEvents.EndCall, { card });

    return { card };
  }

  pauseOperator(operator: string): any {
    this.webSocket.server.emit(SocketEvents.PauseOperator, { operator });
    return { operator };
  }

  unpauseOperator(operator: string): any {
    this.webSocket.server.emit(SocketEvents.UnpauseOperator, { operator });
    return { operator };
  }
}
