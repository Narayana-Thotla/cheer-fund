export const razorpayHandler = async (formData) => {
  console.log("its going inside the rzp handler::");
  if (
    !document.querySelector(
      "script[src='https://checkout.razorpay.com/v1/checkout.js']"
    )
  ) {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    // Wait until the script loads
    await new Promise((resolve) => {
      script.onload = resolve;
    });
  }

  console.log("inside razorpayhandler email is :");

  // Fetch order details from the backend
  const response = await fetch(`http://localhost:3000/api/create-order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: formData.amount,
      currency: "INR",
      email: formData.email,
    }),
  });
  console.log("resin :", response);

  const order = await response.json();
  console.log("ORDER in rzpHandler:", order);

  // Define Razorpay options
  const options = {
    key: process.env.NEXT_PUBLIC_key_id, // Replace with your actual Razorpay key_id
    amount: formData.amount * 100, // Convert amount to smallest currency unit
    currency: "INR",
    name: "Your Company Name",
    description: "Payment for your order",
    order_id: order.id, // Use the order ID from backend
    prefill: {
      // name: "Customer Name",
      email: formData.email,
      // contact: "1234567890",
    },
    theme: {
      color: "#F37254",
    },
    // Success handler
    handler: async function (response) {
      const paymentDetails = {
        payedTo: formData.email,
        sender_email: formData.sender_email,
        order_id: response.razorpay_order_id,
        payment_id: response.razorpay_payment_id,
        signature: response.razorpay_signature,
        amount: formData.amount,
        message: formData.message,
        status: "successful",
      };

      await fetch("/api/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentDetails),
      });

      alert("Payment successful!");
    },
    // Failure handler if the user dismisses the payment modal
    modal: {
      ondismiss: async function () {
        const paymentDetails = {
          order_id: order.id,
          amount: formData.amount,
          message: formData.message,
          status: "failed",
        };

        await fetch("/api/payments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(paymentDetails),
        });

        alert("Payment failed or was dismissed.");
      },
    },
  };

  // Initialize Razorpay instance and open the payment modal
  const rzp1 = new Razorpay(options);

  // Additional error handling for payment failures
  rzp1.on("payment.failed", async function (response) {
    const paymentDetails = {
      order_id: response.error.metadata.order_id,
      payment_id: response.error.metadata.payment_id || null,
      error_code: response.error.code,
      error_description: response.error.description,
      amount: formData.amount,
      message: formData.message,
      status: "failed",
    };

    await fetch("/api/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentDetails),
    });

    alert("Payment failed. Please try again.");
  });

  rzp1.open();
};
