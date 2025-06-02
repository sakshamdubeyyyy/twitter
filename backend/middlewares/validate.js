const { validationResult } = require('express-validator');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formatted = errors.array().map(err => err.msg).join(', ');
    return res.status(400).json({ error: `Validation failed: ${formatted}` });
  }
  next();
};

module.exports = validate;
