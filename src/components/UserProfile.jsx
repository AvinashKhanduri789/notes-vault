const UserProfile = ({ user }) => {
  return (
    <div className="flex items-center space-x-3 p-3 rounded-xl bg-gray-900/50 border border-gray-800">
      <img
        src={user.avatar}
        alt={user.email}
        className="w-10 h-10 rounded-full border-2 border-gray-700"
      />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-300 truncate">
          {user.email}
        </p>
        <p className="text-xs text-gray-500">
          Notes saved: {user.noteCount || '0'}
        </p>
      </div>
    </div>
  );
};

export default UserProfile;