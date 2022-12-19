import { mkdirSync, readdirSync, lstatSync, existsSync } from "fs";
import { cp } from "fs/promises";
import path, { resolve } from "path";
import { GLOBAL_ERROR_MESSAGE } from "./../constants/global.js";

export const copy = async (fromPath, toPath, fileName) => {
  const copyFolderSync = (from, to, file) => {
    if (!existsSync(to) || !lstatSync(to).isDirectory()) {
      mkdirSync(to);
    }

    if (lstatSync(from).isFile()) {
      cp(from, resolve(to, file));
    } else {
      readdirSync(from).forEach((element) => {
        if (lstatSync(path.resolve(from, element)).isFile()) {
          cp(path.resolve(from, element), path.resolve(to, element));
        } else {
          copyFolderSync(path.resolve(from, element), path.resolve(to, element), element);
        }
      });
    }
  };

  try {
    copyFolderSync(fromPath, toPath, fileName);
  } catch (err) {
    console.error(GLOBAL_ERROR_MESSAGE + " " + err);
  }
};
