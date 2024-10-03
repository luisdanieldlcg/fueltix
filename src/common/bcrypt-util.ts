import { Logger } from '@nestjs/common';
// See https://stackoverflow.com/questions/58055145/how-to-fix-typeerror-cannot-read-property-hash-of-undefined-during-hashing-pa
import * as bcrypt from 'bcrypt';

const logger = new Logger('bcrypt-util');

export async function hashPassword(text: string): Promise<string> {
    try {
        return await bcrypt.hash(text, 11);
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
