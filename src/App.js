import './App.css';
import { ToDoProvider } from './contexts/ToDoContext'
import ToDoList from './components/ToDoList'
import Form from './components/Form'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    padding: theme.spacing(0, 3),
  },
  paper: {
    maxWidth: 400,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
}));

function App() {
  const classes = useStyles();
  return (
    <ToDoProvider>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs>
            <Typography component={'div'}>
              <div className="App" >
                <h1 className="Title">To Do List</h1>
                <Form />
                <ToDoList />
              </div></Typography>
          </Grid>
        </Grid>
      </Paper>
    </ToDoProvider>
  );
}

export default App;
