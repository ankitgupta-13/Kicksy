import {
    DeleteObjectCommand,
    GetObjectCommand,
    PutObjectCommand,
    S3Client
} from "@aws-sdk/client-s3";

import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

/*
*
* ----------------->STEPS<---------------- 
*
* 1. CREATE A IAM USER
* 2. GENERATE ACCESS KEYS BY GOING INTO security credentials > create access keys
* 3. CREATE A S3 CLIENT
*/

/*
* LINK FOR CREATING IAM USER
* https://us-east-1.console.aws.amazon.com/iam/home?region=ap-south-1#/users
*
* LINK FOR CREATING ACCESS KEYS OF AN IAM USER
* https://us-east-1.console.aws.amazon.com/iam/home?region=ap-south-1#/users/details/<IAM USER-NAME THAT U HAVE CREATED>/create-access-key 
* 
* REPLACE THE USERNAME WITH THE NAME OF YOUR IAM USER
*
*
* --------------> STEPS <------------------
*/

const Bucket = process.env.AWS_BUCKET_NAME

const s3Client = new S3Client({
    region: "ap-south-1",
    credentials: {
        accessKeyId: "AKIAU6GDZ6JZJHXL5WGR",
        secretAccessKey: "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"
    }
})

async function getObjectUrl(key) {
    const command = new GetObjectCommand({
        Bucket,
        Key: key
    })

    const url = getSignedUrl(s3Client, command);
    return url;
}

async function uploadObject(fileName, ContentType) {
    const key = `uploads/admin/${fileName}-${Date.now()}`
    const command = new PutObjectCommand({
        Bucket,
        Key: key,
        ContentType: ContentType
    })

    const url = await getSignedUrl(s3Client, command, { expiresIn: 300 })
    return {
        url,
        key
    };
}

async function deleteObject(key) {
    const command = new DeleteObjectCommand({
        Bucket,
        Key: key
    })
    const deleted = await s3Client.send(command);
    return deleted;
}

// console.log(await uploadObject("Picture2.png", "image/png"))



export {
    getObjectUrl,
    uploadObject,
    deleteObject
};