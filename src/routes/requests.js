const express = require("express");
const { userAuth } = require("../middlewares/auth");
const requestsRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

requestsRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const {toUserId, status} = req.params;
      const allowedStatus = ["ignored", "interested"];
      if (!allowedStatus.includes(status)) {
        return res
          .status(400)
          .json({ message: "Invalid Status type: " + status });
      }

      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res.status(404).json({ message: "User not found" });
      }

      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (existingConnectionRequest) {
        return res
          .status(400)
          .send({ message: "Connection Request already exists!" });
      }
      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });
      const data = await connectionRequest.save();
      res.json({
        message: req.user.firstName + " is "+status + " in " + toUser.firstName,
        data,
      });
    } catch (err) {
      res.status(400).send("ERROR: " + err.message);
    }
  },
);

requestsRouter.post("/request/review/:status/:requestId", userAuth, async (req,res)=>{
    try{
        const loggedInUser = req.user;
        const allowedStatus = ["accepted", "rejected"];
        const {status,requestId} = req.params;
        if(!allowedStatus.includes(status)){
            res.status(400).json({message: "Invalid status type"});
        }

        const connectionRequest = new ConnectionRequest({
            _id: requestId,
            toUserId: loggedInUser._id,
            status: "interested",
        });

        if(!connectionRequest){
           return res.status(404).json({message:"Connection request not found"});
        }
        connectionRequest.status = status;
        const data = await connectionRequest.save();
        res.status(200).json({message: "Connection Request "+status, data})
    }
    catch(err){
        res.status(400).send("ERROR: " +err.message);
    }
})



module.exports = requestsRouter;
