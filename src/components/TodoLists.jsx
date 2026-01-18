import React, { useEffect, useState } from 'react'
import './todoComponent.css'

const TodoLists = () => {
    const [input, setInput] = useState('');
    const [todoLists, setTodoLists] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
  


    const handleAddTodo = ()=>{
      if(input.trim() === '') return;
      const item = {
        id:Date.now(),
        text:input.trim(),
        completed: false,
      }
      setTodoLists((prev)=> [...prev, item]);
      setInput("")
    }
    const toggleTodo = (id)=>{
            setTodoLists( todoLists.map((t)=>{
              if(t.id === id){
                return {
                  ...t,
                  completed : !t.completed,
                }
              }else{
                return t;
              }
            })
            )
    }
    
    const handleClickDelete = (id)=>{
        setShowConfirm(true);
        setDeleteId(id)
    }
    const confirmDeleteTodo = ()=>{
        setTodoLists(todoLists.filter((t)=> t.id !== deleteId))
        setShowConfirm(false);
        setDeleteId(null);
    }

    const cancelDeleteTodo = ()=>{
          setShowConfirm(false);
        setDeleteId(null);
    }


    useEffect(()=>{
    const storedTodo = localStorage.getItem('todo');
    if(storedTodo){
      setTodoLists(JSON.parse(storedTodo));
    }
    setIsLoaded(true)
      
    },[])
    useEffect(()=>{
      if(!isLoaded) return
      localStorage.setItem('todo', JSON.stringify(todoLists))

    },[isLoaded, todoLists])

    
  return (
    <div className="todo-container">
        <h2>Taskify</h2>
        <p className="subtitle">Plan your day, one task at a time</p>
        <div  className="input-group">
        <input type="text" value={input} onChange={(e)=> setInput(e.target.value)} onKeyDown={(e)=> e.key === 'Enter' && handleAddTodo()} placeholder='Enter Todo'  />
        <button onClick={()=> handleAddTodo()}>Add</button>
        </div>
        <ul className="todo-list">
          {todoLists.map((t)=>{
            return(
            <li key={t.id}>
            <input type='checkbox' checked={t.completed} onChange={()=>toggleTodo(t.id)} />
             <span className={t.completed ? 'completed': ""} >{t.text}</span>
            <button onClick={()=> handleClickDelete(t.id)} style={{marginLeft:10}}>Delete</button>
              </li>
          )
          })}
        </ul>
        {
          showConfirm && (
            <div className='popup'>
              <p>Are you sure you want to delete it!</p>
              <button onClick={confirmDeleteTodo}>Yes</button>
              <button onClick={cancelDeleteTodo}>No</button>
            </div>
          )
        }
        
        </div>
  )
}

export default TodoLists