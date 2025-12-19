import React from 'react';
import PropTypes from 'prop-types';

const LayoutShell = ({ children, footer, theme }) => {
  return (
    <div 
      className="min-h-screen flex flex-col transition-colors duration-300"
      style={{
        backgroundColor: theme?.bgPrimary || '#f3f4f6',
        color: theme?.textPrimary || '#1f2937',
      }}
    >
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      {footer && (
        <footer className="py-4 text-center text-sm text-gray-600">
          {footer}
        </footer>
      )}
    </div>
  );
};

LayoutShell.propTypes = {
  children: PropTypes.node.isRequired,
  footer: PropTypes.node,
  theme: PropTypes.shape({
    bgPrimary: PropTypes.string,
    textPrimary: PropTypes.string,
  }),
};

export default LayoutShell;
