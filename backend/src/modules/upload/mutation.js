import fsPromises from 'fs';
import fs from 'fs';
import path from 'path';
import { TICKET_UPLOAD_DIR } from '../../constants';
import { random } from 'lodash';

/**
 * Based on ticketId, deletes ticket. But beforehand checks if user, who is trying to delete ticket, is owner of a community.

 * @param args
 * @returns {Promise<*>}
 */
export const singleUpload = async (args) => {
  var pathImage = "";
  if(args!=undefined){
    const d = new Date();
    var date = d.getDate();
    var month = d.getMonth() + 1;
    var year = d.getFullYear();
    const fullDate = year+'-'+month+'-'+date;
    fsPromises.mkdir(path.join(TICKET_UPLOAD_DIR, fullDate), { recursive: true }, (err) => { 
      if (err) { 
        console.log(err); 
      } 
    });
    
    await args.file.then((file) => {
        const { createReadStream, filename } = file;
        const betterName = Date.now()+'-'+random(99999999)+'-'+filename;
        pathImage = path.join(fullDate, betterName)
        const fileStream = createReadStream();
        const filePath = path.join(TICKET_UPLOAD_DIR, filename);
        
        const filePathNew = path.join(TICKET_UPLOAD_DIR, fullDate, betterName);
        const returnPath = path.join(fullDate, betterName)

        fileStream.pipe(fs.createWriteStream(filePath))
        fs.renameSync(filePath, filePathNew)
        return returnPath
    })
  }
  return pathImage
};
