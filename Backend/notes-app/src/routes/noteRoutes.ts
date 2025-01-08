import express from "express";
import { authenticate } from "../middlewares/authMiddleware";
import { createNote, getNotes, deleteNote,updateNote } from "../controllers/noteController";

const router = express.Router();

router.post("/", authenticate, createNote);
router.get("/", authenticate, getNotes);
router.put("/:id", authenticate, updateNote);
router.delete("/:id", authenticate, deleteNote);

export default router;
