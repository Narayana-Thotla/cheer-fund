"use client";
import React from "react";
import Script from "next/script";
import Payments from "@/components/Payments";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

const Page = () => {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [userData, setuserData] = useState();
  const router = useRouter();
  const { username } = useParams();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
    if (status === "loading") {
      setLoading(true);
    } else if (status == "authenticated" && session?.user?.email) {
      setLoading(false);
      // fetchUserData(session.user.email);

      console.log("params in users/username", decodeURIComponent(username));
      fetchUserData(decodeURIComponent(username));
    } else {
      setLoading(false);
    }
  }, [session, status, router]);

  const fetchUserData = async (email) => {
    try {
      const res = await fetch(`http://localhost:3000/api/updateUser/${email}`);
      const data = await res.json();
      console.log("data inside fetchuserdata inside dashboard:", data);
      setuserData(data);
    } catch (error) {
      console.log("error inside dashboar in fetchUserData fun:", error.message);
    }
  };

  return  userData ? (
    <>
      <div>
        <div>
          <div className="bg-red-500 w-[100%] h-56 relative">
            <img
              className="object-fit w-full h-full"
              src={`${userData.coverpic}`}
              alt=""
            />
          </div>
          <div className="bg-blue-900 w-28 h-28 rounded-full absolute top-[265px] left-[45%]">
            <img
              className="object-fit w-full h-full rounded-full"
              src={`${userData.profilepic}`}
              alt=""
            />
          </div>
        </div>

        <div>
          <div className="text-white text-center mt-11 text-xl font-semibold">
            {" "}
            @{`${userData.username}`}
          </div>
          <div className="text-gray-400 w-1/2 mx-auto text-center mt-2">
            {" "}{`${userData.description}`}
          </div>
          <div className="text-center mt-5">
            <button
              type="button"
              className="text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-sm px-11 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              <svg
                className="inline mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeWidth="24"
                height="24"
                color=""
                fill="none"
              >
                <path
                  d="M3 20V17.9704C3 16.7281 3.55927 15.5099 4.68968 14.9946C6.0685 14.3661 7.72212 14 9.5 14C10.7448 14 11.9287 14.1795 13 14.5028"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle
                  cx="9.5"
                  cy="7.5"
                  r="3.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14.5 4.14453C15.9457 4.57481 17 5.91408 17 7.49959C17 9.0851 15.9457 10.4244 14.5 10.8547"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M18 14V20M15 17H21"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Follow
            </button>
          </div>
        </div>

        <div className=" divider w-full h-[1px] bg-gradient-to-r from-black via-slate-300 to-black my-10"></div>

        <div className="text-white flex justify-center items-center gap-14 ">
          <div className="text-sm font-medium text-center text-gray-300 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
            <ul className="flex flex-wrap -mb-px">
              <li className="me-2">
                <a
                  href="#"
                  className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-blue-400 hover:border-blue-300 dark:hover:text-gray-300 font-semibold text-xl"
                >
                  posts
                </a>
              </li>
              <li className="me-2">
                <a
                  href="#"
                  className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-blue-400 hover:border-blue-300 dark:hover:text-gray-300 font-semibold text-xl"
                >
                  payments
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* <div className="postsContainer w-2/3 mx-auto mb-12 mt-11 overflow-y-auto h-[40vw] no-scrollbar">
          <User_Posts />
        </div> */}

        <div className=" w-5/6 mx-auto mb-12 mt-1  ">
          {/* <Payments email={userData.email} /> */}
          <Payments email="lakshminarayanathotla@gmail.com" sender_email={`${session.user.email}`} />
        </div>
      </div>
    </>
  )  : (
    <div role="status " className="flex justify-center items-center h-screen">
      <svg
        aria-hidden="true"
        className="w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Page;
