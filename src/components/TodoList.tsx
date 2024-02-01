import React from 'react';
import "./styles.css"
import {Todo} from "../model";
import SingleTodo from "./SingleTodo";

type Props = {
    todos: Todo[]
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const TodoList = ({todos, setTodos}: Props) => {
    return (
        <div className="todo">
            {todos.map(todo => {
                return <SingleTodo
                    todo={todo}
                    key={todo.id}
                    todos={todos}
                    setTodos={setTodos}
                />
            })}
        </div>
    );
};


export default TodoList;