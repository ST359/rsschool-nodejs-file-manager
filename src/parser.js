
export const parseInput = (inputLine) =>{
    let cmd = {command: null, args: null};
    const inputArray = inputLine.split(' ');
    cmd.command = inputArray[0];
    cmd.args = inputArray.slice(1);
    return cmd;
}