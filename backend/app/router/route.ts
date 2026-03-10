import { Router } from "express";
import Controller from "../mvc/controller";

const router = Router();

router.get("/tasks", Controller.getAllTask);
router.post("/tasks", Controller.createTask);
router.put("/tasks/:id", Controller.updateTask);
router.delete("/tasks/:id", Controller.deleteTask);

export default router;
