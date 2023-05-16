import express from "express";
import { deleteTask, getMyTasks, newtask, updateTask } from "../controllers/task.js";
import { isAuthenticated } from "../middlewares/auth.js"

const router = express.Router();

router.get("/my", isAuthenticated, getMyTasks)

router.post("/new", isAuthenticated, newtask);

router.route("/:id").put(isAuthenticated, updateTask).delete(isAuthenticated, deleteTask);


export default router;