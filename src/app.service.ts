import { Injectable } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { SocketEvents } from './enum';

@Injectable()
export class AppService {
  operators = [];

  constructor(private webSocket: SocketGateway) {}

  makeCall(payload: any): any {
    this.webSocket.server.emit(SocketEvents.NewCall, payload);
    this.operators = [
      ...this.operators.filter(
        (operator) => operator.operator !== payload.operator,
      ),
      payload,
    ];

    return payload;
  }

  pauseOperator(payload: any): any {
    this.changeOperatorStatus(payload, true);
    this.webSocket.server.emit(SocketEvents.PauseOperator, payload);
    return payload;
  }

  unpauseOperator(payload: any): any {
    this.changeOperatorStatus(payload, false);
    this.webSocket.server.emit(SocketEvents.UnpauseOperator, payload);
    return payload;
  }

  changeOperatorStatus(operator, busy: boolean) {
    const operatorIndex = this.operators.findIndex(
      (item) => item.operator === operator,
    );

    if (operatorIndex !== -1) {
      this.operators[operatorIndex] = {
        ...this.operators[operatorIndex],
        busy,
      };
    } else {
      this.operators.push({
        operator,
        busy,
      });
    }
  }
}
