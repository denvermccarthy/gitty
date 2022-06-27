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
}

module.exports = Post;
