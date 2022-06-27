const { Router } = require('express');
const router = Router();

router.get('/', (req, res, next) => {
  try {
    res.json({});
  } catch (error) {
    next(error);
  }
});
module.exports = router;
