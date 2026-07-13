import logo from './logo.svg';
import './App.css';
import TodoList from './component/TodoList';
import '@fontsource/archivo-black';
import { TodosContext } from './context/todosContext';
import { useState } from 'react';


//OTHERS
import { v4 as uuidv4 } from 'uuid';


    const initialTodos = [
      {id: uuidv4() , title: "Read Book" , details: "wwwwwww" , isCompleted: false},
      {id: uuidv4() , title: "Clean Room" , details: "wwwwwww" , isCompleted: false},
      {id: uuidv4() , title: "Eat" , details: "wwwwwww" , isCompleted: false},
    ]
function App() {
  const [todos , setTodos] = useState(initialTodos);
  return (
    
    
        <div className='App'>
          <TodosContext.Provider value={{todos , setTodos}}>
            <TodoList/>
          </TodosContext.Provider>
        </div>
      
  );
}

export default App;
