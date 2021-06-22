const router = require('express').Router();
const { Cart } = require('../../models/Cart');
const Product = require('../../models/Product');
const withAuth = require('../../utils/auth');
const { route } = require('../homeRoutes');

// Post Product to cart  (require login session)


router.post('/add',withAuth,(req,res) => {
    const user =req.user._id;
    const products = req.body.products;

    const cart = new Cart({
        user,
        products
      });

      cart.save((err, data) => {
        if (err) {
          return res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
          });
        }

        decreaseQuantity(products);

    res.status(200).json({
      success: true,
      cartId: data.id
    });
  });
});






// Post Product to cart  (require login session)



// Put update Product Quantity by id  (require login session)

// Delete Product by id  (require login session)

module.exports = router;