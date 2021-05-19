import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";

export default function Topbar() {
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <div className="icon"><img id = "iconimg"src="assets/memories.png"></img></div><span className="logo">Sike</span>
      </div>
      
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            {/* <span className="topbarIconBadge">1</span> */}
          </div>
          <div className="topbarIconItem">
            <Chat />
            {/* <span className="topbarIconBadge">2</span> */}
          </div>
          <div className="topbarIconItem">
            <Notifications />
            {/* <span className="topbarIconBadge">1</span> */}
          </div>
        </div>
        <img src="https://source.unsplash.com/weekly?girls" alt="" className="topbarImg"/>
      </div>
    </div>
  );
}
