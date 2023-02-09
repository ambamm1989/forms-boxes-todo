import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import NewTodoForm from './NewTodoForm';

it ('renders without crashing', () => {
    render(<NewTodoForm />);
});

it('matches snapshot', () => {
    const { asFragment } = render(<NewTodoForm />);
    expect(asFragment()).toMatchSnapshot();
});

it('runs the create function on form submit', () => {
    const createMock = jest.fn();
    const { getByTestId } = render(<NewTodoForm create={createMock} />);
    const createButton = getByTestId('Add a todo!');
    fireEvent.click(createButton);
    expect(createMock).toHaveBeenCalled();
});