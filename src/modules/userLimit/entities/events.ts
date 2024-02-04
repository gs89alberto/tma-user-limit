import { UserLimit } from './user-limit';

export enum EventType {
  USER_LIMIT_CREATED = 'USER_LIMIT_CREATED',
  USER_LIMIT_PROGRESS_CHANGED = 'USER_LIMIT_PROGRESS_CHANGED',
  USER_LIMIT_RESET = 'USER_LIMIT_RESET',
  USER_LIMIT_CHANGE_SOURCE_ADDED = 'USER_LIMIT_CHANGE_SOURCE_ADDED',
  LIMIT_USER_PENDING_PAYMENT_CREATED = 'LIMIT_USER_PENDING_PAYMENT_CREATED',
  LIMIT_USER_PENDING_PAYMENT_PROCESSED = 'LIMIT_USER_PENDING_PAYMENT_PROCESSED',
}

export interface UserLimitEvent {
  aggregateId: string;
  context: {
    correlationId?: string;
  };
  createdAt: number;
  eventId: string;
  payload: UserLimit;
  sequenceNumber: number;
  source: string;
  type: EventType;
}
