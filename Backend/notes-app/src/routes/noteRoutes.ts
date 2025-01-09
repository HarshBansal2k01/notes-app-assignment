import express from "express";
import { authenticate } from "../middlewares/authMiddleware";
import { createNote, getNotes, deleteNote,getUser } from "../controllers/noteController";

const router = express.Router();

router.post("/", authenticate, createNote);
router.get("/", authenticate, getNotes);
router.get("/getuser", authenticate, getUser);
router.delete("/:id", authenticate, deleteNote);

export default router;
