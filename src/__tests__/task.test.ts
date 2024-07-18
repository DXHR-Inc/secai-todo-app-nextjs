import { randomInt } from "crypto";
import { fetchTasks, addTask, updateTask, deleteTask } from "../utils/tasks";
import { Task } from "@/app/page";
import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "sec-ai-todo-app-db.cvyiayqs0chu.ap-northeast-1.rds.amazonaws.com",
  port: 3306,
  user: "admin",
  password: "ojLm2FakCWP639qRZ72guN2qkHzUeVYY",
  database: "tasks",
});

// テスト前にテーブルをクリアするユーティリティ関数
async function clearTable() {
  const connection = await pool.getConnection();
  try {
    await connection.query("DELETE FROM tasks");
  } finally {
    connection.release();
  }
}

// タスク作成のテスト
describe("Task Management", () => {
  let taskId: number | undefined;

  beforeAll(async () => {
    await clearTable();
  });

  it("should add a new task to the database", async () => {
    const newTask: Task = {
      title: "Test Task",
      detail: "This is a test task",
      category: "Test",
      date: new Date().toISOString(),
      completed: false,
    };

    await addTask(newTask);

    const tasks = await fetchTasks();
    const lastTask = tasks[tasks.length - 1];

    expect(lastTask.title).toBe(newTask.title);
    expect(lastTask.detail).toBe(newTask.detail);
    expect(lastTask.category).toBe(newTask.category);

    // booleanではなく、数値 0 または 1 で取得される可能性があるので変換
    expect(lastTask.completed).toBe(newTask.completed ? 1 : 0);

    // タスクIDを保存して後で削除できるように
    if (lastTask.id !== undefined) {
      taskId = lastTask.id;
    } else {
      throw new Error("Task ID is undefined");
    }
  });

  afterAll(async () => {
    // 追加したタスクを最後に削除しておく
    if (taskId !== undefined) {
      await deleteTask(taskId);
    }
  });
});