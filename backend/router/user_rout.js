const router = require('express').Router();
const authenticate = require('../authentication/auth');
const User = require('../schemas/model');

router.put('/:id/follow', authenticate, async (req, res) => {
    const user = await User.findById(req.user._id);
    const otheruser = await User.findById(req.params.id);

    if (!user.following.includes(req.params.id)) {
        user.following.push(req.params.id);
        otheruser.followers.push(req.user._id);
    } else {
        user.following.pull(req.params.id);
        otheruser.followers.pull(req.user._id);
    }

    await user.save();
    await otheruser.save();
    res.status(200).json({ user, message: 'User followed/unfollowed successfully' });
})

module.exports = router;