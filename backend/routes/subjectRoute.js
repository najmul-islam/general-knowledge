const express = require("express");
const router = express.Router();

const {
  getAllSubject,
  getSingleSubject,
  createSubject,
  updateSubject,
  deleteSubject,
} = require("../controllers/subjectController");

const {
  isAuth,
  isModerator,
  isAdmin,
} = require("../middlewares/authMiddleware");

// public route
router.route("/subject").get(getAllSubject);
router.route("/subject/:id").get(getSingleSubject);

// moderator route
router.route("/moderator/subject", isAuth, isModerator).post(createSubject);
router
  .route("/moderator/subject/:id", isAuth, isModerator)
  .put(updateSubject)
  .delete(deleteSubject);

// admin route
router.route("/admin/subject", isAuth, isAdmin).post(createSubject);
router
  .route("/admin/subject/:id", isAuth, isAdmin)
  .put(updateSubject)
  .delete(deleteSubject);

module.exports = router;
