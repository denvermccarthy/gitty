const { Router } = require('express');
const { exchangeCodeForToken } = require('../services/github');

const router = Router();

router.get('/login', (req, res) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=user&redirect_uri=${process.env.GITHUB_REDIRECT_URI}`
  );
});
router.get('/callback', async (req, res, next) => {
  const { code } = req.query;
  const ghToken = await exchangeCodeForToken(code);

  res.json(ghToken);
});

module.exports = router;
