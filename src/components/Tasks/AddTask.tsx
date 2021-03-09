import React, { useState } from 'react';
import './Tasks.css';

type SubmitTask = {
    onAdd: (text: string) => any,
}

const AddTask : React.FC<SubmitTask> = ({ onAdd }) => {
    const [text, setText] = useState<string>("");

    const onSubmit = (e:any) => {
        e.preventDefault();

        if(!text) {
            alert('Please add task');
            return;
        }

        onAdd(text)
        setText("");
        
    }

    return (
            <div className="wrapper fadeInDown">
                <div id="formContent">
                    <div className="fadeIn first">
                      <h2>Create Task</h2>
                    </div>
                    <div>
                    </div>
                    <form onSubmit={onSubmit}>
                      <input type="text" value={text} onChange={(e) => setText(e.target.value)} className="fadeIn second"  placeholder="Task"/>
                      <input type="submit" className="fadeIn fourth" value="Save Task"/>
                    </form>
                </div>
            </div>
    );
}

export default AddTask;