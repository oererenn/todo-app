import React, { useContext, useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { ToDoContext } from '../contexts/ToDoContext'
import Item from './Item'
import FormControlLabel from '@material-ui/core/FormControlLabel';




export default function ToDoList() {
    const [todos, setTodos] = useContext(ToDoContext);
    const [checked, setChecked] = useState(false);
    const handleEditTodos = (editvalue, id) => {
        const newTodos = [...todos]
        newTodos.forEach((todo, index) => {
            if (index === id) {
                todo.description = editvalue
            }
        })
        setTodos(newTodos)
    }

    const handleCompleteCheck = (id) => {
        const newTodos = [...todos]
        newTodos.forEach((todo, index) => {
            if (index === id) {
                todo.completed = !todo.completed
            }
        })
        setTodos(newTodos)

    }

    const handleDeletion = () => {
        const currentTasks = todos.filter(todo => todo.completed === false)
        setTodos(currentTasks)
    }

    const handleCheckAll = () => {
        setChecked(!checked)

        const newTodos = [...todos]
        if (checked) {
            newTodos.forEach((todo) => {
                todo.completed = false;
            })
        } else {
            newTodos.forEach((todo) => {
                todo.completed = true;
            })
        }
        setTodos(newTodos)
    }

    return (
        <div className="todo-list">
            <div className="todo-item">
                {
                    todos.map((todo, index) => (
                        <Item todo={todo} key={index} id={index} handleEditTodos={handleEditTodos} handleCompleteCheck={handleCompleteCheck} />
                    ))

                }
            </div>
            <div className="bottom-nav">
                <div className="checkbx"><FormControlLabel
                    value="start"
                    checked={checked}
                    control={<Checkbox color="primary" />}
                    label="All"
                    labelPlacement="start"
                    onClick={handleCheckAll}
                /></div>
                <div className="information">You have {todos.length} to do</div>
                <div><IconButton onClick={handleDeletion} edge="end" aria-label="comments">
                    <DeleteForeverIcon style={{ color: '#303F9F' }} />
                </IconButton></div>
            </div>
        </div>
    );
}