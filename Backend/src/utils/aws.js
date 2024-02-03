import aws from "aws-sdk";
import fs from "fs";
import Fs from "@supercharge/fs";

const uploadOnAws = async (req, res) => {
  try {
    const s3 = new aws.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET,
    });

    const productImage = fs.readFileSync(req);
    const fileName = Fs.filename(req);
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME, // bucket that we made earlier
      Key: fileName, // Name of the image
      Body: productImage, // Body which will contain the image in buffer format
      ACL: "public-read-write", // defining the permissions to get the public link
      ContentType: "image/jpeg", // Necessary to define the image content-type to view the photo in the browser with the link
    };
    return new Promise((resolve, reject) => {
      s3.upload(params, (error, data) => {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          resolve(data.Location);
        }
      });
    });
  } catch (error) {
    fs.unlinkSync(req);
    console.log(error);
  }
};

export { uploadOnAws };
