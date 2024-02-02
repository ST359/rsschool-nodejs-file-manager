import fs from "node:fs/promises";
import path from "node:path";

export class cliApp {
    constructor(dir, username) {
        this._currDir = dir;
        this._username = username;
    }
    cd(dir) {
        this._currDir = dir;
    }
}
