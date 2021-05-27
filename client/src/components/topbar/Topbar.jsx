import "./topbar.css";
import { Person, Chat, Notifications } from "@material-ui/icons";
import { Link,useHistory} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";


export default function Topbar() {
  const history = useHistory();
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  function logout(){
    localStorage.clear();
    history.push('/login')
    window.location.reload(false);
  }
  
  
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <div className="icon"><img id="iconimg" src={PF+"memories.png" } alt="#" /></div>
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Sike</span>
        </Link>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          
          <Link to={`/`} style={{ textDecoration: "none" }}><span className="topbarLink">Homepage</span></Link>
          <Link to={`/profile/${user.username}`} style={{ textDecoration: "none" }}><span className="topbarLink">Timelines</span></Link>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            
          </div>
          <div className="topbarIconItem">
            <Chat />
           
          </div>
          <div className="topbarIconItem">
            <Notifications />
            
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
            className="topbarImg"
          />
         
        </Link>
      </div>
      <Link>
      <button onClick={logout} id="logout" className="shareButton">logout</button></Link>
    </div>
  );
}
