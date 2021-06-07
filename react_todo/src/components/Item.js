import React, { useContext, useState } from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField';
import { useForm } from 'react-hook-form'


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        wordWrap: 'break-word',


    }
}));

function Item({ todo, id, handleEditTodos, handleCompleteCheck }) {
    const classes = useStyles();
    const [onEdit, setOnEdit] = useState(false)
    const { register, handleSubmit, reset } = useForm();

    const handleOnEdit = () => {
        setOnEdit(true)
    }

    const onSubmit = (data) => {
        setOnEdit(false)
        handleEditTodos(data.editValue, id)
        reset()

    }

    const CheckComplete = () => {
        if (todo.completed == false) {
            return (
                <ListItemText primary={todo.description} />
            )
        } else {
            return (
                <ListItemText style={{ textDecorationLine: 'line-through' }} primary={todo.description} />
            )
        }
    }

    if (onEdit) {
        return (
            <      List className={classes.root}>
                <ListItem role={undefined} dense button >
                    <form onSubmit={handleSubmit(onSubmit)} className={classes.root} noValidate autoComplete="off">
                        <TextField required {...register('editValue', { required: true })} id="editValue" label="Modify task" id="standard-size-small" defaultValue={todo.description} size="small" multiline />
                        <ListItemSecondaryAction>
                            <IconButton type="submit" edge="end" aria-label="comments">
                                <SaveIcon style={{ color: '#303F9F' }} />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </form>
                </ListItem>
            </List>
        )
    } else {


        return (
            <List style={{ backgroundColor: '#EEEEEE' }} className={classes.root}>
                <ListItem role={undefined} dense button >
                    <ListItemIcon onClick={() => handleCompleteCheck(id)}>
                        <Checkbox
                            checked={todo.completed}
                            color="primary"
                        />
                    </ListItemIcon>
                    <CheckComplete />
                    <ListItemSecondaryAction>
                        <IconButton onClick={handleOnEdit} edge="end" aria-label="comments">
                            <EditIcon style={{ color: '#303F9F' }} />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            </List>
        )
    }
}

export default Item
