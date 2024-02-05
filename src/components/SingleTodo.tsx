import React, {useEffect, useRef, useState} from 'react';
import {AiFillDelete, AiFillEdit} from "react-icons/ai";
import {MdDone} from "react-icons/md";
import {Todo} from "../model";
import "./styles.css"
import {Draggable} from "react-beautiful-dnd";

type Props = {
    todo: Todo
    todos: Todo[]
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
    index: number

}
const SingleTodo = ({todo, todos, setTodos, index}: Props) => {
    const [edit, setEdit] = useState<boolean>(false)
    const [editTodo, setEditTodo] = useState<string>(todo.todo)
    const inputRef = useRef<HTMLInputElement>(null);
    const handleEdit = (e: React.FormEvent, id: number) => {
        e.preventDefault()
        setTodos(todos.map(todo => {
            return todo.id === id
                ? {...todo, todo: editTodo}
                : todo
        }))
        setEdit(false)
    }

    useEffect(() => {
        inputRef.current?.focus()
    }, [edit])


    const handleDone = (id: number) => {
        setTodos(
            todos.map(todo => todo.id === id
                ? {...todo, isDone: !todo.isDone}
                : todo))
    }

    const handleDelete = (id: number) => {
        setTodos(todos.filter(todo => todo.id !== id))
    }

    return (
        <Draggable draggableId={todo.id.toString()} index={index}>

            {(provided, snapshot)=> (
                <form
                    className={`todos-single ${snapshot.isDragging ? "drag" : ""}`}
                    onSubmit={(e) => {
                        handleEdit(e, todo.id)
                    }}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}

                >
                    {edit
                        ? <input
                            ref={inputRef}
                            value={editTodo}
                            onChange={(e) => {
                                setEditTodo(e.target.value)
                            }}
                            className={"todos-single-text"}
                        />
                        : todo.isDone
                            ? <s className="todos-single-text">{todo.todo}</s>
                            : <span className="todos-single-text">{todo.todo}</span>

                    }
                    <span className="icon" onClick={() => {
                        if (!edit && !todo.isDone) {
                            setEdit(!edit)
                        }
                    }}>
                <AiFillEdit/>
                </span>
                    <span className="icon" onClick={() => handleDelete(todo.id)}>
                <AiFillDelete/>
            </span>
                    <span className="icon" onClick={() => handleDone(todo.id)}>
                <MdDone/>
            </span>
                </form>
            )}


        </Draggable>

    );
};

export default SingleTodo;