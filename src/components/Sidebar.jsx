import { FiPlus, FiLogOut, FiHome } from 'react-icons/fi';

const Sidebar = ({ user, onLogout, onCreateNote, onViewAllNotes }) => {
  return (
    <aside className="w-16 md:w-20 border-r border-gray-800 flex flex-col items-center py-6 space-y-8">
      {/* User Avatar */}
      <div className="group relative">
        <img
          src={user.avatar}
          alt={user.email}
          className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-gray-800 hover:border-purple-500 transition-colors cursor-pointer"
        />
        <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 bg-gray-900 px-3 py-2 rounded-lg border border-gray-800 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
          <p className="text-sm text-gray-300">{user.email}</p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 flex flex-col items-center space-y-6">
        <button
          onClick={onViewAllNotes}
          className="p-3 rounded-xl bg-gray-900/50 hover:bg-gray-800/50 border border-gray-800 hover:border-gray-700 transition-all group"
          title="All Notes"
        >
          <FiHome className="text-xl text-gray-400 group-hover:text-purple-400" />
        </button>

        <button
          onClick={onCreateNote}
          className="p-3 rounded-xl bg-gradient-to-br from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 shadow-lg hover:shadow-purple-500/25 transition-all group"
          title="New Note"
        >
          <FiPlus className="text-xl text-white" />
        </button>
      </div>

      {/* Logout */}
      <button
        onClick={onLogout}
        className="p-3 rounded-xl bg-gray-900/50 hover:bg-gray-800/50 border border-gray-800 hover:border-red-500/50 transition-all group"
        title="Logout"
      >
        <FiLogOut className="text-xl text-gray-400 group-hover:text-red-400" />
      </button>
    </aside>
  );
};

export default Sidebar;