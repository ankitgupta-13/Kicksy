import aws from "aws-sdk";

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET,
});

const uploadOnAws = async (localFilePath) => {
  try {
    
  } catch (error) {
    console.log(error);
  }
};
