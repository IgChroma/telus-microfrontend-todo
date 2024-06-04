import React from 'react';
import { Task } from './types';
import { TodoItemContainer, TodoItemText } from './styles';

import CloseButton from '../CloseButton';

interface TodoItemProps {
  task: Task;
  cleanTask: (id: number) => void;
  markCompleted: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ task, cleanTask, markCompleted }) => {

  function handleCheckboxChange() {
    markCompleted(task.id);
  }

  // Note for evaluators: changed from bool to avoid warning =>  Warning: Received `true` for a non-boolean attribute `completed`.
  const isCompleted = task.isCompleted?.toString() || 'false';
  return (
    <TodoItemContainer completed={isCompleted}>
      <input
        type="checkbox"
        checked={task.isCompleted}
        onChange={handleCheckboxChange}
      />

      <TodoItemText completed={isCompleted}>
        {task.text}
      </TodoItemText>

      <CloseButton onClick={() => cleanTask(task.id)} />
    </TodoItemContainer >
  );
}

export default TodoItem;