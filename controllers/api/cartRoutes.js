const router = require('express').Router();
const { Cart, Product, ProductCart } = require('../../models');
const withAuth = require('../../utils/auth');

// Post Product to cart  (require login session)
// ADD WITHAUTH
router.post('/add/:id', withAuth, async (req,res) => {
    // const user = req.session.user_id;
    // const product = req.body.product;
    try {
    const productData = await Product.findOne({ where: { id: req.params.id}})
    const cartData = await Cart.findOne({ where: { user_id: req.session.user_id}})
    // const cartData = await Cart.findOne({ where: { user_id: 2}})
    await ProductCart.create({ product_id: productData.id, cart_id: cartData.id, quantity: 1})
      res.status(200).json({
        success: true,
        cartId: cartData.id
      });
    } catch (err) {
      console.log(err)
      res.status(400).json(err);
    };
});

// Put update Product Quantity by id  (require login session)
// Build as helper script instead?

// ADD WITHAUTH
router.put('/add/:id', withAuth, async (req,res) => {
  // const user = req.session.user_id;
  // const product = req.body.product;
  try {
  const productData = await Product.findOne({ where: { id: req.params.id}})
  const cartData = await Cart.findOne({ where: { user_id: req.session.user_id}})
  // const cartData = await Cart.findOne({ where: { user_id: 2}})
  const productCartsData = await ProductCart.findOne({ where: {cart_id: cartData.id}});
  await ProductCart.update({ quantity: productCartsData.quantity + 1 }, {where: {cart_id: cartData.id, product_id: productData.id}});
    res.status(200).json({
      success: true,
      cartId: cartData.id
    });
  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  };
});

// ADD WITHAUTH
router.put('/remove/:id', withAuth, async (req,res) => {
  // const user = req.session.user_id;
  // const product = req.body.product;
  try {
  const productData = await Product.findOne({ where: { id: req.params.id}})
  const cartData = await Cart.findOne({ where: { user_id: req.session.user_id}})
  // const cartData = await Cart.findOne({ where: { user_id: 2}})
  const productCartsData = await ProductCart.findOne({ where: {cart_id: cartData.id}});
  await ProductCart.update({ quantity: (productCartsData.quantity - 1) <= 0 ? 0 : (productCartsData.quantity - 1) }, {where: {cart_id: cartData.id, product_id: productData.id}});
    res.status(200).json({
      success: true,
      cartId: cartData.id
    });
  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  };
});


// Delete Product by id  (require login session)
// ADD WITHAUTH
router.delete('/remove/:id', withAuth, async (req,res) => {
  // const user = req.session.user_id;
  // const product = req.body.product;
  try {
  const productData = await Product.findOne({ where: { id: req.params.id}})
  const cartData = await Cart.findOne({ where: { user_id: req.session.user_id}})
  // const cartData = await Cart.findOne({ where: { user_id: 2}})
  await ProductCart.destroy({ where: {cart_id: cartData.id, product_id: productData.id}});
  
    res.status(200).json({
      success: true,
      cartId: cartData.id
    });
  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  };
});


module.exports = router;