import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginStart, loginSuccess, loginFailed } from "../../redux/userReducer";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await axios.post("http://localhost:3000/api/auth/signin", {
        username,
        password,
      });
      console.log(res);
      dispatch(loginSuccess(res.data));
      navigate("/");
    } catch (err) {
      dispatch(loginFailed());
      console.log(err);
    }
  };

  const handleSignUp = async (e) => {
    console.log("signup");
    e.preventDefault();
    try {
      dispatch(loginStart);
      const res = await axios.post("http://localhost:3000/api/auth/signup", {
        username,
        password,
        email,
      });

      dispatch(loginSuccess(res.data));
      navigate("/");
    } catch (err) {
      console.log(err);
      dispatch(loginFailed);
    }
  };

  return (
    <form className="bg-gray-200 flex flex-col py-12 px-8 rounded-lg w-8/12 md:w-6/12 mx-auto gap-10">
      <h2 className="text-3xl font-bold text-center">Sign In</h2>

      <input
        onChange={({ target }) => setUsername(target.value)}
        type="text"
        placeholder="username"
        className="text-xl py-2 rounded-full px-4"
      />
      <input
        onChange={({ target }) => setPassword(target.value)}
        type="password"
        placeholder="password"
        className="text-xl py-2 rounded-full px-4"
      />
      <button
        onClick={handleLogin}
        className="text-xl py-2 rounded-full px-4 bg-blue-500 text-white"
      >
        Sign In
      </button>

      <p className="text-center text-xl">Sign Up!</p>

      <input
        onChange={({ target }) => setUsername(target.value)}
        type="text"
        placeholder="username"
        className="text-xl py-2 rounded-full px-4"
      />
      <input
        onChange={({ target }) => setEmail(target.value)}
        type="email"
        placeholder="email"
        required
        className="text-xl py-2 rounded-full px-4"
      />
      <input
        onChange={({ target }) => setPassword(target.value)}
        type="password"
        placeholder="password"
        className="text-xl py-2 rounded-full px-4"
      />
      <button
        className="text-xl py-2 rounded-full px-4 bg-blue-500 text-white"
        onClick={handleSignUp}
      >
        Sign up
      </button>
    </form>
  );
};

export default SignIn;
