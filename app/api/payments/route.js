import { NextResponse } from "next/server";
import dbConnect from "@/db/dbConnect";
import PaymentModel from "@/models/PaymentModel";

export async function POST(request) {
  try {
    const data = await request.json();
    console.log("request inside Save-Payment:", data);

    await dbConnect();

    const savedPayment = await PaymentModel.create({
      payedTo: data.payedTo,
      sender_email: data.sender_email,
      order_id: data.order_id,
      payment_id: data.payment_id,
      signature: data.signature,
      message: data.message,
      amount: data.amount,
      status: data.status,
    });

    console.log("data saved of savedPayment inside /save_pay:", savedPayment);

    return NextResponse.json({ status: 200, message: "res sent haha!" });
  } catch (error) {
    return NextResponse.json({ status: 500, message: error.message });
  }
}

