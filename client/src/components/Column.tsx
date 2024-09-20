"use client";

import React, { useState } from "react";
import { useDrop } from "react-dnd";
import { ItemType, TaskType } from "../types";
import Task from "./Task";
import AddTaskButton from "./TaskButton";
import { TaskCardModal } from "./TaskCardModel";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ColumnProps {
  status: string;
  tasks: TaskType[];
  moveTask: (id: string, newStatus: string) => void;
}

const Column: React.FC<ColumnProps> = ({ status, tasks, moveTask }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemType.TASK,
    drop: (item: { id: string }) => moveTask(item.id, status),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState<string | null>(null);
  const [sortCriteria, setSortCriteria] = useState<
    "priority" | "deadline" | null
  >(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const filteredTasks = tasks.filter((task) => {
    if (filter === "priority") {
      return (
        task.priority === "HIGH" ||
        task.priority === "MEDIUM" ||
        task.priority === "LOW"
      );
    } else if (filter === "status") {
      return task.status === status;
    } else if (filter === "deadline") {
      return task.deadline !== null;
    }
    return true;
  });
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortCriteria === "priority") {
      const priorityOrder = { HIGH: 1, MEDIUM: 2, LOW: 3 };
      // @ts-ignore
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    } else if (sortCriteria === "deadline") {
      const dateA = a.deadline ? new Date(a.deadline).getTime() : Infinity;
      const dateB = b.deadline ? new Date(b.deadline).getTime() : Infinity;
      return dateA - dateB;
    }
    return 0;
  });
  
  return (
    <div
      // @ts-ignore
      ref={drop}
      className={`flex-1 p-4 m-2 rounded-lg ${
        isOver ? "bg-gray-100" : "bg-white"
      } flex flex-col h-full max-h-[calc(100vh-100px)] shadow-md `}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-700">
          {status === "TODO"
            ? "To Do"
            : status === "INPROGRESS"
            ? "In Progress"
            : status === "COMPLETED"
            ? "Completed"
            : "Archived"}
        </h2>
        <div className="flex justify-between mb-4 space-x-1">
          <Select
            onValueChange={(value) =>
              setSortCriteria(value as "priority" | "deadline" | null)
            }
            value={sortCriteria || undefined}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="None">None</SelectItem>
              <SelectItem value="priority">Priority</SelectItem>
              <SelectItem value="deadline">Deadline</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="overflow-y-auto flex-grow space-y-2">
        {sortedTasks.map((task) => (
          <Task key={task.id} task={task} moveTask={moveTask} />
        ))}
      </div>

      <AddTaskButton onClick={openModal} />
      <TaskCardModal
        isOpen={isModalOpen}
        onClose={closeModal}
        status={status}
      />
    </div>
  );
};

export default Column;
