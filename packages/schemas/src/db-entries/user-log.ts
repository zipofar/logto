// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import { z } from 'zod';

import { UserLogPayload, userLogPayloadGuard, GeneratedSchema, Guard } from '../foundations';
import { UserLogType, UserLogResult } from './custom-types';

export type UserLogDBEntry = {
  id: string;
  userId: string;
  type: UserLogType;
  result: UserLogResult;
  payload: UserLogPayload;
  createdAt?: number;
};

export type UserLog = {
  id: string;
  userId: string;
  type: UserLogType;
  result: UserLogResult;
  payload: UserLogPayload;
  createdAt: number;
};

const guard: Guard<UserLogDBEntry> = z.object({
  id: z.string(),
  userId: z.string(),
  type: z.nativeEnum(UserLogType),
  result: z.nativeEnum(UserLogResult),
  payload: userLogPayloadGuard,
  createdAt: z.number().optional(),
});

export const UserLogs: GeneratedSchema<UserLogDBEntry> = Object.freeze({
  table: 'user_logs',
  tableSingular: 'user_log',
  fields: {
    id: 'id',
    userId: 'user_id',
    type: 'type',
    result: 'result',
    payload: 'payload',
    createdAt: 'created_at',
  },
  fieldKeys: ['id', 'userId', 'type', 'result', 'payload', 'createdAt'],
  guard,
});