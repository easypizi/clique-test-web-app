export default function prepareFilesData(files, isAdmin, userId) {
  if (!files || !files.length) {
    return null;
  }

  const result = files.map((file) => ({
    ...file,
    canBeDeleted: isAdmin,
    userId
  }));

  return result.sort((a, b) => b.date - a.date);
}
