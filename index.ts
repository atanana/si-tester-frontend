import { getName, setName, clearName } from "./storage";
import { ConnectionManager } from "./ConnectionManager";
import { PlayersContainer } from "./PlayersContainer";
import { GameManager } from "./GameManager";

let name = getName();
while (!name) {
    name = prompt("Представься, мразь");
    setName(name);
}

document.getElementById('greeting').textContent = `Хочешь ли ты быть главным, ${name}?`;

const connection = new ConnectionManager(name, process.env.OVERRIDE_WS_PORT);

document.addEventListener('keydown', (event) => {
    if (event.key === ' ') {
        connection.sendAction();
    }
});

const changeNameButton = document.getElementById('changeName');
changeNameButton.textContent = `Я не ${name}!`;
changeNameButton.addEventListener('click', (_ => {
    clearName();
    document.location.reload();
}));

document.getElementById('makeOwner').addEventListener('click', (_) => connection.sendMakeOwner())

const playersContainer = new PlayersContainer(document.getElementById('playersContainer') as HTMLDivElement);
const signal = document.getElementById('signal') as HTMLAudioElement;
const gameManager = new GameManager(playersContainer, signal);
connection.messageListener = gameManager;