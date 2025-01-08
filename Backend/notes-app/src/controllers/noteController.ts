import { Request, Response } from "express";
import Note, { INote } from "../models/note";
import User from "../models/user";

export const createNote = async (req: Request, res: Response) => {
  const { title, content } = req.body;
  const userId = (req as any).user.id;

  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required" });
  }

  try {
    const note: INote = new Note({
      userId,
      title,
      content,
    });

    await note.save();
    res.status(201).json({ message: "Note created successfully", note });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";

    res
      .status(500)
      .json({ message: "Error creating note", error: errorMessage });
  }
};

export const getNotes = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;

  try {
    const notes = await Note.find({ userId });
    res.status(200).json(notes);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";

    res
      .status(500)
      .json({ message: "Error fetching notes", error: errorMessage });
  }
};

export const getUser = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";

    res
      .status(500)
      .json({ message: "Error fetching user", error: errorMessage });
  }
};
export const updateNote = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json(updatedNote);
  } catch (error) {
    res.status(500).json({ message: "Error updating note", error });
  }
};
export const deleteNote = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = (req as any).user.id;

  try {
    const note = await Note.findOneAndDelete({ _id: id, userId });

    if (!note) {
      return res
        .status(404)
        .json({ message: "Note not found or unauthorized" });
    }

    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";

    res
      .status(500)
      .json({ message: "Error deleting note", error: errorMessage });
  }
};
