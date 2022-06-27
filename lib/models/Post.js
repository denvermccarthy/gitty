const pool = require('../utils/pool');

class Post {
  id;
  title;
  description;
  constructor(row) {
    for (const key in row) {
      this[key] = row[key];
    }
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM posts');
    return rows.map((row) => new Post(row));
  }

  static async insert({ title, description }) {
    const { rows } = await pool.query(
      'INSERT INTO posts (title, description) VALUES ($1, $2) RETURNING *',
      [title, description]
    );

    return new Post(rows[0]);
  }
}

module.exports = Post;
