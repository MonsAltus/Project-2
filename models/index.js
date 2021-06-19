const User = require('./User');
const Cart = require('./Cart');
const Category = require('./Category');
const Product = require('./Product');
const Review = require('./Review');


// Cart belongs to User.
Cart.belongsTo(User, {
    foreignKey: 'user_id',
});

Cart.belongsToMany(Product, { through: "rel" });
Product.belongsToMany(Cart, { through: "rel" });


Category.hasMany(Product, {
    foreignKey: 'category_id'
});

// Reviews belong to a Product.
Review.belongsTo(Product, {
    foreignKey: 'product_id',
});

// Each Cart has many products
// Product.belongsTo(Cart, {})
// Cart.hasMany(Product, {
//     foreignKey: 'product_id',
//     onDelete: 'CASCADE',
// });


module.exports = { User, Cart, Category, Product, Review };