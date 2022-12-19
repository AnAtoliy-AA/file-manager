import { createReadStream, createWriteStream, lstatSync, existsSync } from "fs";
import { createBrotliDecompress } from "zlib";
import { DECOMPRESSED, GLOBAL_ERROR_MESSAGE } from "./../constants/global.js";

export const decompress = async (filePath, filePathTo) => {
  try {
    if (filePath && filePathTo && existsSync(filePath) && lstatSync(filePath).isFile()) {
      const unzip = createBrotliDecompress();
      const reader = createReadStream(filePath);
      const writer = createWriteStream(filePathTo);

      const stream = reader.pipe(unzip).pipe(writer);

      stream.on('finish', () => {
        console.log(DECOMPRESSED);
      });
    }
  } catch (e) {
    console.error(GLOBAL_ERROR_MESSAGE, e)
  }
};
