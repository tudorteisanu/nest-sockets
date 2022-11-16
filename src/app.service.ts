import { Injectable } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { SocketEvents } from './enum';
import { NewCallDto } from './new-call.dto';

@Injectable()
export class AppService {
  operators = [];

  constructor(private webSocket: SocketGateway) {}

  makeCall(payload: NewCallDto): any {
    this.webSocket.server.emit(SocketEvents.NewCall, payload);
    this.operators = [
      ...this.operators.filter(
        (operator) => operator.operator !== payload.operator,
      ),
      payload,
    ];

    return payload;
  }

  pauseOperator(operator: string): any {
    this.changeOperatorStatus(operator, true);
    this.webSocket.server.emit(SocketEvents.PauseOperator, { operator });
    return { operator };
  }

  unpauseOperator(operator: string): any {
    this.changeOperatorStatus(operator, false);
    this.webSocket.server.emit(SocketEvents.UnpauseOperator, { operator });
    return { operator };
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
