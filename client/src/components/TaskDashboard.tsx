"use client";

import React, { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Sidebar from "./Sidebar";
import Column from "./Column";
import { TaskType } from "../types";
import Cookies from "js-cookie";
import useToken from "@/Hooks/useToken";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

const TaskDashboard: React.FC = () => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [token, setToken] = useState<string | null>(null);

  const { userName: name } = useToken();

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

            <div className="mt-12 mx-auto hover:shadow-md transition-all duration-300 ease-in-out w-fit">
              <Alert className="flex justify-center items-center">
                <Terminal className="h-4 w-4 mr-2" />
                <div>
                  <AlertTitle>Note:</AlertTitle>
                  <AlertDescription>
                    Please be patient while dragging and dropping. The backend
                    is on
                    <span className="text-orange-500 px-1 font-bold">
                     Render Free Instance,
                     </span>
                      so it might be a bit slower.
                  </AlertDescription>
                </div>
              </Alert>
            </div>
          </div>

          <div className="mb-8 flex justify-between items-center py-6 px-4"></div>
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
