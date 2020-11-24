/**
 * Based on ticketId, deletes ticket. But beforehand checks if user, who is trying to delete ticket, is owner of a community.

 * @param args
 * @returns {Promise<*>}
 */
export const singleUpload = async (_, {args}, { dbConnection }) => {
  return args.file.then(file => {
    console.log(args)
    const {createReadStream, filename, mimetype} = file

    const fileStream = createReadStream()

    fileStream.pipe(fs.createWriteStream(`./public/${filename}`))

    return file;
  });
};

export const singleUploadStream = async (_, {args}, { dbConnection }) => {
  const file = await args.file
  const {createReadStream, filename, mimetype} = file
  const fileStream = createReadStream()

  //Here stream it to S3
  // Enter your bucket name here next to "Bucket: "
  const uploadParams = {Bucket: 'apollo-file-upload-test', Key: filename, Body: fileStream};
  const result = await s3.upload(uploadParams).promise()

  console.log(result)


  return file;
}