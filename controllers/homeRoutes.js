const router = require('express').Router();
const { User, Cart, Category, Product, Review } = require('../models');

// const withAuth = require('../utils/Auth');

// Get all products for homepage

// Get product by ID

// Get cart (require login session)

// Get user dashboard (require login session)
    // purchase history
    // posted reviews


// Log in
router.get('/login', (req,res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    };
    res.render('login');
});

module.exports = router;
