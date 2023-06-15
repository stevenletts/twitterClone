/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import app from "../firebase";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { changeProfile, logout } from "../redux/userReducer";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line react/prop-types

const baseURL = "/api/user";

// eslint-disable-next-line react/prop-types
const EditProfile = ({ setOpen }) => {
  const [profileImage, setProfileImage] = useState("");
  const [imgUpProg, setImgUpProg] = useState(0);
  const { currentUser } = useSelector((s) => s.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const uploadImg = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImgUpProg(Math.round(progress));
        switch (snapshot.state) {
          case "paused":
            break;
          case "running":
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;

          // ...

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          const updatedProfile = await axios.put(
            `${baseURL}/${currentUser._id}`,
            {
              profilePicture: downloadURL,
            }
          );
          dispatch(changeProfile(updatedProfile));
        });
      }
    );
  };

  const handleDelete = async () => {
    await axios.delete(`${baseURL}/${currentUser._id}`);
    dispatch(logout());
    navigate("/signin");
  };

  useEffect(() => {
    profileImage && uploadImg(profileImage);
  }, [profileImage]);

  return (
    <>
      <div className="absolute w-full h-full top-0 left-0 bg-transparent flex items-center justify-center">
        <div className="w-[600px] h-[600px] bg-slate-200 rounded-lg p-8 flex flex-col gap-4 relative">
          <button
            className="absolute top-3 right-3 cursor-pointer"
            onClick={() => setOpen(false)}
          >
            X
          </button>
          <h2 className="font-bold text-xl">Edit Profile</h2>
          <p>Choose a new profile picture</p>
          {imgUpProg > 0 ? "Uploading " + imgUpProg + "%" : null}
          <input
            type="file"
            className="bg-transparent bordeer border-slate-500 rounded p-2"
            accept="image/*"
            onChange={(e) => setProfileImage(e.target.files[0])}
          />
          <p>Delete Account</p>
          <button
            className="bg-red-500 text-white py-2 rounded-full"
            onClick={handleDelete}
          >
            Delete Account
          </button>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
