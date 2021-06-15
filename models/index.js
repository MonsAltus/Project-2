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

// Each Category has many Products.
Category.hasMany(Product, {
    foreignKey: 'id',
    onDelete: 'CASCADE',
});

// Products belong to a Category.
Product.belongsTo(Category, {
    foreignKey: 'id',
});

// Each Product has many Reviews.
Product.hasMany(Review, {
    foreignKey: 'id',
    onDelete: 'CASCADE',
});

// Reviews belong to a Category.
Review.belongsTo(Product, {
    foreignKey: 'id',
});
