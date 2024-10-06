const router = require('express').Router();
const { HashPassword, comparePassword } = require('../encryption/hash');
const User = require('../schemas/model');
const generateToken = require('../utils/generateToken');

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Please fill in all fields' })
    }

    const userExist = await User.findOne({ email });
    if (userExist) return res.status(401).json({ error: 'User already registered' });

    const hashedPassword = await HashPassword(password);
    const newUser = new User({ username, email, password: hashedPassword });

    try {
        await newUser.save();
        res.status(200).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(402).json({ error: 'Registration failed' })
    }
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Please fill in all fields' });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'User does not exist' });

    const isValid = await comparePassword(password, user.password);
    if (!isValid) return res.status(404).json({ error: 'Invalid credentials' });

    const token = generateToken(user._id);
    res.header('Authorization', token).status(200).json({ message: 'User login successfully', token, user });
})

module.exports = router;