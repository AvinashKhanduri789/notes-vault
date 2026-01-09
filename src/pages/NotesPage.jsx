import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import NoteList from '../components/NoteList';
import NoteViewer from '../components/NoteViewer';
import NoteEditor from '../components/NoteEditor';
import Loading from '../components/Loading';
import { getNotes, createNote, updateNote, deleteNote, logout,supabase } from '../lib/supabase';
import SimpleDialog from '../components/SimpleDialog';

const NotesPage = () => {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  
  const [dialog, setDialog] = useState({
    isVisible: false,
    message: '',
    type: 'info'
  });

  const showDialog = (message, type = 'info') => {
    setDialog({
      isVisible: true,
      message,
      type
    });
  };

  const hideDialog = () => {
    setDialog({
      isVisible: false,
      message: '',
      type: 'info'
    });
  };

  useEffect(() => {
    fetchUser();
    fetchNotes();
  }, []);

  const fetchUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setUser({
        email: user.email,
        avatar: `https://ui-avatars.com/api/?name=${user.email?.charAt(0)}&background=6366f1&color=fff`
      });
    }
  };

  const fetchNotes = async () => {
    setIsLoading(true);
    const { data, error } = await getNotes();
    
    if (error) {
      showDialog('Failed to load notes', 'error');
    } else {
      const formattedNotes = data.map(note => ({
        id: note.id,
        title: note.title,
        content: note.content,
        createdAt: note.created_at,
        updatedAt: note.updated_at || note.created_at
      }));
      setNotes(formattedNotes);
    }
    setIsLoading(false);
  };

  const handleCreateNote = async (noteData) => {
    const { data, error } = await createNote(noteData.title, noteData.content);
    
    if (error) {
      showDialog('Failed to create note', 'error');
    } else {
      const newNote = {
        id: data.id,
        title: data.title,
        content: data.content,
        createdAt: data.created_at,
        updatedAt: data.updated_at || data.created_at
      };
      
      setNotes([newNote, ...notes]);
      setSelectedNote(newNote);
      setIsCreating(false);
      showDialog('Note created successfully', 'success');
    }
  };

  const handleUpdateNote = async (updatedNote) => {
    const { data, error } = await updateNote(updatedNote.id, updatedNote.title, updatedNote.content);
    
    if (error) {
      showDialog('Failed to update note', 'error');
    } else {
      const updatedNotes = notes.map(note => 
        note.id === updatedNote.id 
          ? {
              ...note,
              title: data.title,
              content: data.content,
              updatedAt: data.updated_at || data.created_at
            }
          : note
      );
      
      setNotes(updatedNotes);
      setSelectedNote({
        ...selectedNote,
        title: data.title,
        content: data.content,
        updatedAt: data.updated_at || data.created_at
      });
      setIsEditing(false);
      showDialog('Note updated successfully', 'success');
    }
  };

  const handleDeleteNote = async (noteId) => {
    if (!window.confirm('Are you sure you want to delete this note?')) return;
    
    const { error } = await deleteNote(noteId);
    
    if (error) {
      showDialog('Failed to delete note', 'error');
    } else {
      const updatedNotes = notes.filter(note => note.id !== noteId);
      setNotes(updatedNotes);
      
      if (selectedNote?.id === noteId) {
        setSelectedNote(null);
      }
      showDialog('Note deleted successfully', 'success');
    }
  };

  const handleSelectNote = (note) => {
    setSelectedNote(note);
    setIsEditing(false);
  };

  const handleLogout = async () => {
  const confirmed = window.confirm("Are you sure you want to logout?");
  if (!confirmed) return;

  const { error } = await logout();

  if (error) {
    showDialog("Failed to logout", "error");
  } else {
    showDialog("Logged out successfully", "success");
  }
};

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <Loading fullScreen={true} text="Loading your notes..." />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <Loading text="Loading user..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-gray-100">
      <div className="flex h-screen">
        <Sidebar
          user={user}
          onLogout={handleLogout}
          onCreateNote={() => {
            setIsCreating(true);
            setSelectedNote(null);
          }}
          onViewAllNotes={() => {
            setSelectedNote(null);
            setIsEditing(false);
            setIsCreating(false);
          }}
        />

        <div className="flex-1 flex flex-col">
          <header className="border-b border-gray-800 px-6 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                {isCreating ? 'Create New Note' : 
                 isEditing ? 'Edit Note' : 
                 selectedNote ? selectedNote.title : 'My Notes'}
              </h1>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-400 hidden md:inline">
                  {notes.length} note{notes.length !== 1 ? 's' : ''}
                </span>
              </div>
            </div>
          </header>

          <main className="flex-1 flex overflow-hidden">
            <div className={`${selectedNote || isCreating ? 'hidden md:block md:w-80' : 'w-full'} 
                            border-r border-gray-800 overflow-y-auto`}>
              <NoteList
                notes={notes}
                selectedNoteId={selectedNote?.id}
                onSelectNote={handleSelectNote}
              />
            </div>

            <div className={`flex-1 ${!selectedNote && !isCreating ? 'hidden md:block' : ''}`}>
              {isCreating ? (
                <NoteEditor
                  onSave={handleCreateNote}
                  onCancel={() => setIsCreating(false)}
                  isCreating={true}
                />
              ) : isEditing ? (
                <NoteEditor
                  note={selectedNote}
                  onSave={handleUpdateNote}
                  onCancel={() => setIsEditing(false)}
                  onDelete={() => handleDeleteNote(selectedNote.id)}
                />
              ) : selectedNote ? (
                <NoteViewer
                  note={selectedNote}
                  onEdit={() => setIsEditing(true)}
                  onDelete={() => handleDeleteNote(selectedNote.id)}
                />
              ) : (
                <div className="h-full flex items-center justify-center p-8">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl mb-6 border border-gray-800">
                      <span className="text-3xl">📝</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-300 mb-2">
                      Select a note or create a new one
                    </h3>
                    <p className="text-gray-500 max-w-md">
                      Your notes are private and secure. Click on a note to view it, 
                      or create a new one to capture your thoughts.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      <SimpleDialog
        isVisible={dialog.isVisible}
        message={dialog.message}
        type={dialog.type}
        onClose={hideDialog}
        autoCloseDuration={3000}
      />
    </div>
  );
};

export default NotesPage;