export const setCurrentDirPath = async (path) => {
  process.env.currentPath = path;
};

export const getCurrentDirPath = async () => {
  return process.env.currentPath;
};
