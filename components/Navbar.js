"use client";
import React from "react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import Github from "next-auth/providers/github";
import { fetchData } from "next-auth/client/_utils";
import { toast } from "react-toastify";

const Navbar = () => {
  const { data: session } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSearch = async () => {
    const fetchUser = await fetch(
      `http://localhost:3000/api/searchUser/${searchQuery.replaceAll(
        "%20",
        " "
      )}`
    );
    const fetchedData = await fetchUser.json();
    console.log(fetchedData, fetchUser.status);
    // console.log(searchQuery.replaceAll("%20"," ") );
    if (fetchUser.status == "200") {
      if (fetchedData) {
        // alert("User found!");
        // toast.success("Successfully updated profile");
        toast.success("User Found!", {
          position: "top-center",
          reverseOrder: "true",
          duration: 1000,
        });
        router.push(`http://localhost:3000/users/${fetchedData.email}`);
        setSearchQuery("");
      } else {
        toast.error("NO Such User!", {
          position: "top-center",
          reverseOrder: "true",
        });
      }
    }
  };

  return (
    <div>
      <nav className="bg-gradient-to-r from-blue-500 via-slate-900 to-slate-900 border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3">
          <div className="flex gap-3 justify-center items-center">
            <Link href="/">
              <div className="w-10 ">
                <img src="pyramid_logo.png" alt="" />
              </div>
            </Link>
          </div>

          {session ? (
            <div className="flex gap-2 md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
              <div className="relative hidden md:block">
                <div className="absolute bg-slate-700 px-2 py-0.5 z-0 rounded-lg inset-y-0 start-0 flex justify-center items-center  ">
                  <button
                    onClick={handleSearch}
                    className="hover:cursor-pointer"
                  >
                    <svg
                      className="w-4 h-4 text-gray-50 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </button>
                  <span className="sr-only">Search icon</span>
                </div>
                <input
                  type="text"
                  id="search-navbar"
                  className="block w-full  p-2 ps-10 text-sm text-white border border-gray-300 rounded-lg placeholder-white bg-gray-600 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search User..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div>
                <button
                  id="dropdownDefaultButton"
                  onClick={toggleDropdown}
                  onBlur={() => {
                    // setIsDropdownOpen(false);
                  }}
                  data-dropdown-toggle="dropdown"
                  className="text-white  bg-blue-600 hover:bg-blue-800  font-medium rounded-lg text-sm px-5 py-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  type="button"
                >
                  Welcome @{session.user.name}
                  <svg
                    className="w-2.5 h-2.5 ms-3 "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
              </div>

              {isDropdownOpen && (
                <div
                  id="dropdown"
                  className="z-10 absolute mt-10  right-[190px] bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                >
                  <ul
                    className="py-2  relative text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownDefaultButton"
                  >
                    <li>
                      <Link
                        href="/dashboard"
                        onClick={() => setIsDropdownOpen(false)}
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Settings
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Earnings
                      </Link>
                    </li>
                    <li>
                      <Link
                        onClick={() => {
                          signOut(github);
                        }}
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Sign out
                      </Link>
                    </li>
                  </ul>
                </div>
              )}

              <button
                onClick={() => {
                  signOut(Github);
                  router.push("/");
                }}
                type="button"
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4   font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link href="/login">
              <button
                type="button"
                className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4   font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Login
              </button>
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
