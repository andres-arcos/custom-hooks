import { useEffect, useReducer } from "react";
import { todoReducer } from "./todoReducer";
const init = ()=>{
    return JSON.parse( localStorage.getItem('todos')) || [];
}

export const useTodo = () => {
  
      const initialState=[];

      const [todos, dispatchTodo] = useReducer(todoReducer, initialState,init);

      const todosCount=()=>{
        return todos.length;
      }

      const pendingCount=()=>{
        return todos.filter(t=>!t.done ).length;
      }

      useEffect(() => {
        localStorage.setItem('todos',JSON.stringify(todos));
      }, [todos])

      const handleNewTodo= (todo)=>{
        console.log(todo)

        const action ={
            type: '[TODO]Add Todo',
            payload: todo,
        }
        dispatchTodo(action)
    }

    const handleRemoveTodo=(id)=>{
          
      dispatchTodo({
          type:'[TODO]Remove Todo',
          payload:id,
      })
      
    }

    const handleToggleTodo=(id)=>{
      console.log("first "+id)
      dispatchTodo({
          type:'[TODO]Toggle Todo',
          payload:id,
      })
    }

    return{
      todos,
      handleNewTodo,
      handleRemoveTodo,
      handleToggleTodo,
      todosCount:todos.length,
      pendingCount:todos.filter(t=>!t.done ).length,
    }



}
