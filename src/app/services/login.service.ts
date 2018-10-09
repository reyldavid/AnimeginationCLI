import { EventEmitter } from '@angular/core';

export class LoginService {
    public userLoggedIn: EventEmitter<string>;

    constructor() {
        this.userLoggedIn = new EventEmitter();
    }

    public login(firstName: string): void {
        this.userLoggedIn.emit(firstName);
    }
}
