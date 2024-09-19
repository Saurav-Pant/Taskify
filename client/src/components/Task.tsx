"use client";
import React, { useState } from "react";
import { Clock, Edit, Trash2 } from "lucide-react";
import { useDrag } from "react-dnd";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ItemType } from "../types";
import Cookies from "js-cookie";
import LoadingSpinner from "./LoadingSpinner";
import { useRouter } from "next/navigation";

const TaskCard = ({ task }: any) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedTask, setEditedTask] = useState({
    ...task,
    deadline: task.deadline
      ? new Date(task.deadline).toISOString().slice(0, 16)
      : "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType.TASK,
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const deadline = new Date(task.deadline);
  const CreatedAt = new Date(task.createdAt);

  const date = deadline.toLocaleDateString();
  const CreatedAtDate = CreatedAt.toISOString();

  const calculateTimeAgo = (deadline: string): string => {
    const now = new Date();
    const then = new Date(deadline);
    const diffInSeconds = Math.floor((now.getTime() - then.getTime()) / 1000);

    const secondsInMinute = 60;
    const secondsInHour = 3600;
    const secondsInDay = 86400;

    if (diffInSeconds < secondsInMinute) {
      return `${diffInSeconds} seconds ago`;
    } else if (diffInSeconds < secondsInHour) {
      const minutes = Math.floor(diffInSeconds / secondsInMinute);
      return `${minutes} min ago`;
    } else if (diffInSeconds < secondsInDay) {
      const hours = Math.floor(diffInSeconds / secondsInHour);
      return `${hours} hr ago`;
    } else {
      const days = Math.floor(diffInSeconds / secondsInDay);
      return `${days} days ago`;
    }
  };

  const Backend_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const handleEdit = async () => {
    setIsLoading(true);
    try {
      const token = Cookies.get("token");
      const response = await fetch(`${Backend_URL}/tasks/${task.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editedTask),
      });

      if (response.ok) {
        const updatedTask = await response.json();
        console.log(updatedTask);
        setIsEditModalOpen(false);
        window.location.reload();
      } else {
        console.error("Failed to update task");
      }
    } catch (error) {
      console.error("Error updating task:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const token = Cookies.get("token");
      const response = await fetch(`${Backend_URL}/tasks/${task.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        console.log("Successfully deleted task");
        window.location.reload();
        router.refresh();
      } else {
        console.error("Failed to delete task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      // @ts-ignore
      ref={drag}
      className={`p-2 m-2 border bg-[#F9F9F9] rounded-lg shadow ${
        isDragging ? "opacity-50" : ""
      } relative`}
    >
      <h3 className="font-medium text-[#606060] mb-2 text-base leading-5">
        {task.title}
      </h3>
      <p className="text-sm text-[#797979] mb-2 leading-4">
        {task.description}
      </p>
      {task.priority != "Not Selected" ? (
        <span
          className={`text-xs px-2 py-1 rounded-lg ${
            task.priority === "MEDIUM"
              ? "bg-[#FFA235] text-white"
              : task.priority === "LOW"
              ? "bg-[#0ECC5A] text-white"
              : task.priority === "HIGH"
              ? "bg-red-500 text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          {task.priority}
        </span>
      ) : null}
      <div className="text-xs text-[#606060] mt-2">
        {task.deadline != null ? (
          <div className="flex items-center gap-2">
            <Clock size={16} />
            <span>{date}</span>
          </div>
        ) : null}
      </div>
      <p className="text-[#797979] text-sm pl-1 pt-3">
        {calculateTimeAgo(CreatedAtDate)}
      </p>

      <div className="absolute bottom-2 right-2 flex gap-2">
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon">
              <Edit size={16} />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Task</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Input
                value={editedTask.title}
                onChange={(e) =>
                  setEditedTask({ ...editedTask, title: e.target.value })
                }
                placeholder="Title"
              />
              <Textarea
                value={editedTask.description}
                onChange={(e) =>
                  setEditedTask({ ...editedTask, description: e.target.value })
                }
                placeholder="Description"
              />
              <Select
                value={editedTask.priority}
                onValueChange={(value: any) =>
                  setEditedTask({ ...editedTask, priority: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="LOW">Low</SelectItem>
                  <SelectItem value="MEDIUM">Medium</SelectItem>
                  <SelectItem value="HIGH">High</SelectItem>
                </SelectContent>
              </Select>
              <Input
                type="datetime-local"
                value={editedTask.deadline}
                onChange={(e) =>
                  setEditedTask({ ...editedTask, deadline: e.target.value })
                }
              />

              <Select
                value={editedTask.status}
                onValueChange={(value: any) =>
                  setEditedTask({ ...editedTask, status: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TODO">To Do</SelectItem>
                  <SelectItem value="INPROGRESS">In Progress</SelectItem>
                  <SelectItem value="COMPLETED">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              onClick={handleEdit}
              disabled={isLoading}
              className="bg-gradient-to-r from-orange-300 to-orange-500"
            >
              {isLoading ? <LoadingSpinner /> : "Save Changes"}
            </Button>
          </DialogContent>
        </Dialog>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleDelete}
          disabled={isLoading}
        >
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <Trash2 size={16} className="text-red-500" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default TaskCard;
