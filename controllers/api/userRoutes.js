const router = require('express').Router();
const { User } = require('../../models');

// Create new user
router.post('/', async (req,res) => {
    try {
        const userData = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

// Login
router.post('/login', async (req,res) => {
    try{
        const userData = await User.findOne({ where: { email: req.body.email} });

        if (!userData) {
            res
                .status(400)
                .json({ message: 'Incorrect Email or Password. Please try again.' });
            return;
        }

        const validPassword = await userData.checkPassword(res.body.password);

        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'Incorrect Email or Password. Please try again.' });
        }

        req.session.save(() => {
            res.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: 'Log in successful.'});
        });

    } catch (err) {
        res.status(400).json(err);
    }
});


// Logout
router.post('/logout', (req,res) => {
    if (res.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});


module.exports = router;