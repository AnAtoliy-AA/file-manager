import { createReadStream, createWriteStream, existsSync, lstatSync } from "fs";
import { createBrotliCompress } from "zlib";
import { COMPRESSED, GLOBAL_ERROR_MESSAGE } from "./../constants/global.js";

export const compress = async (filePath, filePathTo) => {
  try {
    if (filePath && filePathTo && existsSync(filePath) && lstatSync(filePath).isFile()) {
      const gzip = createBrotliCompress();
      const reader = createReadStream(filePath);
      const writer = createWriteStream(filePathTo);

      const stream = reader.pipe(gzip).pipe(writer);
      stream.on('finish', () => {
        console.log(COMPRESSED);
      });
    }
  } catch (e) {
    console.error(GLOBAL_ERROR_MESSAGE, e)
  }
};
