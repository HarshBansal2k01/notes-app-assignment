import React, { useState } from "react";

interface DashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  onTitleChange: (value: string) => void;
  onSave: () => void;
  message: string;
}

const DashboardModal: React.FC<DashboardModalProps> = ({
  isOpen,
  onClose,
  title,
  onTitleChange,
  onSave,
  message,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Add Note</h2>
        <div>
          <label className="block mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            className="w-full p-2 border rounded mb-4"
            required
          />
        </div>

        <div className="flex justify-end">
          <button
            className="bg-gray-300 text-black px-4 py-2 rounded mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={onSave}
          >
            Save
          </button>
        </div>
      {message && (
        <p className="mt-4 text-red-500 text-sm font-medium bg-red-100 p-3 rounded">
          {message}
        </p>
      )}
      </div>
    </div>
  );
};

export default DashboardModal;
