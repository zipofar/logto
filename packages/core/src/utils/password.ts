import assert from 'assert';
import { createHash } from 'crypto';
import { PasswordEncryptionMethod } from '@logto/schemas';
import { number, string } from 'zod';
import { assertEnv } from './env';

const peppers = string()
  .array()
  .parse(JSON.parse(assertEnv('PASSWORD_PEPPERS')));
const iterationCount = number()
  .min(100)
  .parse(Number(assertEnv('PASSWORD_INTERATION_COUNT')));

export const encryptPassword = (
  id: string,
  password: string,
  salt: string,
  method: PasswordEncryptionMethod
): string => {
  assert(
    method === PasswordEncryptionMethod.SaltAndPepper,
    'Unsupported password encryption method'
  );

  const sum = [...id].reduce((accumulator, current) => accumulator + current.charCodeAt(0), 0);
  const pepper = peppers[sum % peppers.length];

  assert(pepper, 'Password pepper not found');

  let result = password;

  for (let i = 0; i < iterationCount; ++i) {
    result = createHash('sha256')
      .update(salt + result + pepper)
      .digest('hex');
  }

  return result;
};