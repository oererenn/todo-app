import React,{useState,createContext} from 'react'

export const ToDoContext = createContext();

export const ToDoProvider = props => {
    const [todos, setTodos] = useState([]);
    return (
        
        <ToDoContext.Provider value={[todos,setTodos]}>
            {props.children}
        </ToDoContext.Provider>
    )
}