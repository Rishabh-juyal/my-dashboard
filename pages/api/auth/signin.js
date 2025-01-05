import { signIn } from "next-auth/react";

const SignIn = () => (
  <div className="flex flex-col items-center justify-center h-screen">
    <h1 className="text-3xl mb-5">Sign In</h1>
    <button
      className="bg-blue-500 text-white px-5 py-2 rounded"
      onClick={() => signIn()}
    >
      Sign In
    </button>
  </div>
);

export default SignIn;
