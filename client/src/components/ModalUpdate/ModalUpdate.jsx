
import { Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { useState, useRef, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import "./Modal.css";
export default function ModalUpdate() {
  const [file, setImage] = useState(null);
  const [cover, setcoverImage] = useState(null);
  const { user } = useContext(AuthContext);
  const Bio = useRef();
  const status = useRef();
  const city = useRef();
  const From = useRef();
  // const [show, setShow] = useState(false);
  const onSubmit = async (e) => {
    const updateuser = {
      userId:user._id,
      desc:Bio.current.value,
      from:From.current.value,
      city:city.current.value,
      relationship:status.current.value,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      updateuser.profilePicture = fileName;
      try {
        await axios.post("/upload", data);
      } catch (err) { }
    }
    if (cover) {
      const data = new FormData();
      const fileName = Date.now() + cover.name;
      data.append("name", fileName);
      data.append("file", cover);
      updateuser.coverPicture = fileName;
      try {
        await axios.post("/upload", data);
      } catch (err) { }
    }
    try{
      await axios.put("/users/60ba410d205c19212c02343e", updateuser);
      window.location.reload();
    }catch(err){
      console.log(err);
    }
    console.log(updateuser)
  }
  const updatePhoto = (file) => {
    setImage(file);
  }
  const updatecoverPhoto = (file) => {
    setcoverImage(file);
  }
  return (
    <Form onSubmit={onSubmit}>
      <Form.Group controlId="formBasicEmail">
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Bio</Form.Label>
          <Form.Control as="textarea" rows={2}
            ref={Bio} />
        </Form.Group>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicCity">
        <Form.Label>City</Form.Label>
        <Form.Control
          type="text"
          placeholder="like : Saharanpur"
          ref={city}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicStatus">
        <Form.Label>Relationship Status</Form.Label>
        <Form.Control
          type="text"
          placeholder="Like :Single "
          ref={status}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicFrom">
        <Form.Label>From</Form.Label>
        <Form.Control
          type="text"
          placeholder="like : Pinjore"
          ref={From}
        />
      </Form.Group>
      <div><label htmlFor="file" className="shareOption">Profile</label>
        <input type="file" className="takefile" accept="image/*" onChange={(e) => updatePhoto(e.target.files[0])} placeholder="Profile Picture" />
      </div>
      <div><label htmlFor="file" className="shareOption">cover Picture</label>
        <input type="file" className="takefile" accept="image/*" onChange={(e) => updatecoverPhoto(e.target.files[0])} placeholder="Cover Picture"/>
      </div>
      <Button className="mt-3" variant="primary" onClick={onSubmit} block>
        Update
      </Button>
    </Form>
  );
};
