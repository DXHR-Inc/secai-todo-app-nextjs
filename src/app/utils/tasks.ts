"use server";

import mysql from 'mysql2/promise';

// データベースの接続情報を記述
const dbConfig = {
  host: "sec-ai-todo-app-db.cvyiayqs0chu.ap-northeast-1.rds.amazonaws.com",
  port: 3306,
  user: "admin",
  password: "ojLm2FakCWP639qRZ72guN2qkHzUeVYY",
  database: "tasks",
};

// タスクの型を定義
interface Task {
  id: number;
  title: string;
  detail: string;
  category: string;
  date: string;
  completed: boolean;
}

// DBからタスク情報を取得するgetTasks関数を作成する。

// [title, detail, category, date, completed]を持つtaskオブジェクトを受け取り、DBに登録するaddTask関数を作成する。

// taskIdを受け取り、そのIDに対応するタスク情報を更新するupdateTask関数を作成する。

// taskIdを受け取り、そのIDに対応するタスク情報を削除するdeleteTask関数