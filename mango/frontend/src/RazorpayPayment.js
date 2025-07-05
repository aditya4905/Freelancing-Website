import React, { useEffect } from 'react';

const RazorpayPayment = ({ cost, onPaymentSuccess }) => {
  useEffect(() => {
    // Dynamically add the Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    // Cleanup script on component unmount
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = async () => {
    try {
      if (!cost || isNaN(cost)) {
        alert('Invalid amount. Please enter a valid number for the cost.');
        return;
      }

      // Step 1: Call backend to create an order
      const orderResponse = await fetch('https://man-go.onrender.com/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: parseInt(cost) , currency: 'INR' }), // Amount in paise
      });

      if (!orderResponse.ok) {
        throw new Error('Failed to create order');
      }
      const orderText = await orderResponse.text(); // Get raw response text
      let order;

      try {
        order = JSON.parse(orderText); // Parse JSON safely
      } catch (error) {
        console.error('Error parsing JSON:', error);
        alert('Failed to process payment');
        return;
      }

      // Step 2: Configure Razorpay checkout
      const options = {
        key: 'rzp_test_RH1NiqUGEEwjcI', 
        amount: order.amount,
        currency: order.currency,
        name: 'Man-go Payment',
        description: 'Test Transaction',
        order_id: order.id,
        handler: async (response) => {
          // Step 3: Verify payment on backend
          const verifyResponse = await fetch('https://man-go.onrender.com/payment/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(response),
          });
          const verifyResult = await verifyResponse.json();

          if (verifyResult.status === 'success') {
            alert('Payment Successful!');
            onPaymentSuccess();
          } else {
            alert('Payment Verification Failed!');
          }
        },
        prefill: {
          name: 'John Doe',
          email: 'johndoe@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#3399cc',
        },
      };

      // Open Razorpay Checkout
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Payment Error:', error);
    }
  };

  return (
    <div>
      <button
        className="appearance-none border border-gray-300 py-2 px-3 bg-green-500 text-gray-700 font-semibold rounded-r"
        onClick={handlePayment}
      >
        Pay
      </button>
    </div>
  );
};

export default RazorpayPayment;
