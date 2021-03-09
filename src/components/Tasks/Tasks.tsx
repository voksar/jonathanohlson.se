import Task from './Task';

interface ITasks {
    id : number,
    text : string,
    created : string
}

interface ListTasks {
    tasks : ITasks[],
    onDelete: (id:number) => any,
}

const Tasks : React.FC<ListTasks> = ({ tasks, onDelete }) => {

    return (
        <>
            {
                tasks.map((task:ITasks) => (
                    <Task key={task.id} task={task} onDelete={(id) => onDelete(id)}/>
                ))
            }
        </>
    );
}

export default Tasks;