import LeftSideBar from "../../Components/LeftSideBar";
import RightSideBar from "../../Components/RightSideBar";
import ExploreTweets from "../../Components/ExploreTweets";
import { useSelector } from "react-redux";
import SignIn from "../SignIn/SignIn";

const Explore = () => {
  const { currentUser } = useSelector((s) => s.user);

  return (
    <>
      {!currentUser ? (
        <SignIn />
      ) : (
        <div className="grid grid-col-1 md:grid-cols-4">
          <div>
            <LeftSideBar />
          </div>
          <div className="col-span-2 border-x-2 border-t-slate-800 px-6">
            <ExploreTweets />
          </div>
          <div className="px-6">
            <RightSideBar />
          </div>
        </div>
      )}{" "}
    </>
  );
};

export default Explore;
