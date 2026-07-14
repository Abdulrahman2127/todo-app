import * as React from 'react'

import Card from '@mui/material/Card'

import CardContent from '@mui/material/CardContent'

import Typography from '@mui/material/Typography'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

// ICONS
import CheckIcon from '@mui/icons-material/Check'
import IconButton from '@mui/material/IconButton'
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';


//CONTEXT && USESTATE
import { useContext , useState } from 'react';
import { TodosContext } from '../context/todosContext';


export default function Todo({todo , showDelete , showUpdate}) {
  
  
  

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
    showDelete(todo)
  }

  function handleUpdateClick(){
    showUpdate(todo)
  }
  



  // ===== EVENT HANDLERS =====
  return (
    <>
    


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

