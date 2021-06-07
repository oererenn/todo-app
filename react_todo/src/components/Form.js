import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { ToDoContext } from '../contexts/ToDoContext'
import { useForm } from 'react-hook-form'

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },

    },
}));

export default function UserFormInput() {
    const classes = useStyles();
    const [todos, setTodos] = useContext(ToDoContext);
    const { register, handleSubmit, reset} = useForm();

    const onSubmit = data => {
        setTodos([...todos, { description: data.description, completed: false }]);
        reset()
    };

    return (
        <div className="form-input">
            <form onSubmit={handleSubmit(onSubmit)} className={classes.root} noValidate autoComplete="off" required>
                <div>
                    <TextField {...register('description', { required: true })} id="description" label="Enter a task" required />
                </div>
                <Button type="submit" variant="contained" size="small" color="primary" className={classes.margin}>Add</Button>
            </form>
        </div>

    );
}