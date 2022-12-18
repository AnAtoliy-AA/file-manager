import * as readline from "node:readline";
import { parse, resolve } from "path";
import {
  UP_DIRECTORY_COMMAND,
  DEFAULT_PROMPT,
  WRONG_COMMAND,
  EXIT_MESSAGE,
  DIRECTORY_LIST,
  CURRENT_PATH_MESSAGE,
  CHANGE_DIRECTORY,
  READ_FILE,
  CREATE_FILE,
  RENAME_FILE,
  COPY_FILE,
  MOVE_FILE,
  REMOVE_FILE,
  OPERATING_SYSTEM,
  GET_HASH,
  COMPRESS,
  DECOMPRESS,
  EXIT,
  DIRECTORY_IS_NOT_EXIST,
} from "./../constants/global.js";
import { list } from "../commands/list.js";
import { access } from "node:fs";
import { read } from "../commands/read.js";
import { create } from "../commands/create.js";
import { rename } from "../commands/rename.js";
import { copy } from "../commands/copy.js";
import { remove } from "../commands/remove.js";
import { osCommands } from "../commands/osCommands.js";
import { calculateHash } from "../commands/calculateHash.js";
import { compress } from "../commands/compress.js";
import { decompress } from "../commands/decompress.js";
import { getCurrentDirPath, setCurrentDirPath } from '../utils/navigation.js';
import { existsSync } from 'fs'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: DEFAULT_PROMPT,
});

export async function runCommandSelector(userName) {
  rl.prompt();

  rl.on("line", async (line) => {
    const currentDirectory = await getCurrentDirPath();
    const { dir, base } = parse(currentDirectory);

    const command = line.split(" ")[0];

    const params = line.split(" ").slice(1).join(" ")
    const firstParam = params.split(" ")[0];
    const secondParam = params.split(" ")[1];

    switch (command) {
      case UP_DIRECTORY_COMMAND:
        setCurrentDirPath(dir);

        console.log(CURRENT_PATH_MESSAGE + dir);
        break;

      case CHANGE_DIRECTORY:
        access(params, () => {
          const newPath = resolve(currentDirectory, params);
          const isDirExist = existsSync(newPath);

          if (isDirExist) {
            setCurrentDirPath(newPath);

            console.log(CURRENT_PATH_MESSAGE + newPath);
          } else {
            console.error(DIRECTORY_IS_NOT_EXIST);
            console.log(CURRENT_PATH_MESSAGE + currentDirectory);
          }
        });
        break;

      case DIRECTORY_LIST:
        list(currentDirectory);

        console.log(CURRENT_PATH_MESSAGE + currentDirectory);
        break;

      case READ_FILE:
        read(resolve(currentDirectory, params));

        console.log(CURRENT_PATH_MESSAGE + currentDirectory);
        break;

      case CREATE_FILE:
        create(resolve(currentDirectory, params));

        console.log(CURRENT_PATH_MESSAGE + currentDirectory);
        break;

      case RENAME_FILE:
        rename(resolve(currentDirectory, firstParam), resolve(currentDirectory, secondParam));

        console.log(CURRENT_PATH_MESSAGE + currentDirectory);
        break;

      case COPY_FILE:
        copy(resolve(currentDirectory, firstParam), resolve(currentDirectory, secondParam));

        console.log(CURRENT_PATH_MESSAGE + currentDirectory);
        break;

      case MOVE_FILE:
        copy(resolve(currentDirectory, firstParam), resolve(currentDirectory, secondParam));
        remove(resolve(currentDirectory, firstParam));

        console.log(CURRENT_PATH_MESSAGE + currentDirectory);
        break;

      case REMOVE_FILE:
        remove(resolve(currentDirectory, params));

        console.log(CURRENT_PATH_MESSAGE + currentDirectory);
        break;

      case OPERATING_SYSTEM:
        osCommands(firstParam.slice(2));

        console.log(CURRENT_PATH_MESSAGE + currentDirectory);
        break;

      case GET_HASH:
        calculateHash(resolve(currentDirectory, params));

        console.log(CURRENT_PATH_MESSAGE + currentDirectory);
        break;

      case COMPRESS:
        compress(resolve(currentDirectory, params));

        console.log(CURRENT_PATH_MESSAGE + currentDirectory);
        break;

      case DECOMPRESS:
        decompress(resolve(currentDirectory, params));

        console.log(CURRENT_PATH_MESSAGE + currentDirectory);
        break;

      case EXIT:
        process.stdout.write(EXIT_MESSAGE + userName + "!");
        process.exit(0);

      default:
        console.log(WRONG_COMMAND);
        break;
    }

    rl.prompt();
  }).on("close", () => {
    process.stdout.write(EXIT_MESSAGE + userName + "!");
    process.exit(0);
  });
}
