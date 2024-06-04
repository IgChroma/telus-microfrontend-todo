// path/to/your/TodoList.test.js (adjust paths as needed)

import React from 'react';
import { render, screen, fireEvent, } from '@testing-library/react';
import TodoList from '../TodoList';
import { Task } from '../types';

jest.mock('../../../styles/darkMode.css', () => ({}));
const localStorageGetSpy = jest.spyOn(window.localStorage, 'getItem');

describe('Todo List component tests', () => {

    const mockTaskList: Task[] = [
        {
            id: 1,
            text: 'Test task',
            isCompleted: true,
        },
        {
            id: 2,
            text: 'Test task extra',
            isCompleted: false,
        },
        {
            id: 3,
            text: 'Test task also completed',
            isCompleted: true,
        }
    ];

    const mockPersistedDataStr = JSON.stringify(mockTaskList);

    it('should render the Add button and 3 filter buttons: All, Active, Completed', () => {
        const { getAllByRole } = render(<TodoList />);
        // Note: filtering functionality tested on the utils file
        const totalButtons = getAllByRole('button');
        expect(totalButtons.length).toBe(4);
    });

    it('should add a new task on form submission', () => {
        const { container } = render(<TodoList />);

        const taskInput = container.querySelector('#newTaskText')!;
        fireEvent.change(taskInput, { target: { value: 'finish the jest test :D' } });

        expect(
            screen.getByPlaceholderText<HTMLInputElement>(/New todo task/).value,
        ).toEqual('finish the jest test :D');

        const addButton = container.querySelector('#addNewTask')!;
        fireEvent.click(addButton);

        expect(
            screen.getByPlaceholderText<HTMLInputElement>(/New todo task/).value,
        ).toEqual('');

    });

    it('should show all tasks by default', () => {
        localStorageGetSpy.mockReturnValueOnce(mockPersistedDataStr);
        const { getAllByTestId } = render(<TodoList />);
        const taskItems = getAllByTestId('todoItem');
        expect(taskItems.length).toBe(3);
    });

    it('should filter by completed or not, requiring a checkbox to toggle completed/incompleted on check', () => {
        localStorageGetSpy.mockReturnValueOnce(mockPersistedDataStr);


        const { queryAllByTestId, getByText } = render(<TodoList />);
        const completedButton = getByText('Completed'); //Button completed

        let taskItems = queryAllByTestId('todoItem');
        const firstTaskItem = taskItems[0];

        expect(taskItems.length).toBe(3);
        const checkbox: HTMLInputElement = firstTaskItem.querySelector('input[type="checkbox"]')!;
        expect(checkbox).toBeTruthy();
        fireEvent.click(checkbox);
        expect(checkbox.checked).toBe(false);
        fireEvent.click(checkbox);
        expect(checkbox.checked).toBe(true);
        fireEvent.click(checkbox);// mark as incomplete at the end
        fireEvent.click(completedButton);
        taskItems = queryAllByTestId('todoItem')
        expect(taskItems.length).toBe(1);// Filter only by completed:

    });

    it('should filter correctly on filter buttons clicks', () => {
        const clickButtonAndUpdate = (btn: HTMLButtonElement) => {
            fireEvent.click(btn);
            taskItems = queryAllByTestId('todoItem')
        }

        // setup, could be moved into aux f(x)
        localStorageGetSpy.mockReturnValueOnce(mockPersistedDataStr);
        const { queryAllByTestId, getByText } = render(<TodoList />);

        // buttons
        const completedButton: HTMLElement = getByText('Completed');
        const allButton: HTMLElement = getByText('All');
        const activeButton: HTMLElement = getByText('Active');


        let taskItems = queryAllByTestId('todoItem');
        expect(taskItems.length).toBe(3); // All visible



        clickButtonAndUpdate(completedButton as HTMLButtonElement);
        expect(taskItems.length).toBe(2);// Filter only by completed

        clickButtonAndUpdate(activeButton as HTMLButtonElement);
        expect(taskItems.length).toBe(1);// Filter only by not completed/active

        clickButtonAndUpdate(allButton as HTMLButtonElement);
        expect(taskItems.length).toBe(3);// Show all again

    });

    it('should delete a task on button click', () => {
        localStorageGetSpy.mockReturnValueOnce(mockPersistedDataStr);

        const { queryAllByTestId } = render(<TodoList />);
        let taskItems = queryAllByTestId('todoItem');

        expect(taskItems.length).toBe(3);

        const deleteFirstElement = () => {
            const firstTaskItem = taskItems[0];
            const deleteButton: HTMLButtonElement = firstTaskItem.querySelector('button[data-testid="deleteButton"]')!;
            fireEvent.click(deleteButton);
            taskItems = queryAllByTestId('todoItem')
        }

        deleteFirstElement();
        expect(taskItems.length).toBe(2);

        deleteFirstElement();
        expect(taskItems.length).toBe(1);

        deleteFirstElement();
        expect(taskItems.length).toBe(0);

    });
});