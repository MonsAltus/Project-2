const sequelize = require('../config/connection');
const { User, Category, Product, Cart, ProductCart , Review } = require('../models');

const userData = require('./userData.json');
const categoryData = require('./categoryData.json');
const productData = require('./productData.json');
const reviewData = require('./reviewData.json');
const cartData = require('./cartData.json');
const productCartData = require('./productCartData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    await Category.bulkCreate(categoryData, {
        returning: true,
    });

    await Product.bulkCreate(productData, {
        returning: true,
    });
    await Cart.bulkCreate(cartData, {
        returning: true,
    });
    await ProductCart.bulkCreate(productCartData, {
        returning: true,
    });


    await Review.bulkCreate(reviewData, {
        returning: true,
    });

    process.exit(0);
};

seedDatabase();
