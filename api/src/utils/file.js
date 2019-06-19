import aws from 'aws-sdk';

const s3 = new aws.S3();

const defaultParams = {
  Bucket: process.env.S3_BUCKET_NAME
};

export const upload = params =>
  new Promise((res, rej) =>
    s3.upload({ ...defaultParams, ...params }, function(err, data) {
      if (err) rej(err);
      else res(data);
    })
  );
