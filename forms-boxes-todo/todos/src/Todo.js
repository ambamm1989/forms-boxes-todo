import React from 'react';

function Todo({ task = 'default todo', id = "1", remove, update }) {
    const [editTask, setEditTask] = useState(task);
    const [isediting, setIsediting] = useState(false);

    const toggleEdit = () => {
        setIsediting(edit =>!edit);
    };

    const handleChange = (e) => {
        setEditTask(e.target.value);
    };

    const handleDelete = () => remove(id);

        const handleUpdate = (e) => {
            e.preventDefault();
            update(id, editTask);
            setIsediting(false);
        };

        let jsx = (
            <div>
                <li>{task}</li>
                <button onClick={toggleEdit}>Edit</button>
                <button onClick={handleDelete}>X</button>
            </div>
        );

        if (isEditing) {
            jsx = (
                <div>
                    <form onSubmit={handleUpdate}>
                        <input type="text" value={editTask} onChange={handleChange} />
                        <button>Update</button>
                        </form>
                </div>
            );
        }

        return jsx;
    }

    export default Todo;