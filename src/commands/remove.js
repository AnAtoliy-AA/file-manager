import { existsSync, unlink } from "fs";
import { ERROR_MESSAGE, NOT_EXIST_ERROR, REMOVED } from "./../constants/global.js";

export const remove = async (filePath) => {
  try {
    if (existsSync(filePath)) {
      unlink(filePath, function (err) {
        if (err) throw err;
        console.log("File is removed successfully.");
      });
    } else {
      console.error(ERROR_MESSAGE + filePath + NOT_EXIST_ERROR)
    }
  } catch (err) {
    console.error(err);
  }
};
