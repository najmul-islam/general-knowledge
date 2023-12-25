const router = require("express").Router();
const {
  registerUser,
  loginUser,
  profile,
  getUserGk,
  getUserSubject,
  updateProfile,
  getAllUser,
  updateUserRole,
} = require("../controllers/userController");

const { isUser, isAdmin } = require("../middlewares/authMiddleware");

router.post("/user/register", registerUser);
router.post("/user/login", loginUser);
router.get("/user/profile", isUser, profile);
router.put("/user/profile", isUser, updateProfile);
router.get("/user/all-gk", isUser, getUserGk);
router.get("/user/all-subject", isUser, getUserSubject);
// router.get("/user", isUser, isAdmin, getAllUser);
// router.put("/user", isUser, isAdmin, updateUserRole);

module.exports = router;
