import fs from 'node:fs/promises';

export const isDir = async (path) => {
    try {
        if ((await fs.stat(path)).isDirectory()){
            return true;
        }
        return false;
    } catch (err) {
        return false;
    }
}
export const exists = async (path) => {
    try{
        await fs.access(path);
        return true;
    }catch(err){
        return false;
    }
}