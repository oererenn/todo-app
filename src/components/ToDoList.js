import React, { useContext, useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { ToDoContext } from '../contexts/ToDoContext'
import Item from './Item'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export default function ToDoList() {
    const [todos, setTodos] = useContext(ToDoContext);
    const [checked, setChecked] = useState(false);
    const [err, setError] = useState(false);
    const [success, setSuccess] = useState(false);
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
        const completedtasks = todos.filter(todo => todo.completed === true)

        if ((currentTasks.length > 0 || todos.length > 0) && !(completedtasks.length === 0)) {

            setTodos(currentTasks)
            setError(false);
            setSuccess(true)
        } else {
            setError(true);

        }

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

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setError(false);
        setSuccess(false);

    };

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
            <Snackbar open={err} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    Please select a task/s to remove
        </Alert>
            </Snackbar>
            <Snackbar open={success} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    Succsessfully removed the task/s!
        </Alert>
            </Snackbar>
        </div>
    );
}