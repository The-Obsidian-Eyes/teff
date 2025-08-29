// const paypal = require("paypal-rest-sdk");

// paypal.configure({
//   mode: "",
//   client_id: "",
//   client_secret: "",
// });

// module.exports = paypal;

const paypal = {
  configure: () => {},
  payment: {
    create: (data, callback) => callback(null, { id: 'DUMMY_PAYMENT_ID' }),
    execute: (paymentId, data, callback) => callback(null, { 
      id: paymentId,
      state: 'approved'
    })
  }
};

// Dummy configuration - won't actually connect to PayPal
paypal.configure({
  mode: "sandbox",
  client_id: "dummy_client_id",
  client_secret: "dummy_secret"
});

module.exports = paypal;