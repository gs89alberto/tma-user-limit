import AWS, { Kinesis } from 'aws-sdk';
import helper from '../../helpers/helper';
import { v4 as uuidv4 } from 'uuid';
import { errorResponse, successResponse } from 'src/helpers/responseType';

AWS.config.update({
  region: 'eu-west-3',
});
const kinesis = new Kinesis({
  apiVersion: '2013-12-02',
});

const producer = async (event: any) => {
  let response: successResponse | errorResponse;

  if (!event) {
    throw { statusCode: 400, message: 'No event data was found' };
  }

  const streamName = 'eventStream';

  try {
    await kinesis
      .putRecord({
        StreamName: streamName,
        PartitionKey: uuidv4(),
        Data: Buffer.from(JSON.stringify(event), 'base64'),
      })
      .promise();

    //   const shardIteratorParams = {
    //     StreamName: streamName,
    //     ShardId: record.ShardId, // Replace with your shard ID
    //     ShardIteratorType: 'TRIM_HORIZON',
    //   };
      
    //   kinesis.getShardIterator(shardIteratorParams, async function(err, data) {
    //     if (err) console.log(err, err.stack);
    //     else {
    //       const recordsParams = {
    //         ShardIterator: data.ShardIterator,
    //       };
    //       kinesis.getRecords(recordsParams, function(err, data) {
    //         if (err) console.log(err, err.stack);
    //         else     console.log('getRecord', data); // Output the data
    //       });
    //     }
    //   });

    response = helper.createSuccessResponse({ body: event, message: 'Message placed in the Event Stream!' });
  } catch (error) {
    response = helper.createErrorResponse(error);
  }

  return response;
};

export default producer;
