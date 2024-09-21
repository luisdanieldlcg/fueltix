import { Logger } from '@nestjs/common';
import bcrypt from 'bcrypt';

const logger = new Logger('bcrypt-util');

export async function hashPassword(text: string): Promise<string> {
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(text, salt);
  } catch (error) {
    logger.error('Failed to hash password: ', error);
    return null;
  }
}

export async function comparePasswordHash(
  text: string,
  hash: string,
): Promise<boolean> {
  try {
    return bcrypt.compare(text, hash);
  } catch (error) {
    logger.error('Failed to compare password hash: ', error);
    return false;
  }
}
