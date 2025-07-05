const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');

const router = express.Router();

const razorpay = new Razorpay({
  key_id: 'rzp_test_RH1NiqUGEEwjcI',
  key_secret: 'd5cNbooXmcvfgXzGvv43RuwW',
});

// Route to create a payment order
router.post('/create-order', async (req, res) => {
  const { amount, currency } = req.body;

  try {
    const options = {
      amount: amount * 100, // Amount in paise (₹1 = 100 paise)
      currency: currency || 'INR',
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

// Route to verify payment
router.post('/verify-payment', (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const generatedSignature = crypto
    .createHmac('sha256', 'd5cNbooXmcvfgXzGvv43RuwW')
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest('hex');

  if (generatedSignature === razorpay_signature) {
    res.send({ status: 'success', payment_id: razorpay_payment_id });
  } else {
    res.status(400).send({ status: 'failure' });
  }
});

module.exports = router;
