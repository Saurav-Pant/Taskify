"use client";

import React, { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Sidebar from "./Sidebar";
import Column from "./Column";
import { TaskType } from "../types";
import { Search } from "lucide-react";
import Cookies from "js-cookie";

const TaskDashboard: React.FC = () => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [token, setToken] = useState<string | null>(null);

  const name = Cookies.get("name");

  useEffect(() => {
    const storedToken = Cookies.get("token");
    if (storedToken) {
      setToken(storedToken);
      fetchTasks(storedToken);
    }
  }, []);

  const Backend_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const fetchTasks = (authToken: string) => {
    fetch(`${Backend_URL}/tasks`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setTasks(data);
        console.log(data);
      })
      .catch((error) => console.error("Error fetching tasks:", error));
  };

  const moveTask = (id: string, newStatus: string) => {
    fetch(`${Backend_URL}/tasks/${id}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((response) => response.json())
      .then((data) => {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === id ? { ...task, status: newStatus } : task
          )
        );
      })
      .catch((error) => console.error("Error updating task status:", error));
  };

  const columns = ["TODO", "INPROGRESS", "COMPLETED"];

  if (!token) {
    return <div>Please log in to view your tasks.</div>;
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex max-h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col p-4 bg-gray-100 mb-6 mt-2">
          <div className="mb-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">
                Hello, <span className="text-orange-500">{name}!</span>
              </h1>
            </div>
          </div>
          <div className="mb-8 flex justify-between items-center py-6 px-4">
            <div className="relative mr-4 flex-grow max-w-md">
              <div className="relative w-48">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full h-10 pl-4 pr-10 py-2 rounded-lg border"
                />
                <Search
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
              </div>
            </div>
          </div>
          <div className="flex-grow bg-white overflow-x-auto">
            <div className="flex gap-4 h-full justify-center">
              {columns.map((status) => (
                <div key={status} className="w-[340px] flex-shrink-0 my-5">
                  <Column
                    status={status}
                    tasks={tasks.filter((task) => task.status === status)}
                    moveTask={moveTask}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default TaskDashboard;
