"use client";
import React, { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";

const Page = () => {
  const [username, setusername] = useState("");
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    profilepic: "",
    coverpic: "",
    description: "",
    phno: "",
    razorpayId: "",
    razorpaySecret: "",
  });

  // if (status === "loading") return <p>Loading...</p>;
  // if (!session) return <p>Not authenticated</p>;

  if (!session) {
    redirect("/");
  }

  // console.log(username);

  // useEffect(() => {
  //   if (session) {
  //     const getUserData = async () => {
  //       const res = await fetch(`/api/updateUser/${session?.user?.email}`);
  //       const existData = await res.json();
  //       console.log(
  //         "existing data in db inside dashboard/edi/username:",
  //         existData
  //       );
  //     };
  //     getUserData();
  //   }
  // }, [session]);
  //------------------------------------------------------------------

  useEffect(() => {
    // Check if session is loaded and set data accordingly
    if (status === "loading") {
      setLoading(true);
    } else if (status === "authenticated" && session?.user?.email) {
      setLoading(false);
      setusername(session.user.email);
      fetchUserData(session.user.email);
    } else {
      setLoading(false);
    }
  }, [session, status]);

  const fetchUserData = async (email) => {
    try {
      const res = await fetch(`/api/updateUser/${email}`);
      const existData = await res.json();
      console.log("Existing data in db:", existData);

      setFormData({
        username: existData.username || "",
        email: existData.email || "",
        profilepic: existData.profilepic || "",
        coverpic: existData.coverpic || "",
        description: existData.description || "",
        phno: existData.phno || "",
        razorpayId: existData.razorpayId || "",
        razorpaySecret: existData.razorpaySecret || "",
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  //=======================================================================
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(username);

    try {
      const response = await fetch(
        `http://localhost:3000/api/updateUser/${username}`,
        {
          method: "POST",
          // credentials:'include',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      console.log(response);


      if (!response.ok) {
        throw new Error("res failed");
        // Success feedback, refresh data, etc.
      }
      toast.success("Details Updated Successfully!", {
          position: "top-center",
          reverseOrder: "true",
          duration: 1000,
        });

    } catch (error) {
      console.error("Failed to update:", error);
    }
  };

  return (
    <div className="m-5">
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Enter Username"
          className="mb-5 bg-gray-700 border border-gray-300 text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600"
        />
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter Email"
          className="mb-5 bg-gray-700 border border-gray-300 text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600"
        />
        <input
          type="text"
          name="profilepic"
          value={formData.profilepic}
          onChange={handleChange}
          placeholder="ProfilePic Link"
          className="mb-5 bg-gray-700 border border-gray-300 text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600"
        />
        <input
          type="text"
          name="coverpic"
          value={formData.coverpic}
          onChange={handleChange}
          placeholder="Coverpic Link"
          className="mb-5 bg-gray-700 border border-gray-300 text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600"
        />
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Your Description"
          className="mb-5 bg-gray-700 border border-gray-300 text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600"
        />

        <input
          type="text"
          name="phno"
          value={formData.phno}
          onChange={handleChange}
          placeholder="Enter Phone Number"
          className="mb-5 bg-gray-700 border border-gray-300 text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600"
        />
        <input
          type="text"
          name="razorpayId"
          value={formData.razorpayId}
          onChange={handleChange}
          placeholder="Enter Razorpay_ID"
          className="mb-5 bg-gray-700 border border-gray-300 text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600"
        />
        <input
          type="text"
          name="razorpaySecret"
          value={formData.razorpaySecret}
          onChange={handleChange}
          placeholder="Entere Razorpay_Secret"
          className="mb-5 bg-gray-700 border border-gray-300 text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600"
        />
        <div
          className="flex
        items-center justify-center"
        >
          <button
            type="submit"
            className="bg-blue-500 text-white text-center p-2 rounded border-blue-300 hover:bg-blue-700 focus:ring-blue-300 focus:border-blue-200"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default Page;
