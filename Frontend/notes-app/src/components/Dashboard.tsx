import { useState, useEffect } from "react";
import {
  createNote,
  fetchNotes,
  updateNote,
  deleteNote,
} from "../services/api";

interface Note {
  _id: string;
  title: string;
  content: string;
}
const Dashboard = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const loadNotes = async () => {
    try {
      const response = await fetchNotes();
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const handleSaveNote = async () => {
    if (editingId) {
      await updateNote(editingId, title, content);
      setEditingId(null);
    } else {
      await createNote(title, content);
    }
    setTitle("");
    setContent("");
    loadNotes();
  };

  const handleEdit = (note: Note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditingId(note._id);
  };

  const handleDelete = async (id: string) => {
    await deleteNote(id);
    loadNotes();
  };

  useEffect(() => {
    loadNotes();
  }, []);
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Notes Dashboard</h1>
      <div className="container">
        {}
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Title"
          className="p-2 border rounded mb-2 w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          className="p-2 border rounded w-full"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
          onClick={handleSaveNote}
        >
          {editingId ? "Update Note" : "Add Note"}
        </button>
      </div>

      <div>
        {notes.map((note) => (
          <div
            key={note._id}
            className="p-4 border rounded mb-2 bg-gray-100 flex justify-between"
          >
            <div>
              <h2 className="font-bold">{note.title}</h2>
              <p>{note.content}</p>
            </div>
            <div>
              <button
                className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                onClick={() => handleEdit(note)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded"
                onClick={() => handleDelete(note._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
