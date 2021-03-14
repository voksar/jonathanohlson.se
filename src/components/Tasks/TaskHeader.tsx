import './Tasks.css';
import Button from './UIComponents/Button';
import Tasks from './Tasks';
import React, { useEffect, useState } from 'react';
import AddTask from './AddTask';
import { authFetch } from '../../utils/misc/authFetch';

interface ITasks {
    id : number,
    text : string,
    created : string
}


const TaskHeader : React.FC = () => {
    const [showAddTask, setShowAddTask] = useState<boolean>(false);
    const [tasks, setTasks] = useState<ITasks[]>([]);
    useEffect(() => {
        authFetch('/api/user/tasks', 'get')
        .then(response => {return response.json()})
        .then((response : ITasks[]) => {
            setTasks(response);
        })
    }, [])
    
    const addTask = async (text: string) => {
        let opts = {'text': text}
        let data = await authFetch(`/api/user/tasks/add`, 'POST', opts).then(response => {
            if(!response.ok){
                throw response;
            }
            return response.json();
        }).then(response => {
            if(response.id){
                return response;
            }
        }).catch(e => console.log(e))
        let id: number = data.id;
        let created: string = data.created;
        const newTask : ITasks = { id, text, created }
        setTasks([...tasks, newTask]);
    }

    const deleteTask = async (id: number) => {
        console.log(id);
        await authFetch(`/api/user/tasks/delete/${id}`, 'DELETE').then(response => {
            if(!response.ok){
                throw response;
            }
            return response.json();
        }).then(() => {
            setTasks(tasks.filter((task) => task.id !== id));
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
                {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask}/> : 'No tasks right now!'}
            </div> 
        </div>
        
    );
}

export default TaskHeader