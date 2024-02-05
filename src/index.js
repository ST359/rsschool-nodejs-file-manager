import process from "node:process";
import readline from "node:readline";
import os from "node:os";
import { parseInput } from "./parser.js";
import { cliApp } from "./cliApp.js";

let username = 'Anonymous';
if(process.argv[2]){
    username = process.argv[2].replace("--username=", "");
}

const homedir = os.homedir();
const app = new cliApp(homedir, username);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});


console.log(`Welcome to the File Manager, ${username}!`);
console.log('To see list of available commands use "commands"')
console.log(`You are currently in ${homedir}`);

rl.on("line", async (line) => {
    let cmd = parseInput(line);
    await app.commandHandler(cmd);
    console.log(`You are currently in ${app._currDir}`);
})

process.on("exit", () => {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
});
