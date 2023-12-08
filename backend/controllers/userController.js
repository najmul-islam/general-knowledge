const { response } = require("express");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

// register user
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
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
  getAllUser,
  updateUserRole,
};
