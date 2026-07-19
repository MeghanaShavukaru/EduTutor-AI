import React from 'react';

function DashboardCard({ title = 'Course Title', icon = '📘', progress = null }) {
  return (
    <div className="glow-box bg-gray-900 text-white p-4 rounded-lg shadow-lg transition duration-300 hover:scale-105">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold text-neon">
          {icon} {title}
        </h3>
      </div>

      {progress !== null && (
        <div className="mt-2">
          <div className="w-full bg-gray-700 rounded-full h-2.5">
            <div
              className="bg-neon h-2.5 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-300 mt-1">{progress}% complete</p>
        </div>
      )}
    </div>
  );
}

export default DashboardCard;
