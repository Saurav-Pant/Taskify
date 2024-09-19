import React from "react";
import { X, Share2, Star, Maximize2 } from "lucide-react";

 const TaskCardHeader = ({ onClose }: any) => {
  return (
    <div className="flex justify-between items-center border-gray-200 bg-white">
      <div className="flex space-x-3">
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>
      
      </div>
      
    </div>
  );
};

export default TaskCardHeader;


