import { FiClock } from "react-icons/fi";
const NoteItem = ({ note, isSelected, onSelect, formatDate }) => {
  const preview = note.content.length > 100 
    ? note.content.substring(0, 100) + '...' 
    : note.content;

  return (
    <div
      onClick={onSelect}
      className={`p-4 rounded-xl cursor-pointer transition-all group border ${
        isSelected 
          ? 'bg-gradient-to-r from-gray-800/50 to-gray-900/50 border-purple-500/30 shadow-lg shadow-purple-500/10' 
          : 'bg-gray-900/30 border-gray-800 hover:border-gray-700 hover:bg-gray-800/30'
      }`}
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className={`font-semibold ${
          isSelected ? 'text-white' : 'text-gray-300 group-hover:text-white'
        }`}>
          {note.title}
        </h3>
        {note.updatedAt !== note.createdAt && (
          <span className="text-xs px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full">
            Edited
          </span>
        )}
      </div>
      
      <p className={`text-sm mb-3 ${
        isSelected ? 'text-gray-400' : 'text-gray-500 group-hover:text-gray-400'
      }`}>
        {preview}
      </p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <FiClock className={`text-xs ${
            isSelected ? 'text-gray-500' : 'text-gray-600 group-hover:text-gray-500'
          }`} />
          <span className={`text-xs ${
            isSelected ? 'text-gray-500' : 'text-gray-600 group-hover:text-gray-500'
          }`}>
            {formatDate(note.updatedAt)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default NoteItem