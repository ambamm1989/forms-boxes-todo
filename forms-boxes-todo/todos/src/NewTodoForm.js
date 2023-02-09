import React, { useState } from 'react';
import uuid from 'uuid/v4';

function NewTodoForm({ createTodo }) {
    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        setTask(e.target.value);
    };

    const gatherInput = (e) => {
        e.preventDefault();
        createTodo({ task, id: uuid() });
        setTask('');
    };

    return (
        <div>
            <form onSubmit={gatherInput}>
                <label htmlFor='task'>Task</label>
                <input
                   id='task'    
                   name='task'
                   type='text'
                   onChange={handleChange}
                   value={task}
                   />
                <button>Add a todo!</button>
                </form>
        </div>
    );
}

export default NewTodoForm;