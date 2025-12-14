import User from "../models/User.js";
import FriendRequest from "../models/friendRequest.js";

export async function getRecommendedUsers(req, res) {
  try {
    const currentUserId = req.user._id;
    const currentUser = req.user;

    const recommendedUsers = await User.find({
      $and: [
        {
          _id: { $ne: currentUserId }, // not the current user
        },
        {
          _id: { $nin: currentUser.friends }, // not already in friends
        },
        {
          isOnboarded: true, // only onboarded users
        },
      ],
    }).select("-password");

    return res.status(200).json(recommendedUsers);
  } catch (err) {
    console.error("Error in recommended controller:", err.message);
    return res.status(500).json({
      message: "Internal server error in recommended users",
    });
  }
}

export async function getMyFriends(req, res) {
  try {
    const user = await User.findById(req.user._id)
      .select("friends")
      .populate("friends", "name profilePic nativeLanguage learningLanguage");

    res.status(200).json(user.friends);
  } catch (err) {
    console.error("error in get my friends", err.message);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

export async function sendFriendrequest(req, res) {
  try {
    const myId = req.user._id.toString();
    const { id: recipientId } = req.params;

    if (myId === recipientId) {
      return res.status(400).json({
        message: "You cannot send a friend request to yourself",
      });
    }

    const recipient = await User.findById(recipientId);
    if (!recipient) {
      return res.status(404).json({
        message: "Recipient not found",
      });
    }

    if (recipient.friends.includes(myId)) {
      return res.status(400).json({
        message: "You are already friends with this user",
      });
    }

    const existingrequest = await FriendRequest.findOne({
      $or: [
        { sender: myId, recipient: recipientId },
        { sender: recipientId, recipient: myId },
      ],
    });

    if (existingrequest) {
      return res.status(400).json({
        message: "A friend request already exists between you and this user",
      });
    }

    const friendRequest = await FriendRequest.create({
      sender: myId,
      recipient: recipientId,
    });

    return res.status(201).json({ friendRequest });
  } catch (err) {
    console.log("Error on send friend request", err.message);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

export async function acceptFriendrequest(req, res) {
  try {
    const { id: requestId } = req.params;

    // FIX: Use the model name, not the variable name
    const friendRequest = await FriendRequest.findById(requestId);

    if (!friendRequest) {
      return res.status(404).json({ message: "Friend request not found" });
    }

    // FIX: req.user._id, not req.User.id
    if (friendRequest.recipient.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You are not authorized to accept this request",
      });
    }

    friendRequest.status = "accepted";
    await friendRequest.save();

    // Update both users
    await User.findByIdAndUpdate(friendRequest.sender, {
      $addToSet: { friends: friendRequest.recipient },
    });

    await User.findByIdAndUpdate(friendRequest.recipient, {
      $addToSet: { friends: friendRequest.sender },
    });

    res.status(200).json({ message: "Friend request accepted" });
  } catch (err) {
    console.log("Error in accepting friend request:", err.message);

    res.status(500).json({
      message: "Internal server error",
    });
  }
}

export async function getFriendRequests(req, res) {
  try {
    const incomingReqs = await FriendRequest.find({
      recipient: req.user._id,
      status: "pending",
    }).populate("sender", "name profilePic nativeLanguage learningLanguage");

    const acceptedReqs = await FriendRequest.find({
      recipient: req.user._id,
      status: "accepted",
    }).populate("recipient", "name profilePic nativeLanguage learningLanguage");

    return res.status(200).json({
      message: "Friend requests fetched successfully",
      incomingReqs,
      acceptedReqs,
    });
  } catch (err) {
    console.log("error in get pending request controller", err.message);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function getOutgoingFriendRequests(req, res) {
  try {
    const outgoingRequests = await FriendRequest.find({
      sender: req.user._id,
      status: "pending",
    }).populate("recipient", "name profilePic nativeLanguage learningLanguage");

    res.status(200).json(outgoingRequests);
  } catch (err) {
    console.log("error in outgoing requests controller", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
}
