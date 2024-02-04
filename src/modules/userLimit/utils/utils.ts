import { v4 as uuid } from 'uuid';
import { UserLimitEvent, EventType } from "../entities/events";
import { UserLimit } from "../entities/user-limit";

export const createMockUserLimit = (data: UserLimit): UserLimitEvent => {
  return {
    aggregateId: uuid(),
    context: {
      correlationId: uuid(),
    },
    createdAt: Date.now(),
    eventId: uuid(),
    payload: data,
    sequenceNumber: Math.floor(Math.random() * 1000),
    source: 'limitUser',
    type: EventType.USER_LIMIT_CREATED,
  };
}