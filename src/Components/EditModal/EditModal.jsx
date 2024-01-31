import React, { useState } from 'react';

const EditModal = ({ isOpen, onClose, initialSongName, onSave }) => {
  const [editedSongName, setEditedSongName] = useState(initialSongName || '');

  const handleInputChange = (e) => {
    setEditedSongName(e.target.value);
  };

  const handleSaveChanges = () => {
    onSave(editedSongName);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-md">
        <h2 className="text-2xl font-bold mb-4">Edit Song</h2>
        <label className="block mb-4">
          New Song Name:
          <input
            type="text"
            value={editedSongName}
            onChange={handleInputChange}
            className="mt-2 p-2 border border-gray-300 rounded-md w-full"
          />
        </label>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
          onClick={handleSaveChanges}
        >
          Save Changes
        </button>
        <button className="bg-gray-300 text-black px-4 py-2 rounded-md" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default EditModal;
