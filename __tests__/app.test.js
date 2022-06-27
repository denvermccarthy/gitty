const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
jest.mock('../lib/services/github');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  test('login page should redirect to github', async () => {
    const res = await request(app).get('/api/v1/github/login');

    expect(res.header.location).toMatch(
      /https:\/\/github.com\/login\/oauth\/authorize\?/i
    );
  });
  test('callback route should return user data', async () => {
    const res = await request
      .agent(app)
      .get('/api/v1/github/callback?code=900')
      .redirects(1);

    expect(res.body).toEqual({
      id: expect.any(Number),
      username: 'mocked_user',
      email: 'test@testing.com',
      avatar: expect.any(String),
      iat: expect.any(Number),
      exp: expect.any(Number),
    });
  });
  afterAll(() => {
    pool.end();
  });
});
