import { readdir, statSync } from "fs";
import { ERROR_MESSAGE, FILE_VARIANTS } from "./../constants/global.js";
import { resolve } from "path";

export const list = async (directoryPath) => {
  readdir(directoryPath, function (err, files) {
    if (err) {
      console.error(ERROR_MESSAGE);
    }

    //TODO!! a lot of iterations, but it works
    const dirFiles = files.filter((file) => statSync(resolve(directoryPath, file)).isDirectory()).sort();
    const fileTypeFiles = files.filter((file) => statSync(resolve(directoryPath, file)).isFile()).sort();

    const tableObj = dirFiles.concat(fileTypeFiles).reduce((acc, file, i) => {
      const fPath = resolve(directoryPath, file);
      const fileType = statSync(fPath).isDirectory()
        ? FILE_VARIANTS.DIRECTORY
        : statSync(fPath).isFile()
          ? FILE_VARIANTS.FILE
          : FILE_VARIANTS.UNKNOWN;


      acc[i] = { Name: file, Type: fileType };

      return acc;
    }, {})

    console.table(tableObj);
  });
};
