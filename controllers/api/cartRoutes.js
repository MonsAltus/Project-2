const router = require('express').Router();
const { Cart, Product, ProductCart } = require('../../models');
const withAuth = require('../../utils/auth');
const { route } = require('../homeRoutes');

// Post Product to cart  (require login session)

// ADD WITHAUTH
router.post('/add/:id', withAuth, async (req,res) => {
    // const user = req.session.user_id;
    // const product = req.body.product;
    try {
    const productData = await Product.findOne({ where: { id: req.params.id}})
    const cartData = await Cart.findOne({ where: { user_id: req.session.user_id}})
    // TESTING const cartData = await Cart.findOne({ where: { user_id: 12}})
    const productCartData = await ProductCart.create({ product_id: productData.id, cart_id: cartData.id})
      res.status(200).json({
        success: true,
        cartId: cartData.id
      });
    } catch (err) {
      res.status(400).json(err);
    };
});






// Post Product to cart  (require login session)



// Put update Product Quantity by id  (require login session)

// Delete Product by id  (require login session)

module.exports = router;