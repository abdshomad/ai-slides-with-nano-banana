
import React from 'react';

export const DesktopElements: React.FC = () => (
  <div className="absolute top-5 right-5 hidden lg:flex flex-col gap-2.5 pointer-events-none opacity-40 transform scale-80 origin-top-right">
    <div className="bg-white/10 border border-white/15 rounded-lg w-32 h-20"></div>
    <div className="bg-white/10 border border-white/15 rounded-lg w-32 h-20"></div>
    <div className="bg-white/10 border border-white/15 rounded-lg w-32 p-2.5">
      <div className="grid grid-cols-3 gap-1.5">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="w-5 h-5 bg-white/20 rounded"></div>
        ))}
      </div>
    </div>
  </div>
);

export const LeftSideThumbnails: React.FC = () => (
  <div className="absolute left-8 top-1/4 hidden lg:flex flex-col gap-2.5 pointer-events-none opacity-40">
    {[1, 2, 3, 4].map((i) => (
      <div key={i} className="w-20 h-12 bg-white/15 border border-white/20 rounded-lg p-1">
        <img 
          src={`https://picsum.photos/seed/thumb${i}/70/40`} 
          alt={`Thumbnail ${i}`}
          className="w-full h-full object-cover rounded"
        />
      </div>
    ))}
  </div>
);
