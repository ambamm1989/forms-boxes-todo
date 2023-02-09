import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Todo from './Todo';

it ('renders without crashing', () => {
    render(<Todo />);
});

it('matches snapshot', () => {
    const { asFragment } = render(<Todo />);
    expect(asFragment()).toMatchSnapshot();
});

it('matches snapshot when editing', () => {
    const { asFragment, getByText } = render(<Todo editing />);
    const editButton = getByText('Edit');
    fireEvent.click(editButton);
    expect(asFragment()).toMatchSnapshot();
});

it('runs the update function on form submit', () => {
    const updateMock = jest.fn();
    const { getByText } = render(<Todo update={updateMock} />);
    const editButton = getByText('Edit');
    fireEvent.click(editButton);
    const updateButton = getByText('Update');
    fireEvent.click(updateButton);
    expect(updateMock).toHaveBeenCalled();
});

it('runs the delete function on button click', () => {
    const removeMock = jest.fn();
    const { getByText } = render(<Todo remove={removeMock} />);
    const deleteButton = getByText('Delete');
    fireEvent.click(deleteButton);
    expect(removeMock).toHaveBeenCalled();
});