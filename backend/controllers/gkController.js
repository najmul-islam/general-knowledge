const asyncHandler = require("express-async-handler");
const GK = require("../models/gkModel");

// get all gk
const getAllGk = asyncHandler(async (req, res) => {
  const gks = await GK.find({});

  res.status(200).json(gks);
});

// single gk
const getSingleGk = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const gk = await GK.findById({ _id: id });

  res.status(200).json(gk);
});

// create gk
const createGk = asyncHandler(async (req, res) => {
  const { question, answer, qna, table } = req.body;

  if (!question && !answer && !qna && !table) {
    res.status(400);
    throw new Error("Please give question and answer");
  }

  const newGK = await GK.create(req.body);

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
  createGk,
  updateGk,
  deleteGk,
};
