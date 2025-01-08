import express from "express";
import { authenticate } from "../middlewares/authMiddleware";
import { createNote, getNotes, deleteNote,updateNote,getUser } from "../controllers/noteController";

const router = express.Router();

router.post("/", authenticate, createNote);
router.get("/", authenticate, getNotes);
router.get("/getuser", authenticate, getUser);
router.put("/:id", authenticate, updateNote);
router.delete("/:id", authenticate, deleteNote);

export default router;
