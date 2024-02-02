import process from "node:process";
import readline from "node:readline";
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs/promises";

let currDir = dirname(fileURLToPath(import.meta.url));
const testdir = "E:/Diablo 2/";
const ls = async (dir) => {
  try {
    let rdir = await fs.readdir(dir, { withFileTypes: true });
    rdir.sort((a, b) => !a.isDirectory() - !b.isDirectory());
    rdir.forEach((item) => {
      item.isDirectory() ? (item.type = "directory") : (item.type = "file");
    });
    console.table(rdir,['name', 'type']);
  } catch (err) {
    console.log('Operation failed');
  }
};

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
