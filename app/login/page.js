"use client"
import React from "react";
import { useSession, signIn, signOut } from "next-auth/react"
import Login_Buttons from "@/components/Login_Buttons";
import { redirect } from 'next/navigation'

const Login = () => {
  
  const { data: session } = useSession();
  console.log("session inside loginpage:",session)

  if(session){
    redirect('/dashboard')
  }

  return (
    <>
      <div className="text-white h-screen">
       <div className="text-center mt-14 text-3xl"> Login to your Account</div>
        <div className="flex justify-center">
          <Login_Buttons />
        </div>
      </div>
    </>
  );
};

export default Login;
