const express = require("express");
const router = express.Router();

const {
  getAllGk,
  getSingleGk,
  searchGk,
  createGk,
  updateGk,
  deleteGk,
} = require("../controllers/gkController");

const { isUser } = require("../middlewares/authMiddleware");

// public route
router.route("/gk").get(getAllGk).post(isUser, createGk);
router.route("/gk/searchGk").get(searchGk);
router
  .route("/gk/:id")
  .get(getSingleGk)
  .put(isUser, updateGk)
  .delete(isUser, deleteGk);

// user route
// router.route("/moderator/gk", isAuth).post(createGk);
// router.route("/moderator/:id", isAuth).put(updateGk).delete(deleteGk);

// admin route
// router.route("/admin/gk", isUser, isAdmin).post(createGk);
// router.route("/admin/gk/:id", isUser, isAdmin).put(updateGk).delete(deleteGk);

module.exports = router;
