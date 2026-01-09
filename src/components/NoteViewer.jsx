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
    <div className="h-full flex flex-col">
      {/* Desktop Header */}
      <div className="hidden md:flex items-center justify-between p-6 pb-6 border-b border-gray-800">
        <div className="flex-1">
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
        
        <div className="flex items-center space-x-3 ml-6">
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

      {/* Mobile Header */}
      <div className="md:hidden sticky top-0 z-10 bg-gray-900 border-b border-gray-800 p-4">
        <div className="mb-3">
          <h2 className="text-xl font-bold text-white truncate">{note.title}</h2>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-500">
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <FiCalendar className="text-xs" />
                <span>{formatDateTime(note.createdAt)}</span>
              </div>
              {note.updatedAt !== note.createdAt && (
                <div className="flex items-center space-x-1">
                  <FiClock className="text-xs ml-2" />
                  <span>{formatDateTime(note.updatedAt)}</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={onEdit}
              className="p-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-all"
            >
              <FiEdit className="text-gray-300" />
            </button>
            
            <button
              onClick={onDelete}
              className="p-2 bg-gray-800 hover:bg-red-800/30 border border-gray-700 hover:border-red-500/50 rounded-lg transition-all"
            >
              <FiTrash2 className="text-gray-300" />
            </button>
          </div>
        </div>
      </div>

      {/* Note Content */}
      <div className="flex-1 overflow-y-auto px-4 md:px-6 py-4 md:py-6">
        <div className="prose prose-invert max-w-none">
          <div className="whitespace-pre-wrap text-gray-300 leading-relaxed text-base md:text-lg">
            {note.content}
          </div>
        </div>
      </div>

      {/* Tags */}
      {note.tags && note.tags.length > 0 && (
        <div className="px-4 md:px-6 py-4 md:py-6 border-t border-gray-800">
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

      {/* Mobile Bottom Action Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-20 bg-gray-900 border-t border-gray-800 p-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onEdit}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 border border-gray-700 rounded-lg flex items-center justify-center space-x-2 transition-all"
          >
            <FiEdit className="text-gray-400" />
            <span className="text-gray-300 text-sm font-medium">Edit</span>
          </button>
          
          <button
            onClick={onDelete}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-gray-900 to-gray-800 hover:from-red-900/30 hover:to-red-800/30 border border-gray-800 hover:border-red-500/50 rounded-lg flex items-center justify-center space-x-2 transition-all"
          >
            <FiTrash2 className="text-gray-400" />
            <span className="text-gray-300 text-sm font-medium">Delete</span>
          </button>
        </div>
      </div>

      {/* Padding for mobile bottom bar */}
      <div className="md:hidden h-20"></div>
    </div>
  );
};

export default NoteViewer;