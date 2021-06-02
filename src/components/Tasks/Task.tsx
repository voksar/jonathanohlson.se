import React from 'react';
import { FaTimes } from 'react-icons/fa';

interface Tasks {
    id : number,
    text : string,
    created : string
}
interface ITask {
    task : Tasks,
    onDelete: (id: number) => any,
}

const Task : React.FC<ITask> = ({ task, onDelete }) => {
    return (
        <div className='task'>
            <h3>{task.text} <FaTimes onClick={() => onDelete(task.id)} style={{color:'red', cursor: 'pointer'}}/></h3>
            <p>{task.created}</p>
        </div>
    );
}

export default Task;