import fsPromises from 'fs/promises';
import fs from 'fs';
import path from 'path';
import { TICKET_UPLOAD_DIR } from '../../../constants';
import { random } from 'lodash';

export const singleUpload = async (args) => {
    console.log("heeeey")
    console.log(args)
    const d = new Date();
    var date = d.getDate();
    var month = d.getMonth() + 1;
    var year = d.getFullYear();
    const fullDate = year+'-'+month+'-'+date;
    console.log("sssss")
    await fsPromises.mkdir(path.join(TICKET_UPLOAD_DIR, fullDate), { recursive: true });
    console.log("sssss")
    const betterName = Date.now()+'-'+random(99999999)+'-'+args.file.filename;
    const path = path.join(fullDate, betterName)
    await args.file.then((file) => {
        console.log("hiii")
        const { createReadStream, filename, mimetype } = file;
        const fileStream = createReadStream();
        const filePath = path.join(TICKET_UPLOAD_DIR, filename);

        //const betterName = Date.now()+'-'+random(99999999)+'-'+filename;
        const filePathNew = path.join(TICKET_UPLOAD_DIR, fullDate, betterName);
        const returnPath = path.join(fullDate, betterName)

        fileStream.pipe(fs.createWriteStream(filePath))
        fs.renameSync(filePath, filePathNew)
        console.log("gere")
        console.log(returnPath)
        return returnPath
    })
    console.log("sčšžšssss")
    return path
}
