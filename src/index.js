import {
  USER_NAME_COMMAND,
  WELCOME_MESSAGE_TEXT,
  CURRENT_PATH_MESSAGE,
} from "./constants/global.js";
import { homedir } from "os";
import { runCommandSelector } from "./commandSelector/commandSelector.js";
import { setCurrentDirPath } from './utils/navigation.js';

const processArguments = process.argv.slice(2);

const { userName } = processArguments.reduce(
  (acc, arg) => {
    if (arg.includes(USER_NAME_COMMAND)) {
      acc.userName = arg.replace(USER_NAME_COMMAND, "");
    }

    return acc;
  },
  { userName: "" }
);

const homeDirectory = homedir();
setCurrentDirPath(homeDirectory);

console.log(WELCOME_MESSAGE_TEXT + userName + "!");
console.log(homedir());
console.log(CURRENT_PATH_MESSAGE + homeDirectory);

runCommandSelector(userName);
