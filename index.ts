import { getName, setName } from "./storage";
import { WebsocketBuilder } from 'websocket-ts';

let name = getName();
while (!name) {
    name = prompt("Представься, мразь");
    setName(name);
}

const ws = new WebsocketBuilder('ws://localhost:8080/ws')
    .onOpen((_, event) => { })
    .onError((_, event) => { alert('Произошла чудовищная ошибка!') })
    .onClose((_, event) => { alert('Утрачено соединение с сервером!') })
    .onMessage((_, event) => { console.log(event.data) })
    .build();


document.addEventListener('keydown', (event) => {
    if (event.key === ' ') {
        ws.send("action");
    }
});