import { ls, up, cd } from "./navigation.js";
import { osInfoHandler } from "./osInfoHandler.js";
import { fileHandler } from "./fileHandler.js";
import { COMMANDS } from "./constants.js";

export class cliApp {
    constructor(dir, username) {
        this._currDir = dir;
        this.username = username;
    }
    commandHandler = async (cmd) => {
        if (!cmd) {
            console.log("No command was given");
            return;
        }
        switch (cmd.command) {
            case "commands":
                console.table(COMMANDS);
                break;
            case "ls":
                await ls(this._currDir);
                break;
            case "up":
                this._currDir = up(this._currDir);
                break;
            case "cd":
                this._currDir = await cd(this._currDir, cmd.args[0]);
                break;
            case "os":
                osInfoHandler(cmd.args[0]);
                break;
            case ".exit":
                process.exit();
            default:
                await fileHandler(cmd, this._currDir);
                break;
        }
    };
}
