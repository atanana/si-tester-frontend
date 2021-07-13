import { PlayerState } from "./GameManager";

export class PlayersContainer {

    private container: HTMLDivElement;

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
        const controlElement = document.createElement('div');
        controlElement.classList.add('control');

        const tagsElement = document.createElement('div');
        tagsElement.classList.add('tags', 'has-addons');
        controlElement.appendChild(tagsElement);

        if (player.queuePosition != null) {
            const positionElement = document.createElement('span');
            positionElement.classList.add('tag', 'is-warning', 'is-medium');
            positionElement.textContent = '1';
            tagsElement.appendChild(positionElement);
        }

        const nameElement = document.createElement('span');
        nameElement.classList.add('tag', 'is-link', 'is-medium');
        nameElement.textContent = player.name;
        tagsElement.appendChild(nameElement);

        return controlElement;
    }
}