import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const username = useParams().username;
  const [file, setFile] = useState(null);

  
  


  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [username]);

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={
                  user.coverPicture
                    ? PF + user.coverPicture
                    : PF + "person/noCover.png"
                }
                alt=""
              />
              <label htmlFor="file" className="shareOption">
              <img
                className="profileUserImg"
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
              />
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept="image/*"
                onChange={(e) => {setFile(e.target.files[0]);
                }}
                                          />
            </label>             
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="rightbarInformation1">
            <h4 className="rightbarTitle">User information</h4>
            <div className="rightbarInfo">
              <div className="rightbarInfoItem">
                <span className="rightbarInfoKey">City: </span>
                <span className="rightbarInfoValue">{user.city}</span>
              </div>
              <div className="rightbarInfoItem">
                <span className="rightbarInfoKey">From: </span>
                <span className="rightbarInfoValue">{user.from}</span>
              </div>
              <div className="rightbarInfoItem">
                <span className="rightbarInfoKey">Relationship: </span>
                <span className="rightbarInfoValue">
                  {user.relationship}
                </span>
              </div>
              <div className="rightbarInfoItem">
                <span className="rightbarInfoKey">About info<b>--</b></span>
              </div>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}
