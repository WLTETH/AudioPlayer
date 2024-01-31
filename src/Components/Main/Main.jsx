import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Audios from '../Audios/Audios';
import CreateModal from '../CreateModal/CreateModal';

const Main = () => {
    const location = useLocation();
    const name = new URLSearchParams(location.search).get('name');

    const [isCreateModalOpen, setCreateModalOpen] = useState(false);
    const [songs, setSongs] = useState(() => {
        const storedSongs = localStorage.getItem('songs');
        return storedSongs ? JSON.parse(storedSongs) : [
            { title: 'Nkalakatha', owner: 'Mandoza', filename: 'nkalakatha.mp3' },
            { title: 'Love is a Long Road', owner: 'Tom Petty', filename: 'loveisalongroad.mp3' },
            { title: 'Feather', owner: 'Sabrina Carpenter', filename: 'feather.mp3' },
            { title: 'Bellyache', owner: 'Billie Eilish', filename: 'bellyache.mp3' },
            { title: 'Circles', owner: 'Post Malone', filename: 'circles.mp3' },
            { title: 'Cruel Summer', owner: 'Taylor Swift', filename: 'cruelsummer.mp3' },
        ];
    });

    useEffect(() => {
        localStorage.setItem('songs', JSON.stringify(songs));
    }, [songs]);

    const openCreateModal = () => {
        setCreateModalOpen(true);
    };

    const closeCreateModal = () => {
        setCreateModalOpen(false);
    };

    const handleUpload = (uploadedData) => {
        const newSong = {
            title: uploadedData.songName,
            owner: uploadedData.owner,
            filename: uploadedData.filename,
        };

        setSongs([...songs, newSong]);
        closeCreateModal();
    };

    return (
        <body className="min-h-screen">
            <div className="flex justify-center items-center pb-10">
                <div className="mt-10 w-96 mx-auto bg-white/85 backdrop-blur-lg backdrop-filter-blur text-black p-7 pt-10 rounded-lg shadow-lg">
                    <h1 className="text-3xl mb-5 text-center">Welcome, {name}!</h1>
                    <div className="flex justify-center">
                        <button
                            className="mt-1 w-full bg-white text-purple-700 py-2 border border-purple-700 hover:border-indigo-700 rounded-md hover:bg-indigo-700 focus:outline-none hover:text-white"
                            onClick={openCreateModal}
                        >
                            Upload Song
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex justify-center items-center pb-10">
                <Audios name={name} songs={songs} setSongs={setSongs} />
            </div>

            <CreateModal
                isOpen={isCreateModalOpen}
                onClose={closeCreateModal}
                onUpload={handleUpload}
                owner={name}
            />
        </body>
    );
};

export default Main;
