import { useState } from 'react';
import { FiSave, FiX, FiTrash2 } from 'react-icons/fi';

const NoteEditor = ({ note, onSave, onCancel, onDelete, isCreating = false }) => {
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState(note?.tags || []);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setIsSaving(true);
    
    const noteData = {
      ...(note && { id: note.id }),
      title: title.trim(),
      content: content.trim(),
      tags
    };

    await onSave(noteData);
    setIsSaving(false);
  };

  const handleAddTag = () => {
    if (tag.trim() && !tags.includes(tag.trim())) {
      setTags([...tags, tag.trim()]);
      setTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.target.type !== 'textarea') {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="h-full flex flex-col p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-800">
        <h2 className="text-2xl font-bold text-white">
          {isCreating ? 'Create New Note' : 'Edit Note'}
        </h2>
        
        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-900/50 hover:bg-gray-800/50 border border-gray-800 rounded-lg flex items-center space-x-2 transition-all group"
          >
            <FiX className="text-gray-400 group-hover:text-white" />
            <span className="text-gray-300 group-hover:text-white">Cancel</span>
          </button>
          
          {!isCreating && onDelete && (
            <button
              type="button"
              onClick={onDelete}
              className="px-4 py-2 bg-red-900/20 hover:bg-red-800/30 border border-red-800/30 rounded-lg flex items-center space-x-2 transition-all group"
            >
              <FiTrash2 className="text-red-400" />
              <span className="text-red-300">Delete</span>
            </button>
          )}
          
          <button
            type="submit"
            disabled={isSaving || !title.trim() || !content.trim()}
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg flex items-center space-x-2 transition-all shadow-lg hover:shadow-purple-500/25"
          >
            <FiSave className="text-white" />
            <span className="text-white font-medium">
              {isSaving ? 'Saving...' : 'Save'}
            </span>
          </button>
        </div>
      </div>

      {/* Title Input */}
      <div className="mb-6">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note Title"
          className="w-full text-3xl font-bold bg-transparent border-none outline-none text-white placeholder-gray-600"
          autoFocus
        />
        <div className="h-px bg-gradient-to-r from-purple-500/50 to-blue-500/50 mt-2"></div>
      </div>

      {/* Tags */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map((tagItem) => (
            <span
              key={tagItem}
              className="px-3 py-1 bg-gray-800/50 text-gray-400 rounded-full text-sm border border-gray-700 flex items-center space-x-2"
            >
              {tagItem}
              <button
                type="button"
                onClick={() => handleRemoveTag(tagItem)}
                className="text-gray-500 hover:text-gray-300"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Content Editor */}
      <div className="flex-1 mb-6">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Start writing your note here..."
          className="w-full h-full bg-transparent border-none outline-none text-gray-300 placeholder-gray-600 resize-none text-lg leading-relaxed"
          rows="10"
        />
      </div>

      {/* Character Count */}
      <div className="pt-6 border-t border-gray-800">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <span>{content.length} characters</span>
            <span>{content.split(/\s+/).filter(Boolean).length} words</span>
          </div>
          <div className={`px-3 py-1 rounded-full ${
            content.length > 1000 
              ? 'bg-green-500/20 text-green-400' 
              : 'bg-gray-800 text-gray-400'
          }`}>
            {content.length > 1000 ? 'Detailed' : 'Brief'}
          </div>
        </div>
      </div>
    </form>
  );
};

export default NoteEditor;