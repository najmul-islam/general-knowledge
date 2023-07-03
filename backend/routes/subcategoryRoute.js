const express = require("express");
const router = express.Router();

const {
  getAllSubcategory,
  getSingleSubcategory,
  createSubcategory,
  updateSubcategory,
  deleteSubcategory,
} = require("../controllers/subcategoryController");

const {
  isAuth,
  isModerator,
  isAdmin,
} = require("../middlewares/authMiddleware");

//public route
router.get("/subcategory", getAllSubcategory);
router.get("/subcategory/:id", getSingleSubcategory);

// moderator route
router
  .route("/moderator/subcategory", isAuth, isModerator)
  .post(createSubcategory);
router
  .route("/moderator/subcategory/:id", isAuth, isModerator)
  .put(updateSubcategory)
  .delete(deleteSubcategory);

// admin route
router.route("/admin/subcategory", isAuth, isAdmin).post(createSubcategory);
router
  .route("/admin/subcategory/:id", isAuth, isAdmin)
  .put(updateSubcategory)
  .delete(deleteSubcategory);

module.exports = router;
