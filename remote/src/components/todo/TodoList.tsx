import React, { useEffect, useState } from 'react';
import { Task, TodoFilter } from './types';
import TodoItem from './TodoItem';
import { AddTaskForm, AddTaskInputs, FilterTitle, ListItemContainer, SectionTitle, TLFilterButton, TodoListFilterContainer, TodoListParentContainer } from './styles';
import { LOCAL_STORAGE_KEY } from './contants';
import { getFilterTitle, getFilteredTasks } from './utils';


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


    // Restore persisted
    useEffect(() => {
        const storedTodos = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (storedTodos) {

            const persistedList = JSON.parse(storedTodos);
            console.log("persistedList", persistedList)
            setTasks(persistedList);
        }
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

            <SectionTitle>
                Todo Manager
            </SectionTitle>

            <AddTaskForm>
                <SectionTitle>
                    Add New Task:
                </SectionTitle>
                <AddTaskInputs>

                    <input
                        value={text}
                        placeholder="New todo task"
                        onChange={ev => setText(ev.target.value)}
                    />
                    <button onClick={() => addNewTask(text)}>Add</button>
                </AddTaskInputs>
            </AddTaskForm>


            <ListItemContainer>
                <TodoListFilterContainer>
                    <FilterTitle>
                        Filter by:
                    </FilterTitle>
                    <TLFilterButton filter={TodoFilter.All} activef={filter} onClick={() => setFilter(TodoFilter.All)} >
                        All
                    </TLFilterButton>
                    <TLFilterButton filter={TodoFilter.Active} activef={filter} onClick={() => setFilter(TodoFilter.Active)} >
                        Active
                    </TLFilterButton>
                    <TLFilterButton
                        filter={TodoFilter.Completed} activef={filter} onClick={() => setFilter(TodoFilter.Completed)} >
                        Completed
                    </TLFilterButton>
                </TodoListFilterContainer >
            </ListItemContainer>

            <ListItemContainer>
                <SectionTitle>
                    Todo List:
                    <p>{getFilterTitle(filter)}</p>
                </SectionTitle>
                {filteredTasks.map(taskObj => (
                    <TodoItem
                        key={taskObj.id}
                        cleanTask={cleanTask}
                        task={taskObj}
                        markCompleted={markCompleted}
                    />
                ))}
            </ListItemContainer>
        </TodoListParentContainer>
    );
}
export default TodoList;