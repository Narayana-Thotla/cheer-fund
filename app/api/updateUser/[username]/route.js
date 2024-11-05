import { NextResponse } from "next/server";
import dbConnect from "@/db/dbConnect";
import UserModel from "@/models/UserModel";
import findUserHandler from "@/handler/findUserHandler";
export async function POST(request) {
  try {
    const username = request.nextUrl.pathname.split("/").pop();
    // console.log("Username param:", username);

    const data = await request.json();
    console.log("request in edit/[username]:", data);

    // const findUser = await findUserHandler(username);
    // console.log("user found in update/username post route:", findUser);
    await dbConnect();

    const updatedUser = await UserModel.findOneAndUpdate({ email:username }, data, { new: true });
    console.log('updated user data:',updatedUser);

    if (!updatedUser) throw new Error("User not found");

    return NextResponse.json(
      { success: true, message: "User updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    // Handle errors and return a response
    console.error("Error updating user:", error);
    return NextResponse.json(
      { success: false, message: "Error updating user" },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const username = request.nextUrl.pathname.split("/").pop();
    // console.log("Username param:", username);

    const findUser = await findUserHandler(username);
    // console.log("user found in update/username route:", findUser);

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
