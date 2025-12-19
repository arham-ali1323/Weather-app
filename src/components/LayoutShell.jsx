<<<<<<< HEAD
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
=======
import React from 'react';

const LayoutShell = ({ theme, children, footer }) => {
  const bgClass = theme?.bgClass || 'bg-slate-900';

  return (
    <div className={`min-h-screen ${bgClass} text-slate-50 transition-colors duration-500`}>
      <div className="min-h-screen bg-slate-950/40 backdrop-blur-3xl">
        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 flex flex-col gap-6">
          {children}
        </main>
        {footer && (
          <footer className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 text-xs text-slate-400 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            {footer}
          </footer>
        )}
      </div>
    </div>
  );
};

export default LayoutShell;
>>>>>>> 924d53e04b3b4293443adedaf40983de8bf4ec1b
