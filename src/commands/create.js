import { existsSync, writeFile } from "fs";
import { ERROR_MESSAGE, EXIST_ERROR } from "./../constants/global.js";

export const create = async (filePath) => {
  try {
    if (!existsSync(filePath)) {
      writeFile(filePath, '', function (err) {
        if (err) throw err;
        console.log("File is created successfully.");
      });
    } else {
      console.log(ERROR_MESSAGE + filePath + EXIST_ERROR);
    }
  } catch (err) {
    console.error(err);
  }
};
