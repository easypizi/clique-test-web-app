export default function prepareFilesData(files, isAdmin) {
  if (!files || !files.length) {
    return null;
  }

  return files.map((file) => ({ ...file, canBeDeleted: isAdmin }));
}
