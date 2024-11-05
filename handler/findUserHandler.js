import dbConnect from "@/db/dbConnect";
import UserModel from "@/models/UserModel";

const findUserHandler = async (username) => {
  const dbconn = await dbConnect();
  console.log(dbconn);

  console.log("isnide finduserhandler:", username);

  const findUser = await UserModel.findOne({ email: username });
  // console.log("found user data in finduserhandler:", findUser);

  return findUser;
};

export default findUserHandler;
