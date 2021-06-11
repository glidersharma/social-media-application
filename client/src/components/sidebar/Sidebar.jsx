import "./sidebar.css";
// import { Users } from "../../dummyData";
import CloseFriend from "../closeFriend/CloseFriend";
import {useEffect, useState } from "react";
import {Search
} from "@material-ui/icons";
import axios from "axios";

export default function Sidebar() {
  const [user, setuser] = useState([]);
  useEffect(() => {
    const getuser = async () => {
      try {
        const userList = await axios.post("/users/user");
        setuser(userList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getuser();
  }, []);
  
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
      <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
        <hr className="sidebarHr" />
        <ul className="sidebarFriendList">
          {user.map((u) => (
            <CloseFriend key={u.id} user={u} />
          ))}
        </ul>
      </div>
    </div>
  );
}
