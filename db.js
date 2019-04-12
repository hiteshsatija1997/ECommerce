const Sequelize = require("sequelize");

const op = Sequelize.Op;

const db = new Sequelize({
    dialect: 'sqlite',
    storage: __dirname + '/shop.db'
});

const vendor = db.define('vendor', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }

})

const product = db.define('product', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    quantity: {
        type: Sequelize.NUMBER,
        allowNull: false
    }

})



const users = db.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique:true
    }

})

const cartItems = db.define('cartItem', {
quantity:{
    type:Sequelize.NUMBER,
    defaultValue:1

}
})

// const cartproducts = db.define('cartproduct', {
//     cpid: {
//         type: Sequelize.NUMBER,
//         autoIncrement: true,
//         primaryKey: true
//     },
//     total: {
//         type: Sequelize.NUMBER,
//         defaultValue: 0
//     }
// });


vendor.hasMany(product, { onDelete: 'cascade' });
product.belongsTo(vendor);


cartItems.belongsTo(product)
cartItems.belongsTo(users)
users.hasMany(cartItems,{onDelete:'cascade'})
product.hasMany(cartItems,{onDelete:'cascade'})

// cart.belongsTo(user);

// product.belongsToMany(cart, { through: 'cartproducts' });
// cart.belongsToMany(product, { through: 'cartproducts' });




db.sync()


console.log('DATABASE LOADED');

module.exports = {
    db, vendor, product, cartItems, users
}