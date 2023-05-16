import express from "express";
import {
  //   deleteUser,
  getAllUsers,
  getMyProfile,
  //   getUserById,
  login,
  logout,
  register,
  //   specialfunc,
  //   updateUser,
} from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/all", getAllUsers);

router.get("/me", isAuthenticated, getMyProfile);

router.get("/logout", logout);

router.post("/new", register);

router.post("/login", login);


// router.get("/special", specialfunc);

// router
//     .route("/userid/:id")
//     .get(getUserById)
//     .put(updateUser)
//     .delete(deleteUser);

// router.get("/userid/:id", getUserById);

// router.put("/userid/:id", updateUser);

// router.delete("/userid/:id", deleteUser);

export default router;
