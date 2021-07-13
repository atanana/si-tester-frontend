import { PlayersContainer } from "./PlayersContainer";
import { MessageListener } from "./ConnectionManager";
import { ServerMessage } from "./ConnectionManager";

export class GameManager implements MessageListener {

    private playersView: PlayersContainer;
    private state: PlayerState[] = [];

    constructor(playersView: PlayersContainer) {
        this.playersView = playersView;
    }

    handleMessage(message: ServerMessage) {
        switch (message.messageType) {
            case "ERROR":
                console.error("Произошла ошибка: ${message.message}!");
                break;
            case "PLAYERS_UPDATE":
                this.state = message.players.map(player => new PlayerState(player.name, player.isOwner))
                this.playersView.render(this.state);
                break;
            case "QUEUE_UPDATE":
                for (const player of this.state) {
                    const newPosition = message.queue.indexOf(player.name);
                    player.queuePosition = newPosition > -1 ? newPosition : null;
                }
                this.playersView.render(this.state);
                break;
        }
    }
}

export class PlayerState {

    readonly name: string;
    readonly isOwner: boolean;
    queuePosition?: number;

    constructor(name: string, isOwner: boolean) {
        this.name = name;
        this.isOwner = isOwner;
    }
}