import { existsSync, unlink } from "fs";

export const remove = async (filePath) => {
  try {
    if (existsSync(filePath)) {
      unlink(filePath, function (err) {
        if (err) throw err;
        console.log("File is removed successfully.");
      });
    }
  } catch (err) {
    console.error(err);
  }
};
