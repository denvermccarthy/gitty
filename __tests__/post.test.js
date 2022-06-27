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
    const post = res.body.find((p) => p.title === 'Breaking News');

    expect(post.description).toEqual('bad news');
  });
  test('authenticated users should be able to post ot /posts', async () => {
    const res = await request(app)
      .post('/api/v1/posts')
      .send({ title: 'testing', description: 'Testing out post' });

    expect(res.status).toEqual(200);

    expect(res.body.title).toEqual('testing');
    expect(res.body.description).toEqual('Testing out post');
  });

  afterAll(() => {
    pool.end();
  });
});
