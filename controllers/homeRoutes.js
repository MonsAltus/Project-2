const router = require('express').Router();
const { User, Cart, Category, Product, Review } = require('../models');

const withAuth = require('../utils/Auth');

// Get all products for homepage
router.get('/', async (req, res) => {
  try {
    const productData = await Product.findAll({include: [Category]});
    const categoryData = await Category.findAll()

    const products = productData.map((data) => data.get({ plain: true }));
    const categories = categoryData.map((data) => data.get({ plain: true }));
    // console.log(categories)
      res.render('homepage', { 
        products,
        categories,
        logged_in: req.session.logged_in 
      });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get products by Category
router.get('/category/:id', async (req, res) => {
  try {
    const productData = await Product.findAll({where: {category_id: req.params.id}});
    const categoryData = await Category.findByPk(req.params.id);


    // const products = productData.get({ plain: true });
    const category = categoryData.get({ plain: true });
    const products = productData.map((data) => data.get({ plain: true }));
    // const category = categoryData.map((data) => data.get({ plain: true }));
    // console.log(category)
    console.log(products)
      res.render('category', {
        products,
        category,
        logged_in: req.session.logged_in
      });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Get product by ID
router.get('/product/:id', async (req, res) => {
  try {
    const productData = await Product.findByPk(req.params.id);
    const reviewData = await Review.findAll({where: {product_id: req.params.id}});

    const product = productData.get({ plain: true });
    // const review = reviewData.get({ plain: true});
    // const products = productData.map((data) => data.get({ plain: true }));
    const review = reviewData.map((data) => data.get({ plain: true }));
    console.log(product)
    console.log(reviewData)
      res.render('product', {
        product,
        review,
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
