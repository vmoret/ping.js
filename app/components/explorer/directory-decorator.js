import {DateService} from '../../services/date';
import {decorateFile} from './file-decorator';

const compareFn = ({ name: a }, { name: b }) => a < b ? -1 : a > b ? 1 : 0;

export const decorateDirectory = (directory, imageDir) => {
  directory.lastModifiedDateTime = DateService.format(directory.lastModifiedDateTime);
  directory.directories = directory.directories
    .sort(compareFn)
    .map(directory => decorateDirectory(directory, imageDir));
  directory.files = directory.files
    .sort(compareFn)
    .map(file => decorateFile(file, imageDir));
  return directory;
};