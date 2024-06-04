import React, { useEffect, useState } from 'react';
import { Task, TodoFilter } from './types';
import TodoItem from './TodoItem';
import { AddTaskForm, AddTaskInputs, FilterTitle, ListItemContainer, MainTitle, SectionTitle, TLFilterButton, TodoListFilterContainer, TodoListParentContainer } from './styles';
import { LOCAL_STORAGE_KEY } from './contants';
import { getFilterTitle, getFilteredTasks, getPersistedListFromLocalStorage } from './utils';
import { DarkModeToggle } from '../../styles/DarkModeToggle';


const TodoList = () => {

    const [text, setText] = useState('');
    const [tasks, setTasks] = useState<Task[]>([]);
    //     {
    //         id: 1,
    //         text: 'PayPal',
    //         isCompleted: true
    //     },
    //     {
    //         id: 2,
    //         text: 'Nike',
    //         isCompleted: false
    //     },
    //     {
    //         id: 3,
    //         text: 'Telus',
    //         isCompleted: false
    //     }
    // ]);
    const [filter, setFilter] = useState<TodoFilter>(TodoFilter.All);



    useEffect(() => {
        // Restore persisted after mount
        const persistedList = getPersistedListFromLocalStorage();
        setTasks(persistedList);
    }, []);

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
    }, [tasks]);


    function addNewTask(text: string) {
        const newTask: Task = {
            text,
            id: Date.now(),// could be a math random or an id generated with "nanoid" or other lightweight generator. for this purpose date is ok
            isCompleted: false
        };

        // Add new task and cleanup text
        setTasks([...tasks, newTask]);
        setText('');

        // Setting Filter to All, if not they are not visible while filter on
        setFilter(TodoFilter.All);
    }
    const cleanTask = (id: number) => {
        setTasks(tasks.filter(task => task.id !== id));
    }

    const markCompleted = (id: number) => {
        const newTaskList = tasks.map(task => {
            // modify existing one, set it as incomplete
            if (task.id === id) {
                return { ...task, isCompleted: !task.isCompleted };
            } else {
                return task;
            }
        })
        setTasks(newTaskList);
    }

    const filteredTasks = getFilteredTasks(tasks, filter);

    return (
        <TodoListParentContainer>

            <MainTitle>
                <SectionTitle> Todo Manager </SectionTitle>
                <DarkModeToggle />
            </MainTitle>

            <AddTaskForm>
                <SectionTitle> Add New Task: </SectionTitle>
                <AddTaskInputs>

                    <input
                        value={text}
                        placeholder="New todo task"
                        onChange={ev => setText(ev.target.value)}
                    />
                    <button onClick={() => addNewTask(text)} title="Add task" >Add</button>
                </AddTaskInputs>
            </AddTaskForm>


            <TodoListFilterContainer>
                <FilterTitle> Filter by: </FilterTitle>
                <TLFilterButton filter={TodoFilter.All} activef={filter} onClick={() => setFilter(TodoFilter.All)} title="Show all" >
                    All
                </TLFilterButton>
                <TLFilterButton filter={TodoFilter.Active} activef={filter} onClick={() => setFilter(TodoFilter.Active)} title="Tilter by active" >
                    Active
                </TLFilterButton>
                <TLFilterButton
                    filter={TodoFilter.Completed} activef={filter} onClick={() => setFilter(TodoFilter.Completed)} title="Filter by completed">
                    Completed
                </TLFilterButton>
            </TodoListFilterContainer >


            <ListItemContainer>
                <SectionTitle>
                    Todo List <span>[{filteredTasks.length}]:</span>
                    <p>{getFilterTitle(filter)}</p>
                </SectionTitle>

                {filteredTasks.length === 0 ?
                    <div>There are no elements in the list</div>
                    :
                    filteredTasks.map(taskObj => (
                        <TodoItem
                            key={taskObj.id}
                            cleanTask={cleanTask}
                            task={taskObj}
                            markCompleted={markCompleted}
                        />
                    ))
                }
            </ListItemContainer>
        </TodoListParentContainer>
    );
}
export default TodoList;