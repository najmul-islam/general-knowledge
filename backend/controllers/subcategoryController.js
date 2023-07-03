const asyncHandler = require("express-async-handler");
const Subcategory = require("../models/subcategoryModel");
const Subject = require("../models/subjectModel");

// get all category
const getAllSubcategory = asyncHandler(async (req, res) => {
  const subcategores = await Subcategory.find();
  res.status(200).json(subcategores);
});

//get single category
const getSingleSubcategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const subcategory = await Subcategory.findById({ _id: id });
  const subject = await Subject.find({ subcategory: id });

  res.status(200).json({ subcategory, subject });
});

// create category
const createSubcategory = asyncHandler(async (req, res) => {
  const { title } = req.body;

  if (!title) {
    res.status(400);
    throw new Error("Please give title");
  }

  const newSubcategory = await Subcategory.create(req.body);

  res.status(200).json(newSubcategory);
});

// update category
const updateSubcategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const subcategory = await Subcategory.findById(id);
  if (!subcategory) {
    res.status(400);
    throw new Error("category not found");
  }

  const updatedSubcategory = await Subcategory.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });

  res.status(200).json(updatedSubcategory);
});

// delete category
const deleteSubcategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const subcategory = await Subcategory.findById(id);

  if (!subcategory) {
    res.status(400);
    throw new Error("subcategory not found");
  }

  await subcategory.remove();
  res.status(200).json({ id });
});

module.exports = {
  getAllSubcategory,
  getSingleSubcategory,
  createSubcategory,
  updateSubcategory,
  deleteSubcategory,
};
