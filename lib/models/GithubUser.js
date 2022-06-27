const pool = require('../utils/pool');

module.exports = class GithubUser {
  id;
  username;
  email;
  avatar;
  constructor(row) {
    this.id = row.id;
    this.username = row.user_name;
    if (row.email) {
      this.email = row.email;
    }
    if (row.avatar) {
      this.avatar = row.avatar;
    }
  }

  static async getUserByLogin(login) {
    const { rows } = await pool.query(
      'SELECT * FROM github_users WHERE user_name=$1',
      [login]
    );
    return rows[0] ? new GithubUser(rows[0]) : null;
  }
};
