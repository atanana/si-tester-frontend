import { Websocket, WebsocketBuilder } from 'websocket-ts';

enum Action {
    action = "ACTION",
    introduce = "INTRODUCE"
}

export class ConnectionManager {
    private socket: Websocket;
    private name: string;

    constructor(name: string) {
        this.name = name;
        this.socket = new WebsocketBuilder('ws://localhost:8080/ws')
            .onOpen((_, event) => { this.send(Action.introduce) })
            .onError((_, event) => { alert('Произошла чудовищная ошибка!') })
            .onClose((_, event) => { alert('Утрачено соединение с сервером!') })
            .onMessage((_, event) => { console.log(event.data) })
            .build();
    }

    sendAction() {
        this.socket.send(Action.action);
    }

    private send(action: Action) {
        const payload = {
            name: this.name,
            type: action
        }
        this.socket.send(JSON.stringify(payload));
    }
}