const { Router } = require('express');
const GithubUser = require('../models/GithubUser');
const jwt = require('jsonwebtoken');
const {
  exchangeCodeForToken,
  getGithubProfile,
} = require('../services/github');

const router = Router();

router.get('/login', (req, res) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=user&redirect_uri=${process.env.GITHUB_REDIRECT_URI}`
  );
});
router.get('/callback', async (req, res) => {
  const { code } = req.query;
  const ghToken = await exchangeCodeForToken(code);
  const profile = await getGithubProfile(ghToken);
  let user = await GithubUser.getUserByLogin(profile.login);
  if (!user) {
    const { login: username, email, avatar_url: avatar } = profile;
    user = await GithubUser.create({ username, email, avatar });
  }
  const payload = jwt.sign(user.toJSON(), process.env.JWT_SECRET, {
    expiresIn: '1 day',
  });

  res
    .cookie(process.env.COOKIE_NAME, payload, {
      httpOnly: true,
      maxAge: 86400000,
    })
    .redirect('/api/v1/github/dashboard');
});

module.exports = router;
