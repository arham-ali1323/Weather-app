import React from 'react';
import PropTypes from 'prop-types';

const LayoutShell = ({ theme = {}, children, footer }) => {
  const bgClass = theme?.bgClass || 'bg-slate-900';

  return (
    <div className={`min-h-screen ${bgClass} text-slate-50 transition-colors duration-500`}>
      <div className="min-h-screen bg-slate-950/40 backdrop-blur-3xl">
        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 flex flex-col gap-6">
          {children}
        </main>
        {/* footer section starts here */}
        {footer && (
          <footer className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 text-xs text-slate-400 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            {footer}
          </footer>
        )}
      </div>
    </div>
  );
};

LayoutShell.propTypes = {
  children: PropTypes.node.isRequired,
  footer: PropTypes.node,
  theme: PropTypes.shape({
    bgClass: PropTypes.string,
  }),
};

export default LayoutShell;
