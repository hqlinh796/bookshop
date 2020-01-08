const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userID: String,
    items: [{
        productID: String,
        quantity: Number
    }],
    totalQuantity: Number,
    totalPrice: Number,
    name: String,
    phone: String,
    address: String,
    status: String,
    shipping: String,
    timeline:{
        ordering: Number,
        waiting: Number,
        delivering: Number,
        delivered: Number,
        canceled: Number
    },
    feeShipping: Number,
    payment: String
}, {collection: 'orders'});

const orderModel = mongoose.model('orders', orderSchema);

module.exports.addOrder = async function(name, phone, address, cart, status, shipping, timeline, feeShipping, payment){
    const newOrder = new orderModel({
        userID: cart.userID,
        items: cart.items,
        totalQuantity: cart.totalQuantity,
        totalPrice: cart.totalPrice,
        name: name,
        address: address,
        phone: phone,
        status: status,
        shipping: shipping,
        timeline: timeline,
        feeShipping: feeShipping,
        payment: payment
    });
    await newOrder.save();
    return newOrder;
}

module.exports.getOrderByUserID = userID => orderModel.find({userID: userID}).sort({'timeline.ordering': -1});
