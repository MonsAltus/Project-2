const router = require('express').Router();
const { User, Cart, Category, Product, Review } = require('../models');

const withAuth = require('../utils/Auth');

// Get all products for homepage
router.get('/', async (req, res) => {
  try {
    const productData = await Product.findAll({
      include: [ Category
        // { model: Category, attributes: ['name', 'description'],
        //   include: { model: Product, attributes: ['name', 'description', 'image', 'price']},
        // }
      ],
    });

    const products = productData.map((data) => data.get({ plain: true }));

      res.render('homepage', { 
        products, 
        logged_in: req.session.logged_in 
      });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get products by Category
router.get('/category/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [
        { model: Category, attributes: ['name', 'description'],
          include: { model: Product, attributes: ['name', 'description', 'image', 'price']},
        }
      ],
    });
  
    const categories = categoryData.get({ plain: true });
      res.render('category', {
        categories,
        logged_in: req.session.logged_in
      });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get product by ID
router.get('/product/:id', async (req, res) => {
  try {
    const productData = await Product.findByPk(req.params.id, {
      include: [
        { model: Product, attributes: ['name', 'description', 'image', 'price'],
          include: { model: Review, attributes: ['content', 'date_created']},
        }
      ],
    });
  
    const products = productData.get({ plain: true });
      res.render('product', {
        products,
        logged_in: req.session.logged_in
      });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Attributes???
// Get cart (require login session)
router.get('/cart', withAuth, async (req, res) => {
  try {
    const cartData = await Cart.findOne({where: {user_id: req.session.user_id}}, {
      include: [Cart] 
      // Attributes???
    });

    const cart = cartData.get({ plain: true });
      res.render('cart', {
        cart,
        logged_in: true
      });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use dashboard to display users reviews?
// Get user dashboard (require login session)
router.get('/profile', withAuth, async (req, res) => {
    try {
      // Find the logged in user based on the session ID
      const userData = await User.findByPk(req.session.user_id, {
        include: [
          {model: User, attributes: { exclude: ['password']}},
        ],
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
