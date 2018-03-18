import fs from 'fs';

export const logger = (text, file) => {
  fs.appendFile(file, text, 'utf8', err => {
    return err;
  });
};
