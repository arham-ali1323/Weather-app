import React from 'react';

const StateMessage = ({ icon, title, description, tone = 'info' }) => {
  const toneClasses = {
    info: 'bg-slate-900/80 ring-sky-400/40 text-slate-100',
    error: 'bg-red-950/80 ring-red-500/40 text-red-50',
  };

  return (
    <div
      className={`w-full rounded-2xl px-4 py-3 ring-1 shadow-soft-xl backdrop-blur-md flex items-start gap-3 text-sm ${
        toneClasses[tone] || toneClasses.info
      }`}
    >
      <div className="mt-0.5 text-base">
        {icon || (tone === 'error' ? '⚠️' : 'ℹ️')}
      </div>
      <div>
        <p className="font-medium">{title}</p>
        {description && <p className="mt-0.5 text-xs opacity-80">{description}</p>}
      </div>
    </div>
  );
};

export default StateMessage;
