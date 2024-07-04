"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import { addTask, fetchTasks } from "@/utils/tasks";

export interface Task {
  id: number;
  title: string;
  detail: string;
  category: string;
  date: string;
  completed: boolean;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState<string>("");
  const [detail, setDetail] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [date, setDate] = useState<string>("");
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


  const handleAddTask = (): void => {
    if (!title || !date) {
      setError("タイトルと期日は必須項目です");
      return;
    }
    setError("");
    const newTask: Task = {
      id: Date.now(),
      title,
      detail,
      category,
      date,
      completed: false,
    };
    setTasks(
      [...tasks, newTask].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      )
    );

    // add data to the database
    addTask(newTask);

    setTitle("");
    setDetail("");
    setCategory("");
    setDate("");
  };

  const toggleTaskCompletion = (taskId: number): void => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (taskId: number): void => {
    if (window.confirm("タスクを削除してもよろしいですか？")) {
      setTasks(tasks.filter((task) => task.id !== taskId));
    }
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
          <div className='mb-4'>
            <h3 className='font-bold font-roboto mb-4'>未処理のタスク</h3>
            {pendingTasks.map((task) => (
              <div
                key={task.id}
                className='flex items-center justify-between mb-2 p-3 shadow-sm bg-white'>
                <div className='flex items-center'>
                  <input
                    type='checkbox'
                    checked={task.completed}
                    onChange={() => toggleTaskCompletion(task.id)}
                    className='mr-4 cursor-pointer'
                    name={`checkbox-${task.id}`}
                  />
                  <div className='flex flex-col'>
                    <span className='w-[150px] font-roboto font-bold text-md mb-1'>
                      {task.title}
                    </span>
                    <span className='w-[150px] font-roboto text-sm'>
                      {task.detail}
                    </span>
                  </div>
                  <span className='w-[150px] font-roboto'>{task.category}</span>
                  <span className='w-[150px] font-roboto'>
                    {new Date(task.date).toLocaleDateString("ja-JP", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </span>
                </div>
                <button
                  onClick={() => deleteTask(task.id)}
                  className='bg-gray-200 p-2 rounded-sm'>
                  削除
                </button>
              </div>
            ))}
          </div>
          <hr className='my-8' />
          <div>
            <h3 className='font-bold font-roboto mb-4'>完了済みのタスク</h3>
            {completedTasks.map((task) => (
              <div
                key={task.id}
                className='flex items-center justify-between mb-2 p-3  shadow-sm bg-white'>
                <div className='flex items-center'>
                  <input
                    type='checkbox'
                    checked={task.completed}
                    onChange={() => toggleTaskCompletion(task.id)}
                    className='mr-4 cursor-pointer'
                    name={`checkbox-${task.id}`}
                  />
                  <div className='flex flex-col'>
                    <span className='w-[150px] font-roboto font-bold text-md mb-1'>
                      {task.title}
                    </span>
                    <span className='w-[150px] font-roboto text-sm'>
                      {task.detail}
                    </span>
                  </div>
                  <span className='w-[150px] font-roboto'>{task.category}</span>
                  <span className='w-[150px] font-roboto'>
                    {new Date(task.date).toLocaleDateString("ja-JP", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </span>
                </div>
                <button
                  onClick={() => deleteTask(task.id)}
                  className='bg-gray-200 p-2 rounded-sm'>
                  削除
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className='w-1/4 p-4 bg-gray-100'>
          <h3 className='font-roboto mb-2 font-bold'>タスクを追加</h3>
          {error && (
            <div className='text-red-500 font-roboto mb-2'>{error}</div>
          )}
          <input
            type='text'
            name='title'
            value={title}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
            placeholder='タイトル'
            className='mb-2 p-2 w-full border'
          />
          <textarea
            name='detail'
            value={detail}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setDetail(e.target.value)
            }
            placeholder='詳細'
            className='mb-2 p-2 w-full border'
          />
          <input
            type='text'
            name='category'
            value={category}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setCategory(e.target.value)
            }
            placeholder='カテゴリ'
            className='mb-2 p-2 w-full border'
          />
          <input
            type='date'
            name='date'
            value={date}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setDate(e.target.value)
            }
            className='mb-2 p-2 w-full border'
          />
          <button
            onClick={handleAddTask}
            className='w-full bg-blue-500 text-white p-2 rounded-sm'>
            追加
          </button>
        </div>
      </div>
    </main>
  );
}
