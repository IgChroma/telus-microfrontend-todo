import { Task, TodoFilter } from "./types";

export const getFilterTitle = (filter: TodoFilter) => {
    switch (filter) {
        case TodoFilter.Active:
            return `(Active/Incomplete)`;
        case TodoFilter.Completed:
            return `(Completed)`;
        case TodoFilter.All:
        default:
            return '';
    }
}

export const getFilteredTasks = (tasks: Task[], filter: TodoFilter) => {
    return tasks.filter((taskObj) => {
        if (filter === TodoFilter.All) {
            return true;
        } else if (filter === TodoFilter.Active) {
            return !taskObj.isCompleted;
        } else if (filter === TodoFilter.Completed) {
            return taskObj.isCompleted;
        }
        return true;
    })
}

/**
 * @description: Utility function to validate persisted data
 * @param persistedList obj from 
 * @returns Task[], [] if invalid or valid persistedList array checking if elems have id, completed and text
 */
export const validatePersistedList = (persistedList: any): Task[] => {
    if (!Array.isArray(persistedList)) {
        console.error('Error: Persisted data is not an array');
        return []; 
    }

    const validTasks: Task[] = [];

    persistedList.forEach(itemObj => {
        const { id, text, isCompleted } = itemObj;
        if (typeof id !== 'number' || typeof text !== 'string' || typeof isCompleted !== 'boolean') {
            throw Error('Error: Persisted data item is missing required properties (id, text, isCompleted)')
        } else {
            validTasks.push(itemObj); // Add valid items to the new array
        }
    })


    return validTasks;
};