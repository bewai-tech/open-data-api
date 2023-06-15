import pgPromise from 'pg-promise';
import config from '../config/config';

export const pgp = pgPromise(config.pgPromise);
export const db = pgp(config.db);
