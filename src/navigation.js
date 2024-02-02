import fs from 'node:fs/promises'


const ls = async (dir) => {
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