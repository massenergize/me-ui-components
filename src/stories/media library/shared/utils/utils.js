

export const getFilesFromTransfer = (transferItems) => {
  if (!transferItems) return [];
  const arr = [];

  for (let i = 0; i < transferItems.length; i++) {
    const item = transferItems[i];
    if (item.kind === "file") arr.push(item?.getAsFile());
  }
  return arr;
};
