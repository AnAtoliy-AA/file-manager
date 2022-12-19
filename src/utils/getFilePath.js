import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

export function getFilePath(url, pathArray) {
  const __filename = fileURLToPath(url);
  const __dirname = dirname(__filename);
  const filePath = path.join(__dirname, ...pathArray);

  return filePath;
}
