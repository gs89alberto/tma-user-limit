import { IUserLimitService } from './userLimitService.interface';
import { logger } from '../../../helpers/logger';
import { UserLimit } from '../entities/user-limit';
import fs from 'fs';
import helper from '../../../helpers/helper';
import producer from '../../../modules/kinesis/producer';
import { EventType, UserLimitEvent } from '../entities/events';
import { createMockUserLimit } from '../utils/utils';

class UserLimitService implements IUserLimitService {
  async create(data: UserLimit): Promise<any> {
    try {
      const userLimitEvents = JSON.parse(fs.readFileSync('./src/data/user-limit.json', 'utf8'));
      const { userLimitId: newUserLimitId } = data;
      if (userLimitEvents.some((userLimit: UserLimitEvent) => userLimit.payload.userLimitId === newUserLimitId)) {
        throw new Error(`This UserLimitId ${newUserLimitId} already exists`);
      }
      userLimitEvents.push(createMockUserLimit(data));
      fs.writeFileSync('./src/data/user-limit.json', JSON.stringify(userLimitEvents));
      producer(data);
      return helper.createSuccessResponse({ status: 201, body: data, message: 'User limit created successfully' });
    } catch (error) {
      logger.error(error);
      return helper.createErrorResponse(error);
    }
  }

  async updateProgress(userLimitId: string, progress: string): Promise<any> {
    try {
      const userLimitEvents: UserLimitEvent[] = JSON.parse(fs.readFileSync('./src/data/user-limit.json', 'utf8'));
      const userLimitToUpdate = userLimitEvents.find(
        (userLimitEvent: UserLimitEvent) => userLimitEvent.payload.userLimitId === userLimitId
      );
      if (!userLimitToUpdate) {
        throw { status: 404, message: 'User limit id not found' };
      }
      userLimitToUpdate.payload.progress = progress;
      userLimitToUpdate.type = EventType.USER_LIMIT_PROGRESS_CHANGED;
      fs.writeFileSync('./src/data/user-limit.json', JSON.stringify(userLimitEvents));
      producer(userLimitToUpdate);
      return helper.createSuccessResponse({
        status: 201,
        body: userLimitToUpdate,
        message: 'User limit progress updated successfully',
      });
    } catch (error) {
      logger.error(error);
      return helper.createErrorResponse(error);
    }
  }

  async resetProgress(userLimitId: string): Promise<any> {
    try {
      const userLimitEvents: UserLimitEvent[] = JSON.parse(fs.readFileSync('./src/data/user-limit.json', 'utf8'));
      const userLimitToReset = userLimitEvents.find(
        (userLimitEvent: UserLimitEvent) => userLimitEvent.payload.userLimitId === userLimitId
      );
      if (!userLimitToReset) {
        throw { status: 404, message: 'User limit id not found' };
      }
      userLimitToReset.payload.progress = '0';
      userLimitToReset.type = EventType.USER_LIMIT_RESET;
      fs.writeFileSync('./src/data/user-limit.json', JSON.stringify(userLimitEvents));
      producer(userLimitToReset);
      return helper.createSuccessResponse({
        status: 201,
        body: userLimitToReset,
        message: 'User limit progress has been reset',
      });
    } catch (error) {
      logger.error(error);
      return helper.createErrorResponse(error);
    }
  }
}

export default new UserLimitService();
