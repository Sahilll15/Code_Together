const AWS = require('aws-sdk');
const fs = require('fs');

// Set your AWS credentials (replace 'your-access-key-id' and 'your-secret-access-key' with actual values)
AWS.config.update({
  accessKeyId: 'your-access-key-id',
  secretAccessKey: 'your-secret-access-key',
  region: 'us-east-1', // Change to your desired region
});

// Create an S3 service object
const s3 = new AWS.S3();

// Read the file you want to upload
const filePath = 'path/to/your/file.txt'; // Replace with the actual file path
const fileContent = fs.readFileSync(filePath);

// Set the parameters for the S3 bucket and object
const bucketName = 'your-bucket-name'; // Replace with your S3 bucket name
const keyName = 'destination/folder/file.txt'; // Replace with the desired key (path) in the bucket


const params = {
  Bucket: bucketName,
  Key: keyName,
  Body: fileContent,
};

// Upload the file to S3
s3.upload(params, (err, data) => {
  if (err) {
    console.error('Error uploading file:', err);
  } else {
    console.log('File uploaded successfully:', data.Location);
  }
});
