import { Kinesis } from 'aws-sdk';

// Configure AWS SDK
// AWS.config.update({
//   region: 'your-region', // For example, 'us-west-2'
//   // credentials: new AWS.Credentials('accessKeyId', 'secretAccessKey') // Only if not using the default profile
// });

// Create Kinesis service object
// const kinesis = new AWS.Kinesis({apiVersion: 'latest'});

const kinesis = new Kinesis({apiVersion: '2013-12-02'});

const checkStreamExists = async (streamName: string) => {
  const params = {
    StreamName: streamName,
  };

  try {
    await kinesis.describeStream(params).promise();
    console.log(`Stream ${streamName} exists.`);
    return true; // The stream exists
  } catch (error) {
    if (error.code === 'ResourceNotFoundException') {
      console.log(`Stream ${streamName} does not exist.`);
    } else {
      console.log(`An error occurred: ${error.message}`);
    }
    return null; // The stream does not exist or an error occurred
  }
};

export { kinesis, checkStreamExists };
