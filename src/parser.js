import { inputRegex } from "./constants.js";

export const parseInput = (inputLine) =>{
    if(!inputLine){
        return null;
    }
    let cmd = {command: null, args: null};
    let inputArray = inputLine.match(inputRegex);
    inputArray = inputArray.map(item => item.replace(/"|'/g, ""));
    cmd.command = inputArray[0];
    cmd.args = inputArray.slice(1);
    return cmd;
}