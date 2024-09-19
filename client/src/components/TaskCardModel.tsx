import React from 'react';
import TaskCard from '../app/AddTask/page';
import  Modal  from './Model';
import TaskCardHeader from './TaskCardHeader';

export const TaskCardModal = ({ isOpen, onClose, status }: { isOpen: boolean; onClose: () => void; status: string }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <TaskCardHeader onClose={onClose} />
      <TaskCard status={status} /> 
    </Modal>
  );
};
