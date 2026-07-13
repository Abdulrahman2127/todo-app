import * as React from 'react'

import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

// ICONS
import CheckIcon from '@mui/icons-material/Check'
import IconButton from '@mui/material/IconButton'
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { fontFamily, margin } from '@mui/system'

//CONTEXT && USESTATE
import { useContext , useState } from 'react';
import { TodosContext } from '../context/todosContext';

//DIALOG
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';


export default function Todo({todo}) {
  const [showDeleteDialog ,setShowDeleteDialog ] = useState(false);
  const [showUpdateDialog ,setShowUpdateDialog ] = useState(false);
  const [updatedTodo ,setUpdatedTodo ] = useState({title: todo.title , details: todo.details});

  const {todos , setTodos} = useContext(TodosContext);


  //  EVENT HANDLERS
  function hanldCheckClick(todoId){

    const updatedTodos = todos.map((t) => {
      if(t.id == todo.id){
        t.isCompleted = !t.isCompleted;
      }
      return t;
    })
    setTodos(updatedTodos)
    localStorage.setItem("todos",JSON.stringify(updatedTodos));

  }
  function handleDeleteClick(){
    setShowDeleteDialog(true)
  }
  function handleUpdateClick(){
    setShowUpdateDialog(true)
  }
  function hanldeDeleteClose(){
    setShowDeleteDialog(false)
  }

  function hanldeUpdateClose(){
    setShowUpdateDialog(false)
  }
  function handleDeleteConfirm(){
  const updatedTodos = todos.filter((t) => {
    if(t.id == todo.id){
      return false
    }else{
      return true
    }
  })
  setTodos(updatedTodos);
  localStorage.setItem("todos",JSON.stringify(updatedTodos));

}
  function handleUpdateConfirm(){
    const updatedTodos = todos.map((t) => {
      if(t.id == todo.id){
        return {...t , title: updatedTodo.title , details: updatedTodo.details}
      }else{
        return t  
      }
    })
    setTodos(updatedTodos);
    setShowUpdateDialog(false);
    localStorage.setItem("todos",JSON.stringify(updatedTodos));

  }

  // ===== EVENT HANDLERS =====
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
    
    <Card  style={{marginBottom: "10px"}}  className='Cards' sx={{ minWidth: 275, background: '#283593', color: 'white' }}>
      <CardContent >
        <Box  sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid className="Text"  size={8}>
              <Typography variant="h5" sx={{ textAlign: 'left' }} gutterBottom>
                {todo.title}
              </Typography>
              <Typography  variant="h6" sx={{ textAlign: 'left' }} gutterBottom>
                {todo.details}
              </Typography>
            </Grid>
            <Grid
              size={4}
              style={{
                display: 'flex',
                justifyContent: 'end',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              {/* DELETE BUTTON */}
              <IconButton  className="iconButton"
                aria-label="delete"
                style={{
                  color: '#b23c17',
                  background: 'white',
                  border: 'solid #b23c17 3px',
                }}
                onClick={handleDeleteClick}
              >
                <DeleteOutlineOutlinedIcon />
              </IconButton>
              {/* ===== DELETE BUTTON ===== */}
              <IconButton  className="iconButton"
                aria-label="delete"
                style={{
                  color: '#1769aa',
                  background: 'white',
                  border: 'solid #1769aa 3px',
                }}
                onClick={handleUpdateClick}
              >
                
                <ModeEditOutlinedIcon />
              </IconButton>

              {/* CHECK ICON BUTTON */}
              <IconButton
              onClick={() => {
                hanldCheckClick()
              }}
               className="iconButton"
                aria-label="delete"
                style={{
                  color: todo.isCompleted ? "white": '#8bc34a',
                  background: todo.isCompleted ? "#8bc34a": 'white' ,
                  border: 'solid #8bc34a 3px',
                }}
              >
                <CheckIcon />
              </IconButton>
            </Grid>
            
          </Grid>
        </Box>
      </CardContent>
    </Card>
    </>
  )
}

