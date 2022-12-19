import { existsSync, rename as renameFS } from "fs";
import { ERROR_MESSAGE } from "./../constants/global.js";

export const rename = async (wrongFilePath, rightFilePath) => {
  if (existsSync(wrongFilePath) || !existsSync(rightFilePath)) {
    renameFS(wrongFilePath, rightFilePath, function (err) {
      if (err) throw err;
      console.log("File is renamed successfully.");
    });

  } else {
    console.error(ERROR_MESSAGE);
  }
};
