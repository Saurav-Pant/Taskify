import { Plus } from 'lucide-react';
import React from 'react';

const AddTaskButton = ({ onClick }:any) => {
  return (
    <button className="w-[290px] h-10 bg-gradient-to-r from-[#3A3A3A] to-[#202020] text-white p-2 rounded-lg mt-4 flex items-center justify-center sticky bottom-1 mx-auto"
    onClick={onClick}
    >
    <div className="flex justify-between items-center w-full px-4">
      <div>Add new</div>
      <div>
        <Plus size={16} className="" />
      </div>
    </div>
    </button>
  );
};

export default AddTaskButton;