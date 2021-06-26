const router = require('express').Router();
const { User, Cart, Category, Product, Review, ProductCart } = require('../models');

const withAuth = require('../utils/Auth');

// Get all products for homepage
router.get('/', async (req, res) => {
  try {
    // Find all products
    const productData = await Product.findAll({include: [Category]});
    // Find all categories
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
    // Find all products by category id
    const productData = await Product.findAll({where: {category_id: req.params.id}});
    // Find category by id
    const categoryData = await Category.findByPk(req.params.id);

    const category = categoryData.get({ plain: true });
    const products = productData.map((data) => data.get({ plain: true }));
      res.render('category', {
        products,
        category,
        logged_in: req.session.logged_in
      });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get product by ID
router.get('/product/:id', async (req, res) => {
  try {
    // Find product by id
    const productData = await Product.findByPk(req.params.id);
    // Find all Reviews for product
    const reviewData = await Review.findAll({where: {product_id: req.params.id}});

    const product = productData.get({ plain: true });
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
    // Find user's cart by user_id
    const cartData = await Cart.findOne({where: {user_id: req.session.user_id}}, {
      include: [Cart] 
    });

    // Find all productCart objects where cart_id matches user's cart.
    const productCartData = await ProductCart.findAll({ where: {cart_id: cart.id}});

    // const productCartData = await ProductCart.findAll({ where: {cart_id: cart.id}}, {include: [Product] {where: {id: productCart.product_id}} } );
    // const productCartData = await ProductCart.findAll({ include: [Product] { where: {id: productCart.product_id}}}, { where: {cart_id: cart.id}})

// Find all products from all productCart objects by product_id

    const cart = cartData.get({ plain: true });
    const productCart = productCartData.map((data) => data.get({ plain: true }));
    // const product = productData.map((data) => data.get({ plain: true }));
    // console.log(cart)
      res.render('cart', {
        cart,
        productCarts,
        // product,
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

// Logout
router.post('/logout', (req,res) => {
  if (req.session.logged_in) {
      req.session.destroy(() => {
          res.status(204).end();
      });
      res.redirect('/');
      return;
  } else {
      res.status(404).end();
  }
});

module.exports = router;
