const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('posts routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  test('/posts should fetch all posts', async () => {
    const res = await request(app).get('/api/v1/posts');

    expect(res.status).toEqual(200);
    const post = res.body.find((p) => p.id === 1);

    expect(post.title).toEqual('Breaking News');
    expect(post.description).toEqual('bad news');
  });

  afterAll(() => {
    pool.end();
  });
});
