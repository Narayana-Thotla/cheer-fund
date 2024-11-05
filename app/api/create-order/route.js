import Razorpay from "razorpay";
import { NextResponse } from "next/server";
import dbConnect from "@/db/dbConnect";
import findUserHandler from "@/handler/findUserHandler";

export async function POST(request) {
  // console.log(request);
  console.log("inside rz route:");

    
  const data = await request.json();
  console.log("request in edit/[username]:", data);
  await dbConnect();

  
  const findUser = await findUserHandler(data.email);
  console.log("user found in update/username route:", findUser);

  var instance = new Razorpay({
    // key_id: findUser.razorpayId,
    // key_secret: findUser.razorpaySecret,
  });
  console.log("instance:",instance);
  

  var options = {
    amount: data.amount, // amount in the smallest currency unit
    currency: data.currency,
    receipt: "order_rcptid_11",
  };

  try {
    const order = await instance.orders.create(options, function (err, order) {
      console.log("inside order instance:", order);
      console.log("inside order instance error:", err);
    });
    // const order = await instance.orders.create(options);
    // console.log('inside order instsance:',order);
    
    // console.log(instance.orders.create(options));

    // return new Response(order, { status: 200 });
    return NextResponse.json(order, { status: 200 });
    
  } catch (error) {
    console.log("error in razorpay api:");

    // return new Response({ error: error.message }, {
    //   status: 500,
    // });
    return NextResponse.json(
      { success: false, message: "Error updating user" },
      { status: 500 }
    );
  }
}

// pages/api/create-order.js
// import Razorpay from "razorpay";

// export default async function handler(req, res) {
//   if (req.method === "POST") {
//     try {
//       const instance = new Razorpay({
//         key_id: process.env.RAZORPAY_KEY_ID,
//         key_secret: process.env.RAZORPAY_KEY_SECRET,
//       });

//       const order = await instance.orders.create({
//         amount: req.body.amount,
//         currency: req.body.currency,
//         receipt: req.body.receipt,
//       });

//       res.status(200).json(order);  // Ensure JSON response
//     } catch (error) {
//       console.error("Error creating order:", error);
//       res.status(500).json({ message: "Error creating order", error });
//     }
//   } else {
//     // res.setHeader("Allow", ["POST"]);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }
