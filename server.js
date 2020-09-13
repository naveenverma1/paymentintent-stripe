const express = require("express");
const app = express();
const { resolve } = require("path");
mysql = require('mysql'),
myConnection = require('express-myconnection');
// This is your real test secret API key.
const stripe = require("stripe")("sk_test_51HNXcdICR0NVfhA1jTSZ93s3hsPX8L1uQsDBeRkK9mkzUtn44srebA18czdMvBiJVo7infozLjVc0TCsBepQED7h003VRwixxQ");
var db = require("./dbConfig")
app.use(express.static("."));

app.use(myConnection(mysql, {
  host: 'localhost',
  user: 'root',
  password: 'naveen123',
  port: 3306,
  database: 'nodejs2'
}, 'single'));
app.use(express.json());
// const stripeAddress=Object.freeze({
//   line1: userAddress.street1,
//   line2: userAddress.street2,
//   city: userAddress.city,
//   country: userAddress.country,
//   postal_code: userAddress.zip,
//   state: userAddress.state,
// });
const calculateOrderAmount = items => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 14000;
};

app.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;
  const stripeToken = req.body.stripeToken;
  //console.log(typeof stripeToken)
  //typeof stripeToken
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
   
    currency: "inr",
    
  });

  amount = paymentIntent.amount;
  balanceTransaction = paymentIntent.balance_transaction
amountRefunded = paymentIntent.amount_refunded
currency = paymentIntent.currency
paymentintent = paymentIntent.payment_intent
status = paymentIntent.status
customer = paymentIntent.customer

req.getConnection((err,conn)=>{
  conn.query('INSERT INTO payment set ?',paymentIntent, (err, ree) => {
    //  console.log(customer);
      if(err)
      throw err
      else
      console.log("done")
})
})
  console.log(paymentIntent.id)
  res.send({
    clientSecret: paymentIntent.client_secret
    
  });
  

});

app.listen(4242, () => console.log('Node server listening on port 4242!'))
