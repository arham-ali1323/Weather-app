import React from 'react';
import PropTypes from 'prop-types';

const StateMessage = ({ type, message, children }) => {
  const getIcon = () => {
    switch (type) {
      case 'loading':
        return (
          <svg className="animate-spin h-10 w-10 text-blue-500 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        );
      case 'error':
        return (
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
            <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="text-center py-8">
      {getIcon()}
      <h3 className={`mt-4 text-lg font-medium ${
        type === 'error' ? 'text-red-600' : 'text-gray-900'
      }`}>
        {message}
      </h3>
      {children && <div className="mt-2 text-sm text-gray-600">{children}</div>}
    </div>
  );
};

StateMessage.propTypes = {
  type: PropTypes.oneOf(['loading', 'error']).isRequired,
  message: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default StateMessage;
