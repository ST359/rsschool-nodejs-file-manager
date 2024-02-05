import fs from "node:fs/promises";
import { createReadStream, createWriteStream } from "node:fs";
import { isDir, exists } from "./helpers.js";
import { stdout } from "node:process";
import path from "node:path";
import { pipeline } from "node:stream/promises";
import { createHash } from "node:crypto";
import { createBrotliCompress, createBrotliDecompress } from "node:zlib";

export const fileHandler = async (cmd, currDir) => {
    switch (cmd.command) {
        case "cat":
            if (cmd.args.length < 1) {
                console.log("Invalid input");
                break;
            }
            await cat(currDir, cmd.args[0]);
            break;
        case "add":
            if (cmd.args.length < 1) {
                console.log("Invalid input");
                break;
            }
            await add(currDir, cmd.args[0]);
            break;
        case "rn":
            if (cmd.args.length < 2) {
                console.log("Invalid input");
                break;
            }
            await rn(currDir, cmd.args[0], cmd.args[1]);
            break;
        case "cp":
            if (cmd.args.length < 2) {
                console.log("Invalid input");
                break;
            }
            await cp(currDir, cmd.args[0], cmd.args[1]);
            break;
        case "mv":
            if (cmd.args.length < 2) {
                console.log("Invalid input");
                break;
            }
            await mv(currDir, cmd.args[0], cmd.args[1]);
            break;
        case "rm":
            if (cmd.args.length < 1) {
                console.log("Invalid input");
                break;
            }
            await rm(currDir, cmd.args[0]);
            break;
        case "hash":
            if (cmd.args.length < 1) {
                console.log("Invalid input");
                break;
            }
            await hash(currDir, cmd.args[0]);
            break;
        case "compress":
            if (cmd.args.length < 2) {
                console.log("Invalid input");
                break;
            }
            await compress(currDir, cmd.args[0], cmd.args[1]);
            break;
        case "decompress":
            if (cmd.args.length < 2) {
                console.log("Invalid input");
                break;
            }
            await decompress(currDir, cmd.args[0], cmd.args[1]);
            break;
        default:
            console.log("Invalid input");
            break;
    }
};

const cat = async (currDir, targetFile) => {
    const target = path.resolve(currDir, targetFile);
    if (!(await exists(target)) || (await isDir(target))) {
        console.log("Invalid input");
        return -1;
    }
    const rs = createReadStream(target);
    rs.on('data',(data) => console.log(data.toString()));
};

const add = async (currDir, targetFile) => {
    const destPath = path.resolve(currDir, targetFile);
    if (await exists(destPath)) {
        console.log("Operation failed: file already exists");
        return -1;
    }
    try {
        const fd = await fs.open(destPath, 'wx');
        await fd.close();
    } catch (err) {
        console.log("Operation failed");
    }
};

const rn = async (currDir, targetFile, newName) => {
    const src = path.resolve(currDir, targetFile);
    const dest = path.resolve(currDir, newName);
    if (!(await exists(src)) || (await exists(dest))) {
        console.log(
            "Invalid input: source not exists or destination already exists"
        );
        return -1;
    }
    try {
        await fs.rename(src, dest);
    } catch (err) {
        console.log("Operation failed");
    }
};

const cp = async (currDir, file, dest) => {
    const filePath = path.resolve(currDir, file);
    const destPath = path.resolve(currDir, dest);
    if (!(await exists(filePath)) || (await exists(destPath))) {
        console.log(
            "Invalid input: source not exists or destination already exists"
        );
        return -1;
    }
    const rs = createReadStream(filePath);
    const ws = createWriteStream(destPath);
    try {
        await pipeline(rs, ws);
    } catch (err) {
        console.log("Operation failed");
    }
};
const mv = async (currDir, file, dest) => {
    const filePath = path.resolve(currDir, file);
    try {
        await cp(currDir, file, dest);
        await fs.unlink(filePath);
    } catch (err) {
        console.log("Operation failed");
    }
};
const rm = async (currDir, targetFile) => {
    const filePath = path.resolve(currDir, targetFile);
    if (!(await exists(filePath))) {
        console.log("Invalid input: source not exists");
        return -1;
    }
    try {
        await fs.unlink(filePath);
    } catch (err) {
        console.log("Operation failed");
    }
};

const hash = async (currDir, targetFile) => {
    const filePath = path.resolve(currDir, targetFile);
    if (!(await exists(filePath)) || (await isDir(filePath))) {
        console.log("Invalid input: source not exists or is a directory");
        return -1;
    }
    const hash = createHash("sha256");
    const rs = createReadStream(filePath);
    rs.pipe(hash).on("data", () => console.log(hash.digest("hex")));
};
const compress = async (currDir, file, dest) => {
    const filePath = path.resolve(currDir, file);
    const destPath = path.resolve(currDir, dest);
    if (!(await exists(filePath)) || (await exists(destPath))) {
        console.log(
            "Invalid input: source not exists or destination already exists"
        );
        return -1;
    }
    const rs = createReadStream(filePath);
    const ws = createWriteStream(destPath);
    const zip = createBrotliCompress();
    try {
        await pipeline(rs, zip, ws);
    } catch (err) {
        console.log("Operation failed");
    }
};
const decompress = async (currDir, file, dest) => {
    const filePath = path.resolve(currDir, file);
    const destPath = path.resolve(currDir, dest);
    if (!(await exists(filePath)) || (await exists(destPath))) {
        console.log(
            "Invalid input: source not exists or destination already exists"
        );
        return -1;
    }
    const rs = createReadStream(filePath);
    const ws = createWriteStream(destPath);
    const zip = createBrotliDecompress();
    try {
        await pipeline(rs, zip, ws);
    } catch (err) {
        console.log("Operation failed");
    }
};