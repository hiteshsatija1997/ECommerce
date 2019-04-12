const express = require('express');

const { db, vendor, product, cartItems, users } = require('./db');

const app = express();

app.use('/', express.static(__dirname + '/public'));

app.use(express.json());
app.use(express.urlencoded({ extende: true }));

const port=process.env.PORT || 8800;



//
//   vendor
//
app.get('/vendor', async (request, response) => {
    let vendorlist = await vendor.findAll();
    response.send(vendorlist);
})

app.post('/vendor', async (request, response) => {
    try {
        console.log(request.body.name);
        await vendor.create({ name: request.body.name });
        response.send({ success: true })
    }
    catch (e) {
        response.send({ 'success': false })
    }
})

app.delete('/vendor', async (request, response) => {
    try {
        await vendor.destroy({ where: { id: request.body.id } });
        response.send({ success: true });

    } catch (e) {
        response.send({ success: false });
    }
})

// 
// product
// 

app.get('/product', async (request, response) => {
    let productList = await product.findAll(
        {
            include: [vendor]
        }
    );
    // console.log(productList);
    //  productList.dataValues.vendorname='hitesh';
    response.send(productList);
})


app.post('/product', async (request, response) => {
    console.log(request.body.vendorId)
    try {
        await product.create({
            name: request.body.name,
            price: request.body.price,
            quantity: request.body.quantity,
            vendorId: request.body.vendorId
        })
        response.send({ success: true })
    } catch (e) {
        response.send({ success: false })
    }
})

app.delete('/product', async (request, response) => {
    try {
        await product.destroy({ where: { id: request.body.id } });
        response.send({ success: true });

    } catch (e) {
        response.send({ success: false });
    }
})

// 
// cart
// 

app.get('/cart/:id', async (request, response) => {
    let cartdata = await cartItems.findAll({
        where: {
            userId: request.params.id
        }, include: [product]

    });
    console.log('@################@@@@@@@@@@@@@@')
    response.send(cartdata);
})

app.post('/cart', async (request, response) => {
   let result=await cartItems.findOne({
        where:{
            userId:request.body.userId,
            productId:request.body.productId
        }
    })
   console.log(result.quantity);
    if(result==null){
    try {
        console.log("in if")
        await cartItems.create({
            productId: request.body.productId,
            userId: request.body.userId

        })
        response.send({ success: true });
    } catch (e) {
        response.send({ success: false });
    }}else{
        try {
            await cartItems.increment({
                quantity: 1
            }, {
                where:{
                    userId:request.body.userId,
                    productId:request.body.productId
                }
                })
            response.send({ success: true })
        } catch{
            response.send({ success: false })
        }
    }
})


app.delete('/cart', async (request, response) => {
    try {
        await cartItems.destroy({
            where: {
                userId: request.body.userId,
                productId: request.body.productId
            }
        });
        response.send({ success: true });

    } catch (e) {
        response.send({ success: false });
    }
})

app.post('/cartitems', async (req, res) => {
    try {
        await cartItems.increment({
            quantity: 1
        }, {
                where: {
                    productId: req.body.prid,
                    userId: req.body.usid
                }
            })
        res.send({ success: true })
    } catch{
        res.send({ success: false })
    }
})

app.post('/cartitemsdec', async (req, res) => {
    let result = await cartItems.findOne({
        where: {
            productId: req.body.prid,
            userId: req.body.usid
        }
    })
    if (result.quantity > 1) {

        try {
            await cartItems.decrement({
                quantity: 1
            }, {
                    where: {
                        productId: req.body.prid,
                        userId: req.body.usid
                    }
                })


            res.send({ success: true })

        } catch{
            res.send({ success: false })
        }
    } else {
        cartItems.destroy({
            where: {
                productId: req.body.prid,
                userId: req.body.usid
            }
            
        })
        res.send({ success: true })
    }
})

//
//          user
//

app.post('/user', async (request, response) => {
    try {
        await users.create({
            name: request.body.username,
        })
        response.send({ success: true });
    } catch (e) {
        response.send({ success: false });
    }
})


app.get('/user/:username', async (request, response) => {
    let User = await users.findOne({
        where: {
            name: request.params.username
        }
    });

    // console.log(User.id);

    response.send({ success: true, uid: User.id });
})


app.listen(port);