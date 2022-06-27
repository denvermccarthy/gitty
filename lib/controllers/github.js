const { Router } = require('express');
const GithubUser = require('../models/GithubUser');
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
  const dbProfile = await GithubUser.getUserByLogin(profile.login);
  console.log(dbProfile);

  res.json(profile);
});

module.exports = router;
