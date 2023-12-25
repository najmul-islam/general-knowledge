const { response } = require("express");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Gk = require("../models/gkModel");
const Subject = require("../models/subjectModel");

// register user
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("All field are required");
  }

  if (password !== confirmPassword) {
    res.status(400);
    throw new Error("Password and confirm password must match");
  }

  // check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // create user
  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: user.generateToken(),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

// login user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.isValidPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: user.generateToken(),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

// get user data
const profile = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

// get user data
const updateProfile = asyncHandler(async (req, res) => {
  const { name, currentPassword, newPassword, confirmNewPassword } = req.body;

  const user = await User.findOne({ email: req.user.email });

  if (newPassword) {
    if (!currentPassword) {
      res.status(401);
      throw new Error("Give Current password");
    }

    if (!confirmNewPassword) {
      res.status(401);
      throw new Error("Give confirm new password");
    }

    if (currentPassword && newPassword && confirmNewPassword) {
      const isCurrentPasswordCorrect = await user.matchPassword(
        currentPassword
      );

      if (!isCurrentPasswordCorrect) {
        res.status(401);
        throw new Error("Current password is incorrect");
      }

      if (newPassword !== confirmNewPassword) {
        res.status(400);
        throw new Error("New password and confirm password must match");
      }
    }
  }
  // if (currentPassword && newPassword && confirmNewPassword) {
  //   const isCurrentPasswordCorrect = await req.user.matchPassword(
  //     currentPassword
  //   );

  //   if (!isCurrentPasswordCorrect) {
  //     res.status(401);
  //     throw new Error("Current password is incorrect");
  //   }

  //   if (newPassword !== confirmNewPassword) {
  //     res.status(400);
  //     throw new Error("New password and confirm password must match");
  //   }

  //   req.user.password = newPassword;
  // }

  const updatedProfile = await User.findByIdAndUpdate(
    req.user._id,
    { name, email: req.user.email, password: newPassword },
    { new: true }
  );

  res.status(200).json(updatedProfile);
});

const getUserGk = asyncHandler(async (req, res) => {
  const gk = await Gk.find({ user: req.user._id });

  res.status(200).json(gk);
});

const getUserSubject = asyncHandler(async (req, res) => {
  const subject = await Subject.find({ user: req.user._id });

  res.status(200).json(subject);
});

// get all user
const getAllUser = asyncHandler(async (req, res) => {
  const users = await User.find({}).select("-password");

  res.status(200).json({ nbHits: users.length, users });
});

// update user
const updateUserRole = asyncHandler(async (req, res) => {
  const { id, role } = req.body;

  if (!id && role) {
    res.status(401);
    throw new Error("Please give a role and id");
  }

  if (role === "admin") {
    res.status(401);
    throw new Error("don't make admin");
  }

  const user = await User.findOne({ _id: id });
  if (!user) {
    res.status(401);
    throw new Error("There no user with this id");
  }
  const updatedUserRole = await User.findOneAndUpdate(
    { _id: id },
    { $set: { role } },
    { new: true, runValidators: true }
  );

  res.status(200).json(updatedUserRole);
});

module.exports = {
  registerUser,
  loginUser,
  profile,
  updateProfile,
  getUserGk,
  getUserSubject,
  getAllUser,
  updateUserRole,
};
