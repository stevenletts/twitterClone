import axios from "axios";
import { useSelector } from "react-redux";
import Tweet from "./Tweet";
import { useState, useEffect } from "react";
import { current } from "@reduxjs/toolkit";

const ExploreTweets = () => {
  const { currentUser } = useSelector((s) => s.user);
  const [explore, setExplore] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/tweet/explore");
        setExplore(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [currentUser._id]);

  return (
    <div className="mt-6">
      {explore &&
        explore.map((tweet) => {
          return (
            <div className="p-2" key={tweet._id}>
              <Tweet tweet={tweet} setData={setExplore} />
            </div>
          );
        })}
    </div>
  );
};

export default ExploreTweets;
