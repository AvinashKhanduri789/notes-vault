import { useState } from 'react';
import { FiSave, FiX, FiTrash2, FiArrowLeft } from 'react-icons/fi';

const NoteEditor = ({ note, onSave, onCancel, onDelete, isCreating = false }) => {
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setIsSaving(true);
    
    const noteData = {
      ...(note && { id: note.id }),
      title: title.trim(),
      content: content.trim(),
    };

    await onSave(noteData);
    setIsSaving(false);
  };

  return (
    <form onSubmit={handleSubmit} className="h-full flex flex-col">
      {/* Mobile Header */}
      <div className="md:hidden sticky top-0 z-20 bg-gray-900 border-b border-gray-800">
        <div className="flex items-center px-4 py-3">
          <button
            type="button"
            onClick={onCancel}
            className="p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 flex items-center space-x-2"
          >
            <FiArrowLeft className="text-gray-300" />
            <span className="text-gray-300 text-sm">Back</span>
          </button>
          <div className="ml-4">
            <h2 className="text-lg font-semibold text-white">
              {isCreating ? 'New Note' : 'Edit Note'}
            </h2>
          </div>
        </div>
      </div>

      {/* Desktop Header - Only title */}
      <div className="hidden md:block border-b border-gray-800 p-6">
        <h2 className="text-2xl font-bold text-white">
          {isCreating ? 'Create New Note' : 'Edit Note'}
        </h2>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto px-4 md:px-6 pb-24 md:pb-32">
        {/* Title Input */}
        <div className="pt-3 md:pt-6">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note Title"
            className="w-full text-xl md:text-3xl font-bold bg-transparent border-none outline-none text-white placeholder-gray-600"
            autoFocus={!isCreating}
          />
          <div className="h-px bg-gradient-to-r from-purple-500/50 to-blue-500/50 mt-2"></div>
        </div>

        {/* Text Editor */}
        <div className="mt-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Start writing your note here..."
            className="w-full min-h-[300px] md:min-h-[400px] bg-transparent border-none outline-none text-gray-300 placeholder-gray-600 resize-none text-base md:text-lg leading-relaxed"
            autoFocus={isCreating}
          />
        </div>

        {/* Character Count */}
        <div className="mt-6 pt-4 border-t border-gray-800">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-4">
              <span className="text-xs md:text-sm">{content.length} chars</span>
              <span className="text-xs md:text-sm">{content.split(/\s+/).filter(Boolean).length} words</span>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs md:text-sm ${
              content.length > 1000 
                ? 'bg-green-500/20 text-green-400' 
                : 'bg-gray-800 text-gray-400'
            }`}>
              {content.length > 1000 ? 'Detailed' : 'Brief'}
            </div>
          </div>
        </div>
      </div>

      {/* Action Bar - Fixed Bottom for ALL screens */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900 border-t border-gray-800 shadow-lg">
        <div className="p-4 md:p-6">
          {isCreating ? (
            // Create Mode: Cancel + Save (Both mobile and desktop)
            <div className="flex gap-3 md:gap-4 justify-end">
              <button
                type="button"
                onClick={onCancel}
                className="px-5 md:px-6 py-3 md:py-3.5 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center space-x-2 transition-all active:scale-95"
              >
                <FiX className="text-gray-300" size={18} />
                <span className="text-gray-300 text-sm md:text-base font-medium">Cancel</span>
              </button>
              
              <button
                type="submit"
                disabled={isSaving || !title.trim() || !content.trim()}
                className="px-5 md:px-6 py-3 md:py-3.5 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg flex items-center justify-center space-x-2 transition-all active:scale-95"
              >
                <FiSave className="text-white" size={18} />
                <span className="text-white text-sm md:text-base font-medium">
                  {isSaving ? 'Saving...' : 'Save'}
                </span>
              </button>
            </div>
          ) : (
            // Edit Mode: Delete + Cancel + Save (Both mobile and desktop)
            <div className="flex gap-3 md:gap-4 justify-end">
              <button
                type="button"
                onClick={onDelete}
                className="px-5 md:px-6 py-3 md:py-3.5 bg-red-900/90 hover:bg-red-800 rounded-lg flex items-center justify-center space-x-2 transition-all active:scale-95"
              >
                <FiTrash2 className="text-white" size={18} />
                <span className="text-white text-sm md:text-base font-medium">Delete</span>
              </button>
              
              <button
                type="button"
                onClick={onCancel}
                className="px-5 md:px-6 py-3 md:py-3.5 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center space-x-2 transition-all active:scale-95"
              >
                <FiX className="text-gray-300" size={18} />
                <span className="text-gray-300 text-sm md:text-base font-medium">Cancel</span>
              </button>
              
              <button
                type="submit"
                disabled={isSaving || !title.trim() || !content.trim()}
                className="px-5 md:px-6 py-3 md:py-3.5 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg flex items-center justify-center space-x-2 transition-all active:scale-95"
              >
                <FiSave className="text-white" size={18} />
                <span className="text-white text-sm md:text-base font-medium">
                  {isSaving ? 'Saving...' : 'Save'}
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </form>
  );
};

export default NoteEditor;