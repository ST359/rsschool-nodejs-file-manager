import os from "node:os";

export const osInfoHandler = (arg) => {
    switch (arg) {
        case "--EOL":
            console.log(JSON.stringify(os.EOL));
            break;
        case "--cpus":
            let cpusArr = os.cpus();
            cpusArr.forEach((cpu) => cpu.speed = `${cpu.speed/1000} GHz`);
            console.log(`\nOverall amount of CPUS: ${cpusArr.length}`);
            console.table(cpusArr, ["model", "speed"]);
            break;
        case "--homedir":
            console.log(os.homedir());
            break;
        case "--username":
            console.log(os.userInfo({ encoding: "UTF-8" }).username);
            break;
        case "--architecture":
            console.log(os.arch());
            break;
        default:
            console.log('Unknown os operation argument');
            break;
    }
};

