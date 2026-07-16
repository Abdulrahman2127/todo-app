
import './App.css';
import TodoList from './component/TodoList';
import '@fontsource/archivo-black';

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
          
            <TodoList/>
          
          
        </div>
      
  );
}

export default App;
