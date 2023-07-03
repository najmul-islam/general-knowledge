const router = require("express").Router();
const {
  registerUser,
  loginUser,
  profile,
  getAllUser,
  updateUserRole,
} = require("../controllers/userController");

const { isAuth, isAdmin } = require("../middlewares/authMiddleware");

router.post("/user/register", registerUser);
router.post("/user/login", loginUser);
router.get("/user/profile", isAuth, profile);
router.get("/user", isAuth, isAdmin, getAllUser);
router.put("/user", isAuth, isAdmin, updateUserRole);

module.exports = router;
