import "./closeFriend.css";
import {Link} from "react-router-dom";
export default function CloseFriend({user}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  // const img=PF+"person/noAvatar.png";
  // console.log(PF+user.profilePicture);
  return (
    <Link
    to={"/profile/" + user.username}
    style={{ textDecoration: "none"  }}
  >
    <li className="sidebarFriend">
      <img className="sidebarFriendImg" src={PF+user.profilePicture} alt=""/>
      <span className="sidebarFriendName" style={{color:"black"}} >{user.username}</span>
    </li>
    </Link>
  );
}
