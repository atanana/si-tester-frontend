import { Websocket, WebsocketBuilder } from 'websocket-ts';

enum Action {
    action = "ACTION",
    introduce = "INTRODUCE",
    makeOwner = "MAKE_OWNER"
}

export class ConnectionManager {
    private socket: Websocket;
    private name: string;
    messageListener?: MessageListener;

    constructor(name: string, port?: string) {
        this.name = name;

        let host = location.host;
        if (port) {
            host = `${location.hostname}:${port}`;
        }

        this.socket = new WebsocketBuilder(`ws://${host}/ws`)
            .onOpen((_, event) => { this.send(Action.introduce) })
            .onError((_, event) => { alert('Произошла чудовищная ошибка!') })
            .onClose((_, event) => { alert('Утрачено соединение с сервером!') })
            .onMessage((_, event) => { this.processMessage(event.data) })
            .build();
    }

    private processMessage(data: any) {
        try {
            const message: ServerMessage = JSON.parse(data);
            this.messageListener?.handleMessage(message);
        } catch (error) {
            console.error(error);
        }
    }

    sendAction() {
        this.send(Action.action);
    }

    sendMakeOwner() {
        this.send(Action.makeOwner);
    }

    private send(action: Action) {
        const payload = {
            name: this.name,
            type: action
        }
        this.socket.send(JSON.stringify(payload));
    }
}

export interface MessageListener {
    handleMessage(message: ServerMessage);
}

export class Player {
    readonly name: string;
    readonly isOwner: boolean;
}

type ServerMessageError = {
    readonly messageType: "ERROR";
    readonly message: string;
}

type ServerMessagePlayersUpdate = {
    readonly messageType: "PLAYERS_UPDATE";
    readonly players: Player[];
}

type ServerMessageQueueUpdate = {
    readonly messageType: "QUEUE_UPDATE";
    readonly queue: string[];
}

export type ServerMessage = ServerMessageError | ServerMessagePlayersUpdate | ServerMessageQueueUpdate;