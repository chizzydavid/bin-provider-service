
import { request } from './helper';
import mongoose from "mongoose";
import config from "../server/config/config";


beforeEach(async () => {
  await mongoose.connect(config.database_uri);
});

afterEach(async () => {
  await mongoose.connection.close();
});


describe('Test Bin Detail Route', () => {
  it('Expects correct BIN to return valid bin details', async () => {
    const route = '/api/v1/bins/23456700';
    const res = await request.get(`${route}`)

    expect(res.statusCode).toBe(200);
    expect((res.body.data)).toHaveProperty('bin_number');
    expect((res.body.data.bin_number)).toEqual('23456700');
  });

  it('Expects non-existing BIN to return not found', async () => {
    const route = '/api/v1/bins/00000000';
    const res = await request.get(`${route}`)

    expect(res.statusCode).toBe(404);
    expect((res.body)).toHaveProperty('error');
    expect((res.body.error)).toEqual('BIN not found')
  });  

  it('Expects invalid BIN number to return invalid BIN', async () => {
    const route = '/api/v1/bins/0000';
    const res = await request.get(`${route}`)

    expect(res.statusCode).toBe(400);
    expect((res.body)).toHaveProperty('error');
    expect((res.body.error)).toEqual('Invalid BIN')
  });
});


