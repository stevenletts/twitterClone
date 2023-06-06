import { useSelector } from "react-redux";
import LeftSideBar from "../../Components/LeftSideBar";
import RightSideBar from "../../Components/RightSideBar";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { currentUser } = useSelector((s) => s.user);
  const { id } = useParams();
  const [userTweets, setUserTweets] = useState(null);
  const [userProfile, setuserProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = axios.get(`http://localhost:3000/api/user/find/${id}`);
        const res2 = axios.get(
          `http://localhost:3000/api/tweet/user/all/${id}`
        );
        setUserTweets(res2.data);
        setuserProfile(res.data);
      } catch (error) {
        console.log("################################################");
        console.log(error);
        navigate(-1);
      }
    };
    fetchData();
  }, [currentUser, id]);

  return (
    <div className="grid grid-col-1 md:grid-cols-4">
      <div>
        <LeftSideBar />
      </div>
      <div className="col-span-2 border-x-2 border-t-slate-800 px-6">
        <div className="flex justify-between items-center">
          {currentUser._id === id ? (
            <button className="px-4 y-2 bg-blue-500 rounded-full text-white">
              Edit Profile
            </button>
          ) : currentUser.following.includes(id) ? (
            <button className="px-4 y-2 bg-blue-500 rounded-full text-white">
              Unfollow
            </button>
          ) : (
            <button className="px-4 y-2 bg-blue-500 rounded-full text-white">
              Follow
            </button>
          )}
        </div>
      </div>
      <div className="px-6">
        <RightSideBar />
      </div>
    </div>
  );
};

export default Profile;
