import _request from 'supertest';
import app from '../server/app';

export const request = _request(app)


