const router = require('express').Router();
const { Product } = require('../../models');
const withAuth = require('../../utils/auth');

// Not Needed unless we develop admin control panel.

router.get('/:id', async (req, res) => {
    try {
        const productData = await Product.findOne({ where: { id: req.params.id}})
        if (productData){
            const product = productData.get({plain: true})
            // res.render('product', {layout: 'main',
            //     product
            // });
            res.json(product)
        }
    } catch (err) {
        res.status(500).json(err);
    }
})


module.exports = router;