const User = require('./User');
const Cart = require('./Cart');
const Category = require('./Category');
const Product = require('./Product');
const Review = require('./Review');

// Each User has one cart.
User.hasOne(Cart, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

// Cart belongs to User.
Cart.belongsTo(User, {
    foreignKey: 'user_id',
});

// Each Cart has many products
Cart.hasMany(Product, {
    foreignKey: 'product_id',
    onDelete: 'CASCADE',
});

// ?????
// Each product can  to many carts.
Product.hasMany(Cart, {
    foreignKey: 'product_id',
});

// Each Category has many Products.
Category.hasMany(Product, {
    foreignKey: 'category_id',
    onDelete: 'CASCADE',
});

// Products belong to a Category.
Product.belongsTo(Category, {
    foreignKey: 'category_id',
});

// Each Product has many Reviews.
Product.hasMany(Review, {
    foreignKey: 'product_id',
    onDelete: 'CASCADE',
});

// Reviews belong to a Category.
Review.belongsTo(Product, {
    foreignKey: 'product_id',
});

module.exports = { User, Cart, Category, Product, Review };