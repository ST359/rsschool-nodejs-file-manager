import fs from 'node:fs/promises';
import path from 'node:path';

export const ls = async (dir) => {
    try {
        let rdir = await fs.readdir(dir, { withFileTypes: true });
        rdir.sort((a, b) => !a.isDirectory() - !b.isDirectory());
        rdir.forEach((item) => {
            item.isDirectory()
                ? (item.type = "directory")
                : (item.type = "file");
        });
        console.table(rdir, ["name", "type"]);
    } catch (err) {
        console.log("Operation failed");
    }
};

export const up = (currDir) => {
    return path.resolve(currDir, '..')
}

export const cd = async (currDir, destDir) => {
    try {
        const newDir = path.resolve(currDir, destDir);
        const stats = await fs.stat(newDir);
        if(!stats.isDirectory()){
            console.log(`Invalid input: destination is a file`);
            return currDir;
        }
        return newDir;
    }catch(err){
        console.log(`Invalid input`);
    }
}