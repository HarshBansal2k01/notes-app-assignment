import { useState, useEffect } from "react";
import {
  createNote,
  fetchNotes,
  updateNote,
  deleteNote,
  fetchUser,
} from "../services/api";
import DashboardModal from "./DashboardModal";

interface Note {
  _id: string;
  title: string;
  content: string;
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
      console.log(response.data);
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

  useEffect(() => {
    loadNotes();
    loadUser();
  }, []);
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Notes Dashboard</h1>
      <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 mb-3">
        <>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black">
            {`Welcome, ${name} !`}
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            {`Email: ${email}`}
          </p>
        </>
      </div>

      <div className="mb-4">
        {/* <input
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
        ></textarea> */}
        {/* <button
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
          onClick={handleSaveNote}
        >
          {editingId ? "Update Note" : "Add Note"}
        </button> */}
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
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
