const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors");
require("dotenv/config");

const Stripe = require('stripe');
const stripe = Stripe(process.env.SECRET_KEY)


// MANDATORY
app.use(cors());
app.use(bodyParser.json());


// IMPORT ROUTES
const sampleRoutes = require("./routes/sample");

// STRIPE TEST
app.post('/create-checkout-session', async (req, res) => {
    const product = req.body;

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: product.name,
                        description: product.description,
                        images: [product.url]
                    },
                    unit_amount: product.cost * 100,
                },
                quantity: product.quantity,
            },
        ],
        mode: 'payment',
        // The below two routes are not defined. 
        // So you'll get a 404 not found even if payment is successful.
        success_url: 'http://example.com/success',
        cancel_url: 'http://example.com/cancel',
    });

    res.json({ id: session.id });

    // console.log(product)
});


// MIDDLEWARES
app.use('/', sampleRoutes);


// PORT TO LISTEN
port = 3030 || process.env.PORT
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`)
});