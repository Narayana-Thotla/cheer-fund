import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  // const { data: session } = useSession()

  // if (!session) {
  //   return (
  //     <>
  //       Signed in as {session.user.email} <br />
  //       <button onClick={() => signOut()}>Sign out</button>
  //     </>
  //   )
  // }

  return (
    <div className="min-h-screen">
      <div className=" text-white">
        <div className="mt-14  text-7xl font-bold flex flex-col justify-center items-center">
          <div>Support Your</div> <div>Creative Journey</div>{" "}
          <div className=" text-xl  font-light mt-3">
            Accept & Receive support. It’s easier than you think.
          </div>
          <div>
            <Link href="/login">
              <button
                type="button"
                className="text-white bg-gradient-to-br from-green-400 via-blue-500 to-black hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-semibold rounded-lg text-base px-5 py-3.5 text-center me-2 mb-2"
              >
                Let's get Started
              </button>
            </Link>
          </div>
        </div>

        <div className=" w-full h-[2px] bg-gradient-to-r from-black via-slate-300 to-black my-16"></div>

        <div className="mt-14  text-5xl font-bold flex flex-col justify-center items-center">
          <div>Provide your audience</div>{" "}
          <div>with a simple way to show appreciation.</div>{" "}
          <div className="text-base font-light mt-5 flex flex-col">
            <div className="text-center text-xl font-light">
              Cheerfund makes support simple and enjoyable!
            </div>
            <div className="text-center text-xl font-light">
              With just a few taps, your fans can send a payment and leave a
              message.
            </div>

            <div className="mt-8 mx-auto flex">
              <img
                className="rounded-3xl  w-80"
                src="join_commune.jpg"
                alt=""
              />
            </div>
            <span className="text-2xl mt-4 mx-auto text-gray-100 font-semibold">
              So,come be part of our community!
            </span>
          </div>
        </div>

        <div className=" w-full h-[2px] bg-gradient-to-r from-black via-slate-300 to-black my-16"></div>

        <div>
          <div className="mt-14  text-6xl font-bold flex flex-col justify-center items-center">
            <div>Created for creators,</div>{" "}
            <div className="text-gray-500">not for businesses.</div>{" "}
          </div>
          <div className="flex gap-11 px-10 m-11 text-3xl  text-gray-200">
            <div className="w-1/2 flex">
              <span>
                <img src="heart-circle.svg" alt="" />
              </span>
              We don't call them "customers" or transactions. They are your
              supporters.
            </div>
            <div className="w-1/2 flex ">
              <span>
                <img src="heart-circle.svg" alt="" />
              </span>
              You get to talk to a human for help, or if you just like some
              advice to hit the ground running.
            </div>
          </div>
          <div className="text-3xl w-1/3 m-auto flex mb-14 text-gray-200">
            <span>
              <img className="" src="heart-circle.svg" alt="" />
            </span>
            <div>
              You get paid instantly to your bank account. No more 30-day
              delays.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
