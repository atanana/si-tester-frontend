import { getName, setName } from "./storage";
import { ConnectionManager } from "./ConnectionManager";
import { PlayersContainer } from "./PlayersContainer";
import { GameManager } from "./GameManager";

let name = getName();
while (!name) {
    name = prompt("Представься, мразь");
    setName(name);
}

document.getElementById('greeting').textContent = `Хочешь ли ты быть главным, ${name}?`

const connection = new ConnectionManager(name);

document.addEventListener('keydown', (event) => {
    if (event.key === ' ') {
        connection.sendAction();
    }
});

document.getElementById('makeOwner').addEventListener('click', (_) => connection.sendMakeOwner())

const playersContainer = new PlayersContainer(document.getElementById('playersContainer') as HTMLDivElement);
const gameManager = new GameManager(playersContainer);
connection.messageListener = gameManager;