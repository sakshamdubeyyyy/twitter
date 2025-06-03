import React from 'react';
import logo from "../assets/logo.jpg"

const SideBar = ({ selectedButton, setSelectedButton, onLogout }) => {
    const buttons = ["Feeds", "Your Profile", "Make Post", "Settings"];

    return (
        <div className="w-1/5 min-w-[200px] h-screen bg-teal-50 shadow-lg p-4 flex flex-col justify-between">
            <div>
                <div className="flex items-center gap-2 mb-6">
                    <img src={logo} alt="Logo" className="w-32 h-10 object-contain cursor-pointer" />
                </div>
                {buttons.map((button, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedButton(button)}
                        className={`w-full cursor-pointer text-left px-4 py-2 my-1 rounded-lg transition-all duration-200 font-medium
            ${selectedButton === button ? 'bg-green-200 text-teal-900' : 'hover:bg-green-100 text-gray-800'}`}
                    >
                        {button}
                    </button>
                ))}
            </div>
            <button
                onClick={onLogout}
                className="w-full text-left px-4 py-2 mt-4 rounded-lg text-red-600 hover:bg-red-50 transition-all duration-200 font-medium"
            >
                🚪 Logout
            </button>
        </div>
    );
};

export default SideBar;
