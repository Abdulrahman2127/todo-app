import * as React from 'react'

import Container from '@mui/material/Container'

import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

import Grid from '@mui/material/Grid'

// ICONS
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'

import Todo from './Todo'

import '@fontsource/archivo-black'
import TextField from '@mui/material/TextField'

//OTHERS
import { v4 as uuidv4 } from 'uuid'

//USECONTEXT && USESTATE && USEEFFECT

import { useContext, useState, useEffect , useMemo } from 'react'
import { TodosContext } from '../context/todosContext'

//DIALOG
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export default function TodoList() {
  const [showDeleteDialog ,setShowDeleteDialog ] = useState(false);
  const [showUpdateDialog ,setShowUpdateDialog ] = useState(false);
  const { todos, setTodos } = useContext(TodosContext)
  const [titleInput, setTitleInput] = useState('')
  const [displaylayedTodosType, setDisplaylayedTodosType] = useState('all')
  const [dialogTodo , setDalogTodo] = useState(null);
  const [updatedTodo ,setUpdatedTodo ] = useState({title: "" , details: ""});
  // filteratin arrays
  const completedTodos = useMemo(() => {
    return todos.filter((t) => {
      console.log("calling completed todos");
    return t.isCompleted
  })
  } , [todos]);
  
  
  const notCompletedTodos = useMemo(() => {
    return todos.filter((t) => {
    console.log("calling not completed todos");
    return !t.isCompleted
  })
  } ,[todos]);
 
  let todosToBeRender = todos
  
  if (displaylayedTodosType == 'completed') {
    todosToBeRender = completedTodos
  } else if (displaylayedTodosType == 'none-compteted') {
    todosToBeRender = notCompletedTodos
  } else {
    todosToBeRender = todos
  }

  

  function changeDisplayType(event) {
    setDisplaylayedTodosType(event.target.value)
  }
  function handleAddClick() {
    const newTodo = {
      id: uuidv4(),
      title: titleInput,
      details: '',
      isCompleted: false,
    }

    const updatedTodos = [...todos, newTodo]
    setTodos(updatedTodos)
    localStorage.setItem('todos', JSON.stringify(updatedTodos))
    setTitleInput('')
  }

  useEffect(() => {
    console.log('Calling use effect')
    const storageTodos = JSON.parse(localStorage.getItem('todos')) ?? [];
    setTodos(storageTodos)
  }, []) 

  // HANDLERS 
  
  function handleDeleteClick(todo){
    setDalogTodo(todo);
    setShowDeleteDialog(true)
  }
  function hanldeDeleteClose(){
    setShowDeleteDialog(false)
  }

  function handleDeleteConfirm() {
  const updatedTodos = todos.filter((t) => t.id !== dialogTodo.id);

  setTodos(updatedTodos);
  localStorage.setItem("todos", JSON.stringify(updatedTodos));

  setShowDeleteDialog(false);
}
  function handleUpdateClick(todo) {
  setDalogTodo(todo);

  setUpdatedTodo({
    title: todo.title,
    details: todo.details,
  });

  setShowUpdateDialog(true);
}

  function hanldeUpdateClose(){
    setShowUpdateDialog(false)
  }
  
function handleUpdateConfirm() {
  const updatedTodos = todos.map((t) => {
    if (t.id === dialogTodo.id) {
      return {
        ...t,
        title: updatedTodo.title,
        details: updatedTodo.details,
      };
    }

    return t;
  });

  setTodos(updatedTodos);
  localStorage.setItem("todos", JSON.stringify(updatedTodos));

  setShowUpdateDialog(false);
  setDalogTodo(null);
}



const todosJSX = todosToBeRender.map((t) => {
    
    return <Todo key={t.id} todo={t} showDelete={handleDeleteClick} showUpdate={handleUpdateClick} />
  })

  return (
    <>
      {/* DELETE DIALOG */}
      <Dialog
         onClose={hanldeDeleteClose}
        open={showDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        role="alertdialog"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this task?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This will permanently delete the item. This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={hanldeDeleteClose} autoFocus>
            Close
          </Button>
          <Button onClick={handleDeleteConfirm}>Agree</Button>
        </DialogActions>
      </Dialog>
    {/* ===== DELETE DIALOG ===== */}
    
        {/* UPDATE DIALOG */}
      <Dialog
         onClose={hanldeUpdateClose}
        open={showUpdateDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        role="alertdialog"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to edit this task?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="email"
              label="Title"
              type="email"
              fullWidth
              variant="standard"
              value={updatedTodo.title}
              onChange={(event) => {
                setUpdatedTodo({...updatedTodo , title: event.target.value})
              }}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="email"
              label="Details"
              type="email"
              fullWidth
              variant="standard"
              value={updatedTodo.details}
              onChange={(event) => {
                setUpdatedTodo({...updatedTodo , details: event.target.value})
              }}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={hanldeUpdateClose} autoFocus>
            Close
          </Button>
          <Button onClick={handleUpdateConfirm}>Agree</Button>
        </DialogActions>
      </Dialog>
    {/* ===== UPDATE DIALOG ===== */}
    
      <Container
        sx={{
          fontFamily: "'Archivo Black', sans-serif",
          marginTop: '30px',
          marginBottom: '30px',
        }}
        maxWidth="sm"
      >
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography
              style={{ fontFamily: 'A' }}
              sx={{ fontFamily: "'Public Sans Variable', sans-serif" }}
              variant="h2"
              gutterBottom
            >
              Task Management
              <Divider />
            </Typography>

            {/* FILTER BUTTON */}
            <ToggleButtonGroup
              value={displaylayedTodosType}
              exclusive
              onChange={changeDisplayType}
              aria-label="text alignment"
            >
              <ToggleButton
                value="none-compteted"
                sx={{ fontFamily: "'Archivo Black', sans-serif" }}
              >
                Not completed
              </ToggleButton>
              <ToggleButton
                value="completed"
                sx={{ fontFamily: "'Archivo Black', sans-serif" }}
              >
                completed
              </ToggleButton>
              <ToggleButton
                value="all"
                sx={{ fontFamily: "'Archivo Black', sans-serif" }}
              >
                ALL
              </ToggleButton>
            </ToggleButtonGroup>
            {/* ALL TODOS */}

            <div style={{ marginTop: '30px' }}>
              {todos.length === 0 ? (
                <Typography variant="h6" color="text.secondary">
                  No tasks yet. Create your first task!
                </Typography>
              ) : (
                todosJSX
              )}
            </div>

            <Grid style={{ marginTop: '30px' }} container spacing={2}>
              <Grid
                size={8}
                style={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                }}
              >
                <TextField
                  value={titleInput}
                  onChange={(event) => {
                    setTitleInput(event.target.value)
                  }}
                  style={{ width: '100%' }}
                  id="outlined-basic"
                  label="Task Title"
                  variant="outlined"
                />
              </Grid>
              <Grid
                container
                size={4}
                style={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                }}
              >
                <Button
                  onClick={handleAddClick}
                  style={{ width: '100%', height: '100%' }}
                  variant="contained"
                  color="success"
                  disabled={titleInput.length == 0 }
                >
                  addition
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </>
  )
}
