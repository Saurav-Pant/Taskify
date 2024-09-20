"use client";

import React, { useState, useEffect } from "react";
import { Loader, Calendar, PenTool, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Spinner from "@/components/LoadingSpinner";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const page = ({ status }: any) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [priority, setPriority] = useState("Not Selected");
  const [deadline, setDeadline] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [minDateTime, setMinDateTime] = useState("");

  const router = useRouter();

  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const minDateTimeString = `${year}-${month}-${day}T${hours}:${minutes}`;
    setMinDateTime(minDateTimeString);
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!title) {
      setError("Please fill in all required fields.");
      return;
    }
    const token = Cookies.get("token");

    const task = {
      title,
      description,
      dateTime,
      priority,
      deadline,
      status,
    };

    setIsLoading(true);

    const Backend_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

    try {
      const response = await fetch(`${Backend_URL}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(task),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Task created:", data);
        toast.success("Task Added Successfully! Redirecting...");
        setTimeout(() => window.location.reload(), 1500);
      } else {
        const error = await response.json();
        console.error("Failed to create task:", error);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
    setError("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white">
      <div className="p-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full text-2xl font-bold mb-4 focus:outline-none resize"
        />

        <div className="space-y-2">
          <div className="flex items-center">
            <Loader size={20} className="mr-2 text-gray-500" />
            <span className="w-24 text-gray-500">Status</span>
            <input
              type="text"
              value={status}
              className="flex-grow p-1 border rounded resize"
              readOnly
            />
          </div>
          <div className="flex items-center">
            <AlertCircle size={20} className="mr-2 text-gray-500" />
            <span className="w-24 text-gray-500">Priority</span>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="flex-grow p-1 border rounded resize"
            >
              <option value="">Not Selected</option>
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>
          </div>
          <div className="flex items-center">
            <Calendar size={20} className="mr-2 text-gray-500" />
            <span className="w-24 text-gray-500">Due Date</span>
            <input
              type="datetime-local"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              min={minDateTime}
              className="flex-grow p-1 border rounded text-gray-500 resize"
            />
          </div>
          <div className="flex items-center">
            <PenTool size={20} className="mr-2 text-gray-500" />
            <span className="w-24 text-gray-500">Description</span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="flex-grow p-1 border rounded resize"
            ></textarea>
          </div>
        </div>
      </div>

      <div className="border-t p-4">
        <p className="text-gray-500">Start Creating...</p>
      </div>

      {error && (
        <div className="p-4">
          <p className="text-red-500">{error}</p>
        </div>
      )}

      <div className="p-4">
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-orange-300 to-orange-500 hover:bg-opacity-90 transition-all ease-in-out duration-300 text-white p-2 rounded"
          disabled={isLoading}
        >
          {isLoading ? <Spinner /> : "Create Task"}
        </button>
      </div>
      <ToastContainer />
    </form>
  );
};

export default page;
