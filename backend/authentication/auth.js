const jwt = require('jsonwebtoken');

const userAuth = (req, res, next) => {
    const token = req.header('Authorization');
    try {
        const verified = jwt.verify(token, process.env.KEY);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Authentication failed' });
    }
}

module.exports = userAuth;