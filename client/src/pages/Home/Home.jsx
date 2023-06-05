import LeftSideBar from "../../Components/LeftSideBar";
import MainTweet from "../../Components/MainTweet";
import RightSideBar from "../../Components/RightSideBar";

const Home = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4">
      <div>
        <LeftSideBar />
      </div>
      <div className="col-span-2 border-x-2 border-t-slate-800 px-6">
        <MainTweet />
      </div>
      <div className="px-6">
        <RightSideBar />
      </div>
    </div>
  );
};

export default Home;
