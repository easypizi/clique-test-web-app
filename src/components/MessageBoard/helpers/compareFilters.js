const compareFilterArrays = (arr1, arr2) => {
  if (!arr1.length || !arr2.length) {
    return false;
  }

  if (arr1.length !== arr2.length) {
    return false;
  }

  const sortedArray1 = arr1.slice().sort();
  const sortedArray2 = arr2.slice().sort();

  for (let i = 0; i < sortedArray1.length; i++) {
    if (sortedArray1[i] !== sortedArray2[i]) {
      return false;
    }
  }

  return true;
};

export default compareFilterArrays;
