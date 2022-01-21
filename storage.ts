const KEY_NAME = 'name'

const storage = window.localStorage

export function getName() {
    return storage.getItem(KEY_NAME)
}

export function setName(name: string) {
    storage.setItem(KEY_NAME, name)
}

export function clearName() {
    storage.removeItem(KEY_NAME);
}