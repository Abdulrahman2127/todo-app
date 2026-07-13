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

import { useContext, useState, useEffect } from 'react'
import { TodosContext } from '../context/todosContext'

export default function TodoList() {
  const { todos, setTodos } = useContext(TodosContext)

  const [titleInput, setTitleInput] = useState('')
  const [displaylayedTodosType, setDisplaylayedTodosType] = useState('all')

  // filteratin arrays
  const completedTodos = todos.filter((t) => {
    return t.isCompleted
  })

  const notCompletedTodos = todos.filter((t) => {
    return !t.isCompleted
  })
 
  let todosToBeRender = todos
  
  if (displaylayedTodosType == 'completed') {
    todosToBeRender = completedTodos
  } else if (displaylayedTodosType == 'none-compteted') {
    todosToBeRender = notCompletedTodos
  } else {
    todosToBeRender = todos
  }

  const todosJSX = todosToBeRender.map((t) => {
    return <Todo key={t.id} todo={t} />
  })

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

  return (
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
  )
}
