import { readFile } from "fs";
import { ERROR_MESSAGE } from "./../constants/global.js";

export const read = async (filePath) => {

  readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(ERROR_MESSAGE + err);
      return;
    }
    console.log(data);
  });
};
