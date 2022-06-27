const fetch = require('cross-fetch');

const exchangeCodeForToken = async (code) => {
  return `MOCK_CODE_${code}`;
};

const getGithubProfile = async (token) => {
  console.log('fake token', token);
  return {
    login: 'mocked_user',
    avatar_url: 'https://avatars.githubusercontent.com/u/96447635?v=4',
    email: 'test@testing.com',
  };
};

module.exports = { exchangeCodeForToken, getGithubProfile };
