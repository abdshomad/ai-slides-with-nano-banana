import React from 'react';
import { CloseIcon } from './Icons';

interface FileCardProps {
  icon: React.ReactElement<React.SVGProps<SVGSVGElement>>;
  name: string;
  onRemove: () => void;
}

export const FileCard: React.FC<FileCardProps> = ({ icon, name, onRemove }) => (
  <div className="relative bg-black/30 backdrop-blur-md border border-white/20 rounded-lg p-3 shadow-lg flex items-center gap-3 text-gray-200 text-sm w-full opacity-90">
    <button 
      onClick={onRemove} 
      className="absolute top-1 right-1 text-gray-400 hover:text-white transition-colors"
      aria-label={`Remove ${name}`}
    >
      <CloseIcon className="w-4 h-4" />
    </button>
    {React.cloneElement(icon, { className: "w-5 h-5 text-gray-300 flex-shrink-0" })}
    <span className="truncate pr-4">{name}</span>
  </div>
);

interface ImageFileCardProps {
  imageSrc: string;
  altText: string;
  name: string;
  onRemove: () => void;
}

export const ImageFileCard: React.FC<ImageFileCardProps> = ({ imageSrc, altText, name, onRemove }) => (
  <div className="relative bg-black/30 backdrop-blur-md border border-white/20 rounded-lg p-2 shadow-lg flex flex-col gap-2 text-gray-200 text-sm w-full opacity-90">
    <button 
      onClick={onRemove} 
      className="absolute top-1 right-1 bg-black/50 rounded-full p-0.5 text-gray-200 hover:text-white hover:bg-black/75 transition-colors z-10"
      aria-label={`Remove ${name}`}
    >
        <CloseIcon className="w-4 h-4" />
    </button>
    <img 
      src={imageSrc} 
      alt={altText}
      className="w-full h-24 object-cover rounded"
    />
    <span className="truncate w-full text-center px-1">{name}</span>
  </div>
);
