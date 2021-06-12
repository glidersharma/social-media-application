const router = require("express").Router();
const Conversation = require("../models/Conversation");

//new conv

router.post("/:senderId/reciverId", async (req, res) => {
  const newConversation = new Conversation({
    members: [req.params.senderId, req.params.receiverId],
  });
  

  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get conv of a user

router.get("/:userId", async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get conv includes two userId

router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
  try {
    let conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    console.log(conversation);
    res.status(200).json(conversation)
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

module.exports = router;
