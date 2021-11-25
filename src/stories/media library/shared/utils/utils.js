import { EXTENSIONS } from "../components/upload/Upload";

export const getRandomItem = (arr = [], limit) => {
  return arr[getRandomInteger(limit)];
};
export const getFilesFromTransfer = (transferItems) => {
  if (!transferItems) return [];
  const arr = [];

  for (let i = 0; i < transferItems.length; i++) {
    const item = transferItems[i];
    if (item.kind === "file") {
      const file = item?.getAsFile();
      if (EXTENSIONS.includes(file?.type)) arr.push(file);
      else console.log(`Sorry file type ${file?.type} isnt supported`);
    }
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

export const getRandomInteger = (limit = 9999999) => {
  return Math.floor(Math.random() * limit);
};

export const getRandomStringKey = (limit = 9999999) => {
  return Math.random(limit).toString();
};

const MEGA = 1000000;
const KILO = 1000;
export const getFileSize = (file) => {
  if (!file) return "";

  var size = file.size;
  if (size < MEGA) return Math.round(size / KILO).toString() + " KB";
  return Math.round(size / MEGA).toString() + " MB";
};

export const smartString = (string, limit = 15) => {
  if (!string) return "...";
  if (string.length > limit) return string.substr(0, limit) + "...";
  return string;
};
