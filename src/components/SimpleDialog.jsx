import React, { useEffect } from 'react';

const SimpleDialog = ({ 
  message, 
  type = 'info', // 'info' | 'success' | 'error' | 'warning'
  isVisible,
  onClose,
  autoCloseDuration = 3000, // in milliseconds, set to 0 for manual close only
  title = null
}) => {
  useEffect(() => {
    if (isVisible && autoCloseDuration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseDuration);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, autoCloseDuration, onClose]);

  if (!isVisible) return null;

  // Determine icon and colors based on type
  const getConfig = () => {
    switch (type) {
      case 'success':
        return {
          icon: '✓',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          textColor: 'text-green-800',
          iconColor: 'text-green-500'
        };
      case 'error':
        return {
          icon: '✕',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          textColor: 'text-red-800',
          iconColor: 'text-red-500'
        };
      case 'warning':
        return {
          icon: '⚠',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          textColor: 'text-yellow-800',
          iconColor: 'text-yellow-500'
        };
      default: // info
        return {
          icon: 'ℹ',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          textColor: 'text-blue-800',
          iconColor: 'text-blue-500'
        };
    }
  };

  const config = getConfig();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      
      {/* Dialog */}
      <div className={`relative ${config.bgColor} border ${config.borderColor} rounded-lg shadow-lg max-w-md w-full`}>
        <div className="p-4">
          <div className="flex items-start">
            {/* Icon */}
            <div className={`flex-shrink-0 w-6 h-6 ${config.iconColor} text-lg font-bold mr-3`}>
              {config.icon}
            </div>
            
            {/* Content */}
            <div className="flex-1">
              {title && (
                <h3 className={`text-sm font-semibold ${config.textColor} mb-1`}>
                  {title}
                </h3>
              )}
              <p className={`text-sm ${config.textColor}`}>
                {message}
              </p>
            </div>
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="flex-shrink-0 ml-3 text-gray-400 hover:text-gray-600"
              aria-label="Close"
            >
              ×
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleDialog;