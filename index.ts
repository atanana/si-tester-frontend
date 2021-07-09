import { getName, setName } from "./storage";

let name = getName()
while (!name) {
    name = prompt("Представься, мразь")
    setName(name)
}