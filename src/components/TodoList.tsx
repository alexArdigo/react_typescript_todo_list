import React from 'react';
import "./styles.css";
import {Todo} from "../model";
import SingleTodo from "./SingleTodo";
import {Droppable} from "react-beautiful-dnd";

type Props = {
    todos: Todo[]
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
    completedTodos: Todo[]
    setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const TodoList = ({todos, setTodos, completedTodos, setCompletedTodos}: Props) => {
    return (
        <div className="container">
            <Droppable droppableId="TodosList">
                {(provided, snapshot) => (
                    <div
                        className={`todos ${snapshot.isDraggingOver ? "dragactive" : ""}`}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                <span className="todos-heading">
                    Active To-dos
                </span>
                        {todos.map((todo, index) => (
                            <SingleTodo
                                index={index}
                                todo={todo}
                                todos={todos}
                                setTodos={setTodos}
                                key={todo.id}/>
                        ))}
                        {provided.placeholder}
                    </div>
                )}

            </Droppable>
            <Droppable droppableId="TodosRemove">
                {(provided, snapshot) => (
                    <div
                        className={`todos remove ${snapshot.isDraggingOver ? "dragactive" : ""}`}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                <span className="todos-heading">
                    Completed To-dos
                </span>
                        {completedTodos.map((todo, index) => (
                            <SingleTodo
                                index={index}
                                todo={todo}
                                todos={completedTodos}
                                setTodos={setCompletedTodos}
                                key={todo.id}/>
                        ))}
                        {provided.placeholder}
                    </div>
                )}

            </Droppable>

        </div>
    );
};


export default TodoList;