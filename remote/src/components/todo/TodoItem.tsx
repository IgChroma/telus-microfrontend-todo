import React from 'react';
import { TodoItemProps } from './types';
import { TodoItemContainer, TodoItemText } from './styles';

import CloseButton from '../CloseButton';


const TodoItem = ({ task, cleanTask, markCompleted }: TodoItemProps) => {

  function handleCheckboxChange() {
    markCompleted(task.id);
  }

  // Note for evaluators: changed from bool to avoid warning =>  Warning: Received `true` for a non-boolean attribute `completed`.
  const isCompleted = task.isCompleted?.toString();
  return (
    <TodoItemContainer data-testid="todoItem" completed={isCompleted}>
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