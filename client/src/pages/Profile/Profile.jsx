import LeftSideBar from "../../Components/LeftSideBar";
import RightSideBar from "../../Components/RightSideBar";

const Profile = () => {
  return (
    <div className="grid grid-col-1 md:grid-cols-4">
      <div>
        <LeftSideBar />
      </div>
      <div className="col-span-2 border-x-2 border-t-slate-800 px-6">
        my profile tweets
      </div>
      <div className="px-6">
        <RightSideBar />
      </div>
    </div>
  );
};

export default Profile;
