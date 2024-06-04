import { Task, TodoFilter } from "../types";
import { getFilterTitle, getFilteredTasks, getPersistedListFromLocalStorage, toggleDarkMode, validatePersistedList } from "../utils";


const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
const localStorageGetSpy = jest.spyOn(window.localStorage, 'getItem');

describe('Utility functions', () => {
  describe('getFilterTitle()', () => {
    it('should return (Active/Incomplete) for TodoFilter.Active', () => {
      expect(getFilterTitle(TodoFilter.Active)).toBe('(Active/Incomplete)');
    });

    it('should return (Completed) for type TodoFilter.Completed', () => {
      expect(getFilterTitle(TodoFilter.Completed)).toBe('(Completed)');
    });

    it('should return emtpy title "" for TodoFilter.All + default case', () => {
      expect(getFilterTitle(TodoFilter.All)).toBe('');
      // @ts-expect-error: Using an invalid TodoFilter, should return emtpy title
      expect(getFilterTitle('unknown')).toBe('');
    });
  });

  describe('filtering: getFilteredTasks()', () => {
    const tasks: Task[] = [
      { id: 1, text: 'Task 1', isCompleted: false },
      { id: 2, text: 'Task 2', isCompleted: true },
      { id: 3, text: 'Task 3', isCompleted: false },
    ];

    it('should return all tasks for TodoFilter.All', () => {
      const filteredTasks = getFilteredTasks(tasks, TodoFilter.All);
      expect(filteredTasks).toEqual(tasks);
    });

    it('should return only active tasks for TodoFilter.Active', () => {
      const filteredTasks = getFilteredTasks(tasks, TodoFilter.Active);
      expect(filteredTasks).toEqual([tasks[0], tasks[2]]);
    });

    it('should return only completed tasks for TodoFilter.Completed', () => {
      const filteredTasks = getFilteredTasks(tasks, TodoFilter.Completed);
      expect(filteredTasks).toEqual([tasks[1]]);
    });
  });
  
  describe('validatePersistedList()', () => {
    it('should return an empty array for non-array data', () => {
      const invalidData = 'not an array';
      expect(validatePersistedList(invalidData)).toEqual([]);
    });

    it('should return an empty array for invalid objects', () => {
      const invalidData = [{ text: 'Task 1' }]; // Missing id and isCompleted
      try {
        expect(validatePersistedList(invalidData)).toEqual([]);
      } catch (error) {
        // we can do a more depth implemantation here using a test utility function
        // if ts is configured to avoid expects() within conditions
        // since this is not configured nor required, that could be another improvement/refactor task
        expect(consoleErrorSpy).toHaveBeenCalled()
      }
    });

    it('should return a valid task array for valid data', () => {
      const validData: Task[] = [
        { id: 1, text: 'Task 1', isCompleted: false },
        { id: 2, text: 'Task 2', isCompleted: true },
      ];
      expect(validatePersistedList(validData)).toEqual(validData);
    });
  });
});

describe('getPersistedListFromLocalStorage (): retrieve valid lists from local storage', () => {

  const mockTaskList: Task[] = [{ id: 1, text: 'Task 1', isCompleted: false }];
  const mockData = JSON.stringify(mockTaskList);

  it('should return an empty array if no data is stored', () => {
    localStorageGetSpy.mockReturnValueOnce(null);
    expect(getPersistedListFromLocalStorage()).toEqual([]);
  });

  it('returns a valid task array from parsed data', () => {
    localStorageGetSpy.mockReturnValue(mockData);
    expect(getPersistedListFromLocalStorage()).toEqual(mockTaskList);
  });

  it('should return an empty array on parsing errors', () => {
    localStorageGetSpy.mockReturnValue('this is a mock invalid JSON');
    expect(getPersistedListFromLocalStorage()).toEqual([]);
  }); 
});

describe('toggleDarkMode() cool factor', () => {
  it('should toggle the "light" class on document.body', () => {
    document.body.classList.remove('light');
    toggleDarkMode();
    expect(document.body.classList.contains('light')).toBe(true);
    toggleDarkMode();
    expect(document.body.classList.contains('light')).not.toBe(true);
  })
});
