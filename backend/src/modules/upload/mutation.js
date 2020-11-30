import fsPromises from 'fs';
import fs from 'fs';
import path from 'path';
import { TICKET_UPLOAD_DIR } from '../../constants';

/**
 * Based image upload.

 * @param args
 * @returns {Promise<*>}
 */
export const singleUpload = async (_, args, { dbConnection }) => {
  // await fsPromises.mkdir(TICKET_UPLOAD_DIR, { recursive: true });

  return args.file.then((file) => {
    const { createReadStream, filename, mimetype } = file;

    const fileStream = createReadStream();

    const filePath = path.join(TICKET_UPLOAD_DIR, filename);
    fileStream.pipe(fs.createWriteStream(filePath));

    return file;
  });
};
