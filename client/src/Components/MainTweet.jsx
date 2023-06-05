const MainTweet = () => {
  return (
    <div>
      <p className="font-bold pl-2 my-2">Username</p>
      <form className="border-b-2 pb-2">
        <textarea
          type="text"
          placeholder="what's happening"
          className="bg-slate-200 rounded-lg w-full p-2"
          maxLength={280}
        ></textarea>
        <button className="bg-blue-500 text-white py-2 px-4 rounded-full ml-auto">
          Tweet
        </button>
      </form>
      Maintweet
    </div>
  );
};

export default MainTweet;
