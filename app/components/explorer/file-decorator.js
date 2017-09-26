import {DateService} from '../../services/date';
import {fileTypes} from '../../config';

const formatFileSize = size => {
  const {value, unit} = ['MB', 'GB']
    .reduce(({ value, unit }, current) =>
      value < 1
        ? { value, unit }
        : { value: value / 1000, unit: current }
    , { value: size, unit: 'KB' });
  return `${value.toFixed(2)} ${unit}`;
};

const createImagePath = (str, imageDir) => `${imageDir}/${str}.gif`;

const createFileType = (extension, imageDir) => {
  const oValue = fileTypes[extension];
  return oValue
    ? (([name, ext = extension]) =>
      ({ name, image: createImagePath(ext, imageDir) }))(oValue.split('|'))
    : { name: 'Unknown file', image: createImagePath('unknown', imageDir) };
};

export const decorateFile = (file, imageDir) => {
  file.lastModifiedDateTime = DateService.format(file.lastModifiedDateTime);
  file.fileSize = formatFileSize(file.fileSize);
  file.fileType = createFileType(file.extension.slice(1), imageDir);
  return file;
};