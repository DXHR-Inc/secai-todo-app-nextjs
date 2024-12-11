// import { getTasks, addTask, updateTask, deleteTask } from './tasks';

//describe('Tasks Utility Functions', () => {
  
	/**getTasks関数のテスト
	 * getTasksを実行した返り値が配列であるかどうか真偽値を確認する
	*/

  /** addTask関数のテスト
	 * tasksの配列の内容に追加したが追加されていることを確認する
	 * interface Task {
   *   id: number;
   *   title: string;
   *   detail: string;
   *   category: string;
   *   date: string;
   *   completed: 1 | 0;
   * }
	 * に従って、テストデータを追加する。追加後にgetTasksを実行し、追加したデータが取得できることを確認する
	 * 
	*/

	/** updateTask関数のテスト
	 * tasksの配列の内容を更新したが更新されていることを確認する
	 * interface Task {
	 *  id: number;
	 * title: string;
	 * detail: string;
	 * category: string;
	 * date: string;
	 * completed: 1 | 0;
	 * }
	 * に従い、completedをtrueに更新する。更新後にgetTasksを実行し、更新したデータが取得できるかどうか真偽値を確認する
	 * 
	*/

  // deleteTask関数のテスト
	/** deleteTask関数のテスト
	 * tasksの配列の内容を削除したが削除されていることを確認する
	 * 実行前にgetTasksを実行し、削除前のデータが取得できることを確認する
	 * deleteTaskを実行した後にgetTasksを実行し、データの数が減少していることを確認する
	 *
	*/

//});