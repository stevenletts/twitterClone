import Timeline from "./Timeline";
import { useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";

const MainTweet = () => {
  const { currentUser } = useSelector((s) => s.user);
  const [tweetText, setTweetText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "https://twitter-clone-dtwq.onrender.com/api/tweet",
        {
          userId: currentUser._id,
          description: tweetText,
        },
        { withCredentials: true }
      );
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <p className="font-bold pl-2 my-2">
        {currentUser.username ? currentUser.username : null}
      </p>
      <form className="border-b-2 pb-2">
        <textarea
          onChange={({ target }) => setTweetText(target.value)}
          type="text"
          placeholder="what's happening"
          className="bg-slate-200 rounded-lg w-full p-2"
          maxLength={280}
        ></textarea>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-full ml-auto"
          onClick={handleSubmit}
        >
          Tweet
        </button>
      </form>
      <Timeline />
    </div>
  );
};

export default MainTweet;
