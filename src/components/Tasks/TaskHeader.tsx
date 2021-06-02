import './Tasks.css';
import Button from './UIComponents/Button';
import Tasks from './Tasks';
import React, { useEffect, useState } from 'react';
import AddTask from './AddTask';
import { authFetch } from '../../utils/misc/authFetch';
import { apiFetch } from '../../utils/fetch/apiFetch';

interface ITasks {
    id : number,
    text : string,
    created : string
}

const TaskHeader : React.FC = () => {
    const [showAddTask, setShowAddTask] = useState<boolean>(false);
    const [tasks, setTasks] = useState<ITasks[]>([]);

    useEffect(() => {
        apiFetch<ITasks []>('/api/user/tasks', 'GET').then(response => {
            if(response){
                setTasks(response);
            }
        }).catch(e => console.log(e));
    }, [])
    
    const addTask = async (text: string) => {
        let opts = {'text': text}
        
        await apiFetch<ITasks>('/api/user/tasks/add', 'POST', opts).then(response => {
            if(response){
                const newTask: ITasks = { id: response.id, text: text, created: response.created }
                setTasks([...tasks, newTask]);
            }
        }).catch(e => console.log(e));
    }

    const deleteTask = async (id: number) => {
        await apiFetch(`/api/user/tasks/delete/${id}`, 'DELETE').then(response => {
            setTasks(tasks.filter((task: ITasks) => task.id !== id));
        }).catch(e => console.log(e));
        
    }

    return (
        <div className='task-screen'>
            <div className="container">
                <header className="header">
                    <h1>Tasks</h1>
                    <Button text={showAddTask ? 'Close': 'Add'} onClick={() => setShowAddTask(!showAddTask)}/>
                </header>
                {showAddTask && <AddTask onAdd={addTask}/>}
                {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask}/> : <p>No tasks right now!</p>}
            </div> 
        </div>
        
    );
}

export default TaskHeader