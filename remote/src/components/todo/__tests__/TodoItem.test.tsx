import React from 'react';
import { render, screen, fireEvent  } from '@testing-library/react'; 
import TodoItem from '../TodoItem';
import { Task } from '../types';


describe('TodoItem component tests', () => {
    const mockTask: Task = {
        id: 1,
        text: 'Test task',
        isCompleted: false,
    };

    const mockCleanTask = jest.fn();

    it('should render the task text', () => {
        const { getByText } = render(
            <TodoItem task={mockTask}
                cleanTask={jest.fn()}
                markCompleted={jest.fn()} />);

        expect(getByText(mockTask.text)).toBeTruthy();
    });

    it('should show the checkbox as unchecked for an incomplete task', () => {
        render(<TodoItem task={mockTask} cleanTask={mockCleanTask} markCompleted={jest.fn()} />);

        const checkbox: HTMLInputElement = screen.getByRole('checkbox');
        expect(checkbox.checked).toBeFalsy();
    });

    it('should show the checkbox as checked for a completed task', () => {
        const completedTask = { ...mockTask, isCompleted: true };
        render(<TodoItem task={completedTask} cleanTask={mockCleanTask} markCompleted={jest.fn()} />);

        const checkbox: HTMLInputElement = screen.getByRole('checkbox');
        expect(checkbox.checked).toBeTruthy();
    });

    it('should call markCompleted when the checkbox is clicked', () => {
        const mockMarkCompleted = jest.fn();
        render(<TodoItem task={mockTask} cleanTask={mockCleanTask} markCompleted={mockMarkCompleted} />);

        const checkbox: HTMLInputElement = screen.getByRole('checkbox');
        fireEvent.click(checkbox);

        expect(mockMarkCompleted).toHaveBeenCalledTimes(1);
        expect(mockMarkCompleted).toHaveBeenCalledWith(mockTask.id);
    });

    it('should call cleanTask when the CloseButton is clicked', () => {
        ;
        render(<TodoItem task={mockTask} cleanTask={mockCleanTask} markCompleted={jest.fn()} />);

        const closeButton = screen.getByRole('button');
        fireEvent.click(closeButton);

        expect(mockCleanTask).toHaveBeenCalled();
        expect(mockCleanTask).toHaveBeenCalledWith(mockTask.id);
    });
});
