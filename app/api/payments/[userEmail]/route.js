import { NextResponse } from "next/server";
import dbConnect from "@/db/dbConnect";
import PaymentModel from "@/models/PaymentModel";
export async function GET(request) {
  try {
    const userEmail = request.nextUrl.pathname.split("/").pop();
    await dbConnect();
    console.log("username in fetch-api/payments/email:",userEmail);

    const findPayments = await PaymentModel.find({payedTo:userEmail,status:'successful'})
    // const findPayments = 'its me :::'

    console.log('findPayments found:',findPayments);
    

    return NextResponse.json({ status: 200, data:findPayments });
    // const findPayment = await PaymentModel.findAll()
  } catch (error) {}
}
