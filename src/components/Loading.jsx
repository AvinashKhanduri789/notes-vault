import React from 'react';

const Loading = ({
  type = 'spinner', // 'spinner' | 'skeleton' | 'dots'
  size = 'medium', // 'small' | 'medium' | 'large'
  text = 'Loading...',
  showText = true,
  fullScreen = false,
  lines = 3,
}) => {
  const sizeClasses = {
    small: { container: 'w-4 h-4', text: 'text-xs', skeleton: 'h-3' },
    medium: { container: 'w-8 h-8', text: 'text-sm', skeleton: 'h-4' },
    large: { container: 'w-12 h-12', text: 'text-base', skeleton: 'h-5' }
  };

  const renderLoader = () => {
    const { container, skeleton } = sizeClasses[size];

    switch (type) {
      case 'dots':
        return (
          <div className={`${container} flex items-center justify-center space-x-1`}>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        );

      case 'skeleton':
        return (
          <div className="space-y-3 w-full max-w-md">
            {[...Array(lines)].map((_, i) => (
              <div
                key={i}
                className={`${skeleton} bg-gray-700 rounded animate-pulse`}
                style={{ 
                  width: `${100 - (i * 10)}%`,
                  animationDelay: `${i * 0.1}s`
                }}
              />
            ))}
          </div>
        );

      case 'spinner':
      default:
        return (
          <div className={`${container} relative`}>
            <div className="absolute inset-0 border-2 border-gray-700 rounded-full"></div>
            <div className="absolute inset-0 border-2 border-transparent border-t-white rounded-full animate-spin"></div>
          </div>
        );
    }
  };

  const content = (
    <div className="flex flex-col items-center justify-center space-y-3">
      {renderLoader()}
      {showText && type !== 'skeleton' && (
        <p className={`${sizeClasses[size].text} text-gray-400 font-medium`}>
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-gray-900 z-50 flex items-center justify-center">
        {content}
      </div>
    );
  }

  return content;
};

// Skeleton components for common UI patterns
export const CardSkeleton = ({ count = 1 }) => {
  return (
    <div className="space-y-4">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="p-4 border border-gray-800 rounded-lg bg-gray-900">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-gray-700 rounded-full animate-pulse"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-700 rounded w-3/4 animate-pulse"></div>
              <div className="h-3 bg-gray-700 rounded w-1/2 animate-pulse"></div>
              <div className="h-3 bg-gray-700 rounded w-full animate-pulse"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const NoteSkeleton = ({ count = 3 }) => {
  return (
    <div className="space-y-3 p-4">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="h-4 bg-gray-700 rounded mb-2 w-2/3"></div>
          <div className="space-y-1">
            <div className="h-3 bg-gray-700 rounded w-full"></div>
            <div className="h-3 bg-gray-700 rounded w-5/6"></div>
            <div className="h-3 bg-gray-700 rounded w-4/6"></div>
          </div>
          <div className="flex items-center justify-between mt-2">
            <div className="h-2 bg-gray-700 rounded w-16"></div>
            <div className="h-2 bg-gray-700 rounded w-12"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const EditorSkeleton = () => {
  return (
    <div className="p-6 space-y-4 animate-pulse">
      <div className="h-8 bg-gray-700 rounded w-3/4"></div>
      <div className="h-4 bg-gray-700 rounded w-1/3"></div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-700 rounded w-5/6"></div>
        <div className="h-4 bg-gray-700 rounded w-4/6"></div>
        <div className="h-4 bg-gray-700 rounded w-full"></div>
      </div>
    </div>
  );
};

export default Loading;