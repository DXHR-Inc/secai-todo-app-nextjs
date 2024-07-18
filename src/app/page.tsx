/** @format */

"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import { addTask, fetchTasks, updateTask, deleteTask } from "@/utils/tasks";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";

export interface Task {
  id?: number;
  title: string;
  detail: string;
  category: string;
  date: string;
  completed: boolean;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const fetchedTasks = await fetchTasks();
        setTasks(fetchedTasks);
      } catch (error) {
        console.error("Failed to fetch tasks", error);
      }
    };
    loadTasks();
  }, []);

  const handleAddTask = (newTask: Task): void => {
    setTasks(
      [...tasks, newTask].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      )
    );
    addTask(newTask);
  };

  const handleUpdateTask = (updatedTask: Task): void => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    updateTask(updatedTask);
  };

  const handleDeleteTask = async (taskId: number): Promise<void> => {
    if (window.confirm("タスクを削除してもよろしいですか？")) {
      setTasks(tasks.filter((task) => task.id !== taskId));
      await deleteTask(taskId);
    }
  };

  const toggleTaskCompletion = async (taskId: number): Promise<void> => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    await handleUpdateTask(updatedTasks.find((task) => task.id === taskId)!);
  };

  const pendingTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <main className='h-full'>
      <header className='bg-blue-500 text-white p-4'>
        <h1 className='text-2xl font-bold'>ToDo App</h1>
      </header>
      <div className='flex h-full bg-gray-100'>
        <div className='w-3/4 p-4'>
          <TaskList
            tasks={pendingTasks}
            title='未処理のタスク'
            toggleTaskCompletion={toggleTaskCompletion}
            handleDeleteTask={handleDeleteTask}
          />
          <hr className='my-8' />
          <TaskList
            tasks={completedTasks}
            title='完了済みのタスク'
            toggleTaskCompletion={toggleTaskCompletion}
            handleDeleteTask={handleDeleteTask}
          />
        </div>
        <div className='w-1/4 p-4 bg-gray-100'>
          <TaskForm
            error={error}
            setError={setError}
            handleAddTask={handleAddTask}
          />
        </div>
      </div>
    </main>
  );
}
