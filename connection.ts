import { Websocket, WebsocketBuilder } from 'websocket-ts';

enum Action {
    action = "ACTION"
}

export class ConnectionManager {
    private socket: Websocket;

    constructor(name: string) {
        this.socket = new WebsocketBuilder('ws://localhost:8080/ws')
            .onOpen((_, event) => { })
            .onError((_, event) => { alert('Произошла чудовищная ошибка!') })
            .onClose((_, event) => { alert('Утрачено соединение с сервером!') })
            .onMessage((_, event) => { console.log(event.data) })
            .build();
    }

    sendAction() {
        this.socket.send(Action.action);
    }

    private send(action: Action) {
        this.socket.send(action);
    }
}