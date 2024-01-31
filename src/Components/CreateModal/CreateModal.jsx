import React, { useState } from 'react';
import axios from 'axios';

const CreateModal = ({ isOpen, onClose, onUpload, owner }) => {
  const [songName, setSongName] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSongNameChange = (e) => {
    setSongName(e.target.value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    onUpload({
      songName,
      owner,
      filename: selectedFile ? selectedFile.name : null,
    });
    setSongName('');

    if (selectedFile) {
      const formData = new FormData();
      formData.append('songFile', selectedFile);

      try {
        await axios.post('http://localhost:3001/upload', formData);
        console.log('File uploaded successfully');
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-purple-700">Create Song</h2>

        <label className="block mb-4">
          Song Name:
          <input
            type="text"
            value={songName}
            onChange={handleSongNameChange}
            className="mt-2 p-2 border border-purple-700 rounded-md w-full focus:outline-none focus:border-indigo-700"
          />
        </label>

        <label className="block mb-4">
          Artist:
          <input
            type="text"
            value={owner}
            readOnly
            className="mt-2 p-2 border border-purple-700 rounded-md w-full bg-gray-100 focus:outline-none"
          />
        </label>

        <label className="block mb-4">
          Upload Song:
          <input
            type="file"
            onChange={handleFileChange}
            className="mt-2 p-2 border border-purple-700 rounded-md w-full focus:outline-none"
          />
        </label>

        <button
          className="w-full bg-white text-purple-700 py-2 border border-purple-700 hover:border-indigo-700 rounded-md hover:bg-indigo-700 focus:outline-none hover:text-white"
          onClick={handleUpload}
        >
          Upload
        </button>

        <button
          className="w-full mt-2 bg-gray-300 text-black py-2 border border-gray-300 rounded-md hover:border-gray-400 hover:bg-gray-400 focus:outline-none"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CreateModal;
