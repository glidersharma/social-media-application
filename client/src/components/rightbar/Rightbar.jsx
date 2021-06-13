import "./rightbar.css";
// import { Users } from "../../dummyData";
import CloseFriend from "../closeFriend/CloseFriend";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@material-ui/icons";
import { Modal, Button, Form } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.css";
// import { useRef } from "react";
import ModalUpdate from "../ModalUpdate/ModalUpdate";
 
export default function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(
    currentUser.followings.includes(user?.id)
  );
  
  // const Bio = useRef();
  // const status = useRef();
  // const city = useRef();
  // const From = useRef();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);






// console.log(file);






  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   const updateedData = {
  //     desc: Bio.current.value,
  //   };
  //   if (file) {
  //     const data = new FormData();
  //     const fileName = Date.now()+user.username + file.name;
  //     data.append("name", fileName);
  //     data.append("file", file);
  //     updateedData.img = fileName;
  //     console.log(updateedData);
  //     try {
        // await axios.post("/upload", data);
      // } catch (err) { }
    // }
    // try {
      // await axios.post("/posts", newPost);
      // window.location.reload();
    // } catch (err) { }
    // handleClose();
  // }
// console.log(file);
// const updatePhoto = (file)=>{
//   setImage(file)
// }












  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("/users/friends/" + user._id);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user]);

  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put(`/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(`/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed(!followed);
    } catch (err) {
    }
  };
  // console.log(friends);
 
  // const LoginForm = () => {
  //   return (
  //     <Form onSubmit={onSubmit}>
  //       <Form.Group controlId="formBasicEmail">
  //         <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
  //           <Form.Label>Bio</Form.Label>
  //           <Form.Control as="textarea" rows={2}
  //          ref={Bio} />
  //         </Form.Group>
  //       </Form.Group>

  //       <Form.Group className="mb-3" controlId="formBasicCity">
  //         <Form.Label>City</Form.Label>
  //         <Form.Control
  //           type="text"
  //           placeholder="like : Saharanpur"
  //           ref={city}
  //         />
  //       </Form.Group>

  //       <Form.Group className="mb-3" controlId="formBasicStatus">
  //         <Form.Label>Relationship Status</Form.Label>
  //         <Form.Control
  //           type="text"
  //           placeholder="Like :Single "
  //           ref={status}
  //                     />
  //       </Form.Group>
  //       <Form.Group className="mb-3" controlId="formBasicFrom">
  //         <Form.Label>From</Form.Label>
  //         <Form.Control
  //           type="text"
  //           placeholder="like : Pinjore"
  //           ref={From}
  //         />
  //       </Form.Group>
  //       <label htmlFor="file" className="shareOption">
  //             {/* <PermMedia htmlColor="tomato" className="shareIcon" /> */}
  //             <span className="shareOptionText">Photo or Video</span>
  //             <input
  //               style={{ display: "none" }}
  //               type="file"
  //               id="file"
  //               accept="image/*|video/*"
  //               onSelect={(e) => setImage(e.target.files[0])}
  //               // onChange={handlechange}
  //             />
  //           </label>
  //       <Button className="mt-3"variant="primary" type="submit" block>
  //        Update
  //       </Button>
  //     </Form>
  //   );
  // };

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="assets/gift.png" alt="" />
          <span className="birthdayText">
            <b>Tanish Sharma</b> and <b>2 other friends</b> have a birhday today.
          </span>
        </div>
        <img className="rightbarAd" src="assets/ad.png" alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {friends.map((u) => (
            <CloseFriend key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };


  const ProfileRightbar = () => {
    return (
      <>
        {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        {user.username === currentUser.username && (
          <Button variant="primary"className="mb-3" onClick={handleShow}>
            Edit Profile
          </Button>

        )}

        <Modal show={show} onHide={handleClose}>
          <Modal.Header >
            <Modal.Title>Update Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ModalUpdate />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close 
            </Button>
          </Modal.Footer>
        </Modal>
        <div className="rightbarInformation">
          <h4 className="rightbarTitle">User information</h4>
          <div className="rightbarInfo">
            <div className="rightbarInfoItem">
              <span className="rightbarInfoKey">City:</span>
              <span className="rightbarInfoValue">{user.city}</span>
            </div>
            <div className="rightbarInfoItem">
              <span className="rightbarInfoKey">From:</span>
              <span className="rightbarInfoValue">{user.from}</span>
            </div>
            <div className="rightbarInfoItem">
              <span className="rightbarInfoKey">Relationship:</span>
              <span className="rightbarInfoValue">
               {user.relationship}
              </span>
            </div>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <Link
              to={"/profile/" + friend.username}
              style={{ textDecoration: "none" }}
            >
              <div className="rightbarFollowing">
                <img
                  src={
                    friend.profilePicture
                      ? PF + friend.profilePicture
                      : PF + "person/noAvatar.png"
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">

        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
