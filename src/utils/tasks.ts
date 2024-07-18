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

// Fetch all tasks
export async function fetchTasks() {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query("SELECT * FROM tasks");
    return rows as Task[];
  } finally {
    connection.release();
  }
}

// Add a new task
export async function addTask(task: Task) {
  const connection = await pool.getConnection();
  try {
    await connection.query(
      "INSERT INTO tasks (title, detail, category, date, completed) VALUES (?, ?, ?, ?, ?)",
      [task.title, task.detail, task.category, task.date, task.completed]
    );
  } catch (error) {
    console.error("Error adding task: ", error);
  } finally {
    connection.release();
  }
}

// Update an existing task
export async function updateTask(task: Task) {
  const connection = await pool.getConnection();
  await connection.beginTransaction();
  try {
    await connection.query(
      "UPDATE tasks SET title = ?, detail = ?, category = ?, date = ?, completed = ? WHERE id = ?",
      [task.title, task.detail, task.category, task.date, task.completed, task.id]
    );
    await connection.commit();
  } catch (error) {
    await connection.rollback();
    console.error("Error updating task: ", error);
  } finally {
    connection.release();
  }
}

// Delete a task
export async function deleteTask(taskId: number) {
  const connection = await pool.getConnection();
  await connection.beginTransaction();
  try {
    await connection.query("DELETE FROM tasks WHERE id = ?", [taskId]);
    await connection.commit();
  } catch (error) {
    await connection.rollback();
    console.error("Error deleting task: ", error);
  } finally {
    connection.release();
  }
}