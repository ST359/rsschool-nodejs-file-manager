import process from "node:process";
import readline from "node:readline";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const currDir = dirname(fileURLToPath(import.meta.url));
const testdir = "E:/Diablo 2/";


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: `${currDir}> `,
});
rl.on("line", () => {
    ls(testdir);
});
process.on("exit", () => {
    console.log("exit");
});
