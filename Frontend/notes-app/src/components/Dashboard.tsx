import { useState, useEffect } from "react";
import { createNote, fetchNotes, deleteNote, fetchUser } from "../services/api";
import DashboardModal from "./DashboardModal";
import ListModal from "./ListModal";
import logo from "../assets/logo.svg";
import { useNavigate } from "react-router-dom";
import { LocalDining } from "@mui/icons-material";

interface Note {
  _id: string;
  title: string;
}

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate();
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
    if (!title) {
      setMessage("Please Enter Your Note");
      return;
    }
    setLoading(true)
    try {
      await createNote(title, content);

      setTitle("");
      setContent("");
      setIsModalOpen(false);
      loadNotes();
    } catch (error) {
      console.error("Error saving note:", error);
      setMessage("Failed to save the note. Please try again.");
    }finally{
      setLoading(false)
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteNote(id);
      loadNotes();
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/");
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
    <>
      <div className="flex justify-between items-center mt-3 p-2 lg:p-4 ml-2 mr-3">
        <div className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="h-8 w-8" />
          <div className="text-md sm:text-lg lg:text-2xl font-bold">
            DASHBOARD
          </div>
        </div>
        <p
          className="text-sm sm:text-base text-blue-600 font-bold underline cursor-pointer"
          onClick={handleLogout}
        >
          Sign Out
        </p>
      </div>

      <div className="flex flex-col items-center justify-start min-h-screen p-4 ">
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
              setIsModalOpen(true);
            }}
          >
            Create Note
          </button>
        </div>

        {isModalOpen && (
          <DashboardModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title={title}
            onTitleChange={(value) => setTitle(value)}
            onSave={handleSaveNote}
            message={message}
            loading = {loading}
          />
        )}

        <div className="w-96">
          <ListModal notes={notes} onDelete={handleDelete} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
