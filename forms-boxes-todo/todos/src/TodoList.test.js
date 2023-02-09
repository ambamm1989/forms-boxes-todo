import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TodoList from './TodoList';

function addTodo(todoList, task = 'write tests') {
    const tasksInput = todoList.getByLabelText('Task');
    fireEvent.change(tasksInput, { target: { value: task } });
    const sumbitButton = todoList.getByText('Add to todo');
    fireEvent.click(sumbitButton);
}

it('renders without crashing', () => {
    render(<TodoList />);
});

it('matches snapshot', () => {
    const { asFragment } = render(<TodoList />);
    expect(asFragment()).toMatchSnapshot();
});

it('can add a todo', () => {
    const list = render(<TodoList />);
    addTodo(list);

    expect(list.getByText('write tests')).toBeInTheDocument();
    expect(list.queryByText('Edit')).not.toBeInTheDocument();
    expect(list.queryByText('X')).not.toBeInTheDocument();
    expect(list.queryByText('Task')).not.toBeInTheDocument('');
});

it('can edit a todo', () => {
    const list = render(<TodoList />);
    addTodo(list);


fireEvent.click(list.getByText('Edit'));
const editInput = list.getByDisplayValue('write tests');
fireEvent.change(editInput, { target: { value: 'sleep' }});
fireEvent.click(list.getByText('Update'));

expect(list.getByText('sleep')).toBeInTheDocument();
expect(list.queryByText('write tests')).not.toBeInTheDocument();
});

it('can delete a todo', () => {
    const list = render(<TodoList />);
    addTodo(list);

    fireEvent.click(list.getByText('X'));

    expect(list.queryByText('write tests')).not.toBeInTheDocument();
})