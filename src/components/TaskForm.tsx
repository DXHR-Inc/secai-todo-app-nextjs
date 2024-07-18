import { Task } from "@/app/page";
import React, { useState, ChangeEvent } from "react";

interface TaskFormProps {
  error: string;
  setError: (error: string) => void;
  handleAddTask: (newTask: Task) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({
  error,
  setError,
  handleAddTask,
}) => {
  const [title, setTitle] = useState<string>("");
  const [detail, setDetail] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [date, setDate] = useState<string>("");

  const handleSubmit = (): void => {
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
    handleAddTask(newTask);

    setTitle("");
    setDetail("");
    setCategory("");
    setDate("");
  };

  return (
    <div>
      <h3 className='font-roboto mb-2 font-bold'>タスクを追加</h3>
      {error && <div className='text-red-500 font-roboto mb-2'>{error}</div>}
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
        onChange={(e: ChangeEvent<HTMLInputElement>) => setDate(e.target.value)}
        className='mb-2 p-2 w-full border'
      />
      <button
        onClick={handleSubmit}
        className='w-full bg-blue-500 text-white p-2 rounded-sm'>
        追加
      </button>
    </div>
  );
};

export default TaskForm;
