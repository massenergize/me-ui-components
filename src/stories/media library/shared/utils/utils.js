export const getFilesFromTransfer = (transferItems) => {
  if (!transferItems) return [];
  const arr = [];

  for (let i = 0; i < transferItems.length; i++) {
    const item = transferItems[i];
    if (item.kind === "file") arr.push(item?.getAsFile());
  }
  return arr;
};

export const readContentOfSelectedFile = (file, cb) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (cb) cb(reader.result);
      resolve(reader.result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const getRandomStringKey = (limit = 9999999) => {
  return Math.random(limit).toString();
};
