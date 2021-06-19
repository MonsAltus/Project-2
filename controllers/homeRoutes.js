const router = require('express').Router();
const { User, Cart, Category, Product, Review } = require('../models');

const withAuth = require('../utils/Auth');

// Get all products for homepage

router.get('/', async (req, res) => {
    try {
        const ProductsData = await Product.findAll({
            include: [
                {
                  model: Product,
                  attributes: ['name'],
                },
            ],
        });

        const Products = ProductData.map((project) => product.get({ plain: true }));
        res.render('homepage', { 
            products, 
            logged_in: req.session.logged_in 
        });
    } catch (err) {
        res.status(500).json(err);
    }
});
  

// Get product by ID

router.get('/Product/:id', async (req, res) => {
    try {
      const ProductData = await Product.findByPk(req.params.id, {
        include: [
          {
            model: Product,
            attributes: ['name'],
          },
        ],
      });
  
      const product = PoductData.get({ plain: true });
      res.render('Product', {
        ...project,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  

// Get cart (require login session)
router.get('/cart', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Project }],
        });
        const user = userData.get({ plain: true });
        res.render('profile', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get user dashboard (require login session)
router.get('/profile', withAuth, async (req, res) => {
    try {
      // Find the logged in user based on the session ID
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Product }],
      });
  
      const user = userData.get({ plain: true });
  
      res.render('profile', {
        ...user,
        logged_in: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
    // Include:
        // purchase history (need new model)
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
