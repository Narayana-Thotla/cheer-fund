import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
  payedTo: {
    type: String,
    required: true,
  },
  sender_email:{
    type:String,
    required:true,
  },
  order_id: {
    type: String,
    // required: true,
  },
  payment_id: {
    type: String,
  },
  signature: {
    type: String,
  },
  message: {
    type: String,
  },
  amount: {
    type: Number,
  },
  status: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Payments ||
  mongoose.model("Payments", PaymentSchema);


