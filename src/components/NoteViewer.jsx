import { FiEdit, FiTrash2, FiClock, FiCalendar } from 'react-icons/fi';

const NoteViewer = ({ note, onEdit, onDelete }) => {
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="h-full flex flex-col p-6">
      {/* Header with Actions */}
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-800">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">{note.title}</h2>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <FiCalendar className="text-xs" />
              <span>Created: {formatDateTime(note.createdAt)}</span>
            </div>
            {note.updatedAt !== note.createdAt && (
              <div className="flex items-center space-x-1">
                <FiClock className="text-xs" />
                <span>Updated: {formatDateTime(note.updatedAt)}</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={onEdit}
            className="px-4 py-2 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 border border-gray-700 rounded-lg flex items-center space-x-2 transition-all group"
          >
            <FiEdit className="text-gray-400 group-hover:text-purple-400" />
            <span className="text-gray-300 group-hover:text-white">Edit</span>
          </button>
          
          <button
            onClick={onDelete}
            className="px-4 py-2 bg-gradient-to-r from-gray-900 to-gray-800 hover:from-red-900/30 hover:to-red-800/30 border border-gray-800 hover:border-red-500/50 rounded-lg flex items-center space-x-2 transition-all group"
          >
            <FiTrash2 className="text-gray-400 group-hover:text-red-400" />
            <span className="text-gray-300 group-hover:text-red-300">Delete</span>
          </button>
        </div>
      </div>

      {/* Note Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="prose prose-invert max-w-none">
          <div className="whitespace-pre-wrap text-gray-300 leading-relaxed">
            {note.content}
          </div>
        </div>
      </div>

      {/* Tags */}
      {note.tags && note.tags.length > 0 && (
        <div className="mt-8 pt-6 border-t border-gray-800">
          <div className="flex flex-wrap gap-2">
            {note.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-800/50 text-gray-400 rounded-full text-sm border border-gray-700"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NoteViewer;