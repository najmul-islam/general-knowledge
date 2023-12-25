const asyncHandler = require("express-async-handler");
const Subject = require("../models/subjectModel");
const Gk = require("../models/gkModel");

// get all Subject
const getAllSubject = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 50;
  const skip = (page - 1) * limit;

  const subjects = await Subject.find({}).skip(skip).limit(limit);
  const totalPage = Math.ceil((await Subject.countDocuments()) / limit);
  res.status(200).json({ subjects, totalPage });
});

//get single Subject
const getSingleSubject = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 50;
  const skip = (page - 1) * limit;

  const subject = await Subject.findById({ _id: id });
  const gks = await Gk.find({ subjects: id }).skip(skip).limit(limit);
  const totalPage = Math.ceil(
    (await Gk.countDocuments({ subjects: id })) / limit
  );

  res.status(200).json({ subject, gks, totalPage });
});

// create Subject
const createSubject = asyncHandler(async (req, res) => {
  const { title, privacy } = req.body;

  if (!title) {
    res.status(400);
    throw new Error("Please give title");
  }

  const isEndsWithFullstopMark = title.trim().endsWith("।");
  const updatedTitle = isEndsWithFullstopMark ? title : `${title}।`;

  const isTitleExist = await Subject.findOne({ title: updatedTitle });

  if (isTitleExist) {
    res.status(400);
    throw new Error("Subject with this title already exists");
  }

  const newSubject = await Subject.create({
    user: req.user._id,
    title: updatedTitle,
    privacy,
  });

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
