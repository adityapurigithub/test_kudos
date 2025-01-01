import Badges from "../models/badges.js";
import Kudos from "../models/kudos.js";
import User from "../models/users.js";

export const loginUser = async (req, res) => {
  if (!req.body.name || !req.body.email) {
    return res.status(400).json({
      success: false,
      message: "Name and email are required",
      data: null,
    });
  }

  const existingUser = await User.findOne({ email: req.body.email });

  if (existingUser) {
    return res.status(200).json({
      success: true,
      message: "User already exists",
      data: { user: existingUser },
    });
  }

  const user = new User({
    name: req.body.name,
    email: req.body.email,
  });

  await user.save();

  return res.status(201).json({
    success: true,
    message: "User created successfully",
    data: { user },
  });
};

export const getAllKudoBadges = async (req, res) => {
  try {
    const kudos = await Badges.find();
    return res.status(200).json({
      success: true,
      message: "Badges retrieved successfully",
      data: { badges: kudos },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch badges",
      data: null,
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: { users },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch users",
      data: null,
    });
  }
};

export const giveKudos = async (req, res) => {
  try {
    const { userId, badgeId, kudoMessage, loggedInUserId } = req.body;

    const user = await User.findById(userId);

    const loggedInUser = await User.findById(loggedInUserId);

    if (!loggedInUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        data: null,
      });
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        data: null,
      });
    }

    const badge = await Badges.findById(badgeId);

    if (!badge) {
      return res.status(404).json({
        success: false,
        message: "Badge not found",
        data: null,
      });
    }

    Kudos.create({
      sender: loggedInUser.name,
      receiver: user.name,
      badge: badge.label,
      kudoMessage: kudoMessage,
    });

    return res.status(201).json({
      success: true,
      message: "Kudo given successfully",
      data: null,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to give kudo",
      data: null,
    });
  }
};

export const getAllKudos = async (req, res) => {
  console.log("here");
  try {
    const kudos = await Kudos.find().sort({ createdAt: -1 });
    console.log(kudos);
    return res.status(200).json({
      success: true,
      message: "Kudos retrieved successfully",
      data: { kudos },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch kudos",
      data: null,
    });
  }
};

export const likeKudo = async (req, res) => {
  try {
    const { userId } = req.body; //  logged-in user's ID is sent in the request body
    const kudo = await Kudos.findById(req.params.id);

    if (!kudo) {
      return res.status(404).json({
        success: false,
        message: "Kudo not found",
        data: null,
      });
    }

    // Check if the user has already liked the kudo
    if (kudo.likedBy.includes(userId)) {
      // Unlike the kudo
      kudo.likes -= 1;
      kudo.isLiked = false;
      kudo.likedBy = kudo.likedBy.filter((id) => id !== userId);
    } else {
      // Like the kudo
      kudo.likes += 1;
      kudo.isLiked = true;
      kudo.likedBy.push(userId);
    }

    await kudo.save();

    return res.status(200).json({
      success: true,
      message: "Kudo like toggled successfully",
      data: { kudo },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to toggle kudo like",
      data: null,
    });
  }
};
