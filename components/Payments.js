import { razorpayHandler } from "@/handler/razorpayHandler";
import React from "react";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

const Payments = ({ email, sender_email }) => {
  const [paymentsOfUser, setpaymentsOfUser] = useState([]);
  const [dashTrue, setdashTrue] = useState(true);

  const [formData, setFormData] = useState({
    amount: "",
    message: "",
    email: "",
    sender_email: "",
  });

  // const router = useRouter();
  // console.log("router:", router);

  const pathname = usePathname();
  console.log("pahtname:", pathname);

  useEffect(() => {
    if (email) setFormData((prevData) => ({ ...prevData, email }));
    if (sender_email)
      setFormData((prevData) => ({ ...prevData, sender_email }));
    const payments = async () => {
      const paymentForDisplay = await fetch(
        `http://localhost:3000/api/payments/${email}`
      );
      const payDet = await paymentForDisplay.json();
      setpaymentsOfUser(payDet.data);
    };
    payments();

    
  }, [email, sender_email]);


  useEffect(() => {
    const paymentSender = async () => {
      console.log(sender_email);
      
      const paymentForDisplaySender = await fetch(
        `http://localhost:3000/api/payments/${sender_email}`
      );
      const payDetSender = await paymentForDisplaySender.json();

      console.log(('paydetSender:',payDetSender));
      
      setpaymentsOfUser(payDetSender.data);
    };
    
    if (pathname === "/dashboard") {
      setdashTrue(true);
      paymentSender();
      console.log("spy:",paymentsOfUser);
      
    } else {
      setdashTrue(false);
    }
  }, [pathname,formData])
  

  // console.log("donations of user:", paymentsOfUser);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // router.push('/')
    razorpayHandler(formData);
    // rzpHandler(formData);
  };

  // const rzpHandler = async (formData) => {
  //   console.log("its going inside the rzp handler::");
  //   if (
  //     !document.querySelector(
  //       "script[src='https://checkout.razorpay.com/v1/checkout.js']"
  //     )
  //   ) {
  //     const script = document.createElement("script");
  //     script.src = "https://checkout.razorpay.com/v1/checkout.js";
  //     script.async = true;
  //     document.body.appendChild(script);

  //     // Wait until the script loads
  //     await new Promise((resolve) => {
  //       script.onload = resolve;
  //     });
  //   }

  //   console.log("inside razorpayhandler email is :");

  //   // Fetch order details from the backend
  //   const response = await fetch(`http://localhost:3000/api/create-order`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       amount: formData.amount,
  //       currency: "INR",
  //       email: formData.email,
  //     }),
  //   });
  //   const order = await response.json();
  //   console.log(order);

  //   // Define Razorpay options
  //   const options = {
  //     key: "rzp_test_c7G4chBa5Iqwf6", // Replace with your actual Razorpay key_id
  //     amount: formData.amount * 100, // Convert amount to smallest currency unit
  //     currency: "INR",
  //     name: "Your Company Name",
  //     description: "Payment for your order",
  //     order_id: order.id, // Use the order ID from backend
  //     prefill: {
  //       name: "Customer Name",
  //       email: "customer@example.com",
  //       contact: "1234567890",
  //     },
  //     theme: {
  //       color: "#F37254",
  //     },
  //     // Success handler
  //     handler: async function (response) {
  //       const paymentDetails = {
  //         payedTo: formData.email,
  //         order_id: response.razorpay_order_id,
  //         payment_id: response.razorpay_payment_id,
  //         signature: response.razorpay_signature,
  //         amount,
  //         message,
  //         status: "successful",
  //       };

  //       await fetch("/api/save-payment", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(paymentDetails),
  //       });

  //       alert("Payment successful!");
  //     },
  //     // Failure handler if the user dismisses the payment modal
  //     modal: {
  //       ondismiss: async function () {
  //         const paymentDetails = {
  //           order_id: order.id,
  //           amount,
  //           message,
  //           status: "failed",
  //         };

  //         await fetch("/api/save-payment", {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify(paymentDetails),
  //         });

  //         alert("Payment failed or was dismissed.");
  //       },
  //     },
  //   };

  //   // Initialize Razorpay instance and open the payment modal
  //   const rzp1 = new Razorpay(options);

  //   // Additional error handling for payment failures
  //   rzp1.on("payment.failed", async function (response) {
  //     const paymentDetails = {
  //       order_id: response.error.metadata.order_id,
  //       payment_id: response.error.metadata.payment_id || null,
  //       error_code: response.error.code,
  //       error_description: response.error.description,
  //       amount,
  //       message,
  //       status: "failed",
  //     };

  //     await fetch("/api/save-payment", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(paymentDetails),
  //     });

  //     alert("Payment failed. Please try again.");
  //   });

  //   rzp1.open();
  // };

  return (
    <div>
      <div className=" mx-auto  flex  items-center justify-center gap-3 text-white p-8">
        <div className="w-3/4  bg-gray-900 p-5 h-[30vw]  rounded-xl">
          <div className="text-xl font-bold">Supports Chat</div>

          <div className="overflow-y-auto custom-scrollbar h-[24vw]">
            {paymentsOfUser && paymentsOfUser.length > 0 ? (
              paymentsOfUser.map((items) => (
                <div className="ml-2 mt-3 " key={items._id}>
                  <div className="mt-2 text-sm font-bold">
                    @{`${items.sender_email.split("@")[0]}`}
                    <span className="ml-3 bg-gradient-to-r from-blue-700 via-blue-500 to-green-600 text-white text-lg font-bold rounded-md p-1 shadow-lg">
                      {" "}
                      ₹{" "}
                      <span className="text-yellow-200">{`${items.amount}`}</span>
                    </span>
                  </div>
                  <div className=" text-sm font-extrabold text-gray-400">
                    {`${items.message}`}
                  </div>
                </div>
              ))
            ) : (
              <p>No donations found.</p>
            )}
          </div>
        </div>
        {/* //==== make this a form before you deploy {`${formData}`} */}
        {!dashTrue && (
          <div className="w-2/4 bg-gray-900 p-5 h-[30vw] rounded-xl">
            <div className="text-xl font-bold">Make a Payment</div>
            <div className="mt-4">
              {/* <form
              onSubmit={() => {
                
              //   razorpayHandler
                handleSubmit(email);
              }}
            > */}
              <textarea
                onChange={handleChange}
                id="message"
                name="message"
                value={formData.message}
                rows="4"
                className="block p-2.5  w-full text-sm text-white bg-gray-700 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-none"
                placeholder="Write your message here..."
              ></textarea>
              <input
                onChange={handleChange}
                type="text"
                name="amount"
                value={formData.amount}
                id="first_name"
                className="bg-gray-700 border  mt-2 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter amount"
                required
              />
              <Head>
                <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
              </Head>
              <div className="text-center">
                <button
                  onClick={handleSubmit}
                  type="submit"
                  className="text-white  mt-2 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 rounded-lg text-sm w-full py-2.5 text-center me-2 mb-2 font-bold"
                >
                  Pay
                </button>
              </div>
              {/* </form> */}

              <div className="flex gap-1 mt-3">
                <button
                  type="button"
                  className="text-white bg-gray-700 hover:bg-gray-800  font-medium rounded-lg text-sm px-3 py-2 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                >
                  Pay ₹10
                </button>
                <button
                  type="button"
                  className="text-white bg-gray-700 hover:bg-gray-800  font-medium rounded-lg text-sm px-3 py-2 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                >
                  Pay ₹50
                </button>
                <button
                  type="button"
                  className="text-white bg-gray-700 hover:bg-gray-800  font-medium rounded-lg text-sm px-3 py-2 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                >
                  Pay ₹100
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payments;
