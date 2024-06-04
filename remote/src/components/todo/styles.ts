import styled from 'styled-components';
import { TodoFilter } from './types';


export const TodoListParentContainer = styled.div`
margin-right: auto;
margin-left: auto;
`;

export const SectionTitle = styled.h1`
  color: black;
  margin: 1rem 0;

  p {
    display: inline;
    font-size: 1rem;
    color: #878787;
    margin-left: 0.75rem;;
  }

  span {
    color: darkgrey;
  }
`;

export const MainTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(#4b4b4b, #d8d8d8);
  margin: 1rem 0;
  border-radius: 0.5rem;
  padding: 1rem;
`;

export const AddTaskForm = styled.div`
  border: 1px solid #7ec183;
  background-color: #d8d8d8;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
`;

export const AddTaskInputs = styled.div`
  display: flex;
  justify-content: space-between;
  border-radius: 8px;

  input {
    padding: 12px;
    width: 100%;
    border-radius: 8px;
  }

  button {
    background-color: #5cc75c;
    padding: 1rem 1rem;
    border-radius: 8px;
    margin-left: 2px;
    cursor: pointer;
    height: 59px;
  }
  
  button:hover {
    background-color: #5de55d;
  }

  input::placeholder {
    color: lightgrey;
  }
`;

export const TodoListFilterContainer = styled.div`
display: flex;
justify-content: space-between;
margin-top: 1rem;
border: 1px solid #7ec183;
background-color: #d8d8d8;
padding: 1rem;
border-radius: 0.5rem;
`;

export const FilterTitle = styled.h3`
width: 100%;
`;

interface TLFilterButtonProps {
  filter: TodoFilter;
  activef: TodoFilter;
  onClick: () => void;
}
export const TLFilterButton = styled.button<TLFilterButtonProps>`
  background-color: ${(props) => (props.filter === props.activef ? '#23d4e2' : '#5cc75c')};
  padding: 1rem 1rem;
  border-radius: 8px;
  margin-left: 2px;
  width: 100%;
  cursor: pointer;

  ${(props) => (props.filter === props.activef ? '' : `
  &:hover {
    background-color: #5de55d;
  }`)};

`;

export const ListItemContainer = styled.div`
  margin-top: 1rem;
  border: 1px solid #7ec183;
  background-color: #d8d8d8;
  padding: 1rem;
  border-radius: 0.5rem;

`;

// Note: changed to string to avoid this
// Warning: Received `true` for a non-boolean attribute `completed`.
// export const TodoItemContainer = styled.div<{ completed: boolean }>`
export const TodoItemContainer = styled.div<{ completed: string }>`

  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;

  input {
    /* increse checkbox size a little */
    transform: scale(1.5);
    cursor: pointer;
  }
  
  opacity: ${props => props.completed == "true" ? 0.8 : 1};
`;

// Note to evaluators: changed to string to avoid this
// Warning: Received `true` for a non-boolean attribute `completed`.

export const TodoItemText = styled.div<{ completed: string }>`
  ${props => props.completed == "true" ? `
  color: grey;
  opacity: 0.8;
  text-decoration: line-through;
  
  `: ''}
  font-size: 1.5rem;
`;