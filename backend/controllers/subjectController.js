const asyncHandler = require("express-async-handler");
const Subject = require("../models/subjectModel");
const Gk = require("../models/gkModel");

// get all Subject
const getAllSubject = asyncHandler(async (req, res) => {
  const subjects = await Subject.find({});

  res.status(200).json(subjects);
});

//get single Subject
const getSingleSubject = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const subject = await Subject.findById({ _id: id });
  const gk = await Gk.find({ subject: id });

  res.status(200).json({ subject, gk });
});

// create Subject
const createSubject = asyncHandler(async (req, res) => {
  const { title } = req.body;

  if (!title) {
    res.status(400);
    throw new Error("Please give title");
  }

  const newSubject = await Subject.create(req.body);

  res.status(200).json(newSubject);
});

// update Subject
const updateSubject = asyncHandler(async (req, res) => {
  const subject = await Subject.findById(req.params.id);
  if (!subject) {
    res.status(400);
    throw new Error("Subject not found");
  }

  const updatedSubject = await Subject.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedSubject);
});

// delete Subject
const deleteSubject = asyncHandler(async (req, res) => {
  const subject = await Subject.findById(req.params.id);

  if (!subject) {
    res.status(400);
    throw new Error("Subject not found");
  }

  await subject.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getAllSubject,
  getSingleSubject,
  createSubject,
  updateSubject,
  deleteSubject,
};
