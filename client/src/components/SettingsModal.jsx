import { useState } from "react";

const SettingsModal = ({ field, currentValue, onClose, onSubmit, isLoading }) => {
  const [inputValue, setInputValue] = useState(currentValue || "");

  const handleSave = () => {
    if (inputValue.trim() !== currentValue) {
      onSubmit(field, inputValue.trim());
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-xs bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-80 space-y-4 shadow-lg">
        <h2 className="text-xl font-semibold capitalize">Update {field}</h2>
        <input
          type="text"
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <div className="flex justify-end space-x-2">
          <button
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 cursor-pointer"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded bg-teal-600 cursor-pointer text-white hover:bg-teal-700"
            onClick={handleSave}
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;