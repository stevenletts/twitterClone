const SignIn = () => {
  return (
    <form className="bg-gray-200 flex flex-col py-12 px-8 rounded-lg w-8/12 md:w-6/12 mx-auto gap-10">
      <h2 className="text-3xl font-bold text-center">Sign In</h2>

      <input
        type="text"
        placeholder="username"
        className="text-xl py-2 rounded-full px-4"
      />
      <input
        type="password"
        placeholder="password"
        className="text-xl py-2 rounded-full px-4"
      />
      <button className="text-xl py-2 rounded-full px-4 bg-blue-500 text-white">
        Sign In
      </button>

      <p className="text-center text-xl">Sign Up!</p>
      <input
        type="text"
        placeholder="username"
        className="text-xl py-2 rounded-full px-4"
      />
      <input
        type="text"
        placeholder="email"
        required
        className="text-xl py-2 rounded-full px-4"
      />
      <input
        type="password"
        placeholder="password"
        className="text-xl py-2 rounded-full px-4"
      />
      <button className="text-xl py-2 rounded-full px-4 bg-blue-500 text-white">
        Sign up
      </button>
    </form>
  );
};

export default SignIn;
