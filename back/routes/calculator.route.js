const router = require('express').Router()
const math = require('mathjs')

router.post('/calculate', async (req, res, next) => {
  try {
    const { num } = req.body;
    const result = math.evaluate(num)
    return res.json(result.toString())
  } catch (e) {
    next(e);
  }
})

module.exports = router;