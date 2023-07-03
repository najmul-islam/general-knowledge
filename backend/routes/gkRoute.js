const express = require("express");
const router = express.Router();

const {
  getAllGk,
  getSingleGk,
  createGk,
  updateGk,
  deleteGk,
} = require("../controllers/gkController");

const {
  isAuth,
  isModerator,
  isAdmin,
} = require("../middlewares/authMiddleware");

// public route
router.route("/gk").get(getAllGk);
router.route("/gk/:id").get(getSingleGk);

// moderator route
router.route("/moderator/gk", isAuth, isModerator).post(createGk);
router
  .route("/moderator/:id", isAuth, isModerator)
  .put(updateGk)
  .delete(deleteGk);

// admin route
router.route("/admin/gk", isAuth, isAdmin).post(createGk);
router.route("/admin/gk/:id", isAuth, isAdmin).put(updateGk).delete(deleteGk);

module.exports = router;
