import {
  OPERATING_SYSTEM_ARCHITECTURE,
  OPERATING_SYSTEM_CPUS,
  OPERATING_SYSTEM_EOL,
  OPERATING_SYSTEM_HOMEDIR,
  OPERATING_SYSTEM_USERNAME,
} from "../constants/global.js";
import { EOL, cpus, homedir, userInfo, arch } from "os";

export const osCommands = async (command) => {
  switch (command) {
    case OPERATING_SYSTEM_EOL:
      console.log(EOL);
      break;
    case OPERATING_SYSTEM_CPUS:
      console.log(cpus());
      break;
    case OPERATING_SYSTEM_HOMEDIR:
      console.log(homedir());
      break;
    case OPERATING_SYSTEM_ARCHITECTURE:
      console.log(arch());
      break;
    case OPERATING_SYSTEM_USERNAME:
      console.log(userInfo().username);
      break;
    default:
      console.log(WRONG_COMMAND);
      break;
  }
};
