const asyncHandler = require("express-async-handler");
const Category = require("../models/categoryModel");
const Subcategory = require("../models/subcategoryModel");
const Subject = require("../models/subjectModel");
// get all category
const getAllCategory = asyncHandler(async (req, res) => {
  const categores = await Category.find({});

  res.status(200).json(categores);
});

//get single category
const getSingleCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const category = await Category.findById({ _id: id });
  const subcategory = await Subcategory.find({ category: id });
  // const subject = await Subject.find({ category: id });

  if (subcategory === undefined || subcategory.length == 0) {
    const subject = await Subject.find({ category: id });

    res.status(200).json({ category, subject });
  }

  res.status(200).json({ category, subcategory });
});

// // get category gk
// const getCategorySubject = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   const category = await Subcategory.find({ category: id });
//   res.status(200).json(categoryGk);
// });

// create category
const createCategory = asyncHandler(async (req, res) => {
  const { title } = req.body;

  if (!title) {
    res.status(400);
    throw new Error("Please give title");
  }

  const newCategory = await Category.create(req.body);

  res.status(200).json(newCategory);
});

// update category
const updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    res.status(400);
    throw new Error("category not found");
  }

  const updatedCategory = await Category.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedCategory);
});

// delete category
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    res.status(400);
    throw new Error("category not found");
  }

  await category.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getAllCategory,
  getSingleCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
