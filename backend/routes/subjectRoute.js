const express = require("express");
const router = express.Router();

const {
  getAllSubject,
  getSingleSubject,
  createSubject,
  updateSubject,
  deleteSubject,
} = require("../controllers/subjectController");

const { isUser } = require("../middlewares/authMiddleware");

// public route
router.route("/subject").get(getAllSubject).post(isUser, createSubject);
router
  .route("/subject/:id")
  .get(getSingleSubject)
  .put(isUser, updateSubject)
  .delete(isUser, deleteSubject);

// admin route
// router.route("/admin/subject", isUser, isAdmin).post(createSubject);
// router
//   .route("/admin/subject/:id", isUser, isAdmin)
//   .put(updateSubject)
//   .delete(deleteSubject);

module.exports = router;
