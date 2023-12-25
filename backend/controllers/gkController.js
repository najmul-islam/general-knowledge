const asyncHandler = require("express-async-handler");
const GK = require("../models/gkModel");

// get all gk
const getAllGk = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 50;
  const skip = (page - 1) * limit;

  const gks = await GK.find({}).skip(skip).limit(limit);
  const totalPage = Math.ceil((await GK.countDocuments()) / limit);
  res.status(200).json({ gks, totalPage });
});

const searchGk = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 50;
  const skip = (page - 1) * limit;

  const { searchQuery } = req.query;

  const gks = await GK.find({
    question: { $regex: searchQuery, $options: "i" },
  })
    .skip(skip)
    .limit(limit);

  const totalGks = await GK.countDocuments({
    question: { $regex: searchQuery, $options: "i" },
  });

  const totalPage = Math.ceil(totalGks / limit);

  res.status(200).json({ gks, totalPage });
});

// single gk
const getSingleGk = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const gk = await GK.findById({ _id: id });

  res.status(200).json(gk);
});

// create gk
const createGk = asyncHandler(async (req, res) => {
  const { question, answer, subjects } = req.body;

  if (!question && !answer) {
    res.status(400);
    throw new Error("Please give question and answer");
  }

  // Ensure that the user selects at most three subjects
  if (subjects.length > 3) {
    res.status(400);
    throw new Error({
      error: "You can select at most three subjects for one question.",
    });
  }

  const isEndsWithQuestionMark = question.trim().endsWith("?");
  const isEndsWithFullstopMark = answer.trim().endsWith("।");

  const updatedQuestion = isEndsWithQuestionMark ? question : `${question}?`;
  const updatedAnswer = isEndsWithFullstopMark ? answer : `${answer}।`;

  const isQuestionExist = await GK.findOne({ question: updatedQuestion });

  if (isQuestionExist) {
    res.status(400);
    throw new Error("This question already exists");
  }

  const newGK = await GK.create({
    user: req.user._id,
    question: updatedQuestion,
    answer: updatedAnswer,
    subjects,
  });

  res.status(200).json(newGK);
});

// update gk
const updateGk = asyncHandler(async (req, res) => {
  const gk = await GK.findById(req.params.id);
  if (!gk) {
    res.status(400);
    throw new Error("Gk not found");
  }

  const updatedGk = await GK.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedGk);
});

// delete gk
const deleteGk = asyncHandler(async (req, res) => {
  const gk = await GK.findById(req.params.id);

  if (!gk) {
    res.status(400);
    throw new Error("Gk not found");
  }

  await gk.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getAllGk,
  getSingleGk,
  searchGk,
  createGk,
  updateGk,
  deleteGk,
};
