const User = require('./User');
const Cart = require('./Cart');
const Category = require('./Category');
const Product = require('./Product');
const Review = require('./Review');
const ProductCart=require('./ProductCart');

// Products belongsTo Category
Product.belongsTo(Category, {
    foreignKey: 'category_id',
    onDelete: 'CASCADE',
  });
  // Categories have many Products
  Category.hasMany(Product, {
    foreignKey: 'category_id',
  });
  // Products belongToMany Tags (through ProductTag)
  Product.belongsToMany(Cart, {
    through: ProductCart,
    // as: 'product_cart',
    foreignKey: 'product_id',
  });
  // Tags belongToMany Products (through ProductTag)
  Cart.belongsToMany(Product, {
    through: ProductCart,
    // as: 'product_cart',
    foreignKey: 'cart_id',
  });


// Cart belongs to User.
//Cart.belongsTo(User, {
  //  foreignKey: 'user_id',
//});

//Cart.belongsToMany(Product, { through: "rel" });
//Product.belongsToMany(Cart, { through: "rel" });


//Category.hasMany(Product, {
 //   foreignKey: 'category_id'
//});

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


module.exports = { User, Cart, Category, Product, Review ,ProductCart};