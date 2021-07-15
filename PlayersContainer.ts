import { PlayerState } from "./GameManager";

export class PlayersContainer {

    private container: HTMLDivElement;
    private domParser = new DOMParser();

    constructor(container: HTMLDivElement) {
        this.container = container;
    }

    render(state: PlayerState[]) {
        this.container.textContent = '';
        for (const player of state) {
            const playerLabel = this.createPlayerLabel(player);
            this.container.appendChild(playerLabel);
        }
    }

    private createPlayerLabel(player: PlayerState): HTMLElement {
        let positionLabel = '';
        if (player.queuePosition != null) {
            positionLabel = '<span class="tag is-warning is-medium">${player.queuePosition}</span>';
        }

        const doc = this.domParser.parseFromString(
           `<div class="control">
                <div class="tags has-addons">
                    ${positionLabel}
                    <span class="tag is-link is-medium">${player.name}</span>
                </div>
            </div>`, 'text/html'
        );

        return doc.body;
    }
}