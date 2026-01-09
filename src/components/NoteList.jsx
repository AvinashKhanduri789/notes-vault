import { FiClock, FiEdit } from 'react-icons/fi';
import NoteItem from './NoteItem';

const NoteList = ({ notes, selectedNoteId, onSelectNote }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  if (notes.length === 0) {
    return (
      <div className="h-full flex items-center justify-center p-6">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-900/50 rounded-2xl mb-4 border border-gray-800">
            <FiEdit className="text-2xl text-gray-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-400 mb-2">
            No notes yet
          </h3>
          <p className="text-sm text-gray-600">
            Create your first note to get started
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4 px-2">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
          Recent Notes
        </h2>
        <span className="text-xs text-gray-600">
          {notes.length} total
        </span>
      </div>
      
      <div className="space-y-2">
        {notes.map((note) => (
          <NoteItem
            key={note.id}
            note={note}
            isSelected={selectedNoteId === note.id}
            onSelect={() => onSelectNote(note)}
            formatDate={formatDate}
          />
        ))}
      </div>
    </div>
  );
};

export default NoteList;