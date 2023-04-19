export default function prepareFilesData(files, isAdmin, userId) {
  if (!files || !files.length) {
    return null;
  }

  return files.map((file) => ({ ...file, canBeDeleted: isAdmin, userId }));
}
