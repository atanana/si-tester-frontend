import { getName, setName } from "./storage";
import { ConnectionManager } from "./connection";

let name = getName();
while (!name) {
    name = prompt("Представься, мразь");
    setName(name);
}

const connection = new ConnectionManager(name);


document.addEventListener('keydown', (event) => {
    if (event.key === ' ') {
        connection.sendAction();
    }
});