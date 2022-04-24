const jwt = require('jsonwebtoken');

const verifyBearerToken = (token) => {
  try {
    if (token.startsWith('Bearer')) {
      token = token.replace('Bearer ', '');
    }
    const data = jwt.verify(token, process.env.JWT_SECRET || '');
    return {
      isVerified: true,
      ...data,
    };
  } catch (err) {
    console.log('error i s', err);
    return {
      verified: false,
    };
  }
};

module.exports = {
  verifyBearerToken,
};
