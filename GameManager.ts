import { PlayersContainer } from "./PlayersContainer";
import { MessageListener, Player } from "./ConnectionManager";
import { ServerMessage } from "./ConnectionManager";

export class GameManager implements MessageListener {

    private readonly playersView: PlayersContainer;
    private readonly signal: HTMLAudioElement;
    private players: Player[] = [];
    private queue: string[] = [];

    constructor(playersView: PlayersContainer, signal: HTMLAudioElement) {
        this.playersView = playersView;
        this.signal = signal;
    }

    handleMessage(message: ServerMessage) {
        switch (message.messageType) {
            case "ERROR":
                alert(`Произошла ошибка: ${message.message}!`);
                break;
            case "PLAYERS_UPDATE":
                this.players = message.players
                this.updateView();
                break;
            case "QUEUE_UPDATE":
                if (this.queue.length === 0 && message.queue.length > 0) {
                    this.signal.play();
                }
                this.queue = message.queue;
                this.updateView();
                break;
        }
    }

    private updateView() {
        const state = this.players.map((player) => {
            let positon = this.queue.indexOf(player.name);
            if (positon === -1) {
                positon = null;
            } else {
                positon += 1;
            }
            return new PlayerState(player.name, player.isOwner, positon);
        });
        this.playersView.render(state);
    }
}

export class PlayerState {

    readonly name: string;
    readonly isOwner: boolean;
    queuePosition?: number;

    constructor(name: string, isOwner: boolean, queuePosition?: number) {
        this.name = name;
        this.isOwner = isOwner;
        this.queuePosition = queuePosition;
    }
}