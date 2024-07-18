/** @format */

import { Task } from "@/app/page";
import React from "react";

interface TaskListProps {
  tasks: Task[];
  title: string;
  toggleTaskCompletion: (taskId: number) => Promise<void>;
  handleDeleteTask: (taskId: number) => Promise<void>;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  title,
  toggleTaskCompletion,
  handleDeleteTask,
}) => {
  const isDateBeforeToday = (date: string) => {
    const taskDate = new Date(date);
    const today = new Date();
    return taskDate < today;
  };

  return (
    <div>
      <h3 className='font-bold font-roboto mb-4'>{title}</h3>
      {tasks.map((task) => (
        <div
          key={task.id}
          role='listitem' // ここを追加
          className={`flex items-center justify-between mb-2 p-3 shadow-sm bg-white ${
            isDateBeforeToday(task.date) ? "text-red-500" : ""
          }`}>
          <div className='flex items-center'>
            <input
              type='checkbox'
              checked={task.completed}
              onChange={() => toggleTaskCompletion(task.id)}
              className='mr-4 cursor-pointer'
              name={`checkbox-${task.id}`}
              aria-label={`Toggle completion of ${task.title}`} // aria-labelを追加
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
            onClick={() => handleDeleteTask(task.id)}
            className='bg-gray-200 p-2 rounded-sm'>
            削除
          </button>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
