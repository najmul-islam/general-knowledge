const express = require("express");
const router = express.Router();

const {
  getAllCategory,
  getSingleCategory,
  getCategorySubject,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

const {
  isAuth,
  isModerator,
  isAdmin,
} = require("../middlewares/authMiddleware");

//public route
router.get("/category", getAllCategory);
router.get("/category/:id", getSingleCategory);
// router.get("/category/:id/subcategory", getCategorySubject);

//moderator route
router.route("/moderator/category", isAuth, isModerator).post(createCategory);
router
  .route("/moderator/category/:id")
  .put(isAuth, isAdmin, updateCategory)
  .delete(isAuth, isAdmin, deleteCategory);

//admin route
router.route("/admin/category", isAuth, isAdmin).post(createCategory);
router
  .route("/admin/category/:id")
  .put(isAuth, isAdmin, updateCategory)
  .delete(isAuth, isAdmin, deleteCategory);

module.exports = router;
