import mongoose from 'mongoose';
import { server } from '../server';

beforeAll(done => {
  server.listen(8001, () => {
    console.log('Test server running on port 8001');
    done();
  });
});

afterAll(done => {
  server.close(() => {
    mongoose.disconnect().then(() => {
      console.log('Test server closed and MongoDB disconnected');
      done();
    });
  });
});
