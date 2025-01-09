import { useState, useEffect } from "react";
import {
  createNote,
  fetchNotes,
  updateNote,
  deleteNote,
  fetchUser,
} from "../services/api";
import DashboardModal from "./DashboardModal";
import ListModal from "./ListModal";

interface Note {
  _id: string;
  title: string;
  content: string;
  completed: boolean;
}

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const loadNotes = async () => {
    try {
      const response = await fetchNotes();
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };
  const loadUser = async () => {
    try {
      const response = await fetchUser();

      setName(response.data.name);
      setEmail(response.data.email);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const handleSaveNote = async () => {
    if (!title || !content) {
      alert("Title and content are mandatory!");
      return;
    }
    try {
      if (editingId) {
        await updateNote(editingId, title, content);
        setEditingId(null);
      } else {
        await createNote(title, content);
      }
      setTitle("");
      setContent("");
      setIsModalOpen(false);
      loadNotes();
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  const handleEdit = (note: Note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditingId(note._id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteNote(id);
      loadNotes();
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };
  const handleToggleComplete = (id: string) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note._id === id ? { ...note, completed: !note.completed } : note
      )
    );
  };

  useEffect(() => {
    loadNotes();
    loadUser();
  }, []);
  useEffect(() => {
    loadNotes();
    loadUser();
  }, []);
  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-4 bg-gray-100">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center">
        Notes Dashboard
      </h1>
      <div className="block w-full max-w-md p-6 bg-white border border-gray-200 rounded-lg shadow mb-6">
        <h5 className="mb-2 text-xl md:text-2xl font-bold tracking-tight text-gray-900">
          {`Welcome, ${name}!`}
        </h5>
        <p className="font-normal text-gray-700">{`Email: ${email}`}</p>
      </div>

      <div className="w-full max-w-md">
        <button
          className="bg-blue-500 w-full text-white px-4 py-2 rounded mb-4 hover:bg-blue-600 transition"
          onClick={() => {
            setTitle("");
            setContent("");
            setEditingId(null);
            setIsModalOpen(true);
          }}
        >
          Add Note
        </button>
      </div>

      {isModalOpen && (
        <DashboardModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={title}
          content={content}
          onTitleChange={(value) => setTitle(value)}
          onContentChange={(value) => setContent(value)}
          onSave={handleSaveNote}
        />
      )}

      <div className="w-96">
        <ListModal
          notes={notes}
          onDelete={handleDelete}
          onUpdate={(id) => handleEdit(notes.find((note) => note._id === id)!)}
          onToggleComplete={handleToggleComplete}
        />
      </div>
    </div>
  );
};

export default Dashboard;
