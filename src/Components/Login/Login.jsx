import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Login = () => {
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const loginProcedure = (e) => {
        e.preventDefault();
        navigate(`/welcome?name=${name}`);

    };

    return (
        <body class="min-h-screen'">
            <div className="flex justify-center items-center pb-10">
                <div className="mt-10 w-96 mx-auto bg-white/90 backdrop-blur-lg backdrop-filter-blur text-black p-5 rounded-lg shadow-lg">
                    <form onSubmit={loginProcedure}>
                        <h1 className="text-3xl mb-6 text-center text-purple-700">Login</h1>

                        <div className="mb-6">
                            <input
                                type="text"
                                placeholder="Name"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-purple-700"
                            />
                        </div>

                        <div className="mb-6">
                            <input
                                type="password"
                                placeholder="Password"
                                required
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-purple-700"
                            />
                        </div>
                        
                        <div>
                            <button
                                type="submit"
                                className="w-full bg-white text-purple-700 py-2 border border-purple-700 hover:border-indigo-700 rounded-md hover:bg-indigo-700 focus:outline-none hover:text-white"
                            >
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </body>
    );
}

export default Login;