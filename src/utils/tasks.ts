'use server';

import { Task } from "@/app/page";
import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "sec-ai-todo-app-db.cvyiayqs0chu.ap-northeast-1.rds.amazonaws.com",
  port: 3306,
  user: "admin",
  password: "ojLm2FakCWP639qRZ72guN2qkHzUeVYY",
  database: "tasks",
});

export async function fetchTasks() {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query("SELECT * FROM tasks");
    return rows as Task[];
  } finally {
    connection.release();
  }
}

export async function addTask(task: Task) {
  const connection = await pool.getConnection();
  try {
    await connection.query(
      "INSERT INTO tasks (id, title, detail, category, date, completed) VALUES (?, ?, ?, ?, ?, ?)",
      [task.id, task.title, task.detail, task.category, task.date, task.completed]
    );
  } finally {
    connection.release();
  }
}

export async function updateTask(task: Task) {
  const connection = await pool.getConnection();
  try {
    await connection.query(
      "UPDATE tasks SET title = ?, detail = ?, category = ?, date = ?, completed = ? WHERE id = ?",
      [task.title, task.detail, task.category, task.date, task.completed, task.id]
    );
  } finally {
    connection.release();
  }
}

export async function deleteTask(taskId: number) {
  const connection = await pool.getConnection();
  try {
    await connection.query("DELETE FROM tasks WHERE id = ?", [taskId]);
  } finally {
    connection.release();
  }
}

