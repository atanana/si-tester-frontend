import { PlayerState } from "./GameManager";

export class PlayersContainer {

    private container: HTMLDivElement;
    private domParser = new DOMParser();

    constructor(container: HTMLDivElement) {
        this.container = container;
    }

    render(state: PlayerState[]) {
        this.container.textContent = '';
        state.sort((l, r) => {
            if (l.isOwner) {
                return -1;
            } else if (r.isOwner) {
                return 1;
            } else {
                return (l.queuePosition || 99) - (r.queuePosition || 99);
            }
        });
        for (const player of state) {
            const playerLabel = this.createPlayerLabel(player);
            this.container.appendChild(playerLabel);
        }
    }

    private createPlayerLabel(player: PlayerState): Element {
        let positionLabel = '';
        if (player.queuePosition != null) {
            positionLabel = `<span class="tag is-warning is-medium">${player.queuePosition}</span>`;
        }

        let playerColorClass = 'is-link';
        if (player.isOwner) {
            playerColorClass = 'is-danger';
        }

        const doc = this.domParser.parseFromString(
           `<div class="control">
                <div class="tags has-addons">
                    ${positionLabel}
                    <span class="tag ${playerColorClass} is-medium">${player.name}</span>
                </div>
            </div>`, 'text/html'
        );

        return doc.body.firstElementChild;
    }
}