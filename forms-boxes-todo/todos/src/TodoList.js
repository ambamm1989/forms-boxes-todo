import React from 'react';
import Todo from './Todo';
import NewTodoForm from './NewTodoForm';

function TodoList() {
    const [todos, setTodos] = useState([]);

    const create = newTodo => {
        setTodos(todos => [...todos, newTodo]);
    };

    const update = (id, updatedTodo) => {
        setTodos(todos => todos.map(todo => todo.id === id? 
            {...todo, task: updatedTodo } : todo
        )
      );
    };

    const remove = id => {
        setTodos(todos => todos.filter(todo => todo.id!== id));
    };

    const todoComponents = todos.map(todo => (
      <Todo 
        key={todo.id} 
        id={todo.id} 
        update={update} 
        task={todo.task} 
        remove={remove}
      />
    ));

    return (
        <div>
            <NewTodoForm create={create} />
            <ul>{todoComponents}</ul>
        </div>
    );
}

export default TodoList;
