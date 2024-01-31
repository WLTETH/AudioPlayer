import React, { useState, useRef } from 'react';
import EditModal from '../EditModal/EditModal';
import './Audios.css';

const Audios = ({ name, songs, setSongs }) => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedSongIndex, setSelectedSongIndex] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const audioRef = useRef(null);

  const openEditModal = (index) => {
    setSelectedSongIndex(index);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedSongIndex(null);
    setEditModalOpen(false);
  };

  const handleSaveChanges = (editedSongName) => {
    if (selectedSongIndex !== null) {
      const updatedSongs = [...songs];
      updatedSongs[selectedSongIndex].title = editedSongName;

      setSongs(updatedSongs);
      closeEditModal();
    }
  };

  const handlePlay = (index) => {
    audioRef.current.src = `./Assets/Songs/${songs[index].filename}`;

    audioRef.current.addEventListener('canplaythrough', () => {
      audioRef.current.play();
    });

    setModalOpen(true);
    setSelectedSongIndex(index);
  };

  const closeModal = () => {
    setModalOpen(false);
    audioRef.current.pause();
  };

  return (
    <div className="grid grid-cols-3 gap-4 justify-center items-center pb-10">
      {songs.map((song, index) => (
        <div key={index} className="audio-card w-50 mx-1 my-2 bg-white/85 backdrop-blur-lg backdrop-filter-blur text-black p-10 pt-10 rounded-lg shadow-lg">
          <div className="flex flex-col justify-center items-center px-1">
            <h3 className="text-xl font-semibold">{song.title}</h3>
            <p>{song.owner}</p>
            <button
              className="mt-6 w-full bg-white text-purple-700 py-2 border border-purple-700 hover:border-indigo-700 rounded-md hover:bg-indigo-700 focus:outline-none hover:text-white"
              onClick={(e) => {
                e.stopPropagation();
                handlePlay(index);
              }}
            >
              Play
            </button>
            {song.owner === name && (
              <>
                <button
                  className="mt-2 w-full bg-white text-purple-700 py-2 border border-purple-700 hover:border-indigo-700 rounded-md hover:bg-indigo-700 focus:outline-none hover:text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    openEditModal(index);
                  }}
                >
                  Edit
                </button>
                <EditModal
                  isOpen={isEditModalOpen}
                  onClose={closeEditModal}
                  initialSongName={selectedSongIndex !== null ? songs[selectedSongIndex].title : ''}
                  onSave={handleSaveChanges}
                />
              </>
            )}
          </div>
        </div>
      ))}

      <audio ref={audioRef} controls style={{ display: 'none' }} />

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="bg-gray-800 bg-opacity-75 absolute inset-0" onClick={closeModal}></div>
          <div className="bg-white/85 p-8 rounded-lg z-10 mx-10 px-10">
            <h3 className="text-xl font-semibold">{songs[selectedSongIndex]?.title}</h3>
            <p>{songs[selectedSongIndex]?.owner}</p>
            <button className="mt-2 bg-red-400 text-white px-10 py-2 mr-10 rounded-md" onClick={closeModal}>
              Exit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Audios;
