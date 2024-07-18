import { render, screen, fireEvent } from "@testing-library/react";
import { act } from 'react'; 
import TaskList from "@/components/TaskList";

const mockTasks = [
  {
    id: 1,
    title: "Task 1",
    detail: "Task 1 detail",
    category: "Category 1",
    date: "2022-12-31",
    completed: false,
  },
  {
    id: 2,
    title: "Task 2",
    detail: "Task 2 detail",
    category: "Category 2",
    date: "2022-12-31",
    completed: true,
  },
];

const mockToggleTaskCompletion = jest.fn();
const mockHandleDeleteTask = jest.fn();

describe("TaskList", () => {
  beforeEach(() => {
    render(
      <TaskList
        tasks={mockTasks}
        title='Task List'
        toggleTaskCompletion={mockToggleTaskCompletion}
        handleDeleteTask={mockHandleDeleteTask}
      />
    );
  });

  it("renders the task list with correct task data", () => {
    const taskElements = screen.getAllByRole("listitem");
    expect(taskElements).toHaveLength(mockTasks.length);

    mockTasks.forEach((task, index) => {
      const taskElement = taskElements[index];
      expect(taskElement).toHaveTextContent(task.title);
      expect(taskElement).toHaveTextContent(task.detail);
      expect(taskElement).toHaveTextContent(task.category);
      expect(taskElement).toHaveTextContent(
        new Date(task.date).toLocaleDateString("ja-JP", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
      );
    });
  });

  it("calls toggleTaskCompletion when checkbox is clicked", async () => {
    const checkbox = screen.getByRole("checkbox", {
      name: /Toggle completion of Task 1/i,
    });

    await act(async () => {
      fireEvent.click(checkbox);
    });

    expect(mockToggleTaskCompletion).toHaveBeenCalledWith(1);
  });

  it("calls handleDeleteTask when delete button is clicked", async () => {
    const deleteButtons = screen.getAllByRole("button", { name: /削除/i });
    // 特定の削除ボタンを選択（ここでは最初のものを選択としている）
    const deleteButton = deleteButtons[0];

    await act(async () => {
      fireEvent.click(deleteButton);
    });

    expect(mockHandleDeleteTask).toHaveBeenCalledWith(1);
  });
});
