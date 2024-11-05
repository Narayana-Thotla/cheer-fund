import dbConnect from "@/db/dbConnect";
import UserModel from "@/models/UserModel";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
      let username = request.nextUrl.pathname.split("/").pop();
      username = username.replaceAll("%20"," ")
      console.log("Username param:", username.replaceAll("%20"," "));
      const dbconn = await dbConnect();
      console.log(dbconn);
    
    //   console.log("isnide finduserhandler:", username);
    
      const findUser = await UserModel.findOne({ username: username });
      // console.log("found user data in finduserhandler:", findUser);
    
    //   return findUser;
  
      return NextResponse.json(findUser);
  
    } catch (error) {
      // Handle errors and return a response
      console.error("Error updating user:", error);
      return NextResponse.json(
        { success: false, message: "Error updating user" },
        { status: 500 }
      );
    }
  }