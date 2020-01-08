const cartModel = require('../model/cart.model');
const orderModel = require('../model/order.model');
const productModel = require('../model/product.model')


module.exports.checkout = async function(req, res){
    const body = req.body;
    const userID = req.user.id,
        name = body.name,
        phone = body.phone,
        address = body.address,
        status = "Chưa giao",
        shipping = body.shipping,
        feeShipping = body.feeShipping,
        payment = body.payment;
    const date = Date.now();
    const timeline = {
        ordering: date,
        waiting: 0,
        delivering: 0,
        delivered: 0
    }

    const cart = await cartModel.getCartByUserID(userID);
    
    await Promise.all[(cart.items.map(async item => {
        const product = await productModel.findAndUpdateCount(item.productID);
    })),
    orderModel.addOrder(name, phone, address, cart, status, shipping, timeline, feeShipping, payment)]

    cartModel.removeCart(cart);
    req.session.cart = null;
    res.status(200);
    res.send();
}

module.exports.view_order = async function (req, res) {
    if (!req.user){
        return res.render('login');
    }

    const userID = req.user._id;
    const orders = await orderModel.getOrderByUserID(userID);
    
   
    await Promise.all(orders.map(async order => {
        let i = 0;
        await Promise.all(order.items.map(async item => {
            const product = await productModel.getProductByID(item.productID);
            item = {
                productID: item.productID,
                quantity: item.quantity,
                title : product.title,
                price: product.price,
                img: product.img[0]
            }
            order.items[i] = item;
            i++;
        }))
    }))
    res.render('order', {order: orders});

}