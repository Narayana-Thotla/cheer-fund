
import mongoose from 'mongoose';


const dbConnect = async() => {
  try {
    await mongoose.connect('mongodb://localhost:27017/cheerfund')
    console.log("connected to the db");
    
  } catch (error) {
    console.log("Error in connecting db",error.message)
  }
}

export default dbConnect
