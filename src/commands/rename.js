import { existsSync, rename as renameFS } from "fs";
import { ERROR_MESSAGE, RENAMED } from "./../constants/global.js";

export const rename = async (wrongFilePath, rightFilePath) => {
  if (existsSync(wrongFilePath) || !existsSync(rightFilePath)) {
    renameFS(wrongFilePath, rightFilePath, function (err) {
      if (err) console.error(err);
      console.log(RENAMED);
    });

  } else {
    console.error(ERROR_MESSAGE);
  }
};
